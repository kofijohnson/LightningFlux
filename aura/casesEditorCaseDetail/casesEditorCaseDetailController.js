({
	dispatchUpdateCase : function(component, event, helper) {
    	var caseRecord = component.get("v.case");
        var dispatcher = component.getEvent('casesEditorDispatcher');
        dispatcher.setParams({
            'actionType': 'updateCase',
            'payload': caseRecord
        });
        dispatcher.fire();
   	},
   	updatePriority : function(component, event, helper) {
		component.set("v.case.priority", component.find("selectPriority").get("v.value"));
   	},
   	updateStatus : function(component, event, helper) {
		component.set("v.case.status", component.find("selectStatus").get("v.value"));
   	}
})