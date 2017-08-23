var PropertiesReader = require('properties-reader');
var lodash = require('lodash');

var fs = require('fs');

function createFile(fileName) {
    fs.openSync(fileName, 'w', function (err, fd) {
        if (err) {
            fs.writeFileSync(fileName, '', function (err) {
                if (err) {
                    console.log(err);
                }
                console.log("The file was saved!");
            });
        } else {
            // fs.writeFileSync(FILE_NAME, '', 'utf8', function () {
            //     console.log("The file exists!");
            // });
            console.log("The file exists!");
            
        }
    });
}



function convertToSql() {
    var  fileName = process.argv[2];
    if(lodash.isEmpty(fileName)){
        console.error("Please insert file Name with valid pattern [namespace_locale.properties]");
        process.exit();
    }
    if(fileName.indexOf("_") < 0){
        console.error("Please insert file Name with valid pattern [namespace_locale.properties]");
        process.exit();
    }
    var targetFileName = fileName+'.sql';
    createFile(targetFileName);
    var properties = PropertiesReader('./'+fileName);
    var fileNameArray = fileName.split('_');
    var namespace = fileNameArray[0];
    var local = fileNameArray[1].split('.')[0];
    console.log(namespace +'  ' + local);
    properties.each(function (key, value) {
        if(key.length > 36){
            console.error("key lenght is "+ key.length + " Key length must be 36 characters or less,the key is: " + key)
        }
        // console.log("key: " + key + " value: " + value);
        var sqlTmp = `INSERT 
        INTO OSS_REF_MESSAGE VALUES
        (
            '${key}',
            '${value}',
            'This is a key value message for localization dictionary',
            '${namespace}',
            0,
            '${local}'
        );\n`
        if (fs.existsSync(targetFileName)) {
            // console.log(sqlTmp);
            fs.appendFileSync(targetFileName, sqlTmp);
        }
    });
}
convertToSql();
