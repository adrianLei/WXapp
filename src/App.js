import React from 'react';
import axios from 'axios';
import config from './config'
import {Button, Form} from 'semantic-ui-react'







class App extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      wxweatherData: {},
      city: ''

    }
this.onUpdateCity = this.onUpdateCity.bind(this)
this.getWeather = this.getWeather.bind(this)
this.submit = this.submit.bind(this)
  }

  getWeather(city, unit){
    var self =this
    var cityName = city || 'chengdu'
    var unityType = unit || 'metric'
    axios({
      method: 'get',
      url: 'http://api.openweathermap.org/data/2.5/forecast',
      params: {
        q:cityName,
        units: unityType,
        appid: config.appid

      }
    })
    .then(function(res){
      const data = res.data
      self.setState({wxweatherData: data})
      console.log(res)
    })
    .catch(function(err){
      console.log(err)

    })

  }

  componentDidMount(){
    this.getWeather('boston', 'metric')
    
  }
  onUpdateCity(ev){
console.log(ev.target.value)
this.setState({city: ev.target.value})


  }
  submit(){
    this.getWeather(this.state.city)
  }
  render(){
    console.log('this is render')
    console.log(this.props)
    return<Form>
      <Form.Field>
        <label>Enter CityName</label>
        <input placeholder = 'city name' value={this.state.city} onChange={this.onUpdateCity} type='test'/>
      </Form.Field>
      <Button onClick={this.submit}>Submit</Button>
    </Form>
    // <div>weather<input value={this.state.city} onChange={this.onUpdateCity} type='text'/>
    // <button onClick={this.submit}>Submit</button>
    // </div>

  }
}

export default App;
