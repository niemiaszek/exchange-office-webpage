import "./globals.css";
import ExchangeTable from "./exchange-table";
import ContactCard from "./contact-card";
import About from "./about";
import Galery from "./galery";
import Opinions from "./opinions";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center dark:bg-gray-800">
      <main>
        {/* @ts-expect-error Async Server Component */}
        <ExchangeTable />
        <ContactCard />
        <About />
        {/* <Galery />
        <Opinions /> */}
      </main>
    </div>
  );
}
