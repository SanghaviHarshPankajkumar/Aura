({
	doinit : function(component, event, helper) {
		
	},
   searchKeyChange: function(component, event) {
        var searchKey = component.find("searchKey").get("v.value");
        var action = component.get("c.fetchCon");
        action.setParams({
            "searchKey": searchKey
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var allValues = response.getReturnValue();
                component.set('v.conData', allValues);
                // component.set('v.AccIdforCon',component.get('v.conData[0].AccountId'));
                
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

        var action2 = component.get("c.AccId");
        console.log("method call-->>>");
        action2.setParams({
            "searchKey": searchKey
        });
        action2.setCallback(this, function(response){
            var state = response.getState();
            console.log("method state");
            console.log(state);
            if(state === "SUCCESS"){
                var allValue = response.getReturnValue();
                 console.log("method success");
                 component.set('v.AccIdforCon',allValue);
                console.log(component.get('v.AccIdforCon'));
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
        $A.enqueueAction(action2);
    },
    dragstart : function(component, event, helper) {
      
        event.dataTransfer.setData("Text",event.target.id);
        console.log( event.dataTransfer.getData("Text",event.target.id));
    },
    allowDrop : function(component, event, helper) {
        console.log("allow is")
       event.preventDefault();
    },
    changeAccount : function(component, event, helper) {
       var id =  event.dataTransfer.getData("Text",event.target.id);
        var accountId = component.get('v.AccIdforCon');
        var action = component.get("c.updateAccount");
        action.setParams({
            "id":id,
            "accId":accountId
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var allValues = response.getReturnValue();
                component.set('v.conData', allValues);
                //component.set('v.AccIdforCon',component.get('v.conData[0].AccountId'));
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
})