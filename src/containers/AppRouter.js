import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import asyncComponent from '../common/hoc/AsyncComponent';

class AppRouter extends Component {
    render() {
        let routes = [];
        let forceRedirect = false;
        let redirect = null;
        const restrictedRoute=['/signin','/register','/burger/builder', '/my-chart', '/my-order'];

        if((restrictedRoute.indexOf(this.props.currentPath) > -1)) {

            if (this.props.isLogin) {
                routes = ['/signin', '/register'];
            } else {
                routes = ['/burger/builder', '/my-chart', '/my-order'];
            }
            forceRedirect = checkRestrictedRoute(routes, this.props.currentPath);
            if (forceRedirect) redirect = <Redirect to="/"/>;
        }

        return (
            <Switch>
                {redirect}
                <Route
                    exact
                    path="/"
                    component={asyncComponent(() => import('./Home/Home.js'))}
                />
                <Route
                    exact
                    path="/burger/builder"
                    component={asyncComponent(() => import('./BurgerBuilder/BurgerBuilder.js'))}
                />
                <Route
                    exact
                    path="/my-chart"
                    component={asyncComponent(() => import('./MyChart/MyChart.js'))}
                />
                <Route
                    exact
                    path="/my-order"
                    component={asyncComponent(() => import('./MyOrder/MyOrder.js'))}
                />
                <Route
                    exact
                    path="/signin"
                    component={asyncComponent(() => import('./SignIn/SignIn.js'))}
                />
                <Route
                    exact
                    path="/signout"
                    component={asyncComponent(() => import('./SignOut/SignOut.js'))}
                />
                <Route
                    exact
                    path="/register"
                    component={asyncComponent(() => import('./Register/Register.js'))}
                />
                <Route render={() => <h1>404:Page Not found</h1>}/>

            </Switch>
        );
    };
}

const checkRestrictedRoute = (routes, currentPath) => {
    let forceRedirect = false;
    for (let a = 0; a < routes.length; a++) {
        let route = routes[a];
        if (route === currentPath) {
            forceRedirect = true;
            break;
        }
    }
    return forceRedirect;
}



export default AppRouter;