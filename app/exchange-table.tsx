type Currency = {
  representation: string;
  name: string;
  buy: number;
  sell: number;
};
function TableRow(currency: Currency) {
  return (
    <tr className="odd:bg-white even:bg-slate-50 bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" className="px-2 py-1 md:px-6 md:py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {currency.representation} {currency.name}
      </th>
      <td className="px-2 py-1 md:px-6 md:py-3">{currency.buy}</td>
      <td className="px-2 py-1 md:px-6 md:py-3">{currency.sell}</td>
    </tr>
  );
}
export default function ExchangeTable() {
  //   currencies: Array<currency>) {
  const currencies: Currency[] = [
    { representation: "🇪🇺", name: "EUR", buy: 4.1324, sell: 4.02 },
    { representation: "🇺🇸", name: "USD", buy: 4.5, sell: 4.4 },
    { representation: "🇨🇭", name: "CHF", buy: 4.6, sell: 4.7 },
    { representation: "🇬🇧", name: "GBP", buy: 4.1, sell: 4.3 },
    { representation: "🇨🇦", name: "CAD", buy: 4.1324, sell: 4.02 },
    { representation: "🇦🇺", name: "AUD", buy: 4.5, sell: 4.4 },
    { representation: "🇸🇪", name: "SEK", buy: 4.6, sell: 4.7 },
    { representation: "🇳🇴", name: "NOK", buy: 4.1, sell: 4.3 },
    { representation: "🇩🇰", name: "DKK", buy: 4.1324, sell: 4.02 },
    { representation: "🇺🇦", name: "UAH", buy: 4.5, sell: 4.4 },
    { representation: "🇧🇬", name: "BGN", buy: 4.1, sell: 4.3 },
    { representation: "🇭🇺", name: "HUF", buy: 4.1324, sell: 4.02 },
    { representation: "🇨🇿", name: "CZK", buy: 4.5, sell: 4.4 },
    { representation: "🇷🇴", name: "RON", buy: 4.6, sell: 4.7 },
  ];

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
          <tbody>{currencies.map(TableRow)}</tbody>
        </table>
        <div className="text-right pt-2">
          <a className="text-sm md:text-lg text-gray-500">
            ostatnia aktualizacja: <br></br>
            18.02.2023 19:20
          </a>
        </div>
      </div>
    </div>
  );
}
