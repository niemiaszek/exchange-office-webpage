import type { Currency, ExchangeTableData } from "../types";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

function TableRow(currency: Currency) {
  // currency name (like "USD") mapping to full name (like "United States dollar"). To be changed in future, when localization bill be introduced
  const fullNamesMapping: Map<string, string> = new Map([
    ["EUR", "Euro"],
    ["USD", "Dolar amerykański"],
    ["CHF", "Frank szwajcarski"],
    ["GBP", "Brytyjski funt szterling"],
    ["CAD", "Dolar kanadyjski"],
    ["AUD", "Dolar australijski"],
    ["SEK", "Korona szwedzka"],
    ["NOK", "Korona norweska"],
    ["DKK", "Korona duńska"],
    ["UAH", "Hrywna ukraińska"],
    ["BGN", "Lew bułgarski"],
    ["HUF", "Forint węgierski"],
    ["CZK", "Korona czeska"],
    ["RON", "Lej rumuński"],
    ["TRY", "Lira turecka"],
    ["JPY", "Jen japoński"],
    ["ALL", "Lek albański"],
    ["AED", "Dirham Zjednoczonych Emiratów Arabskich"],
    ["ILS", "Nowy izraelski szekel"],
    ["GEL", "Lari gruziński"],
    ["THB", "Bat tajlandzki"],
    ["ISK", "Korona islandzka"],
  ]);

  return (
    <tr
      key={currency.name}
      className="odd:bg-white even:bg-slate-50 bg-white border-b dark:odd:bg-gray-800 dark:even:bg-gray-700 dark:border-gray-700 font-medium text-base md:text-xl lg:text-3xl "
    >
      <th
        scope="row"
        className="has-tooltip px-2 py-1 md:px-6 md:py-2 xl:py-3 whitespace-nowrap text-gray-900 dark:text-white"
      >
        <span className="tooltip rounded shadow-lg p-1 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 -mt-8 lg:-mt-0 ml-4 lg:ml-8 lg:text-3xl border text-sm">
          {fullNamesMapping.get(currency.name)}
        </span>
        <span className="font-twemoji">{currency.representation}</span> {currency.name}
      </th>
      <td className="px-2 py-1 md:px-6 xl:py-2 2xl:py-3">{Number(currency.buy).toFixed(4)}</td>
      <td className="px-2 py-1 md:px-6 xl:py-2 2xl:py-3">{Number(currency.sell).toFixed(4)}</td>
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
    <div className="w-screen p-3 md:p-5">
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
        <div className="text-center pt-2 text-sm md:text-base text-gray-500">
          <p>Ceny są zależne od notowań na rynku międzybankowym i mogą ulec zmianie wiele razy w ciągu dnia. Zapytanie telefoniczne o cenę waluty nie jest jednoznaczne z potwierdzeniem transakcji.</p><br />
          <p>Ostatnia aktualizacja: {exchangeTableData.date}</p>
        </div>
      </div>
    </div>
  );
}
