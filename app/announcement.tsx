import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

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
        new GetObjectCommand({ Bucket: process.env.CLOUDFLARE_BUCKET_ID_DATA, Key: "announcement.json" })
      );
      const dataStr = await data.Body?.transformToString();
      return dataStr;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch ExchangeTableData");
    }
}

export default async function Announcement() {
    const data = await getData();
    const announcement = JSON.parse(data);
    if(!announcement.announcement){
        return
    }
    return (
      <div className="w-screen p-3 md:p-5 md:pt-0">
        <div className="p-2 md:p-4 rounded-md md:rounded-xl border-2 border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-700 items-center">
          <div className="mx-auto lg:w-3/5 flex flex-col p-2 3xl:text-center text-lg md:text-xl lg:text-2xl xl:text-3xl">
            <h2 className="text-3xl font-bold p-2 pt-0 lg:text-4xl xl:text-5xl dark:text-white lg:text-center">Ogłoszenie</h2>
            <p className="p-2 lg:p-4 text-gray-700 dark:text-gray-400">
              {announcement.announcement}
            </p>
            <p className="pt-2 pl-2 lg:pl-4 text-sm md:text-base text-gray-500">Dodano: {announcement.date}</p>
          </div>
        </div>
      </div>
    );
  }
  