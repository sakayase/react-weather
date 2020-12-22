import React, { Component } from 'react'
/*import PropTypes from 'prop-types'*/
import './SearchBar.css'

export default class SearchBar extends Component {
    /*
    static propTypes = {
        prop: PropTypes
    }
    */

    render() {
        return (
            <div className="search-bar--container">
                <input className="bar" type="text" name="longitude" placeholder="longitude"/>
                <input className="bar" type="text" name="latitude" placeholder="latitude"/>
                <input className="button" type="submit" value="Search"/>
            </div>
        )
    }
}
