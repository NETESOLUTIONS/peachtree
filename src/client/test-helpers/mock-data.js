/* jshint -W079 */
var mockData = (function() {
    return {
        getMockPeople: getMockPeople,
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
    function getMockPeople() {
        return [
            {id: 1, firstName: 'Mike', lastName: 'Klein', age: 32, location: 'Maryland'},
            {id: 2, firstName: 'Rahul', lastName: 'Suthar', age: 40, location: 'India'},
            {id: 3, firstName: 'Dimitry', lastName: 'Korobskiy', age: 40, location: 'Virginia'},
            {id: 4, firstName: 'Sandeep', lastName: 'Somaiya', age: 40, location: 'India'},
            {id: 5, firstName: 'Savita', lastName: 'Sethi', age: 20, location: 'Virginia'},
            {id: 6, firstName: 'Radha', lastName: 'Allam', age: 40, location: 'India'}
        ];
    }
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
})();
