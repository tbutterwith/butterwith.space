import * as AWS from 'aws-sdk';
import { format } from 'date-fns';

exports.handler = function(event, context, callback) {
  AWS.config.update({
    region: "us-east-1",
    accessKeyId: process.env.WW_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.WW_AWS_SECRET_ACCESS_KEY,
  });

  const docClient = new AWS.DynamoDB.DocumentClient();
  const date = format(new Date()  , 'yyyy-MM-dd');

  docClient.get({TableName: 'word_wheel', Key:{id: date}}, (err, data) =>{
    if (err) {
      console.error(err);
      callback(null, {
        statusCode: 500
      });
    }

    const { Item } = data;
    
    callback(null, {
      statusCode: 200,
      body:JSON.stringify(Item),
      headers: {'Content-type': 'application/JSON'}
    });
  });
}