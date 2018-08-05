import moment from 'moment';
import Expo from "expo";
import uuid from 'uuid';

const { manifest } = Expo.Constants;

// a way to get around hitting the json-server running on your local machine on your phone or emulator
const API = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
    : `api.example.com`;

const URL = `http://${API}/events`;

export function getEvents() {
    return fetch(URL)
        .then(response => response.json())
        .then(events => events.map(e => ({ ...e, date: new Date(e.date) })))
}

export function saveEvent({ title, date }) {
    return fetch(URL, {
        method: 'POST',
        body: JSON.stringify({
            title,
            date,
            id: uuid(),
        }),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(res => res.json())
        .catch(error => console.error('Error:', error));
}

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

export function formatDateTime(dateString) {
    const parsed = moment(new Date(dateString));

    if (!parsed.isValid()) {
        return dateString;
    }

    return parsed.format('H A on D MMM YYYY');
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