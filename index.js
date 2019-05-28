let census = require('citysdk')
let http = require('http')
let { json } = require('micro')

let censusPromise = args => {
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

const server = new http.Server(micro( async (req, res) => {
    const query = await json(req)
    let answer = await censusPromise(query)
    console.log(answer)
    res.end(answer)
}))

server.listen(8080)

