import { useTranslation } from "react-i18next";
import Header from "./header";

const App = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Header />
      <div style={{ margin: "2em" }}>
        <h4>{t("home.title1")}</h4>
        <p>{t("home.content11")}</p>
        <h4>{t("home.title2")}</h4>
        <p>{t("home.content21")}</p>
        <p>{t("home.content22")}</p>
      </div>
    </div>
  );
};

export default App;
