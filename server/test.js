const xmlToJson = require('xml-to-json-stream');
const parser = xmlToJson({attributeMode:false});
const util = require('./util/convertor'); 


const xml = `
<employee id="123456">
    <name>Alex</name>
</employee>
`
util.xmlToJson(xml);
// parser.xmlToJson(xml, (err,json)=>{
//     if(err) {
//         console.log(err)
//     }else{
//         console.log(json)
//     }
 
    //json
    //{
    //  employee: {
    //      name: "Alex"
    //  }    
    //}
// });