import './App.css';
import React, { Component } from 'react';
import axios from "axios";
import Today from './Today';
import NextDays from './NextDays';

class App extends Component {
  state = {
    data: {},
    ville: '',
    longitude: 0,
    latitude: 0,
    today: [],
    nextDays: []
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
    } if (event.target.name === "ville") {
      this.setState({
        ville: event.target.value
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios.get('https://nominatim.openstreetmap.org/search/' + this.state.ville + '?format=json&limit=1')
      .then(res => {
        this.setState({
          latitude: res.data[0].lat,
          longitude: res.data[0].lon
        })
        this.getInfo()
      })
  }

  getInfo = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.latitude}&lon=${this.state.longitude}&units=metric&lang=fr&exclude=minutely,hourly,alerts&appid=bf0439822962000f841efcbf28142ab8`)
      .then(res => {
        this.setState({
          data: res.data
        })
      })
  }

  render() {


    // Checker que data est non vide
    if (Object.keys(this.state.data).length !== 0) {
      const data = this.state.data;
      const current = data.current;
      const daily = data.daily;

      //props de Today.js
      const today = [current.temp, current.weather[0].description, current.weather[0].icon]

      //props de nextDays.js & Day.js
      let nextDays = []
      for (let i = 1; i < 5; i++) {
        let unixTime = daily[i].dt;
        let date = new Date(unixTime * 1000);
        let day = date.toLocaleString("fr-FR", { weekday: 'long' })  // formatage pour sortir un jour de la semaine depuis une date unixtimestamp
        nextDays[i - 1] = [day, daily[i].temp.day, daily[i].weather[0].icon];
      }
      console.log(nextDays);

      return (
        <div className="App">
          <form className="search-bar--container" onSubmit={this.handleSubmit}>
            <input className="bar" type="text" name="ville" placeholder="Ville"
              onChange={this.handleChange}
            />
            <input className="button" type="submit" value="Search" />
          </form>
          <Today temp={today[0]} desc={today[1]} icon={today[2]} />
          <NextDays info={nextDays} />
        </div>
      );
    } else {
      // Sinon j'affiche un loading
      return (
        <div>
          <h1>Location :</h1>
          <form className="search-bar--container__noload" onSubmit={this.handleSubmit}>
            <div className="noload--container">
              <input className="bar__noload" type="text" name="ville" placeholder="Ville"
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