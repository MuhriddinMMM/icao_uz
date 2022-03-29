import React, { useCallback } from "react";
import { Helmet } from "react-helmet";
import { useHistory, useLocation } from "react-router-dom";
import { useAirport } from "../../AirportContext";
import AirportSelectInput from "../../components/AirportSelectInput";
import PageLayout from "../../components/PageLayout";
import RunwaysBackground from "../../components/RunwaysBackground";
import Compass from "../AirportPage/Compass";
import { useTranslation } from "react-i18next";
import NavBar from "../../components/NavBar";
import AirCraft from "./AirbusA320Neo.png";
export default function SelectAirportPage() {
  const [, setAirport] = useAirport();
  const history = useHistory();
  const location = useLocation();

  const handleAirportLoaded = useCallback(
    (data) => {
      setAirport(data);
      history.push("/airport/" + data.icao);
    },
    [history, setAirport]
  );
  const { t, i18n } = useTranslation();

  return (
    <PageLayout>
      <NavBar />
      <Helmet>
        <title>{t("title")}</title>
      </Helmet>
      <div>
        <div className="relative z-10 min-h-screen flex items-center justify-center c-min-h-screen">
          <div className="mb-10 xl:mb-28">
            <div className="flex justify-center opacity-90">
              <img
                src="/logo.png"
                alt="which runway to choose logo"
                className="w-32 md:w-60"
              />
            </div>
            <h1 className="mb-10 lg:mb-14 block text-center text-4xl lg:text-6xl max-w-lg font-bold">
              {t("title")}
            </h1>
            <div className="mb-10 px-5">
              <AirportSelectInput
                initialError={location.state?.error}
                initialValue={location.state?.icao}
                onDataLoaded={handleAirportLoaded}
              />
            </div>
          </div>
        </div>
      </div>
      <Compass />
      {/* <RunwaysBackground />
      
      
      */}

      <img
        className="fixed inset-0 flex items-center justify-center opacity-5"
        style={{
          position: "absolute",
          transform: "translate(-50%, -50%)",
          top: "50%",
          left: "50%",
          opacity: "0.1",
        }}
        src={AirCraft}
      />
    </PageLayout>
  );
}
