import React, { Component } from 'react';
import '../../NewFrontEnd/src/App.css';
import RaisedButton from 'material-ui/RaisedButton';
import PatientList from "./PatientList";
import PatientMedicalRecord from "./PatientMedicalRecord";

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

                <PatientMedicalRecord/>

            </div>
        );
    }
}

export default PatientPage;
