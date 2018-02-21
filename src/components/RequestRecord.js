import React, {Component} from "react";
import TextField from 'material-ui/TextField';
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

                <div style={{width: '75%', margin: 'auto'}}>
                    <h3 style={{float:'left', fontWeight: 400}}>Find Patient Records</h3>
                    <TextField
                        hintText="Enter the Patient ID"
                        floatingLabelText="Patient ID"
                        onChange={(event, newValue) =>
                            this.setState({patientID: newValue})}
                        fullWidth={true}

                    />
                    <br/>

                    <RaisedButton label="Submit" onClick={this.handleSubmitDetails.bind(this)} />
                    {this.state.requestedRecord ? <ViewMedicalRecord patientID={this.state.patientID}/> : ''}

                </div>
            </div>

        )
    }
}

export default RequestRecord