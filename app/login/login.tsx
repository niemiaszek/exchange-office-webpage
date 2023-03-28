"use client";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const { data: session } = useSession();

  const router = useRouter();
  // TODO: Fix router warning
  if (session) {
    router.push("/dashboard");
  } else {
    return (
      <div className="flex flex-col p-2 md:p-4 rounded-md md:rounded-xl border-2 border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-700 dark:text-white">
        <div className="inline-flex items-center text-center mb-5">
          <a>Nie zalogowano</a>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => signIn()}
        >
          Zaloguj się
        </button>
      </div>
    );
  }
}
