import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Day.css';

export default class Day extends Component {
    static propTypes = {
        prop: PropTypes.func
    }

    render() {
        return (
            <div className="day--container">
                <h2 className="day--date">{this.props.date}</h2>
                <img className="nextDays--logo" src={"http://www.openweathermap.org/img/wn/" + this.props.icon + "@2x.png"} alt=""/>
                <p>{this.props.temp}°C</p>
            </div>
        )
    }
}
