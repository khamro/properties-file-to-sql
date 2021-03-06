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
    var locale;
    if(fileNameArray.length > 2){
        locale = fileNameArray[1] + '_' + fileNameArray[2].split('.')[0];
    }
    else{
        locale = fileNameArray[1].split('.')[0];
    }
    console.log(namespace +'  ' + locale);
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
            'localization message',
            '${namespace}',
            0,
            '${locale}'
        );\n`
        if (fs.existsSync(targetFileName)) {
            // console.log(sqlTmp);
            fs.appendFileSync(targetFileName, sqlTmp);
        }
    });
    fs.appendFileSync(targetFileName, "commit;");
}
convertToSql();
