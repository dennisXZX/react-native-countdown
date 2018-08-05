import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import EventCard from './EventCard';
import { getEvents } from '../api/api';

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
        // update timers property every second,
        // so on each second the EventCard component would re-render
        setInterval(() => {
            this.setState({
               events: this.state.events.map(event => ({
                   ...event,
                   timers: Date.now()
               }))
            });
        }, 1000);

        getEvents()
            .then((events) => {
                this.setState({ events })
            }
        );
    }

    // navigate to the form page
    handleAddEvent = () => {
        this.props.navigation.navigate('form');
    };

    render () {
        return [
            <FlatList
                key="flatlist"
                style={styles.list}
                data={this.state.events}
                renderItem={({ item }) => <EventCard event={item} />}
                keyExtractor={item => item.id}
            />,
            <ActionButton
                key="fab"
                onPress={this.handleAddEvent}
                buttonColor="rgba(231, 76, 60, 1)"
            />
        ];
    }
}

export default EventList;
