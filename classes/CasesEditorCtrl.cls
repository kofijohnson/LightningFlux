/** 
 *  CasesEditorCtrl
 *  @description Controller for ObjectSearch Component
 *               It provide method createLead and searchObjects
 */

global class CasesEditorCtrl {

    @AuraEnabled
    public static CaseWrapper updateCase(String caseJSON) {
        CasesEditorCtrl.CaseWrapper caseWrapper = (CasesEditorCtrl.CaseWrapper) JSON.deserialize(caseJSON, CasesEditorCtrl.CaseWrapper.class);
        return caseWrapper;
    }

	@AuraEnabled
    public static List<CaseWrapper> searchCases(String criteriaJSON) {
        CasesEditorCtrl.SearchCriteria criteria = (CasesEditorCtrl.SearchCriteria) JSON.deserialize(criteriaJSON, CasesEditorCtrl.SearchCriteria.class);
        List<Case> caseRecords = (new CasesSelector(criteria)).run();
        
        List<CaseWrapper> results = new List<CaseWrapper>();
        for(Case caseRecord :caseRecords)
        	results.add(new CaseWrapper(caseRecord));
        System.debug(results);
        return results;
    }

    global class CaseWrapper {
		@AuraEnabled public String case_number {get; set;}
		@AuraEnabled public String contact     {get; set;}
		@AuraEnabled public String status      {get; set;}
		@AuraEnabled public String priority    {get; set;}

        global CaseWrapper() {
            case_number = '';
            contact     = '';
            status      = '';
            priority    = '';
        }

		global CaseWrapper(Case caseRecord) {
			case_number = caseRecord.CaseNumber;
			contact     = caseRecord.Contact.Name;
			status      = caseRecord.Status;
			priority    = caseRecord.Priority;
		}
    }

    global class SearchCriteria {
		@AuraEnabled public String contact  {get; set;}
		@AuraEnabled public String status   {get; set;}
		@AuraEnabled public String priority {get; set;}

		public Boolean isEmpty() {
			return (
				String.isBlank(contact) &&
				String.isBlank(status) &&
				String.isBlank(priority)
			);
		}
    }

    public class CasesSelector {
        private SearchCriteria criteria;

        public CasesSelector(SearchCriteria criteria) {
    		this.criteria = criteria;
        }

        public List<Case> run() {
        	String query;
        	query = '';
    		query += 'SELECT CaseNumber, Contact.Name, Status, Priority ';
    		query += 'FROM Case ';
    		query += getWhereClause(criteria);
    		query += 'LIMIT 10';
            
            List<Case> caseRecords = new List<Case>();
    		for(Case caseRecord :Database.query(query))
    			caseRecords.add(caseRecord);

    		return caseRecords;
        }

        private String getWhereClause(SearchCriteria criteria) {
        	if(criteria.isEmpty())
        		return '';

            List<String> queryFields = new List<String>();
            if(String.isNotBlank(criteria.contact))
                queryFields.add('Contact.Name LIKE \'%' + criteria.contact + '%\'');
            if(String.isNotBlank(criteria.status))
                queryFields.add('Status LIKE \'%' + criteria.status + '%\'');
            if(String.isNotBlank(criteria.priority))
                queryFields.add('Priority LIKE \'%' + criteria.priority + '%\'');

            return 'WHERE ' + String.join(queryFields, ' AND ') + ' ';
        }
    }

    class SystemException extends Exception{}
}