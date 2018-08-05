import moment from 'moment';

export function formatDate(dateString) {
    // convert the date string into a Moment object
    const parsed = moment(new Date(dateString));

    // check if it is a real date
    if (!parsed.isValid()) {
        return dateString;
    }

    // return a formatted date
    return parsed.format('D MMM YYYY');
}

export function isEventStillOn(eventDate) {
    // get the duration of the difference between event date and today
    const duration = moment.duration(moment(new Date(eventDate)).diff(new Date()));

    if (duration > 0) {
        return true;
    } else {
        return false;
    }
}

export function getCountdownParts(eventDate) {
    // get the duration of the difference between event date and today
    const duration = moment.duration(moment(new Date(eventDate)).diff(new Date()));

    // extract each part from the duration object
    return {
        days: duration.get('days'),
        hours: duration.get('hours'),
        minutes: duration.get('minutes'),
        seconds: duration.get('seconds'),
    };
}