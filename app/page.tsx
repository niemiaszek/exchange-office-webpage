import Image from "next/image";
import "./globals.css";
import ExchangeTable from "./exchange-table";
import gmapsIcon from "../public/images/Google_Maps_icon.svg";
import facebookIcon from "../public/images/Facebook_logo.svg";
import phoneIcon from "../public/images/phone-call-icon.svg";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center dark:bg-gray-800">
      <main className="">
        <div className="w-screen overflow-auto">
          {/* @ts-expect-error Async Server Component */}
          <ExchangeTable />
        </div>
        <div className="w-screen p-3 md:p-5 md:pt-0">
          <div className="p-2 md:p-4 rounded-md md:rounded-xl border-2 border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-700 dark:text-white">
            <div className="grid grid-cols-2 grid-rows-2 gap-2 md:flex md:flex-row md:justify-evenly justify-items-center md:text-lg lg:text-2xl">
              <div>
                <a>Chełm, Lwowska 9</a>
              </div>
              <div>
                <div className="inline-flex items-baseline">
                  <Image priority src={phoneIcon} alt="Phone Icon" height={24} className="self-center mr-1" />
                  <a href="tel:571929494">571 929 494</a>
                </div>
              </div>
              <div>
                <a
                  className="inline-flex items-baseline"
                  href="https://goo.gl/maps/YLYx7AYqBQfPurSv7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image priority src={gmapsIcon} alt="Google Maps Icon" height={24} className="self-center mr-1" />
                  Google Maps
                </a>
              </div>
              <div>
                <a
                  className="inline-flex items-baseline"
                  href="https://www.facebook.com/kantor.fifo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image priority src={facebookIcon} alt="Facebook logo" height={24} className="self-center mr-1" />
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
