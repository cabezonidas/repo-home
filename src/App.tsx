import { Box, ResponsiveLayout, useTranslation } from "@cabezonidas/shop-ui";
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
  return <ResponsiveLayout header={<Box data-testid="repo-header">{t("app.title")}</Box>} />;
}

export default App;
