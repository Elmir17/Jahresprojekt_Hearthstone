const request = require('request');

const word = process.argv[2];
const url = 'http://localhost:3001/v1/' + word

//der client liefert nur kartennamen züruck, die das eingegebene wort im namen haben
request({url, json:true }, (error, response, body) => {
    console.log('request just happened');
    console.log(response.body);
    // mit node client.js [name](name mit _ als leertaste) starten
});