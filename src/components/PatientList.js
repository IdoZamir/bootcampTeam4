import React, { Component } from 'react';
import '../../NewFrontEnd/src/App.css';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';


class PatientList extends Component {
    constructor(props){
        super(props);
    }
    _converToCard (inputArr){
        return inputArr.map((treat,index)=>{
            return(
                <Card key={index}>
                    <CardHeader
                        title= {treat.title}
                        subtitle= {treat.status}
                        // actAsExpander={true}
                        // showExpandableButton={true}
                    />
                </Card>

            )
        })
    }


    render() {
        return (
            <div className="PatientList">
                {this._converToCard(this.props.treatments)}
            </div>
        );
    }
}

export default PatientList;
