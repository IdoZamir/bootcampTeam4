import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RaisedButton from 'material-ui/RaisedButton';
import MultiThemeProvider from "material-ui/styles/MuiThemeProvider"
import PatientPage from "./components/patientPage";
import DoctorPage from "./components/DoctorPage";
import WebsiteTitle from "./components/WebsiteTitle";

class App extends Component {
    constructor(){
        super();
        this.state={
        isDoctor: true
        }
        this._handleDoctor=this._handleDoctor.bind(this)
    }
    _handleDoctor(){
        this.setState({isDoctor:!this.state.isDoctor})
    }

  render() {
    return (
<MultiThemeProvider>
      <div className="App">
        <header className="App-header">
            <WebsiteTitle/>
            <h2><RaisedButton onClick={this._handleDoctor} label={"Toggle Permission"}/></h2>
        </header>

          <br/>
          <h1>{this.state.isDoctor ? "Hello Doctor" : "Hello Patient"}</h1>
          {this.state.isDoctor ? <DoctorPage/> : <PatientPage/>}
      </div>
</MultiThemeProvider>

    );
  }
}

export default App;
