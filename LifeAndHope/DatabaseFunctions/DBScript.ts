function getTables(){

    var customerId = 'P88cSuYR';
    var directoryId = 'default';

    axios.get('https://api.securedb.co:443/securedbapi/data/' + customerId + '/' + directoryId + '/tables', {
        transformRequest: axios.defaults.transformRequest.concat(function (data, headers) {
            headers['Authorization'] = 'Basic TzFLT0JPS0pWTDpaT0VJUTdIUTExTjUyNDU='; //TODO: change to JWT?
        })
    }).then(function (response) {
        var data : any = response.data.data;
        data.forEach(function (item) {
            console.log('<p>' + item.name + '</p>');
        })
    }).catch(function (response) {
        //TODO: catch exceptions?
    });
}

getTables();
