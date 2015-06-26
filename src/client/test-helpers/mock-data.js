/* jshint -W079 */
var mockData = (function() {
    return {
        getMockDrugs: getMockDrugs,
        getMockDrugsTop10: getMockDrugsTop10,
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
        return [
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
    }
    function getMockDrugsTop10() {
        return [
            {term: 'ENBREL', count: 216013, rank: 1},
            {term: 'HUMIRA', count: 167800, rank: 2},
            {term: 'ASPIRIN', count: 166051, rank: 3},
            {term: 'TYSABRI', count: 110372, rank: 4},
            {term: 'METHOTREXATE', count: 104124, rank: 5},
            {term: 'AVONEX', count: 92239, rank: 6},
            {term: 'LIPITOR', count: 90301, rank: 7},
            {term: 'LISINOPRIL', count: 81080, rank: 8},
            {term: 'PREDNISONE', count: 78508, rank: 9},
            {term: 'NEXIUM', count: 76533, rank: 10}
        ];
    }
})();
