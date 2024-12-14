import { useSelector } from "react-redux";
import { Toast, Spinner } from "flowbite-react";
import { HiCheck, HiBan } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { clearNotification } from "../state/notifications/notificationSlice";

export default function CommonNotifier() {
  const { loading, error, success } = useSelector(
    (state) => state.notification
  );

  const dispatch = useDispatch();

  const closeMessage = () => {
    dispatch(clearNotification());
  };

  return (
    <>
      {error && (
        <div className="absolute left-1/2 top-28 transform -translate-x-1/2 -translate-y-1/2 z-10 min-w-16">
          <Toast className="bg-red-200 dark:bg-red-200 p-1">
            <div
              className="inline-flex h-10 min-w-10 items-center justify-center 
            rounded-lg text-white bg-red-800 dark:bg-red-800 dark:text-red-200"
            >
              <HiBan className="h-5 w-5" />
            </div>
            <div className="ml-2 text-sm font-normal text-gray-800">
              {error}
            </div>
            <Toast.Toggle
              className="hover:bg-red-200 dark:hover:bg-red-200 dark:bg-red-200 bg-red-200 m-1"
              onClick={closeMessage}
            />
          </Toast>
        </div>
      )}
      {success && (
        <div className="absolute left-1/2 top-28 transform -translate-x-1/2 -translate-y-1/2 z-10 min-w-16">
          <Toast className="bg-green-200 dark:bg-green-200 p-1">
            <div
              className="inline-flex h-10 min-w-10 shrink-0 items-center justify-center 
          rounded-lg text-white bg-green-800 dark:bg-green-800 dark:text-green-200"
            >
              <HiCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal text-gray-800">
              {success}
            </div>
            <Toast.Toggle
              className="hover:bg-green-200 dark:hover:bg-green-200 dark:bg-green-200 bg-green-200 ml-4"
              onClick={closeMessage}
            />
          </Toast>
        </div>
      )}
      {loading && (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner size="xl" />
        </div>
      )}
    </>
  );
}
