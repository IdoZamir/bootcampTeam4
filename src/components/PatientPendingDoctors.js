import React, { Component} from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import MedContract from '../../build/contracts/Med.json';
import {RaisedButton} from "material-ui";

class PatientPendingDoctors extends Component {
  constructor(props) {
    super(props);
    this.state={
      // treatments:[{vaccineType:"HIV", batchNumber:"1234", dateAdministered:"12/03/18"},
      //   {vaccineType:"Tetanus", batchNumber:"4321", dateAdministered:"14/04/18"},
      // ]
      doctorList: [],
      docAddress:""
    }
  }

  componentWillMount(){
    const contract = require('truffle-contract')
    const med = contract(MedContract)
    med.setProvider(this.props.web3.currentProvider)
    // Declaring this for later so we can chain functions on SimpleStorage.
    let medInstance

    // Get accounts.
    med.deployed().then((instance) => {
      medInstance = instance
      return medInstance.myDocRequests.call({from:this.props.accounts[0]})
        .then((doctorList) => {
          this.setState({
            doctorList,
            docAddress:doctorList[0]
          })
        })
    })
  }

  generateRows() {
    return this.state.doctorList.map(doc => {
      return <TableRow>
        <TableRowColumn>{doc}</TableRowColumn>
      </TableRow>
    })
  }

  handleSubmitDetails() {
    const contract = require('truffle-contract')
    const med = contract(MedContract)
    med.setProvider(this.props.web3.currentProvider)
    // Declaring this for later so we can chain functions on SimpleStorage.
    let medInstance

    // Get accounts.
    med.deployed().then((instance) => {
      medInstance = instance
      console.log("am I a doctor???...")
      return medInstance.giveDocPermission(this.state.docAddress, {from: this.props.accounts[0],gas:3000000})
        .then((result)=>{
          console.log("approved!",result)
        })
    })
  }

  render() {
    return (
      <div>
        {this.state.doctorList.length>0 ?
        <div>

        <div>
          <h3>My Pending Doctor Requests</h3>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Doctor ID</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.generateRows()}
            </TableBody>
          </Table>

        </div>
        <div>
          <RaisedButton label="Approve" onClick={this.handleSubmitDetails.bind(this)} />
        </div>

      </div>
          :
          <div></div>}
      </div>
    );
  }
}

export default PatientPendingDoctors