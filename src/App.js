import './App.css';
import React, { Component } from 'react';
import axios from "axios";
import Today from './Today';
import NextDays from './NextDays';

class App extends Component {
  state = {
    data: {},
    longitude: 0,
    latitude: 0
  }

  componentDidMount() {

  }

  handleChange = (event) => { // fonction appellée dans SearchBar.js 
    if (event.target.name === "longitude") {
      this.setState({
        longitude: event.target.value
      })

    } if (event.target.name === "latitude") {
      this.setState({
        latitude: event.target.value
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();   ////https://api.openweathermap.org/data/2.5/onecall?lat=50.4291723&lon=2.8319805&units=metric&lang=fr&exclude=minutely,hourly,alerts&appid=bf0439822962000f841efcbf28142ab8
    axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=' + String(this.state.latitude) + '&lon=' + String(this.state.longitude) + '&units=metric&lang=fr&exclude=minutely,hourly,alerts&appid=bf0439822962000f841efcbf28142ab8')
      .then(res => {
        this.setState({
          data: res.data
        })
        console.log(this.state.data)
      })

    const data = this.state.data;
    const current = data.current;
    const daily = data.daily;

    //props de Today.js
    this.setState ({ 
      today: [current.temp, current.weather[0].description, current.weather[0].icon]
    })

    //props de nextDays.js & Day.js
    const nextDays = []
    for (let i = 1; i < 5; i++) {
      let unixTime = daily[i].dt;
      let date = new Date(unixTime * 1000);
      let day = date.toLocaleString("fr-FR", { weekday: 'long' })  // formatage pour sortir un jour de la semaine depuis une date unixtimestamp
      nextDays[i - 1] = [day, daily[i].temp.day, daily[i].weather[0].icon];
    }
    this.setState({
      nextDays: nextDays
    })
  }

  render() {
    // Checker que data est non vide
    if (Object.keys(this.state.data).length !== 0) {
      return (
        <div className="App">
          <form className="search-bar--container" onSubmit={this.handleSubmit}>
            <input className="bar" type="text" name="longitude" placeholder="longitude"
              onChange={this.handleChange}
            />
            <input className="bar" type="text" name="latitude" placeholder="latitude"
              onChange={this.handleChange}
            />
            <input className="button" type="submit" value="Search" />
          </form>
          <Today temp={this.state.today[0]} desc={this.state.today[1]} icon={this.state.today[2]} />
          <NextDays info={this.state.nextDays} />
        </div>
      );
    }
    else {
      // Sinon j'affiche un loading
      return (
        <div>
          <h1>Location :</h1>
          <form className="search-bar--container__noload" onSubmit={this.handleSubmit}>
            <div className="noload--container">
              <input className="bar__noload" type="text" name="longitude" placeholder="longitude"
                onChange={this.handleChange}
              />
              <input className="bar__noload" type="text" name="latitude" placeholder="latitude"
                onChange={this.handleChange}
              />
            </div>

            <input className="button__noload" type="submit" value="Search" />
          </form>
        </div>
      );
    }
  }
}

export default App;