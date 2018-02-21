import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import MultiThemeProvider from "material-ui/styles/MuiThemeProvider"
import PatientPage from "./components/patientPage";
import DoctorPage from "./components/DoctorPage";
import WebsiteTitle from "./components/WebsiteTitle";

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      isDoctor: true
    }
        this._handleDoctor=this._handleDoctor.bind(this)
  }

    _handleDoctor(){
        this.setState({isDoctor:!this.state.isDoctor})
  }

  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Smart Contract Example</h2>
              <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
              <p>Try changing the value stored on <strong>line 59</strong> of App.js.</p>
              <RaisedButton label={"hi here"}/>
              <p>The stored value is: {this.state.storageValue}</p>
            </div>
            <WebsiteTitle/>
            <h2><RaisedButton onClick={this._handleDoctor} label={"Toggle Permission"}/></h2>
          <br/>
          <h1>{this.state.isDoctor ? "Hello Doctor" : "Hello Patient"}</h1>
          {this.state.isDoctor ? <DoctorPage/> : <PatientPage/>}
          </div>
        </main>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App
