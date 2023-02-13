import Head from "next/head";
import React from "react";
import type { PropsWithChildren } from "react";
import { Sidebar } from "@/components/sidebar";
import {
  AdjustmentsHorizontalIcon,
  StarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Feed } from "@/components/feed";

const GetStars = (outOfFive: number) => {
  return (
    <>
      {[...Array<number>(outOfFive)].map((star) => (
        <StarIcon key={star} className="h-5 text-yellow-400" />
      ))}
      {[...Array<number>(5 - outOfFive)].map((star) => (
        <StarIcon key={star} className="h-5 text-gray-300 dark:text-gray-500" />
      ))}
    </>
  );
};

const FilterOption = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => (
  <div className="space-y-2">
    <h6 className="text-base font-medium text-black dark:text-white">
      {title}
    </h6>
    {children}
  </div>
);

const Content = (
  <main className="p-4 sm:ml-64">
    {/* <!-- drawer init and toggle --> */}
    <div data-dial-init className="group fixed top-6 right-6">
      <button
        type="button"
        data-drawer-target="drawer-example"
        data-drawer-show="drawer-example"
        aria-controls="drawer-example"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-700 text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <AdjustmentsHorizontalIcon className="h-6" />
        <span className="sr-only">Open filters drawer</span>
      </button>
    </div>

    {/* <!-- drawer component --> */}
    <form
      action="#"
      method="get"
      id="drawer-example"
      className="fixed top-0 left-0 z-50 h-screen w-full max-w-xs -translate-x-full overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800"
      tabIndex={-1}
      aria-labelledby="drawer-label"
    >
      <h5
        id="drawer-label"
        className="mb-4 inline-flex items-center text-base font-semibold uppercase text-gray-500 dark:text-gray-400"
      >
        Apply filters
      </h5>
      <button
        type="button"
        data-drawer-dismiss="drawer-example"
        aria-controls="drawer-example"
        className="absolute top-2.5 right-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <XMarkIcon className="h-6 text-gray-500" />
        <span className="sr-only">Close menu</span>
      </button>

      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-6">
          <FilterOption title="Categories">
            <div className="flex items-center">
              <input
                id="gaming"
                type="checkbox"
                defaultValue=""
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
              />

              <label
                htmlFor="gaming"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Goods
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="laptops"
                type="checkbox"
                defaultValue=""
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
              />

              <label
                htmlFor="laptops"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Services
              </label>
            </div>
            <a
              href="#"
              className="flex items-center text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              View all
            </a>
          </FilterOption>
          <FilterOption title="Prices">
            <div className="col-span-2 flex items-center justify-between space-x-3">
              <div className="w-full">
                <label
                  htmlFor="min-experience-input"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  From
                </label>

                <input
                  type="number"
                  id="price-from"
                  defaultValue="300"
                  min="1"
                  max="10000"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder=""
                  required
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="price-to"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  To
                </label>

                <input
                  type="number"
                  id="max-experience-input"
                  defaultValue="3500"
                  min="1"
                  max="10000"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder=""
                  required
                />
              </div>
            </div>
          </FilterOption>
          <FilterOption title="Minimum Seller Rating">
            <div className="flex items-center">
              <input
                id="five-stars"
                type="radio"
                defaultValue=""
                name="rating"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
              />
              <label htmlFor="five-stars" className="ml-2 flex items-center">
                {GetStars(5)}
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="four-stars"
                type="radio"
                defaultValue=""
                name="rating"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
              />
              <label htmlFor="four-stars" className="ml-2 flex items-center">
                {GetStars(4)}
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="three-stars"
                type="radio"
                defaultValue=""
                name="rating"
                defaultChecked
                className="h-4 w-4 border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
              />
              <label htmlFor="three-stars" className="ml-2 flex items-center">
                {GetStars(3)}
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="two-stars"
                type="radio"
                defaultValue=""
                name="rating"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
              />
              <label htmlFor="two-stars" className="ml-2 flex items-center">
                {GetStars(2)}
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="one-star"
                type="radio"
                defaultValue=""
                name="rating"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
              />
              <label htmlFor="one-star" className="ml-2 flex items-center">
                {GetStars(1)}
              </label>
            </div>
          </FilterOption>
        </div>

        <div className="bottom-0 left-0 mt-6 flex w-full justify-center space-x-4 pb-4 md:absolute md:px-4">
          <button
            type="submit"
            className="w-full rounded-lg bg-primary-700 px-5 py-2 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-700 dark:hover:bg-primary-800 dark:focus:ring-primary-800"
          >
            Apply filters
          </button>
          <button
            type="reset"
            className="w-full rounded-lg border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
            Clear all
          </button>
        </div>
      </div>
    </form>
    <Feed />
  </main>
);

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Localist</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      {Content}
    </>
  );
}
