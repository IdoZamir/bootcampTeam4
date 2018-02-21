import React, {Component} from "react";
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import ViewMedicalRecord from './ViewMedicalRecord.js';

class RequestRecord extends Component {
    constructor(props) {
        super(props);
        this.state ={
            patientID: '',
            doctorID: '',
            requestedRecord: false
        }
    }

    handleSubmitDetails(){
        console.log('handle submit details');
        this.setState({requestedRecord: true});
        console.log(this.state.requestedRecord);
    };

    render() {

        return (
            <div>
                    <div>
                        <h3>Find Patient record</h3>

                        <div>
                            <TextField
                                hintText="Enter the Patient ID"
                                floatingLabelText="Patient ID"
                                onChange={(event, newValue) =>
                                    this.setState({patientID: newValue})}
                            />
                            <br />

                            <RaisedButton label="Submit" onClick={this.handleSubmitDetails.bind(this)} />

                        </div>
                        {this.state.requestedRecord ? <ViewMedicalRecord patientID={this.state.patientID}/> : ''}
                    </div>
            </div>
        );
    }
}

export default RequestRecord