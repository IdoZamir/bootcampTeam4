pragma solidity ^0.4.0;
contract Network {
        
		// Declares a new complex type 
		struct record {
			uint patientID; //Primary key to identify patient
			uint batch; //Numerical 
			uint date; //Current block timestamp (block.timestamp) 
			bytes virus;  
			uint expiry; //Date - but will include some form of text character ie (09/11) 
			uint[] symptoms; 
		}
		
		//
        mapping(bytes32 => array) public records;
      
	 //Use case #1: Store immunisation record
    function record(uint patientID, uint batch, uint date, bytes virus, uint expiry, uint[] symptoms) {
        
        
    }
    
    /*Use case #2: Retrieval of medical records */
    function returnRecord(){
        for (uint i = 0; i < records.length; i++){
			if (records[i].r
    }
    
    
    
}