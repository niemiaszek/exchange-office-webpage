import type { Currency, ExchangeTableData } from "../types";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

function TableRow(currency: Currency) {
  return (
    <tr
      key={currency.name}
      className="odd:bg-white even:bg-slate-50 bg-white border-b dark:odd:bg-gray-800 dark:even:bg-gray-700 dark:border-gray-700 font-medium text-base md:text-xl lg:text-3xl text-gray-900 dark:text-white"
    >
      <th scope="row" className="px-2 py-1 md:px-6 md:py-2 xl:py-3 whitespace-nowrap">
        <a className="font-twemoji">{currency.representation}</a> {currency.name}
      </th>
      <td className="px-2 py-1 md:px-6 xl:py-2 2xl:py-3">{currency.buy}</td>
      <td className="px-2 py-1 md:px-6 xl:py-2 2xl:py-3">{currency.sell}</td>
    </tr>
  );
}
// async function getData() {
//   // const res = await fetch("http://localhost:3000/api/exchangetabledata");
//   // if (!res.ok) {
//   //   throw new Error("Failed to fetch ExchangeTableData");
//   // }
//   // return res.json();
//   let jsonDirectory = path.join(process.cwd(), "data") + "/data.json";
//   if (fs.existsSync("/tmp/data.json")) {
//     jsonDirectory = "/tmp/data.json";
//   }

//   //Find the absolute path of the json directory
//   //Read the json data file data.json
//   const fileContents = await fs.promises.readFile(jsonDirectory, "utf8");
//   return fileContents;
// }
async function getData() {
  const S3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
      secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
    },
  });
  try {
    const data = await S3.send(
      new GetObjectCommand({ Bucket: process.env.CLOUDFLARE_BUCKET_ID_DATA, Key: "data.json" })
    );
    const dataStr = await data.Body?.transformToString();
    return dataStr;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch ExchangeTableData");
  }
}

export default async function ExchangeTable() {
  const data = await getData();
  const exchangeTableData: ExchangeTableData = JSON.parse(data);

  return (
    <div className="p-3 md:p-5">
      <div className="p-2 md:p-4 rounded-md md:rounded-xl border-2 border-slate-200 dark:border-gray-700">
        <table className="w-full text-sm md:text-lg text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs md:text-lg lg:text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-1 md:px-6 md:py-3">
                Waluta
              </th>
              <th scope="col" className="px-2 py-1 md:px-6 md:py-3">
                Kupno
              </th>
              <th scope="col" className="px-2 py-1 md:px-6 md:py-3">
                Sprzedaż
              </th>
            </tr>
          </thead>
          <tbody>{exchangeTableData.currencies.map((currency) => TableRow(currency))}</tbody>
        </table>
        <div className="text-right pt-2">
          <a className="text-sm md:text-base text-gray-500">ostatnia aktualizacja: {exchangeTableData.date}</a>
        </div>
      </div>
    </div>
  );
}
