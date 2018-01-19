import React, {Component} from 'react';
import Navigation from '../config/nav/router'
import _ from 'lodash'
import * as Utils from "../core/utils";
import {USER_KEY} from "../config/setting";

class App extends Component {
    componentDidMount() {
        let self = this;
        let route = '';
        storage.load({
            key: USER_KEY.USER_STAGE_KEY,
        }).then(data => {
            if (!_.isNull(data.token)) {
                route = 'Main'
            } else {
                route = 'Login'
            }
            Utils.resetNavigation(self._navigation._navigation, route);
        }).catch(err => {
            route = 'Login';
            Utils.resetNavigation(self._navigation._navigation, route);
        });
    }

    render() {
        return (
            <Navigation ref={(navigation) => {
                this._navigation = navigation
            }}/>
        );
    }
}

export default App;