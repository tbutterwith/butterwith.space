const AWS = require('aws-sdk');
const { format } = require('date-fns');

exports.handler = async function(event, context) {
  AWS.config.update({
    region: "us-east-1",
    accessKeyId: process.env.WW_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.WW_AWS_SECRET_ACCESS_KEY,
  });

  const docClient = new AWS.DynamoDB.DocumentClient();
  const date = format(new Date(), 'yyyy-MM-dd');

  try {
    const { Item } = await docClient.get({TableName: 'word_wheel', Key:{id: date}}).promise();

    if (!Item) {
      return { statusCode: 204 };
    }

    return {
      statusCode: 200,
      body:JSON.stringify(Item),
      headers: {'Content-type': 'application/JSON'}
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500
    }
  }
}