
const xmlToJson = require('xml-to-json-stream');
const parser = xmlToJson({attributeMode:false});



class Convertor{

    static xmlToJson(xml) {
       return new Promise( (res, rej) => {
        parser.xmlToJson(xml, (err,json)=>{
            if(err) {
                rej(err);
            }else{
                res(json);
            }
        })
       })
    }

}

module.exports = Convertor;