({
    searchCases : function(component, criteria) {
        component.set("v.state.busy", true);
        var action = component.get("c.searchCases");
        action.setParams({criteriaJSON : JSON.stringify(criteria)});
        action.setCallback(this, function(response) {
            this.processResponse(
                response,
                {
                    success: function(records) {
                        var state          = component.get("v.state");
                        state.busy         = false;
                        state.cases        = records.slice();
                        state.selectedCase = {
                            'case_number' : '',
                            'contact'     : '',
                            'status'      : '',
                            'priority'    : ''
                        };
                        console.log(state.selectedCase);
                        component.set("v.state", state);
                    },
                    error: function(errorMessage) {
                        console.log('ERROR', errorMessage);
                        var state          = component.get("v.state");
                        state.busy         = false;
                        state.cases        = [].slice();
                        state.selectedCase = {
                            'case_number' : '',
                            'contact'     : '',
                            'status'      : '',
                            'priority'    : ''
                        };
                        component.set("v.state", state);
                    }
                }
            );
        });
        $A.enqueueAction(action);
    },
    selectCase: function(component, caseNumber) {
        var state = component.get("v.state");
        state.cases.forEach(function(caseRecord) {
            if(caseRecord.case_number == caseNumber) {
                state.selectedCase = caseRecord;
            }
        });
        component.set("v.state", state);
    },
    updateCase: function(component, caseToUpdate) {
        component.set("v.state.busy", true);
        var action = component.get("c.updateCase");
        action.setParams({caseJSON : JSON.stringify(caseToUpdate)});
        action.setCallback(this, function(response) {
            this.processResponse(
                response,
                {
                    success: function(updatedCase) {
                        var state = component.get("v.state");
                        state.busy = false;
                        state.cases.forEach(function(stateCase) {
                            if(stateCase.case_number == updatedCase.case_number) {
                                stateCase = updatedCase;
                            }
                        });
                        
                        component.set("v.state", state);
                    },
                    error: function(errorMessage) {
                        console.log('ERROR', errorMessage);
                        var state  = component.get("v.state");
                        state.busy = false;
                        component.set("v.state", state);
                    }
                }
            );
        });
        $A.enqueueAction(action);
    },
    processResponse : function(response, callback) {
        var state = response.getState();
        if (state === "SUCCESS") {
            callback.success(response.getReturnValue());
        }
        else {
            callback.error(response.getError());
        }
    }
})