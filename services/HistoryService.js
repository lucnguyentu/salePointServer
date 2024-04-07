import { db } from '../config/firebase.js';
import convertTimestamp from '../utils/convertTimestamp.js';
import ErrorHandler from '../utils/errorHandler.js';
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
    orderBy,
} from 'firebase/firestore';

// History
export async function getHistoryByUser(userId) {
    try {
        const history = [];

        const querySnapshot = await getDocs(
            query(collection(db, 'Receipt'), where('customer', '==', userId), orderBy('createdAt', 'desc')),
        );

        querySnapshot.forEach((doc) => {
            const receiptData = doc.data();
            const receiptDate = receiptData.createdAt.toDate();

            const monthYear = `${receiptDate.getMonth() + 1}/${receiptDate.getFullYear()}`;

            const existingMonthYearIndex = history.findIndex((item) => item.date === monthYear);

            const newData = convertTimestamp(receiptData);

            if (existingMonthYearIndex === -1) {
                history.push({
                    date: monthYear,
                    receipts: [newData],
                });
            } else {
                history[existingMonthYearIndex].receipts.push(newData);
            }
        });

        return history;
    } catch (error) {
        console.error('Error getting history by userId: ', error);
        throw new ErrorHandler('Error getting history by userId: ', 400);
    }
}

// total revenue by month
export async function getTotalRevenue() {
    try {
        const revenue = [];

        const querySnapshot = await getDocs(query(collection(db, 'Receipt'), orderBy('createdAt', 'desc')));

        querySnapshot.forEach((doc) => {
            const receiptData = doc.data();
            const receiptDate = receiptData.createdAt.toDate();

            const monthYear = `${receiptDate.getMonth() + 1}/${receiptDate.getFullYear()}`;

            const existingMonthYearIndex = revenue.findIndex((item) => item.date === monthYear);

            const newData = convertTimestamp(receiptData);

            if (existingMonthYearIndex === -1) {
                revenue.push({
                    date: monthYear,
                    receipts: [newData],
                });
            } else {
                revenue[existingMonthYearIndex].receipts.push(newData);
            }
        });

        return calCulateRevenue(revenue);
    } catch (error) {
        console.error('Error getting history by userId: ', error);
        throw new ErrorHandler('Error getting history by userId: ', 400);
    }
}

const calCulateRevenue = (list = []) => {
    let totalrevenue = 0;
    const revenueByMonth = list.map((item) => {
        const totalPriceReceipt = item.receipts.reduce((a, b) => {
            return a + b.totalPrice;
        }, 0);

        totalrevenue = totalrevenue + totalPriceReceipt;

        return {
            date: item.date,
            totalRevenue: totalPriceReceipt,
        };
    }, []);

    return {
        totalrevenue,
        revenueByMonth,
    };
};

// Top 5 customers with the most accumulated points
export async function getTopCustomer() {
    try {
        const querySnapshot = await getDocs(query(collection(db, 'Receipt'), orderBy('createdAt', 'desc')));

        const customerTotalPoints = {};

        querySnapshot.forEach((doc) => {
            const receiptData = doc.data();
            const customer = receiptData.customer;
            const points = receiptData.totalPrice;

            if (!customerTotalPoints[customer]) {
                customerTotalPoints[customer] = 0;
            }

            customerTotalPoints[customer] += points;
        });

        const customerTotalPointsArray = Object.keys(customerTotalPoints).map((customer) => ({
            customer,
            totalPoints: customerTotalPoints[customer] / 1000,
        }));

        customerTotalPointsArray.sort((a, b) => b.totalPoints - a.totalPoints);

        return customerTotalPointsArray.slice(0, 5);
    } catch (error) {
        console.error('Error getting top customers: ', error);
        throw new Error('Error getting top customers');
    }
}

export async function getTopCustomerByMonth() {
    try {
        const querySnapshot = await getDocs(query(collection(db, 'Receipt'), orderBy('createdAt', 'desc')));

        // Tạo một đối tượng lưu trữ tổng giá trị của các hóa đơn của từng khách hàng theo từng tháng
        const customerTotalPriceByMonth = {};

        querySnapshot.forEach((doc) => {
            const receiptData = doc.data();
            const customer = receiptData.customer;
            const totalPrice = receiptData.totalPrice;
            const receiptDate = receiptData.createdAt.toDate();
            const monthYear = `${receiptDate.getMonth() + 1}/${receiptDate.getFullYear()}`;

            if (!customerTotalPriceByMonth[monthYear]) {
                customerTotalPriceByMonth[monthYear] = {};
            }

            if (!customerTotalPriceByMonth[monthYear][customer]) {
                customerTotalPriceByMonth[monthYear][customer] = 0;
            }

            customerTotalPriceByMonth[monthYear][customer] += totalPrice;
        });

        // Tạo một mảng lưu trữ thông tin về tổng giá trị của các hóa đơn của từng khách hàng theo từng tháng
        const topCustomersByMonth = {};

        // Lặp qua từng tháng
        Object.keys(customerTotalPriceByMonth).forEach((monthYear) => {
            const customerTotalPrice = customerTotalPriceByMonth[monthYear];

            // Tạo mảng mới để sắp xếp theo tổng giá trị giảm dần
            const sortedCustomers = Object.keys(customerTotalPrice)
                .map((customer) => ({
                    customer,
                    totalPrice: customerTotalPrice[customer],
                }))
                .sort((a, b) => b.totalPrice - a.totalPrice);

            // Lấy top 5 khách hàng có tổng giá trị lớn nhất
            topCustomersByMonth[monthYear] = sortedCustomers.slice(0, 5);
        });

        return topCustomersByMonth;
    } catch (error) {
        console.error('Error getting top customers: ', error);
        throw new Error('Error getting top customers');
    }
}
