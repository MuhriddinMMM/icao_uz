import clsx from "clsx";
import React, { useCallback, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Uzbek from "./uz.png";
import English from "./eng.png";
import Russian from "./ru.png";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navBarRef = useRef(null);
  const location = useLocation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const handleMenuToggle = useCallback(() => {
    setMobileMenuOpen((state) => !state);
  }, []);

  const handleItemClick = useCallback((e) => {
    setMobileMenuOpen(false);
  }, []);

  const { t, i18n } = useTranslation();

  return (
    <div
      className={clsx(
        "bg-white z-20 fixed justify-center top-0 left-0 right-0",
        {
          "bottom-0": mobileMenuOpen,
          "bg-white":
            mobileMenuOpen ||
            (!location.pathname.startsWith("/airport/") &&
              location.pathname !== "/"),
        }
      )}
      ref={navBarRef}
    >
      <div className="px-5 md:px-10 lg:px-20 mx-auto max-w-sreen-lg xl:max-w-screen-xl">
        <div className="flex items-center justify-between py-4">
          {location.pathname !== "/" ? (
            <Link
              to="/"
              className="flex items-center text-sm font-semibold"
              onClick={handleItemClick}
            >
              <img
                className="w-10"
                src="/logo-small.png"
                alt="logo small"
              />
              <div className="ml-3">{t("title")}</div>
            </Link>
          ) : (
            <span></span>
          )}
          {location.pathname !== "/" ? (
            <button
              onClick={handleMenuToggle}
              className="inline-block md:hidden w-8 h-8 text-gray-600 p-1 -mr-1 focus:outline-none"
            >
              <svg
                fill="black"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          ) : null}
          <nav
            className={clsx(
              "fixed md:relative top-20 left-0 bottom-0 md:top-0 w-full bg-white md:flex flex-col md:flex-row md:w-auto bg-white",
              {
                flex: mobileMenuOpen,
                hidden: !mobileMenuOpen,
              }
            )}
          >
            <div className="flex flex-row justify-center align-center">
              {location.pathname !== "/contacts" &&
              location.pathname !== "/" ? (
                <Link
                  to="/contacts"
                  onClick={handleItemClick}
                  className="flex border h-6  border-slate-400 px-3 font-semibold text-sm ml-5 md:ml-0 mr-4 "
                >
                  {t("contacts")}
                </Link>
              ) : null}
              <button className="mr-2" onClick={() => changeLanguage("en")}>
                <img
                  className="flex border w-10 h-6 border-slate-400"
                  src={English}
                />
              </button>
              <button className="mr-2" onClick={() => changeLanguage("uz")}>
                <img
                  className="flex border w-10 h-6 border-slate-400"
                  src={Uzbek}
                />
              </button>
              <button className="mr-2 " onClick={() => changeLanguage("ru")}>
                <img
                  className="flex border w-10 h-6 border-slate-400"
                  src={Russian}
                />
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
