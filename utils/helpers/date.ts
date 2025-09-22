import moment from 'moment';
import 'moment/locale/ja';

export const getDateNow = (toFormat: string = 'YYYY/MM/DD') => {
    return moment().local().format(toFormat);
};

export const formatDate = (date: string | Date, toFormat: string = 'YYYY/MM/DD') => {
    if (date) {
        return moment(date).format(toFormat);
    }

    return '';
};

export const formatTime = (time: string, toFormat: string = 'HH:mm') => {
    if (time) {
        return moment(time).format(toFormat);
    }
    return '';
};

export const formatToDate = (date: string, fromFormat: string = 'YYYY/MM/DD') => {
    if (date) {
        return moment(date, fromFormat).toDate();
    }

    return null;
};

export const formatToDateTime = (date: string, fromFormat: string = 'YYYY/MM/DD HH:mm') => {
    if (date) {
        return moment(date, fromFormat).toDate();
    }

    return null;
};

export const isValid = (date: string, fromFormat: string = 'YYYY/MM/DD') => {
    if (date) {
        return moment(date, fromFormat).isValid();
    }

    return false;
};

export const isValidDate = (date: Date) => {
    if (date) {
        return moment(date).isValid();
    }

    return false;
};

export const compareDateSameOrAfter = (from_date: string, to_date: string, fromFormat: string = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(from_date, fromFormat).isSameOrAfter(moment(to_date, fromFormat));
};

export const compareDateSame = (from_date: string, to_date: string, fromFormat: string = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(from_date, fromFormat).isSame(moment(to_date, fromFormat));
};

export const compareDateSameOrBefore = (from_date: string, to_date: string, fromFormat: string = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(from_date, fromFormat).isSameOrBefore(moment(to_date, fromFormat));
};
