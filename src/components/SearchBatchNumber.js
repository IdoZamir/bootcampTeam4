import React, {Component} from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import MedContract from '../../build/contracts/Med.json';
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
          patientAllTreatments:[],
            details:[{vaccineType:"HIV", dateAdministered:"12/03/18", symptoms: 'N/A', expiry: "12/03/19"},
                {vaccineType:"Tetanus", dateAdministered:"14/04/18", symptoms: 'N/A', expiry: "12/03/19"},]
        }
    }

    generateRows() {
        return this.state.patientAllTreatments.map(details => {
            return <TableRow>
                <TableRowColumn>{details.vaccineType}</TableRowColumn>
                <TableRowColumn>{details.dateAdministered}</TableRowColumn>
                <TableRowColumn>{details.symptoms}</TableRowColumn>
                {/*<TableRowColumn>{details.expiry}</TableRowColumn>*/}
            </TableRow>
        })
    }

    handleOpen = () => {
        this.setState({open: true});
        this.getAll(this.state.batchNumber)
    };

    handleClose = () => {
        this.setState({open: false});
    };

  getAll(batchNum) {
    console.log("hhhhhmmmm", MedContract, this.props.web3.currentProvider);
    const contract = require('truffle-contract');
    const med = contract(MedContract);
    med.setProvider(this.props.web3.currentProvider);

    // Declaring this for later so we can chain functions on SimpleStorage.
    var medInstance;

    // Get accounts.
    med.deployed().then((instance) => {
      medInstance = instance;
      return medInstance.getPatientTreatbyBatch.call(batchNum, 0)
    }).then((result) => {
      let length = result[5].c[0]; // The array length
      let patientHistory = [];

      for (let i = 0; i < length; i++) {
        med.deployed().then((instance) => {
          medInstance = instance;
          return medInstance.getPatientTreatbyBatch.call(batchNum, i)
        }).then((result) => {
          patientHistory.push(result);
          console.log('new item pushed new array: ', patientHistory, i)
        }).then(() => {
          console.log('trying to set state');
          this.setState({
            patientAllTreatments: patientHistory.map((treat)=>{
              console.log("hhh ,",treat[0].c[0])
              //treatment.date,treatment.virus,treatment.batch,treatment.expiry,treatment.symptoms,tmpPatient.length
              return {
                vaccineType:treat[1],
                batchNumber:treat[2],
                dateAdministered:new Date(treat[0].c[0]).toString(),
                symptoms:treat[4]
              }
            })
          });
          console.log('state set',this.state.patientAllTreatments);
        })
      }
    })
  }

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
                                        {/*<TableHeaderColumn>Date Expiry</TableHeaderColumn>*/}
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