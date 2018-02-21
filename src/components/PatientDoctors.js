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

class PatientDoctors extends Component {
  constructor(props) {
    super(props);
    this.state={
      // treatments:[{vaccineType:"HIV", batchNumber:"1234", dateAdministered:"12/03/18"},
      //   {vaccineType:"Tetanus", batchNumber:"4321", dateAdministered:"14/04/18"},
      // ]
      doctorList: []
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
      console.log("am I a doctor???...")
      return medInstance.myDocs.call({from:this.props.accounts[0]})
        .then((doctorList) => {
          this.setState({
            doctorList
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

  render() {
    return (
      <div>
        {this.state.doctorList.length>0 ?
          <div>

              <h3>My Doctors</h3>

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
              : <div>You have no doctors yet </div>}

      </div>
    );
  }
}

export default PatientDoctors