import axios from "axios";
import { useTranslation } from "react-i18next";
import { useCallback, useState } from "react";

// var axios = require("axios").default;

const useAirportFetch = ({ onLoading, onError, onLoaded }) => {
  const [airports, setAirports] = useState();
  const fetch = useCallback(
    async (icaoValue) => {
      onLoading && onLoading(true);
      onError(null);
      try {
        const responseAirport = await axios.get(
          "https://airportdb.io/api/v1/airport/" +
            icaoValue +
            "?apiToken=99f74c03dbe2231a205e8c596694c5640818775457164219520635b21ea9a78293834eeb5b91887babf6c0309dab7d61"
        );
        const responseWeather = await axios.get(
          " https://api.checkwx.com/metar/" +
            icaoValue +
            "/decoded?x-api-key=c495afdf19b34cb989ca194136"
        );

        // var options = {
        //   method: "GET",
        //   url: `https://aerodatabox.p.rapidapi.com/airports/icao/${icaoValue}`,
        //   headers: {
        //     "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
        //     "X-RapidAPI-Key":
        //       "86bf410945mshad0ca55a489b485p16783cjsn049550a56268",
        //   },
        // };
        // const AirportWebsite = await axios.get(
        //   "https://aerodatabox.p.rapidapi.com/airports/icao/" + icaoValue
        // );

        // axios
        //   .request(options)
        //   .then(function (response) {
        //     console.log(response.data);
        //     setAirports(response.data.urls);
        //   })
        //   .catch(function (error) {
        //     console.error(error);
        //   });

        let dataFilling = {
          name: responseAirport.data.name,
          metar: responseWeather.data.data[0].raw_text,
          runways: responseAirport.data.runways,
          wind_direction: responseWeather.data.data[0].wind.degrees,
          wind_speed: responseWeather.data.data[0].wind.speed_kts,
          icao: responseAirport.data.icao_code,
          station: responseAirport.data.station,
          time: responseWeather.data.data[0].observed,
        };
        const data = dataFilling;

        if (!data) {
          throw new Error("No data received");
        }
        if (data.error) {
          onError(data.error);
          onLoading && onLoading(false);
          return;
        }
        onLoading && onLoading(false);
        onLoaded(data);
      } catch (err) {
        console.error(err);
        onError(t("error"));
        onLoading && onLoading(false);
      }
    },
    [onLoading, onError, onLoaded]
  );
  const { t, i18n } = useTranslation();

  return fetch;
};

export default useAirportFetch;
