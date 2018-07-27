import React from 'react'
import App from '../containers/App'

import {BrowserRouter as Router ,Route,Switch} from 'react-router-dom'
class RouteMap extends React.Component {
    render() {
        return (
            <Router>
                <App>
                    <Switch>
                        <Route exact path='/' component={Home}></Route>
                        <Route path='/*' component={NotFound}></Route>
                    </Switch>
                </App>
            </Router>
        );
    }
}

export default RouteMap;