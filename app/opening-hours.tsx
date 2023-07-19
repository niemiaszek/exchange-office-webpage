export default function OpeningHours() {
    return (
        <div className="w-screen p-3 md:p-5 md:pt-0">
          <div className="p-2 md:p-4 rounded-md md:rounded-xl border-2 border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-700 items-center">
            <div className="mx-auto lg:w-3/5 p-2 3xl:text-center text-lg md:text-xl lg:text-2xl xl:text-3xl">
                <h2 className="text-3xl lg:text-center font-bold p-2 pt-0 lg:text-4xl xl:text-5xl dark:text-white">Godziny otwarcia</h2>
                <div className="p-2 lg:p-4 text-gray-700 dark:text-gray-400 lg:justify-center">
                    <div className="flex">
                        <p className="flex-grow">Poniedziałek&ndash;Piątek</p>
                        <p className="flex-grow text-right">8:00&ndash;18:00</p>
                    </div>
                    <div className="flex">
                        <p className="flex-grow">Sobota</p>
                        <p className="flex-grow text-right">8:00&ndash;14:00</p>
                    </div>
                </div>
                
            </div>
          </div>
        </div>
      );
}