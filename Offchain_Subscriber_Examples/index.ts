import {SimpleSubscriber} from "./SimpleSubscriber"
import {Config} from "./Config"
async function main(){
  console.log("Starting setup and query")
  const mySubscriber = new SimpleSubscriber()
  await mySubscriber.setup()
  await mySubscriber.queryProvider(Config.Query,Config.Params)
  console.log("Done")
}



main()
.then(console.log)
.catch(console.error)
