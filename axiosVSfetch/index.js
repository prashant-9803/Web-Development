const axios = require("axios");

// async function main() {
//   let res = await fetch(
//     "https://httpdump.app/dumps/d682f7f2-9726-4b40-b5c8-801a0cb74742",
//     {
//       method: "POST",
//       body: JSON.stringify({
//         username: "prashnat",
//         password: "13asd",
//       }),
//       headers: {
//         Authorization: "Bearer 123",
//       },
//     },
//   );
// }

async function main() {
  let res = await fetch(
    "https://httpdump.app/dumps/d682f7f2-9726-4b40-b5c8-801a0cb74742",
    {
      method: "POST",
    },
  );
}
main();
