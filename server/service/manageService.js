const HTTPProcessor = require('../util/httpProcessor');

class ManageService{

    static manageCustomer(data){
            return new Promise( (resolve,reject)=>{
                let url = "https://csp-v-1.getsandbox.com/manageCustomer";
                HTTPProcessor.post(url,data).then(result => {
                    resolve(result);
                }).catch(err => {
                    reject(err);
                })
            });

}

}

module.exports = ManageService;