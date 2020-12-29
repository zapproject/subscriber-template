require('dotenv').config()
import { SimpleSubscriber } from "./SimpleSubscriber"
async function main() {
  if (!process.env.Query || !process.env.Params) {
    throw new Error("Missing Query and Params in .env")
  }
  console.log("Starting setup and query")
  const mySubscriber = new SimpleSubscriber()
  await mySubscriber.setup()
  await mySubscriber.queryProvider(process.env.Query, JSON.parse(process.env.Params))
  console.log("Done")
}



main()
  .then(console.log)
  .catch(console.error)
