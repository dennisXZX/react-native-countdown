import {
    createStackNavigator,
} from 'react-navigation';
import EventList from './components/EventList';
import EventForm from './components/EventForm';

const App = createStackNavigator({
    list: {
        screen: EventList,
        navigationOptions: () => ({
            title: 'Your events',
        }),
    },
    form: {
        screen: EventForm,
        navigationOptions: () => ({
            title: 'Add an event',
        }),
    },
});

export default App;