const census = require('citysdk')
const micro = require('micro')
const {
  json,
  send,
  sendError
} = micro

const { router, post} = require('microrouter')

const PORT = process.env.PORT || 8080
console.log("PORT: " + PORT)

const censusPromise = args => {
  console.log("In censusPromise...")
  return new Promise((resolve, reject) => {
    census(args, (err, data) => {
      if (!err) {
        console.log("Success!")
        resolve(data);
      } else if (err) {
        console.log("CitySDK Error: " + err)
        resolve(err);
      } else {
        console.log("SERVER ERROR:")
        console.log(err)
        reject(err)
      }
    });
  });
};

module.exports = router(
  post('/', async (req, res) => {
    const args = await json(req)
    const data = await censusPromise(args)
    send(res, 200, data)
  })
)




