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

// module.exports = () => "welcome to micro"
//

/*
    "start": "cross-env NODE_OPTIONS=--max-old-space-size=4096 micro -p 8080",
    "dev": "cross-env NODE_OPTIONS=--max-old-space-size=4096 micro-dev -p 8080"
 */

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

//
// const getHandler = async () => `Welcome to CitySDK.
// To use this server, make a POST request with
// 1. header: "Content-Type" : "application/json"
// 2. your CitySDK arguments in the body of the request
// Docs: https://github.com/uscensusbureau/citysdk"
// `
// const postHandler = async args => {
//   const data = await censusPromise(args)
//   return data
// }
//
// async function methodHandler(request, response) {
//   try {
//     switch (request.method) {
//       case 'POST':
//         return await postHandler(request);
//       case 'GET':
//         return await getHandler();
//       default:
//         send(response, 405, 'Invalid method');
//         break;
//     }
//   } catch (error) {
//     throw error;
//   }
// }

// doesn't work in Cloud.gov (needs to take port from env)
module.exports = router(
  post('/', async (req, res) => {
    const args = await json(req)
    const data = await censusPromise(args)
    send(res, 200, data)
  })
)

// testing...
// module.exports = router(
//   post('/', async (req, res) => {
//     const data = await json(req)
//     send(res, 200, data)
//   })
// )

//
// const server = micro(async (request, response) => {
//   const args = await json(request)
//   try {
//     send(response, 200, await methodHandler(args));
//   } catch (error) {
//     sendError(request, response, error);
//   }
// });
//
// server.listen(PORT, () => console.log(`Listening on port: ${PORT}`))



