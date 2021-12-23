var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: 'word_wheel',
  Item: {
    id: '2021-12-23',
    word: 'UNRUFFLED',
  },
}

// docClient.put(params, (err, data) => {
//   console.log('err', err);
//   console.log('data', data);
// })

docClient.get({TableName: 'word_wheel', Key:{id: '2021-12-23'}}, (err, data) =>{
  console.log('err', err);
  console.log('data', data);
})