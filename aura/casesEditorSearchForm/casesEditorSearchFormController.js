({
	updateSearchValues : function(component, event, helper) {
        var search = {
            "responseDelay" : component.get("v.responseDelay"),
            "timeoutID"     : component.get("v.timeoutID")
        };

        clearTimeout(search.timeoutID);
        search.timeoutID = setTimeout(function() {
            var searchUpdatedEvent = component.getEvent("onSearchUpdated");
        	searchUpdatedEvent.fire();
        }, search.responseDelay);
        component.set("v.timeoutID",search.timeoutID);
   }
})