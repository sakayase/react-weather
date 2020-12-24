import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Day from './Day';
import './NextDays.css';


export default class NextDays extends Component {
    
    static propTypes = {
        prop: PropTypes.func
    }
    
    render() {
        return (
            <div className="next-days--container">
                <Day date={this.props.info[0][0]} temp={this.props.info[0][1]} icon={this.props.info[0][2]}/>
                <Day date={this.props.info[1][0]} temp={this.props.info[1][1]} icon={this.props.info[1][2]}/>
                <Day date={this.props.info[2][0]} temp={this.props.info[2][1]} icon={this.props.info[2][2]}/>
                <Day date={this.props.info[3][0]} temp={this.props.info[3][1]} icon={this.props.info[3][2]}/>
            </div>
        )
    }
}
