const request = require('request');

class HttPProcessor{

    static getHeader(){
        return {
            'Content-Type' : 'application/json'
        }
    }

    static get(url){
        let options = {
            uri : url,
            method : 'GET',  
            headers : HttPProcessor.getHeader()          
        }
        return HttPProcessor.processHttpCall(options);
    }

    static post(url,data){
        let options = {
            uri : url,
            method : 'POST',  
            headers : HttPProcessor.getHeader() ,
            body : JSON.stringify(data)          
        }
        return HttPProcessor.processHttpCall(options);
    }

    static put(url,data){

    }
    static processHttpCall(options){
        return new Promise( (resolve,reject) =>{
            request(options, (err, httpResponse, body) => {
                if(err){
                    reject(err) }
                else{
                    resolve(body);

                }
            })
        });
    }
}

module.exports =  HttPProcessor;