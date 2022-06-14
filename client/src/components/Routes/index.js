import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Home from '../../pages/Home';
import Login from '../../pages/Login';

const index = () => {
    return (
        
        <Router>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/login' exact component={Login} />
                <Redirect to='/' />
            </Switch>
        </Router>
        
    );
};

export default index;