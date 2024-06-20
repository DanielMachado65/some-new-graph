const http = require('http')
const httpStatusCodes = require('./infrastructure/enumerators/httpCode.enum')
const config = require('./infrastructure/config/config')

const request = http.request({
    host : 'localhost',
    port : config.api.port,
    timeout : 3000,
    method : 'GET',
    path : '/'
},(result) => {
    if(result.statusCode === httpStatusCodes.SUCCESS){
        process.exit(0);
    }
    else {
        process.exit(1);
    }
});

request.on('error', err => process.exit(1));

request.end();



