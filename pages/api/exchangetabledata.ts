import path from 'path';
import fs from 'fs'
import type {ExchangeTableData, Currency} from '../../types'
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  let jsonDirectory = path.join(process.cwd(), 'data') + '/data.json';
  if (fs.existsSync('/tmp/data.json')) {
    jsonDirectory = 'tmp/data.json';
  }
  
  //Find the absolute path of the json directory
  //Read the json data file data.json
  const fileContents = await fs.promises.readFile(jsonDirectory, 'utf8');

  const exchangeTableData: ExchangeTableData = JSON.parse(fileContents);
  if (req.method === 'POST') {
    try {
      let result = ""
      const body = req.body
      // for now, ugly post-processing. Would be better to use Object.assing() with different data structure
      for (const [key, value] of Object.entries(body)){
        // Check if value was passed
        if (!value) {
          continue;
        }
        // TODO: Validate if passed value is valid

        const postedParts = key.split(" ")
        const updatedCurrencyName = postedParts[1]
        const updatedProperty = postedParts[2]
        const updatedValue = Number(value)
        
        for (const currency of exchangeTableData.currencies) {
          if (currency.name === updatedCurrencyName){
            console.log(currency.name)
            if (updatedProperty === "Buy") {
              currency.buy = updatedValue
            } else if (updatedProperty === "Sell"){
              currency.sell = updatedValue
            }
          }
        }
        exchangeTableData.submitter = session.user.name
        exchangeTableData.date = new Date().toLocaleString("pl-PL")
      }
      await fs.promises.writeFile('tmp/data.json', JSON.stringify(exchangeTableData), 'utf8');
      const revalidated = await fetch(`http://localhost:3000/api/revalidate?secret=${process.env.REVALIDATE}`)
      const msg = await revalidated.json()
      console.log(msg)
      result = "Success"
      res.status(200).json({ msg })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'failed to load data' })
    }
    // Process a POST request
  } else if (req.method === 'GET') {
    //Return the content of the data file in json format
    res.status(200).json(exchangeTableData.currencies);
  }

}
