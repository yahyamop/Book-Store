/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formUrlQuery({ params, key, value }: any) {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function removeKeysFromQuery({ params, keysToRemove }: any) {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key: any) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const fetcher = async (url: string,jwt?:string) =>
  await axios
    .get(url, {
      withCredentials: true,
      headers: {
        authorization: jwt,
      },
    })
    .then((res) => res.data.results)
    .catch((error) => error.response.data.message);
