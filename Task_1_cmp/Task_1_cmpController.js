({
	  doinit : function(component, event, helper) {
        var pageNumber = component.get("v.PageNumber");  
         var action = component.get("c.fetchAcc");
        action.setParams({
            "pageNumber": pageNumber
        });
        action.setCallback(this, function(result) {
            var state = result.getState();
            if (component.isValid() && state === "SUCCESS"){
                var resultData = result.getReturnValue();
                component.set("v.accData", resultData.accountList);
                component.set("v.PageNumber", resultData.pageNumber);
                component.set("v.TotalRecords", resultData.totalRecords);
                component.set("v.RecordStart", resultData.recordStart);
                component.set("v.RecordEnd", resultData.recordEnd);
                component.set("v.TotalPages", Math.ceil(resultData.totalRecords /10));
            }
        });
        $A.enqueueAction(action);
      
    },
    
    showCon : function(component, event, helper){
        component.set("v.show",true);
        var idx = event.target.getAttribute('data-index');
        var rowRecord = component.get("v.accData")[idx];
        var action = component.get('c.fetchCon');
        action.setParams({recordId : rowRecord.Id});
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var allValues = response.getReturnValue();
                console.log("allValues--->>> " + JSON.stringify(allValues));
                component.set('v.conData', allValues);
            }
            else if(state === "ERROR") {
                var errors = response.getError();
                if(errors){
                    if(errors[0] && errors[0].message){
                        console.log("Error Message: " + errors[0].message);
                    }
                }
                else{
                    console.log("Unknown Error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    
     searchKeyChange: function(component, event) {
        var searchKey = component.find("searchKey").get("v.value");
        if( searchKey.trim().length === 0){
            console.log('it is working');
             var pageNumber = component.get("v.PageNumber");  
         var action = component.get("c.fetchAcc");
        action.setParams({
            "pageNumber": pageNumber
        });
        action.setCallback(this, function(result) {
            var state = result.getState();
            if (component.isValid() && state === "SUCCESS"){
                var resultData = result.getReturnValue();
                component.set("v.accData", resultData.accountList);
                component.set("v.PageNumber", resultData.pageNumber);
                component.set("v.TotalRecords", resultData.totalRecords);
                component.set("v.RecordStart", resultData.recordStart);
                component.set("v.RecordEnd", resultData.recordEnd);
                component.set("v.TotalPages", Math.ceil(resultData.totalRecords /10));
            }
        });
        $A.enqueueAction(action);
        }
        else{
        var pageNumber = component.get("v.PageNumber");  
        var action = component.get("c.findByName");
        console.log("hkhkjhk");
        action.setParams({
            "searchKey": searchKey,
            "PageNumber":pageNumber
        });
      action.setCallback(this, function(result) {
            var state = result.getState();
            console.log(state);
           
                var resultData = result.getReturnValue();
                 console.log(resultData);
                component.set("v.accData", resultData.accountList);
                component.set("v.PageNumber", resultData.pageNumber);
                component.set("v.TotalRecords", resultData.totalRecords);
                component.set("v.RecordStart", resultData.recordStart);
                component.set("v.RecordEnd", resultData.recordEnd);
                component.set("v.TotalPages", Math.ceil(resultData.totalRecords /10));
            
        });
        $A.enqueueAction(action);
    }},   
    
     handleNext: function(component, event, helper) {
        var pageNumber = component.get("v.PageNumber");  
       
        pageNumber++;
        helper.getContactList(component, pageNumber);
    },
     
    handlePrev: function(component, event, helper) {
        var pageNumber = component.get("v.PageNumber");  
        
        pageNumber--;
        helper.getContactList(component, pageNumber);
    },
     
    onSelectChange: function(component, event, helper) {
        var page = 1
      
        helper.getContactList(component, page);
    },
})