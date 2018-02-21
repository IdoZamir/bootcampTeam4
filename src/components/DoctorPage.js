import React, { Component } from 'react';
import '../../NewFrontEnd/src/App.css';
import RaisedButton from 'material-ui/RaisedButton';
import PatientList from "./PatientList";
import DoctorOption from "./DoctorOption";
import DoctorTabs from "./DoctorTabs";

class DoctorPage extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }

    render() {
        return (
            <div className="DoctorPage">
                <DoctorTabs/>
            </div>
        );
    }
}

export default DoctorPage;
