import path from "path";
import { promises as fs } from "fs";
import type { Currency, ExchangeTableData } from "../types";

function TableRow(currency: Currency) {
  return (
    <tr
      key={currency.name}
      className="odd:bg-white even:bg-slate-50 bg-white border-b dark:odd:bg-gray-800 dark:even:bg-gray-700 dark:border-gray-700"
    >
      <th
        scope="row"
        className="px-2 py-1 md:px-6 md:py-2 xl:py-3 font-medium text-sm md:text-lg text-gray-900 whitespace-nowrap dark:text-white"
      >
        {currency.representation} {currency.name}
      </th>
      <td className="px-2 py-1 md:px-6 xl:py-2 2xl:py-3">{currency.buy}</td>
      <td className="px-2 py-1 md:px-6 xl:py-2 2xl:py-3">{currency.sell}</td>
    </tr>
  );
}
async function getData() {
  // const res = await fetch("http://localhost:3000/api/exchangetabledata");
  // if (!res.ok) {
  //   throw new Error("Failed to fetch ExchangeTableData");
  // }
  // return res.json();
  const jsonDirectory = path.join(process.cwd(), "data");
  const fileContents = await fs.readFile(jsonDirectory + "/data.json", "utf8");
  return fileContents;
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
