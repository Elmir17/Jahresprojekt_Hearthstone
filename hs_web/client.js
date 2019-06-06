const request = require('request');

//const word = process.argv[2];
const word = process.argv[2];
const url = 'http://localhost:3001/v1/' + word

request({url, json:true }, (error, response, body) => {
    console.log('request happened');
    console.log(response.body);
    
});