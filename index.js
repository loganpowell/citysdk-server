const census = require('citysdk')
const https = require('https')
const { json, run, send } = require('micro')

const {key, cert, passphrase} = require('openssl-self-signed-certificate');

const PORT = process.env.PORT || 8080

const censusPromise = args => {
  return new Promise((resolve, reject) => {
    census(args, (err, data) => {
      if (!err) {
        resolve(data);
      } else if (err) {
        console.log(err)
        resolve(err);
      } else {
        console.log(err)
        reject(err)
      }
    });
  });
};


const options = {key, cert, passphrase};

const microHttps = fn => https.createServer(options, (req, res) => run(req, res, fn))

const server = microHttps(async (req, res) => {
    const query = await json(req)
    let answer = await censusPromise(query)
    console.log("answer: " + answer)
    send(answer, 200, {encrypted: req.client.encrypted});
})

server.listen(PORT)

