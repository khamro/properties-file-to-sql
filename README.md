This nodejs script reads dictionary properties files and convert them to sql files (according to REG_MESSAGES table scheme).

In order to use the tool your dictionary properties file name should be in this convention [namespace_locale.properties]

the output will be a sql script with the name namespace_locale.properties.sql 

how to use it?
using for the 1st time:
1. clone the repo
2. run npm install

NOTE: your properties file should be in the same directory as the script

for daily usage:
in CMD: node convertDictToSql.js [your-file-name]
