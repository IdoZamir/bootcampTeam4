import React, {Component} from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import {Dialog, FlatButton} from "material-ui";
import MedContract from '../../build/contracts/Med.json';




class SendRequestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patientID: '',
            vaccineType : '',
            batchNumber: '',
            dateAdministered: null,
            open: false
        }
    }
    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
        this.sendRequest(this.state.patientID);
    };

  sendRequest(patAddress){
      const contract = require('truffle-contract');
      const med = contract(MedContract);
      med.setProvider(this.props.web3.currentProvider);

      // Declaring this for later so we can chain functions on SimpleStorage.
      var medInstance;

      // Get accounts.
      med.deployed().then((instance) => {
        medInstance = instance;
        return medInstance.requestPatientApprove(patAddress, {from: this.props.accounts[0],gas:3000000})
      }).then((result) => {
        console.log("done!")
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
                disabled={false}
                onClick={this.handleClose}
            />,
        ];
        return (
            <div>
                <div style={{width: '75%', margin: 'auto'}}>
                    <h3 style={{float:'left', fontWeight: 400}}>Request Permission to View Patient Records</h3>
                    <TextField
                        hintText="Enter the Patient ID"
                        floatingLabelText="Patient ID"
                        onChange={(event, newValue) =>
                            this.setState({patientID: newValue})}
                        fullWidth={true}

                    />
                    <br/>

                    <RaisedButton label="Submit" onClick={this.handleOpen} />
                    <Dialog
                        title="Confirm Details"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                    >
                        You are requesting the medical history of patient: {this.state.patientID}
                    </Dialog>
                </div>
            </div>
        );
    }

}

export default SendRequestForm