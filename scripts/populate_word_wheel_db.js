const AWS = require("aws-sdk");
const fs = require('fs');
const addDays = require('date-fns/addDays');
const parse = require('date-fns/parse');
const format = require('date-fns/format');

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const docClient = new AWS.DynamoDB.DocumentClient();

// loads word file
const data = fs.readFileSync('scripts/used_words.txt', 'utf8');
// parse to array
const words = data.split('\n');
// shuffle
for (let i = words.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [words[i], words[j]] = [words[j], words[i]];
}

const uploadData = async (words, docClient) => {
  for(let j = 0; j < words.length; j++) {
    let date = parse('2021-12-25', 'yyyy-MM-dd', new Date());
    date = addDays(date, j);

    const word = words[j];

    const params = {
      TableName: 'word_wheel',
      Item: {
        id: format(date, 'yyyy-MM-dd'),
        word,
      },
    };
    console.log({date});
    await docClient.put(params).promise();
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}

uploadData(words, docClient).then(() => console.log('finsihed')).catch((err) => console.error(err));
