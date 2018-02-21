import React, {Component} from "react";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ViewMedicalRecord from './ViewMedicalRecord.js';
import MedContract from '../../build/contracts/Med.json';

class RequestRecord extends Component {
    constructor(props) {
        super(props);
        this.state ={
            patientID: '',
            doctorID: '',
            requestedRecord: false,
          patientAllTreatments:[]
        }
    }

    handleSubmitDetails(){
        console.log('handle submit details');
        this.setState({requestedRecord: true});
        console.log(this.state.requestedRecord);
        this.getAll(this.state.patientID)
    };

  getAll(patAddress) {
      console.log("hhhhhmmmm", MedContract, this.props.web3.currentProvider);
    const contract = require('truffle-contract');
    const med = contract(MedContract);
    med.setProvider(this.props.web3.currentProvider);

    // Declaring this for later so we can chain functions on SimpleStorage.
    var medInstance;

    // Get accounts.
      med.deployed().then((instance) => {
        medInstance = instance;
        return medInstance.getPatientTreatbyAddress.call(patAddress, 0)
      }).then((result) => {
        let length = result[5].c[0]; // The array length
        let patientHistory = [];

        for (let i = 0; i < length; i++) {
          med.deployed().then((instance) => {
            medInstance = instance;
            return medInstance.getPatientTreatbyAddress.call(patAddress, i)
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
                    {this.state.requestedRecord ? <ViewMedicalRecord patientID={this.state.patientID} treatments={this.state.patientAllTreatments} /> : ''}
                </div>
            </div>

        )
    }
}

export default RequestRecord