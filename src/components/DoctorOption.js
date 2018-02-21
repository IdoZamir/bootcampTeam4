import React, { Component } from 'react';
import MobileTearSheet from './MobileTearSheet';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import SendRequestForm from "./SendRequestForm";
import AddToRecordForm from "./AddToRecordForm";
import PatientMedicalRecord from "./PatientMedicalRecord";
import RequestRecord from "./RequestRecord";
import SearchBatchNumber from "./SearchBatchNumber";

class DoctorOption extends Component {
    constructor(props){
        super(props);
        this.handleRequestedMedicalRecord = this.handleRequestedMedicalRecord.bind(this)
        this.state={
            stateID: ''
        }
    }
    handleSendRequest(){
        this.setState({stateID:'sendReq'})
    }

    handleViewPatientDetails(){
        this.setState({stateID:'ViewPatientDetails'})
    }

    handleAddToRecord(){
        this.setState({stateID:'AddToRecord'})
    }

    handleViewByBatchNo(){
        this.setState({stateID:'ViewByBatchNo'})
    }

    handleRequestedMedicalRecord () {

    }

    _renderForm(){
        if(this.state.stateID === 'sendReq') {
            return (<SendRequestForm/>)
        }
        else if (this.state.stateID === 'ViewPatientDetails'){
            return (<RequestRecord/>)
        }
        else if (this.state.stateID === 'AddToRecord'){
            return (<AddToRecordForm/>)
        }
        else if (this.state.stateID === 'ViewByBatchNo'){
            return (<SearchBatchNumber/>)
        }

    }

    render() {
        return (
            <div className="DoctorOption">
                <MobileTearSheet>
                    <List>
                        <ListItem primaryText="Send Request" leftIcon={<ContentSend />} onClick={this.handleSendRequest.bind(this)} />
                        <ListItem primaryText="View patient Details" leftIcon={<ActionInfo />}onClick={this.handleViewPatientDetails.bind(this)} />
                        <ListItem primaryText="Add to record" leftIcon={<ContentSend />} onClick={this.handleAddToRecord.bind(this)}/>
                        <ListItem primaryText="View by Batch no." leftIcon={<ContentSend />} onClick={this.handleViewByBatchNo.bind(this) }/>
                    </List>
                    <Divider />
                </MobileTearSheet>
                {this._renderForm()}

            </div>
        );
    }
}

export default DoctorOption;