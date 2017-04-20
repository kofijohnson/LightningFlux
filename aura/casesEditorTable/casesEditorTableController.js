({
	updateSelectedCase : function(component, event, helper) {
        var caseNumber = event.getSource().get("v.label");
        var caseSelectedEvent = component.getEvent("onCaseSelected");
        caseSelectedEvent.setParams({
            'selectedCaseNumber': caseNumber
        });
        caseSelectedEvent.fire();
   }
})