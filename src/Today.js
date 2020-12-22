import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './today.css';

export default class Today extends Component {

    static propTypes = {
        prop: PropTypes.func
    }


    render() {
        return (
            <div className="today--container">
                <img className="today--logo" src={"http://www.openweathermap.org/img/wn/" + this.props.icon + "@4x.png"} alt=""/>
                <div className="today--text">
                    <h2>Today</h2>
                    <h1>Lens</h1>
                    <p>Temperature: {this.props.temp}°C <br/>{this.props.desc}</p>
                </div>
            </div>
        )
    }
}
