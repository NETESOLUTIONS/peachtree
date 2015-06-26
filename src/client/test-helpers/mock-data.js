/* jshint -W079 */
var mockData = (function() {
    return {
        getMockDrugs: getMockDrugs,
        getMockStates: getMockStates
    };

    function getMockStates() {
        return [
            {
                state: 'dashboard',
                config: {
                    url: '/',
                    templateUrl: 'app/dashboard/dashboard.html',
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            }
        ];
    }
    /* Get Mock datasets for testing */
    
    function getMockDrugs() {
        var results = [];
        results = [
                {term: 'ENBREL', count: 216013},
                {term: 'HUMIRA', count: 167800},
                {term: 'ASPIRIN', count: 166051},
                {term: 'TYSABRI', count: 110372},
                {term: 'METHOTREXATE', count: 104124},
                {term: 'AVONEX', count: 92239},
                {term: 'LIPITOR', count: 90301},
                {term: 'LISINOPRIL', count: 81080},
                {term: 'PREDNISONE', count: 78508},
                {term: 'NEXIUM', count: 76533}
        ];
        return results;
    }
})();
