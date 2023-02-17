import { HiOutlineCloudArrowUp } from "react-icons/hi2";

export const FormDropUpload = ({
  height,
  className,
}: {
  height: number | string;
  className?: string;
}) => (
  <label
    htmlFor="dropzone-file"
    className={`hover:bg-bray-800 flex h-${height} w-${height} cursor-pointer flex-col items-center justify-center border-2 border-dashed border-gray-600 bg-gray-700 hover:border-gray-500 hover:bg-gray-600 ${
      className ?? ""
    }`}
  >
    <div
      className={`flex flex-col items-center justify-center ${
        height > 32 ? "pt-5 pb-6" : ""
      }`}
    >
      <HiOutlineCloudArrowUp className={`h-10 w-10 text-gray-400`} />
      {height > 32 && (
        <>
          <p className="my-2 text-sm text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-400">PNG or JPG (max. 4000x4000px)</p>
        </>
      )}
    </div>
    <input id="dropzone-file" type="file" className="hidden" />
  </label>
);
