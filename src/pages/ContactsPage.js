import { Helmet } from "react-helmet";
import PageLayout from "../components/PageLayout";
import RunwaysBackground from "../components/RunwaysBackground";
import { useTranslation } from "react-i18next";
const ContactsPage = () => {
  const { t, i18n } = useTranslation();
  return (
    <PageLayout>
      <Helmet>
        <title>
          {t("contacts")} | {t("title")}
        </title>
      </Helmet>
      <div className="relative z-10 pt-40 lg:pt-72 px-5 md:px-10 lg:px-20 pb-40 md:pb-60 xl:pb-96 c-min-h-screen mx-auto max-w-sreen-lg xl:max-w-screen-xl">
        <h1 className="mb-5 block mx-auto max-w-lg text-3xl lg:text-5xl text-center font-bold">
          {t("contacts")}
        </h1>

        <p className="text-center text-sm mb-10">{t("contactPage.text")}</p>

        <div className="lg:flex justify-center">
          <section className="text-center mb-5 lg:mr-6">
            <h2 className="font-semibold mb-1">{t("contactPage.email")}</h2>
            <a href="mailto:mmuxish@gmail.com" target="_blank" rel="noreferrer">
              mmuxish@gmail.com
            </a>
          </section>

          <section className="text-center mb-5 lg:mr-6">
            <h2 className="font-semibold mb-1">{t("contactPage.telegram")}</h2>
            <a
              href="https://t.me/muhriddin_murodov"
              target="_blank"
              rel="noreferrer"
            >
              t.me/muhriddin_murodov
            </a>
          </section>
        </div>
      </div>
      <RunwaysBackground singleRunway />
    </PageLayout>
  );
};

export default ContactsPage;
