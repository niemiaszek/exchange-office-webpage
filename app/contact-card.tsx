import Image from "next/image";
import gmapsIcon from "../public/images/Google_Maps_icon.svg";
import facebookIcon from "../public/images/Facebook_logo.svg";
import phoneIcon from "../public/images/phone-call-icon.svg";
// import whatsappIcon from "../public/images/Whatsapp_icon.svg";

export default function ContactCard() {
  return (
    <div className="w-screen p-3 md:p-5 md:pt-0">
      <div className="p-2 md:p-4 rounded-md md:rounded-xl border-2 border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-700 dark:text-white">
        <div className="grid grid-cols-2 grid-rows-2 gap-x-2 gap-y-4 md:flex md:flex-row md:justify-evenly justify-items-center md:text-lg lg:text-2xl">
          <div>
            <p>Chełm, Lwowska 9</p>
          </div>
          <div className="inline-flex items-baseline">
            {/* <a
              className="inline-flex items-baseline"
              href="https://wa.me/48571929494"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image priority src={whatsappIcon} alt="Whatsapp Icon" height={24} className="self-center mr-1" />
            </a> */}

            <Image priority src={phoneIcon} alt="Phone Icon" height={24} className="self-center mr-1" />
            <a href="tel:+48571929494">571 92 94 94</a>
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
  );
}
