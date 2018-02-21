import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import PatientPendingDoctors from "./PatientPendingDoctors";

import PatientDoctors from "./PatientDoctors"
import PatientMedicalRecord from "./PatientMedicalRecord"


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
                        {console.log(this.props.web3)}
                        {this.props.web3 && <PatientMedicalRecord accounts={this.props.accounts}
                                                                  web3={this.props.web3}

                        />}
                        {this.props.web3 && <PatientDoctors accounts={this.props.accounts}
                                                                  web3={this.props.web3}

                        />}

                    </div>
                    <div>
                        <PatientPendingDoctors accounts={this.props.accounts}
                                               web3={this.props.web3}/>
                    </div>

                </SwipeableViews>
            </div>
        );
    }
}