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
                >
                    <Tab label="Request Form" value={0} />
                    <Tab label="View Patient Details" value={1} />
                    <Tab label="Add to record" value={2} />
                    <Tab label="Search by Batch Number" value={3} />
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                >
                    <div>
                        <SendRequestForm
                          accounts={this.props.accounts}
                          web3={this.props.web3}
                        />
                    </div>
                    <div style={styles.slide}>
                        <RequestRecord
                          accounts={this.props.accounts}
                          web3={this.props.web3}
                        />
                    </div>
                    <div style={styles.slide}>
                        <AddToRecordForm
                          accounts={this.props.accounts}
                          web3={this.props.web3}
                        />
                    </div>
                    <div style={styles.slide}>
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