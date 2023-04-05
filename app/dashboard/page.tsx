"use client";
import { useSession, signOut } from "next-auth/react";
import Form from "./form";
import UserCard from "./user-card";
import { FieldValues, useForm, UseFormRegister } from "react-hook-form";
import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

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
