Tool description: 
This nodejs script reads dictionary properties files and convert them to sql files (according to OSS_REG_MESSAGES table scheme).

NOTE: In order to use the tool, your dictionary properties file name should be in this convention [namespace_locale.properties].
the output will be a sql script with the name namespace_locale.properties.sql

how to use it? using for the 1st time:
1.	clone the repo
2.	run npm install

NOTE: Your properties file should be in the same directory as the script

for daily usage: in CMD: node convertDictToSql.js [your-file-name]

version 1.0 features:
1.	the tool will exist with error printed to your console if you file name doesn’t follow the name convention.
2.	If any key in your file is longer than 36 char you will get this message in your console:  key length is [the-key-length] Key length
must be 36 characters or less, the key is [key]

