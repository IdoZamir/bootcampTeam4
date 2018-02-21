import React, { Component } from 'react'
import './App.css';
import getWeb3 from './utils/getWeb3'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import PatientPage from "./components/patientPage";
import DoctorPage from "./components/DoctorPage";
import WebsiteTitle from "./components/WebsiteTitle";
import MedContract from '../build/contracts/Med.json'


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

    componentWillMount() {
        // Get network provider and web3 instance.
        // See utils/getWeb3 for more info.

        getWeb3
            .then(results => {
                this.setState({
                    web3: results.web3
                })
                this.state.web3.eth.getAccounts((error, accounts) => {
                    console.log("starting app with the following accouts: ",accounts);
                    this.setState({
                        accounts
                    })
                    this.firstContact();
                })
            })
            .catch(() => {
                console.log('Error finding web3.')
            })


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
                            <DoctorTabs accounts={this.state.accounts}
                                        web3={this.state.web3}
                            />
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
                            <PatientTabs accounts={this.state.accounts}
                                         web3={this.state.web3}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )

    }



  firstContact(){
      const contract = require('truffle-contract')
      const med = contract(MedContract)
      med.setProvider(this.state.web3.currentProvider)
      // Declaring this for later so we can chain functions on SimpleStorage.
      let medInstance

      // Get accounts.
        med.deployed().then((instance) => {
          medInstance = instance
          console.log("am I a doctor???...")
          return medInstance.amIDoc.call({from:this.state.accounts[0]})
            .then((isDoctor) => {
              console.log("report says...", isDoctor)
              this.setState({
                isDoctor
              })
            })
        })
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
