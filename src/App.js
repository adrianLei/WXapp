import React from 'react';
import axios from 'axios';
import config from './config';
import {Button, Form, Input, Tab} from 'semantic-ui-react'







class App extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      wxweatherData: {},
      city: '',
      fetching: false,
      error: false

    }
this.onUpdateCity = this.onUpdateCity.bind(this)
this.getWeather = this.getWeather.bind(this)
this.submit = this.submit.bind(this)
  }

  getWeather(city, unit){
    var self =this
    var cityName = city || 'chengdu'
    var unityType = unit || 'metric'

this.setState({
  fetching: true
})
    axios({
      method: 'get',
      url: 'http://api.openweathermap.org/data/2.5/weather',
      params: {
        q:cityName,
        units: unityType,
        appid: config.appid

      }
    })
    .then(function(res){
      const data = res.data
      self.setState({
        wxweatherData: data.main,
        city:'',
        fetching: false,
        error: false


      })
      console.log(res)
    })
    .catch(function(err){
      console.log(err)
      self.setState({
        error: true,
        fetching: false
      })

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
    console.log(this.state.fetching)
    const fetching = this.state.fetching
    const error = this.state.error
    const temp =this.state.wxweatherData.temp
  const humidity =this.state.wxweatherData.humidity
  const pressure=this.state.wxweatherData.pressure
  const panes = [
    { menuItem: 'Temperature', render: () => <Tab.Pane>{temp}</Tab.Pane> },
    { menuItem: 'Humidity', render: () => <Tab.Pane>{humidity}</Tab.Pane> },
    { menuItem: 'Pressure', render: () => <Tab.Pane>{pressure}</Tab.Pane> },
  ]
    return<div><Form>
    <Form.Input label='Enter CItyname' error={error} disabled={fetching} loading={fetching} placeholder = 'city name' value={this.state.city} onChange={this.onUpdateCity} type='test' />

    <Button onClick={this.submit}>Submit</Button>
    <Tab panes={panes} />
  </Form>

  
  </div>

    // <div>weather<input value={this.state.city} onChange={this.onUpdateCity} type='text'/>
    // <button onClick={this.submit}>Submit</button>
    // </div>

  }
}

export default App;
