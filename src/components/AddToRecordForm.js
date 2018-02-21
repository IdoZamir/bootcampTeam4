import React, {Component} from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MedContract from '../../build/contracts/Med.json';


class SendRequestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            patientID: '',
            vaccineType : '',
            batchNumber: '',
            dateAdministered: null,
            symptoms:null
        }
    }

    handleChange = (event, date) => {
        this.setState({
            dateAdministered: date,
        });
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
        this.triggerTreatment();
    };

    triggerTreatment=() => {
      const contract = require('truffle-contract')
      const med = contract(MedContract)
      med.setProvider(this.props.web3.currentProvider)
      // Declaring this for later so we can chain functions on SimpleStorage.
      let medInstance

      console.log("date in epoch", this.state.dateAdministered.getTime())
      // Get accounts.
      med.deployed().then((instance) => {
        medInstance = instance
        console.log("am I a doctor???...",this.state.patientID,this.state.dateAdministered.getTime(),this.state.vaccineType,this.state.batchNumber,100,this.state.symptoms)
        return medInstance.treat(this.state.patientID,this.state.dateAdministered.getTime(),this.state.vaccineType,this.state.batchNumber,100,this.state.symptoms, {from: this.props.accounts[0],gas:300000})
        }).then((result) => {
            console.log("approved!",result)
          })
      }


    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];
        return (
            <div>
                <h3>Form</h3>
                    <div>
                    <div style={{
                        display : "flex",
                      justifyContent: "center",
                      flexDirection: "column"}}>
                        <TextField
                            hintText="Enter the Patient ID"
                            floatingLabelText="Patient ID"
                            onChange={(event, newValue) =>
                                this.setState({patientID: newValue})}

                        />


                        <TextField
                            hintText="Enter the vaccine type"
                            floatingLabelText="Vaccine Type"
                            onChange={(event, newValue) =>
                                this.setState({vaccineType: newValue})} />


                        <TextField
                            hintText="Enter the vaccine batch number"
                            floatingLabelText="Batch Number"
                            onChange={(event, newValue) =>
                                this.setState({batchNumber: newValue})} />


                        <DatePicker
                            hintText="Date Administered"
                            value={this.state.dateAdministered}
                            onChange={this.handleChange}
                        />


                        <TextField
                          hintText="Symptoms"
                          value={this.state.symptoms}
                          onChange={(event, newValue) =>
                            this.setState({symptoms: newValue})}
                        />

                    </div>
                        <RaisedButton label="Submit" onClick={this.handleOpen} />
                        <Dialog
                            title="Confirm Details"
                            actions={actions}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleClose}
                        >
                            Please confirm the following details before submitting: <br/>
                            Patient ID: {this.state.patientID} <br />
                            Vaccine Type: {this.state.vaccineType} <br />
                            Batch Number: {this.state.batchNumber} <br/>
                            Date Administered: {String(this.state.dateAdministered)} <br/>
                            Symptoms: {this.state.symptoms} <br/>

                        </Dialog>

                    </div>
            </div>
        );
    }
}

export default SendRequestForm