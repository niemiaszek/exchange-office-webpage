import type {ExchangeTableData, Currency} from '../../types'
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  // let jsonDirectory = path.join(process.cwd(), 'data') + '/data.json';
  // if (fs.existsSync('/tmp/data.json')) {
  //   jsonDirectory = '/tmp/data.json';
  // }
  
  //Find the absolute path of the json directory
  //Read the json data file data.json
  // const fileContents = await fs.promises.readFile(jsonDirectory, 'utf8');

  const S3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
      secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
    },
  });
  let dataStr = ""
  try {
    const data = await S3.send(
      new GetObjectCommand({ Bucket: process.env.CLOUDFLARE_BUCKET_ID_DATA, Key: "data.json" })
    );
    dataStr = await data.Body?.transformToString();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch ExchangeTableData");
  }
  const exchangeTableData: ExchangeTableData = JSON.parse(dataStr);
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
      await S3.send(new PutObjectCommand({Body: JSON.stringify(exchangeTableData), Bucket: process.env.CLOUDFLARE_BUCKET_ID_DATA, Key: "data.json" }))
      // await fs.promises.writeFile('/tmp/data.json', JSON.stringify(exchangeTableData), 'utf8');
      const revalidated = await fetch(`https://exchange-office-webpage.vercel.app/api/revalidate?secret=${process.env.REVALIDATE}`)
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
