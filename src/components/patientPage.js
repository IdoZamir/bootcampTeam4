import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import PatientList from "./PatientList";
import PatientMedicalRecord from "./PatientMedicalRecord";
import PatientDoctors from "./PatientDoctors";
import PatientPendingDoctors from "./PatientPendingDoctors";

class PatientPage extends Component {
    constructor(props){
        super(props);
        this.state={
            treatments:[{title:"HIV",status:"went well"},{title:"Tetanus",status:"went OK"}]
        }
    }


    render() {
        return (
            <div className="PatientPage">
                <PatientMedicalRecord
                  accounts={this.props.accounts}
                  web3={this.props.web3}
                />
                <PatientDoctors
                  accounts={this.props.accounts}
                  web3={this.props.web3}
                />
              <PatientPendingDoctors
                accounts={this.props.accounts}
                web3={this.props.web3}
              />
            </div>
        );
    }
}

export default PatientPage;
