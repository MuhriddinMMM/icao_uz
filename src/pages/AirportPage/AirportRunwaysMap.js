import React, { useEffect, useRef, useState } from "react";
import RunwaysMap from "../../components/RunwaysMap/RunwaysMap";
import FlightRadar from "./fr24_logo.png";
import GoogleMAps from "./Google-Maps.png";
import { useTranslation } from "react-i18next";
import axios from "axios";
const initialStateAirportInfo = {
  googleMaps: "",
  flightRadar: "",
  wikipedia: "",
};
export default function AirportRunwaysMap(props) {
  const { airport, activeRunwaysData } = props;

  const [copySuccess, setCopySuccess] = useState("");
  const textAreaRef = useRef(null);
  const [airportINFO, setAirportINFO] = useState(initialStateAirportInfo);
  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://aerodatabox.p.rapidapi.com/airports/icao/${airport.icao}`,
      headers: {
        "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
        "X-RapidAPI-Key": "86bf410945mshad0ca55a489b485p16783cjsn049550a56268",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setAirportINFO(response.data?.urls);
      })
      .catch(function (error) {
        console.error(error);
        setAirportINFO(initialStateAirportInfo);
      });

    // var options = {
    //   method: "GET",
    //   url: `https://aerodatabox.p.rapidapi.com/airports/icao/${airport.icao}`,
    //   headers: {
    //     "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
    //     "X-RapidAPI-Key": "86bf410945mshad0ca55a489b485p16783cjsn049550a56268",
    //   },
    // };
    // axios
    //   .request(options)
    //   .then(function (response) {
    //     console.log(response.data);
    //     setAirportINFO(response.data?.urls);
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //     setAirportINFO(initialStateAirportInfo);
    //   });
  }, [airport.icao]);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");

    e.target.focus();
    setCopySuccess(t("aiportPage.Copied"));
  }
  const { t, i18n } = useTranslation();

  return (
    <div className="mb-28 md:mb-40">
      <h2 className="mb-6 max-w-lg mx-auto text-4xl font-semibold text-center">
        {airport.icao} {t("aiportPage.RunwaysMap")}
      </h2>
      <div className="mb-28 max-w-lg mx-auto text-center text-sm">
        {t("aiportPage.RunwaysPosition")}
      </div>
      <div>
        <RunwaysMap
          runwaysData={airport.runways}
          activeRunwaysData={activeRunwaysData}
        />
        {airportINFO.googleMaps?.length > 0 && (
          <>
            {" "}
            <h2 className="mb-6 mt-20 max-w-lg mx-auto text-2xl font-semibold text-center">
              {airport.icao}
              <br />
              {t("aiportPage.Google")}
            </h2>
            <a
              className="flex justify-center opacity-90 mb-28"
              href={airportINFO.googleMaps}
              target="_blank"
            >
              <img className="w-64 rounded-3xl" src={GoogleMAps} alt="" />
            </a>
          </>
        )}
        {airportINFO.flightRadar?.length > 0 && (
          <div className="flex justify-center flex-col items-center mb-28">
            {document.queryCommandSupported("copy") && (
              <div className="flex justify-center opacity-90 mb-28">
                <button
                  className="flex flex-col juctify-center items-center"
                  onClick={copyToClipboard}
                >
                  <h2 className="mb-6 max-w-lg mx-auto text-2xl font-semibold text-center">
                    {airport.icao}
                    <br />
                    {t("copyRadar")}
                  </h2>
                  <p className="text-green-600"> {copySuccess}!!!</p>

                  <img
                    className="w-32 md:w-60 rounded-3xl"
                    src={FlightRadar}
                    alt=""
                  />
                </button>
              </div>
            )}
            <form className="w-full">
              <input
                className="text-center mt-1 block  px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 w-full
    "
                type="text"
                ref={textAreaRef}
                value={airportINFO.flightRadar}
              />
            </form>
          </div>
        )}

        {airportINFO.wikipedia?.length > 0 && (
          <iframe
            style={{ marginLeft: "15%", marginRight: "15%" }}
            className="mx-10"
            src={airportINFO.wikipedia}
            width="70%"
            height="900"
          ></iframe>
        )}
      </div>
    </div>
  );
}
