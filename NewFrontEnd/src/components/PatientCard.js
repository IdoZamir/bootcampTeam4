import React, { Component } from 'react'

class PatientCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            storageValue: 0,
            web3: null,
            patient: [{
                age:4,
                name:"john"
            },{
                age:14,
                name: "sam"
            },{
                age:144,
                name:"bob"
            }]

        }

        this.cardList=this.cardList.bind(this)
    }


    render() {
        return (
            <div className="PatientCard">
                Hello
            </div>
        );
    }
}

export default PatientCard
