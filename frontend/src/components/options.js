import React, { Component,useState } from 'react'
import Places from './places';
export class Options extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statecheck: false,
      startdate1: "2023-04-28",
      startdate2: "2023-04-28",
      places: [],
    };

    this.HandleAll = this.HandleAll.bind(this);
    this.Handle5 = this.Handle5.bind(this);
    this.Handledate1 = this.Handledate1.bind(this);
    this.Handledate2 = this.Handledate2.bind(this);
  }
  HandleAll = (ev) => {
    ev.preventDefault();
    let fetchurl =  "http://127.0.0.1:5000/getall?date1="+this.state.startdate1+"&date2="+this.state.startdate2;
    console.log(fetchurl);
    fetch(fetchurl).then(response => response.json().then(data => {
      this.setState({places: data["ans"]});
      this.setState({statecheck: true});
    }));
  }
  Handle5 = (ev) => {
    ev.preventDefault();
    let fetchurl =  "http://127.0.0.1:5000/get5?date1="+this.state.startdate1+"&date2="+this.state.startdate2;
    console.log(fetchurl);
    fetch(fetchurl).then(response => response.json().then(data => {
      this.setState({places: data["ans"]});
      this.setState({statecheck: true});
    }));
  }
  Handledate1 = (ev) => {
    this.setState({startdate1:ev.target.value});
  }
  Handledate2 = (ev) => {
    this.setState({startdate2:ev.target.value});
  }
  render() {
    return (
      <div>
        <div class="alert alert-warning text-center">
          <h1>Location History App</h1>
        </div>
        <div class="hstack gap-3 fs-4">
          <div class="p-2">
            Enter start date:
            <input type="date" name="date1" value={this.state.startdate1} onChange={this.Handledate1}/>
          </div>
          <div class="p-2">
            EnterEndDate:
            <input type="date" name="date2" value={this.state.startdate2} onChange={this.Handledate2}/>
          </div>
          <br/>
          <br/>
        </div>
      <div class="hstack gap-3 fs-5">
        <div class="p-2">
          <button type="button" class="btn btn-light btn-lg" onClick={this.HandleAll}>All the places in between these dates</button>
        </div>
        <div class="p-2">
          <button type="button" class="btn btn-light btn-lg" onClick={this.Handle5}>Top 5 places in between these dates</button>
        </div>
      </div>
      <div>
        {this.state.statecheck ? <Places places={this.state.places} />:''}
      </div>
      </div>
    )
  }
}

export default Options
