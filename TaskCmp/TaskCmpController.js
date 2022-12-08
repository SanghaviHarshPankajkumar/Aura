({
	  doInit : function(component, event, helper) {
        helper.toggleTwoAndThreeSteps(component);
        component.set("v.progressIndicatorFlag", "step1");
    },

    submitEvent: function(component, event) {
        var saveContactAction = component.get("c.createAccount");
        component.set('v.EventRecord.AccountId',component.get('v.Accountname'));
        console.log(component.get("v.Accountname"));
        console.log("idtfhfh");
            saveContactAction.setParams({
                "event":component.get('v.EventRecord'),
            });
        
        // Configure the response handler for the action
        saveContactAction.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.message", "Event created successfully");
            }
            else if (state === "ERROR") {
                console.log('Problem saving event, response state: ' + state);
            }
            else {
                console.log('Unknown problem, response state: ' + state);
            }
        });

        // Send the request to create the new contact
        $A.enqueueAction(saveContactAction);
    },

    goToStepTwo : function(component, event, helper) {
        helper.toggleOneAndTwoSteps(component);
        
        component.set("v.progressIndicatorFlag", "step2");
    },
    goToStepThree : function(component, event, helper) {
       
        helper.toggleTwoAndThreeSteps(component);
        component.set("v.progressIndicatorFlag", "step3");
        console.log("whyyyy");
    //     var payload = event.getParams().response;
    //     var action = component.get('c.releteContactToAccount');
    //     console.log(payload.id);
    //     console.log("wyyyyyy");
    //     console.log(component.get("v.AccountId1"));
    //     action.setParams({
    //         "id":payload.id ,
    //         "AccountId":component.get("v.AccountId1")
    //     });
        
    // // Configure the response handler for the action
    // action.setCallback(this, function(response) {
    //     var state = response.getState();
    //     if(state === "SUCCESS") {
    //         component.set("v.message", "Event created successfully");
    //     }
    //     else if (state === "ERROR") {
    //         console.log('Problem saving event, response state: ' + state);
    //     }
    //     else {
    //         console.log('Unknown problem, response state: ' + state);
    //     }
    // });

    // Send the request to create the new contact
    $A.enqueueAction(action);
        
    },
    goBackToStepOne : function(component, event, helper) {
        helper.toggleOneAndTwoSteps(component);
        component.set("v.progressIndicatorFlag", "step1");
    },
    goBackToStepTwo : function(component, event, helper) {
        helper.toggleTwoAndThreeSteps(component);
        component.set("v.progressIndicatorFlag", "step2");
    },
    handleSuccess : function(component, event, helper) {
      
        console.log('11');
            var payload = event.getParams().response;
            console.log(JSON.stringify(payload));   
            console.log(payload.recordTypeId);  
            var name = payload.id;
            console.log('name');
            console.log(name);
            component.set('v.Accountname',name);
        //component.set("v.AccountId1",payload.id);
    },
    handleSuccess2 : function(component, event, helper) {
        console.log('22');
        var payload = event.getParams().response;
            console.log(JSON.stringify(payload));   
            console.log(payload.recordTypeId);  
            var name = payload.id;
            console.log('name');
            console.log(name);
        var action = component.get('c.releteContactToAccount');

        action.setParams({
            "id":payload.id ,
            "AccountId":component.get("v.Accountname")
        });
        console.log(payload.id);
        console.log("wyyyyyy");
      
   
    action.setCallback(this, function(response) {
        var state = response.getState();
        if(state === "SUCCESS") {
            component.set("v.message", "Event created successfully");
        }
        else if (state === "ERROR") {
            console.log('Problem saving event, response state: ' + state);
        }
        else {
            console.log('Unknown problem, response state: ' + state);
        }
    });

   
    $A.enqueueAction(action);
        toastEvent.fire();
    },
    handleSuccess3 : function(component, event, helper) {
        console.log('33');
    },
    

})