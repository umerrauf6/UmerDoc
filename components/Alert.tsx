import { useAppSelector } from "@/app/redux/hooks";
import { selectApp } from "@/app/redux/feature/slice";
export default function Alert() {
  const { alertText, alertType } = useAppSelector(selectApp);

  return (
    <div
      className={`w-full text-white ${
        alertType === "success" ? "bg-blue-700" : "bg-red-700"
      } hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
    >
      {alertText}
    </div>
  );
}
