import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function Footer() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="mb-5 px-5 md:px-10 lg:px-20 relative z-10 flex items-end justify-between md:items-center mx-auto max-w-sreen-lg xl:max-w-screen-xl">
      <div className="flex flex-col md:flex-row justify-end items-end text-xs text-gray-500 font-medium tracking-wider">
        <Link to="/contacts" className="block md:mr-5">
          {t("contacts")}
        </Link>
        {/* <button
          style={{ marginRight: "20px" }}
          onClick={() => changeLanguage("en")}
        >
          EN
        </button>
        <button
          style={{ marginRight: "20px" }}
          onClick={() => changeLanguage("uz")}
        >
          UZ
        </button>
        <button onClick={() => changeLanguage("ru")}>RU</button> */}
      </div>
    </div>
  );
}
