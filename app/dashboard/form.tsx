"use client";

// Based on https://www.propelauth.com/post/creating-advanced-reusable-forms-in-next-js
import { FieldValues, useForm, UseFormRegister } from "react-hook-form";
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
  isSubmitting: boolean;
  errors: { [error: string]: any };
  defaultData: Currency[];
};

function GenericForm({ url, renderForm }: Props) {
  // Fetch our initial form data
  const { data, error, isLoading } = useSWR(url, fetcher);

  const {
    register,
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

  const defaultData: Currency[] = data;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {renderForm({ register, errors, isSubmitting, defaultData })}
      <ToastContainer position="bottom-center" />
    </form>
  );
}

export default function Form() {
  const url = "/api/exchangetabledata";
  const renderForm = ({ register, errors, defaultData, isSubmitting }: FormProps) => {
    return (
      <>
        <div className="flex flex-col p-2 md:p-4 rounded-md md:rounded-xl border-2 border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-700 dark:text-white">
          {defaultData.map((currency) => {
            const nameBuy = currency.representation + " " + currency.name + " Buy";
            const nameSell = currency.representation + " " + currency.name + " Sell";

            return (
              <div key={currency.name} className="flex flex-row p-5 text-lg">
                <div className="px-2 flex-row justify-center">
                  <label className="block" htmlFor={nameBuy}>
                    {nameBuy}
                  </label>
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    step="0.01"
                    placeholder={String(currency.buy)}
                    {...register(nameBuy)}
                  />
                  <div className="error">{errors[nameBuy]?.message}</div>
                </div>
                <div>
                  <label className="block" htmlFor={nameSell}>
                    {nameSell}
                  </label>
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    step="0.01"
                    placeholder={String(currency.sell)}
                    {...register(nameSell)}
                  />
                  <div className="error">{errors[nameSell]?.message}</div>
                </div>
              </div>
            );
          })}

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full p-2 w-1/2 self-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Wysyłanie..." : "Prześlij"}
          </button>
        </div>
      </>
    );
  };
  return <GenericForm url={url} renderForm={renderForm} />;
}
