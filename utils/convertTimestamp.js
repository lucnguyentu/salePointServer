import moment from 'moment';

export default function convertTimestamp(data) {
    data.createdAt = moment.unix(data.createdAt.seconds).format('YYYY-MM-DD HH:mm:ss');
    data.modified = moment.unix(data.modified.seconds).format('YYYY-MM-DD HH:mm:ss');
    return data;
}
