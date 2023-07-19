"use client";
// TODO: prepare announcement form
// Based on https://www.propelauth.com/post/creating-advanced-reusable-forms-in-next-js
import { FieldValues, useForm, UseFormRegister, UseFormWatch } from "react-hook-form";
import useSWR from "swr";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Currency } from "@/types";

const fetcher = (url) => fetch(url).then((res) => res.json());

async function saveFormData(data: object, url: string) {
  return await fetch(url, {
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
}

type Props = {
  // Where to GET/POST the form data
  url: string;

  // Function that returns a component that will display the inner form
  renderForm: (formProps: FormProps) => React.ReactNode;
};

// All values that come from useForm, to be used in our custom forms
export type FormProps = {
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  isSubmitting: boolean;
  errors: { [error: string]: any };
  defaultData: string;
};

function GenericForm({ url, renderForm }: Props) {
  // Fetch our initial form data
  const { data, error, isLoading } = useSWR(url, fetcher);
  console.log(data)

  const {
    register,
    watch,
    reset,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isDirty },
  } = useForm();

  // Submit handler which displays errors + success messages to the user
  const onSubmit = async (data: object) => {
    const response = await saveFormData(data, url);

    if (response.status === 400) {
      // Validation error, expect response to be a JSON response {"field": "error message for that field"}
      const fieldToErrorMessage: { [fieldName: string]: string } = await response.json();
      for (const [fieldName, errorMessage] of Object.entries(fieldToErrorMessage)) {
        setError(fieldName, { type: "custom", message: errorMessage });
      }
    } else if (response.ok) {
      // successful
      toast.success("Zapisano!");
    } else {
      // unknown error
      toast.error("Nieoczekiwany błąd podczas zapisywania...");
    }
  };

  // Handle errors + loading state

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const defaultData: string = data.announcement;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {renderForm({ register, watch, errors, isSubmitting, defaultData })}
      <ToastContainer position="bottom-center" />
    </form>
  );
}

export default function AnnouncementForm() {
  const url = "/api/announcement";
  const announcement = "announcement"
  const renderForm = ({ register, watch, errors, defaultData, isSubmitting }: FormProps) => {
    return (
      <>
        <div className="flex flex-col p-2 md:p-4 flex-grow rounded-md md:rounded-xl border-2 border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-700 dark:text-white">
          <h3 className="font-medium text-base md:text-xl lg:text-3xl text-gray-900 dark:text-white">Ogłoszenie</h3>
              <div className="flex flex-row p-5 text-lg">
                <div className="px-2 flex-row justify-center">
                  <input
                    type="text"
                    className="text-base md:text-xl lg:text-3xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={defaultData}
                    {...register(announcement)}
                  />
                  <div className="error">{errors[announcement]?.message}</div>
                </div>
              </div>
          
          <button
            className="items-center bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full p-2 w-1/2 self-center lg:text-2xl"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="inline-flex items-baseline">
                <svg
                  className="motion-reduce:hidden animate-spin -ml-1 mr-3 h-5 w-5 text-white self-center"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Wysyłanie...
              </div>
            ) : (watch("announcement") ?
              "Prześlij" : "Wyczyść"
            )}
          </button>
        </div>
      </>
    );
  };
  return <GenericForm url={url} renderForm={renderForm} />;
}
