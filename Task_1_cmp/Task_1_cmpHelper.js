({
	   getContactList: function(component, pageNumber, pageSize) {
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
})