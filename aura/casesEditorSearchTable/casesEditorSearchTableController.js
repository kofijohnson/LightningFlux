({
	doInit : function(component, event, helper) {
       var searchValues = {
            'contact'  : '',
            'status'   : '',
            'priority' : ''
        };
        component.set("v.searchValues", searchValues);
    },
    dispatchSearchCases : function(component, event, helper) {
        var criteria = component.get("v.searchValues");
        var dispatcher = component.getEvent('casesEditorDispatcher');
    	dispatcher.setParams({
      		'actionType': 'searchCases',
      		'payload': criteria
    	});
    	dispatcher.fire();
    },
    dispatchSelectCase : function(component, event, helper) {
        var caseNumber = event.getParam("selectedCaseNumber");
        var dispatcher = component.getEvent('casesEditorDispatcher');
        dispatcher.setParams({
            'actionType': 'selectCase',
            'payload': caseNumber
        });
        dispatcher.fire();
   }
})