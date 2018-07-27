import React from 'react';
import '../assets/style/App.scss';
import NotFound from '../containers/NotFound'
import history from '../router/history'
import ShoppingMall from './ShoppingMall'
import { Router, Route, Switch } from 'react-router-dom'
class App extends React.PureComponent {
    render() {
        return (
            <div className='App'>
                <Router history={history}>
                    <Switch>
                        <Route exact path='/' component={ShoppingMall} />
                        <Route path='/*' component={NotFound} />
                    </Switch>
                </Router>

            </div>

        );
    }
}

export default App;
