import React, {Component} from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


class SendRequestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            patientID: '',
            vaccineType : '',
            batchNumber: '',
            dateAdministered: null
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
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];
        return (
            <div>
                <h3>Form</h3>
                <MuiThemeProvider>
                    <div>
                        <TextField
                            hintText="Enter the Patient ID"
                            floatingLabelText="Patient ID"
                            onChange={(event, newValue) =>
                                this.setState({patientID: newValue})}

                        />

                        <br />

                        <TextField
                            hintText="Enter the vaccine type"
                            floatingLabelText="Vaccine Type"
                            onChange={(event, newValue) =>
                                this.setState({vaccineType: newValue})} />

                        <br />

                        <TextField
                            hintText="Enter the vaccine batch number"
                            floatingLabelText="Batch Number"
                            onChange={(event, newValue) =>
                                this.setState({batchNumber: newValue})} />

                        <br />

                        <DatePicker
                            hintText="Date Administered"
                            value={this.state.dateAdministered}
                            onChange={this.handleChange}
                        />

                        <br />

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

                        </Dialog>

                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default SendRequestForm