"use client";
import { useSession, signOut } from "next-auth/react";
import Form from "./form";
import UserCard from "./user-card";

export default function Dashboard() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center dark:bg-gray-800 p-5 space-y-5">
        <Form />
        <UserCard session={session} />
      </div>
    );
  }
}
