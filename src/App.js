import React, { Component } from 'react'
import './App.css';

import {Tabs, Tab} from 'material-ui/Tabs';

import RaisedButton from 'material-ui/RaisedButton';
import PatientPage from "./components/patientPage";
import DoctorPage from "./components/DoctorPage";
import WebsiteTitle from "./components/WebsiteTitle";

import AddToRecordForm from "./components/AddToRecordForm"
import DoctorTabs from "./components/DoctorTabs"
import PatientTabs from "./components/PatientTabs"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      isDoctor: false
    }
        this._handleDoctor=this._handleDoctor.bind(this)
  }

    _handleDoctor(){
        this.setState({isDoctor:!this.state.isDoctor})
  }


  _renderDoctorPage(){
      return(
            <div className="DoctorContainer">
                <div className="LeftColumn">
                    <div className="LeftColumn-WelcomePanel">
                        <div className="LeftColumn-WelcomePanel-Text">
                            <h1>Welcome Doctor</h1>
                            <p>Here is your DoChain interface</p>
                        </div>
                    </div>
                </div>
                <div className="RightColumn">
                    <div>
                        <div className="RightColumn-Tabs">
                            <DoctorTabs/>
                        </div>
                    </div>
                </div>
            </div>
      )
  }
  _renderPatientPage(){
      return(
          <div className="PatientContainer">
              <div className="PatientLeftColumn">
                  <div className="PatientLeftColumn-WelcomePanel">
                      <div className="PatientLeftColumn-WelcomePanel-Text">
                          <h1>Welcome Andrew</h1>
                          <p>Here is your DoChain interface</p>
                          <br/>
                          <p>View your vaccine history and allow doctors to see your past treatments</p>
                      </div>
                  </div>
              </div>
              <div className="PatientRightColumn">
                  <div>
                      <div className="PatientRightColumn-Tabs">
                          <PatientTabs/>
                      </div>
                  </div>
              </div>
          </div>
      )

  }

render() {

    return (
        <div>
            {this.state.isDoctor ? this._renderDoctorPage() : this._renderPatientPage()}
        </div>
    );
}

}

export default App
