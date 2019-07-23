const HTTPProcessor = require('../util/httpProcessor');

class CustomerDetailsService{

    static customerDetails(data){
            return new Promise( (resolve,reject)=>{
                let url = "https://csp-v-1.getsandbox.com:443/customerDetails";
            HTTPProcessor.post(url,data).then(result => {
                resolve(result);
            }).catch(err => {
            
                reject(err);
            })
            });

}

}

module.exports = CustomerDetailsService;