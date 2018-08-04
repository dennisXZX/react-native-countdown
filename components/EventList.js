import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import EventCard from './EventCard';
import mockData from '../mock/db.json';

class EventList extends Component {
    state = {
        events: []
    };

    componentDidMount() {
        const events = mockData.events.map(event => {
            return {
                ...event,
                date: new Date(event.date)
            }
        });

        this.setState({ events });
    }


    render () {
        return (
            <FlatList
                data={this.state.events}
                renderItem={({ item }) => <EventCard event={item} />}
                keyExtractor={item => item.id}
            />
        )
    }
}

export default EventList;
