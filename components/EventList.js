import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import EventCard from './EventCard';
import mockData from '../mock/db.json';

const styles = StyleSheet.create({
    list: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#f3f3f3'
    }
});

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
                style={styles.list}
                data={this.state.events}
                renderItem={({ item }) => <EventCard event={item} />}
                keyExtractor={item => item.id}
            />
        )
    }
}

export default EventList;
