import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Day from './Day';
import './NextDays.css';


export default class NextDays extends Component {
    
    static propTypes = {
        prop: PropTypes.func
    }
    state = {
        data: this.props.info
    }
    
    render() {
        console.log(this.state.data);
        return (
            <div className="next-days--container">
                <Day date={this.state.data[0][0]} temp={this.state.data[0][1]} icon={this.state.data[0][2]}/>
                <Day date={this.state.data[1][0]} temp={this.state.data[1][1]} icon={this.state.data[1][2]}/>
                <Day date={this.state.data[2][0]} temp={this.state.data[2][1]} icon={this.state.data[2][2]}/>
                <Day date={this.state.data[3][0]} temp={this.state.data[3][1]} icon={this.state.data[3][2]}/>
            </div>
        )
    }
}
