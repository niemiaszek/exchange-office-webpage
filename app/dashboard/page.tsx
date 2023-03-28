"use client";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center dark:bg-gray-800 p-5">
        <div className="flex flex-col p-2 md:p-4 rounded-md md:rounded-xl border-2 border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-700 dark:text-white">
          <div className="inline-flex items-center text-center mb-5">
            <Image src={session.user.image} alt="Profile image" width={64} height={64} className="self-center mr-2" />
            Zalogowano jako {session.user.email}
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full p-2 w-1/2 self-center"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Wyloguj
          </button>
        </div>
      </div>
    );
  }
}
