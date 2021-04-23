import { ResponsiveLayout, useTranslation } from "@cabezonidas/shop-ui";
import React from "react";

const enUs = {
  title: "De las Artes",
};
const esAr = {
  title: "De las Artes",
};

function App() {
  const { t, i18n } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", { app: enUs }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { app: esAr }, true, true);
  return <ResponsiveLayout header={t("app.title")} />;
}

export default App;
