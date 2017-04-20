({
	doInit : function(component, event, helper) {
		var state          = {};
		state.busy         = false;
		state.cases        = [];
		state.selectedCase = {};
        component.set("v.state", state);

    	helper.searchCases(component, {
            'contact'  : '',
            'status'   : '',
            'priority' : ''
        });
    },
    handleDispatcherAction : function(component, event, helper) {

	    switch(event.getParam('actionType')) {
	    	case 'searchCases':
	        	helper.searchCases(component, event.getParam('payload'));
	        	event.stopPropagation();
	        	break;
	        case 'selectCase':
	        	helper.selectCase(component, event.getParam('payload'));
	        	event.stopPropagation();
	        	break;
	        case 'updateCase':
	        	helper.updateCase(component, event.getParam('payload'));
	        	event.stopPropagation();
	        	break;
	    	default:
	        	break;
	    }
	}
})