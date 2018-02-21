import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import SendRequestForm from "./SendRequestForm";
import RequestRecord from "./RequestRecord";
import AddToRecordForm from "./AddToRecordForm";
import SearchBatchNumber from "./SearchBatchNumber";

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

export default class TabsExampleSwipeable extends React.Component {

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
                    inkBarStyle={{background: 'linear-gradient(to right, #8B38DF , #6372b8, #8B38DF)'}}
                >
                    <Tab label="Request Form" value={0} style={{backgroundColor: '#f1f1f1', color: 'darkGray', height:'10vh'}}/>
                    <Tab label="View Patient Details" value={1} style={{backgroundColor: '#f1f1f1', color: 'darkGray'}}/>
                    <Tab label="Add to record" value={2} style={{backgroundColor: '#f1f1f1', color: 'darkGray'}}/>
                    <Tab label="Search by Batch Number" value={3} style={{backgroundColor: '#f1f1f1', color: 'darkGray'}}/>
                </Tabs>
                <div style={{height: '100px'}}></div>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                    style={{textAlign: "center"}}
                >
                    <div>
                        <SendRequestForm
                          accounts={this.props.accounts}
                          web3={this.props.web3}
                        />
                    </div>
                    <div>
                        <RequestRecord
                          accounts={this.props.accounts}
                          web3={this.props.web3}
                        />
                    </div>
                    <div>
                        <AddToRecordForm
                          accounts={this.props.accounts}
                          web3={this.props.web3}
                        />
                    </div>
                    <div>
                        <SearchBatchNumber
                          accounts={this.props.accounts}
                          web3={this.props.web3}
                        />
                    </div>
                </SwipeableViews>
            </div>
        );
    }
}