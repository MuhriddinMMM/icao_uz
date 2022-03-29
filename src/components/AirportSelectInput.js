import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import useAirportFetch from "../hooks/useAirportFetch";
import { useTranslation } from "react-i18next";
export default function AirportSelectInput(props) {
  const [icaoValue, setIcaoValue] = useState(props.initialValue ?? "");
  const [error, setError] = useState(props.initialError ?? null);
  const [edited, setEdited] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const debouncedIcaoValue = useDebounced(icaoValue, 500);

  const handleIcaoValueChange = useCallback((e) => {
    setError(null);
    setIcaoValue(e.target.value);
    setEdited(true);
  }, []);

  const fetchData = useAirportFetch({
    onLoading: setLoading,
    onError: setError,
    onLoaded: props.onDataLoaded,
  });

  useEffect(() => {
    if (debouncedIcaoValue) {
      fetchData(debouncedIcaoValue);
    } else if (edited) {
      setLoading(false);
      setError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedIcaoValue]);
  const { t, i18n } = useTranslation();
  return (
    <div className="text-center relative">
      {error ? (
        <div className="mb-3 font-semibold text-sm text-red-600 max-w-xs mx-auto">
          {error}
        </div>
      ) : null}
      <div className="max-w-xs mx-auto relative">
        <input
          value={icaoValue}
          onChange={handleIcaoValueChange}
          type="text"
          className={`block bg-white w-full mx-auto uppercase border-2 border-black rounded-md h-14 text-2xl font-semibold text-center
         outline-none placeholder-opacity-0`}
          placeholder={t("enterIcao")}
        />
        <div className="mt-12 ">
          <select
            className="text-center form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base font-normal text-gray-700  bg-white bg-clip-padding bg-no-repeat  border border-solid border-gray-300  rounded  transition   ease-in-out  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
            onChange={handleIcaoValueChange}
          >
            <option selected>[ {t("airportList")}... ]</option>
            <option value="UTNN">UTNN</option>
            <option value="UTSB">UTSB</option>
            <option value="UTTT">UTTT</option>
            <option value="UTSS">UTSS</option>
            <option value="UTST">UTST</option>
            <option value="UTNU">UTNU</option>

            <option value="ZGGG">ZGGG</option>
            <option value="ZUUU">ZUUU</option>
            <option value="KDFW">KDFW</option>
            <option value="ZGSZ">ZGSZ</option>
            <option value="KDEN">KDEN</option>
            <option value="ZBAA">ZBAA</option>

            <option value="ZPPP">ZPPP</option>
            <option value="RJTT">RJTT</option>
            <option value="OMDB">OMDB</option>
            <option value="LTFM">LTFM</option>
            <option value="EGLL">EGLL</option>
            <option value="UUEE">UUEE</option>
          </select>
        </div>

        {isLoading || error ? (
          <div
            className={clsx("absolute right-4 top-4 text-gray-300", {
              "text-red-500": error,
            })}
          >
            <FontAwesomeIcon
              icon={[
                "fas",
                isLoading
                  ? "circle-notch"
                  : error
                  ? "exclamation-triangle"
                  : null,
              ]}
              spin={isLoading}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

const useDebounced = (value, delay) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
};
