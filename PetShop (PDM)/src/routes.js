import { createStackNavigator } from 'react-navigation';


import Login from './pages/Login'
import Home from './pages/Home';
import Create from './pages/Create';
import Ver from './pages/Ver';
import User from './pages/User';

const Routes = createStackNavigator({
    Login,
    Create,
    Home,
    Ver,
    User
}, {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#5271FF',
                headerLayoutPreset: 'center'
            },
            headerTintColor: '#FFF',
        }
    });

export default Routes;