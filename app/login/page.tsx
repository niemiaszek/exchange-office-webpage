import Head from "next/head";
import Login from "./login";

export default function Page() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center dark:bg-gray-800 p-5">
        <Login />
      </div>
    </>
  );
}
