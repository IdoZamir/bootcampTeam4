import React, {Component} from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';


class SearchBatchNumber extends Component {
    constructor(props) {
        super(props);
        this.state ={
            batchNumber: '',
            details:[{vaccineType:"HIV", dateAdministered:"12/03/18", symptoms: 'N/A', expiry: "12/03/19"},
                {vaccineType:"Tetanus", dateAdministered:"14/04/18", symptoms: 'N/A', expiry: "12/03/19"},]
        }
    }

    generateRows() {
        return this.state.details.map(details => {
            return <TableRow>
                <TableRowColumn>{details.vaccineType}</TableRowColumn>
                <TableRowColumn>{details.dateAdministered}</TableRowColumn>
                <TableRowColumn>{details.symptoms}</TableRowColumn>
                <TableRowColumn>{details.expiry}</TableRowColumn>
            </TableRow>
        })
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
                label="OK"
                primary={true}
                onClick={this.handleClose}
            />,
        ];

        return (
            <div>
                <h3>Search by Batch Number</h3>
                <MuiThemeProvider>
                    <div>
                        <TextField
                            hintText="Enter the Batch Number"
                            floatingLabelText="Batch Number"
                            onChange={(event, newValue) =>
                                this.setState({batchNumber: newValue})}
                        />
                        <br />
                        <RaisedButton label="Submit" onClick={this.handleOpen}/>

                        <Dialog
                            title="Details for This Batch Number: "
                            actions={actions}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleClose}
                        >
                            <Table>
                                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                    <TableRow>
                                        <TableHeaderColumn>Vaccine</TableHeaderColumn>
                                        <TableHeaderColumn>Date Administered</TableHeaderColumn>
                                        <TableHeaderColumn>Symptoms</TableHeaderColumn>
                                        <TableHeaderColumn>Date Expiry</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                    {this.generateRows()}
                                </TableBody>
                            </Table>
                        </Dialog>

                    </div>

                </MuiThemeProvider>
            </div>
        );
    }
}

export default SearchBatchNumber