module.exports = {
    people: getPeople()
};

function getPeople() {
    return [
        {id: 1, firstName: 'Mike', lastName: 'Klein', age: 32, location: 'Maryland'},
        {id: 2, firstName: 'Rahul', lastName: 'Suthar', age: 40, location: 'India'},
        {id: 3, firstName: 'Dimitry', lastName: 'Korobskiy', age: 40, location: 'Virginia'},
        {id: 4, firstName: 'Sandeep', lastName: 'Somaiya', age: 40, location: 'India'},
        {id: 5, firstName: 'Savita', lastName: 'Sethi', age: 20, location: 'Virginia'},
        {id: 6, firstName: 'Radha', lastName: 'Allam', age: 40, location: 'India'}
    ];
}
