import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import SendRequestForm from "./SendRequestForm";
import RequestRecord from "./RequestRecord";
import AddToRecordForm from "./AddToRecordForm";
import SearchBatchNumber from "./SearchBatchNumber";

import PatientMedicalRecord from "./PatientMedicalRecord"

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    slide: {
        padding: 10,
    },
};

export default class PatientTabsExampleSwipeable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        };
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };

    render() {
        return (
            <div>
                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                    inkBarStyle={{background: 'linear-gradient(to right, #42d66f , #6372b8, #42d66f)'}}
                >
                    <Tab label="View Medical Records" value={0} style={{backgroundColor: '#f1f1f1', color: 'darkGray', height:'10vh'}}/>
                    <Tab label="Accept Permission Requests" value={1} style={{backgroundColor: '#f1f1f1', color: 'darkGray'}}/>

                </Tabs>
                <div style={{height: '100px'}}></div>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                    style={{textAlign: "center"}}
                >
                    <div>
                        <PatientMedicalRecord/>
                    </div>
                    <div>
                        <RequestRecord/>
                    </div>

                </SwipeableViews>
            </div>
        );
    }
}