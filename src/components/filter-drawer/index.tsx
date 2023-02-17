import React from "react";
import type { PropsWithChildren } from "react";
import { HiAdjustmentsHorizontal, HiXMark } from "react-icons/hi2";
import StarRatingInput from "./star-rating-input";

const FilterOption = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => (
  <div className="space-y-2">
    <h6 className="text-base font-medium">{title}</h6>
    {children}
  </div>
);

const ToggleFilterDrawerButton = () => {
  return (
    <div data-dial-init className="group fixed top-6 right-6">
      <button
        type="button"
        data-drawer-target="drawer-example"
        data-drawer-show="drawer-example"
        aria-controls="drawer-example"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800"
      >
        <HiAdjustmentsHorizontal className="h-6 w-6" />
        <span className="sr-only">Open filters drawer</span>
      </button>
    </div>
  );
};

const FilterDrawer = () => (
  <>
    <ToggleFilterDrawerButton />
    <form
      action="#"
      method="get"
      id="drawer-example"
      className="fixed top-0 left-0 z-50 h-screen w-full max-w-xs -translate-x-full overflow-y-auto bg-gray-800 p-4 transition-transform"
      tabIndex={-1}
      aria-labelledby="drawer-label"
    >
      <h5
        id="drawer-label"
        className="mb-4 inline-flex items-center text-base font-semibold uppercase text-gray-400"
      >
        Apply filters
      </h5>
      <button
        type="button"
        data-drawer-dismiss="drawer-example"
        aria-controls="drawer-example"
        className="absolute top-2.5 right-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-600 hover:text-white"
      >
        <HiXMark className="h-6 text-gray-400" />
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
                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-primary-600 ring-offset-gray-800 focus:ring-2 focus:ring-primary-600"
              />

              <label
                htmlFor="gaming"
                className="ml-2 text-sm font-medium text-gray-300"
              >
                Goods
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="laptops"
                type="checkbox"
                defaultValue=""
                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-primary-600 ring-offset-gray-800 focus:ring-2 focus:ring-primary-600"
              />

              <label
                htmlFor="laptops"
                className="ml-2 text-sm font-medium text-gray-300"
              >
                Services
              </label>
            </div>
            <a
              href="#"
              className="flex items-center text-sm font-medium text-primary-500 hover:underline"
            >
              View all
            </a>
          </FilterOption>
          <FilterOption title="Prices">
            <div className="col-span-2 flex items-center justify-between space-x-3">
              <div className="w-full">
                <label
                  htmlFor="min-experience-input"
                  className="mb-2 block text-sm font-medium"
                >
                  From
                </label>

                <input
                  type="number"
                  id="price-from"
                  defaultValue="300"
                  min="1"
                  max="10000"
                  className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm placeholder-gray-400 focus:border-primary-500 focus:ring-primary-500"
                  placeholder=""
                  required
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="price-to"
                  className="mb-2 block text-sm font-medium"
                >
                  To
                </label>

                <input
                  type="number"
                  id="max-experience-input"
                  defaultValue="3500"
                  min="1"
                  max="10000"
                  className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm placeholder-gray-400 focus:border-primary-500 focus:ring-primary-500"
                  placeholder=""
                  required
                />
              </div>
            </div>
          </FilterOption>
          <FilterOption title="Minimum Seller Rating">
            <StarRatingInput defaultValue={3} />
          </FilterOption>
        </div>

        <div className="bottom-0 left-0 mt-6 flex w-full justify-center space-x-4 pb-4 md:absolute md:px-4">
          <button
            type="submit"
            className="w-full rounded-lg bg-primary-700 px-5 py-2 text-center text-sm font-medium hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-800"
          >
            Apply filters
          </button>
          <button
            type="reset"
            className="w-full rounded-lg border border-gray-600 bg-gray-800 px-5 py-2 text-sm font-medium text-gray-400 hover:bg-gray-700 hover:text-white focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-700"
          >
            Clear all
          </button>
        </div>
      </div>
    </form>
  </>
);

export default FilterDrawer;
