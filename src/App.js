import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import MultiThemeProvider from "material-ui/styles/MuiThemeProvider"
import PatientPage from "./components/patientPage";
import DoctorPage from "./components/DoctorPage";
import WebsiteTitle from "./components/WebsiteTitle";
import MedContract from '../build/contracts/Med.json'


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

  // firstContact() {
  //   const contract = require('truffle-contract')
  //   const med = contract(MedContract)
  //   med.setProvider(this.state.web3.currentProvider)
  //   // Declaring this for later so we can chain functions on SimpleStorage.
  //   let medInstance
  //
  //   // Get accounts.
  //     med.deployed().then((instance) => {
  //       medInstance = instance
  //       console.log("getting doctor approved...")
  //       return medInstance.giveDocPermission(this.state.accounts[0], {from: this.state.accounts[1],gas:3000000})
  //         .then((result)=>{
  //         console.log("approved!",result)
  //           console.log("adding treatment to account 1")
  //           // Stores a given value, 5 by default.
  //           return medInstance.treat(this.state.accounts[1],666,"pop","popBatch",777,"noBreathing", {from: this.state.accounts[0],gas:3000000})
  //         }).then((result) => {
  //         console.log("added treatment!",result)
  //           console.log("getting account details...")
  //           // Get the value from the contract to prove it worked.
  //           return medInstance.getPatientTreatbyAddress.call(this.state.accounts[1],0,this.state.accounts[0])
  //         }).then((result) => {
  //           // Update state with the result.
  //           console.log(result)
  //         })
  //         })
  // }

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
          {this.state.isDoctor ?
            <DoctorPage
              accounts={this.state.accounts}
              web3={this.state.web3}
            />
            :
            <PatientPage
            accounts={this.state.accounts}
            web3={this.state.web3}
            />
          }
          </div>
        </main>
      </div>
      </MuiThemeProvider>
    );
  }


}

export default App
