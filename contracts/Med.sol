pragma solidity ^0.4.18;
pragma experimental ABIEncoderV2;
contract Med{
    //owner of the contract
    address creator;
    //structure representing a treatment
    struct Treatment{
        int16 date;
        string virus;
        string batch;
        int16 expiry;
        string symptoms;
    }
    
    // keep track of all treatments a specific patient has had;
    mapping(address => Treatment[]) patientHistory;
    // keep a list of real docs;
    address[] docs;
    // map of treatments by their batch number;
    mapping(string => Treatment[]) batchTreatments;
    // map of docs allowed to view records by PATIENT
    mapping(address => address[]) permissionPatToDoc;
     // map of docs allowed to view records by DOCTOR
    mapping(address => address[]) permissionDocToPat;
    
    function Med(address[] inputDocs) public{
        creator=msg.sender;
        docs=inputDocs;
    }

    function isDoc(address potentialDoc) private returns(bool){
        bool isDoc=false;
        //check that msg.sender is a doc address
        for (uint16 prop = 0; prop < docs.length; prop++)
            if (docs[prop] == potentialDoc) {
                isDoc=true;
            }
        return isDoc;
    }
    
    function isMyPatient(address doc, address patient) private returns(bool){
        bool isYourPatient=false;
        address[] memory docsPatients = permissionDocToPat[doc];
        //check that msg.sender is a doc address;
        for (uint16 prop = 0; prop < docsPatients.length; prop++)
            if (docsPatients[prop] == patient) {
                isYourPatient=true;
            }
        return isYourPatient;
    }
    
    function giveDocPermission(address docAddress){
        //Add to all relevant treatment vars
        permissionPatToDoc[msg.sender].push(docAddress);
        permissionDocToPat[docAddress].push(msg.sender);
    }
    

    function treat(address patient, int16 date,string virus,string batch,int16 expiry,string symptoms) public{
        bool docCheck = isDoc(msg.sender);
        assert(docCheck);
        bool isYourPatient = isMyPatient(msg.sender, patient);
        assert(isYourPatient);
        Treatment memory treatment;
        treatment.date=date;
        treatment.virus=virus;
        treatment.batch=batch;
        treatment.expiry=expiry;
        treatment.symptoms=symptoms;
        //Add to all relevant treatment vars
        patientHistory[patient].push(treatment);
        batchTreatments[batch].push(treatment);
    }

    function getPatientTreatbyAddress(address patAddress, uint256 treatNum) constant public returns(int16, string, string, int16, string, uint256){
        Treatment[] memory tmpPatient=patientHistory[patAddress];
        Treatment memory treatment = tmpPatient[treatNum];
        return (treatment.date,treatment.virus,treatment.batch,treatment.expiry,treatment.symptoms,tmpPatient.length-1);
    }
    
    function getPatientTreatbyBatch(string batchNum, uint256 treatNum) constant public returns(int16, string, string, int16, string, uint256){
        Treatment[] memory tmpBatchList=batchTreatments[batchNum];
        Treatment memory treatment = tmpBatchList[treatNum];
        return (treatment.date,treatment.virus,treatment.batch,treatment.expiry,treatment.symptoms,tmpBatchList.length-1);
    }

}