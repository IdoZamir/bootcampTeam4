import React, {Component} from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import {Dialog, FlatButton} from "material-ui";



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
    };

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
                onClick={this.handleOpen}
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