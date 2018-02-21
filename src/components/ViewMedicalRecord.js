import React, { Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

class ViewMedicalRecord extends Component {
    constructor(props) {
        super(props);
        this.state={
            treatments:[{vaccineType:"HIV", batchNumber:"1234", dateAdministered:"12/03/18"},
                {vaccineType:"Tetanus", batchNumber:"4321", dateAdministered:"14/04/18"},
                {vaccineType:"Tetanus", batchNumber:"4321", dateAdministered:"14/04/18"}
            ]
        }
    }

    generateRows() {
        return this.state.treatments.map(treatments => {
            return <TableRow>
                <TableRowColumn>{treatments.vaccineType}</TableRowColumn>
                <TableRowColumn>{treatments.batchNumber}</TableRowColumn>
                <TableRowColumn>{treatments.dateAdministered}</TableRowColumn>
            </TableRow>
        })
    }

    render() {
        return (
            <div>
                <div>
                    <h3>Medical Record of Patient: {this.props.patientID}</h3>
                    <Table>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>Vaccine</TableHeaderColumn>
                                <TableHeaderColumn>Batch Number</TableHeaderColumn>
                                <TableHeaderColumn>Date Administered</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {this.generateRows()}
                        </TableBody>
                    </Table>


                </div>
            </div>
        );
    }
}

export default ViewMedicalRecord