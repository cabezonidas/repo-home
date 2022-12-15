import {
  Box,
  Email,
  Facebook,
  FooterLink,
  Instagram,
  Messenger,
  NavLink,
  ResponsiveLayout,
  useTranslation,
  Whatsapp,
} from "@cabezonidas/shop-ui";
import styled from "@cabezonidas/shop-ui/lib/theme/styled";
import { Info } from "./componets/info";
import { LandingSection } from "./componets/landing-section";

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

  return (
    <ResponsiveLayout
      header={<CompanyName data-testid="repo-header">{t("app.title")}</CompanyName>}
      nav={
        <>
          <NavLink css={{}} href="https://api.whatsapp.com/send?phone=5491127778899">
            <Box display="grid" gridTemplateColumns="auto 1fr" gridGap="4">
              <Whatsapp css={{}} />
              <Box>11 2777 8899 (Sólo mensajes)</Box>
            </Box>
          </NavLink>
          <NavLink css={{}} href="https://www.instagram.com/ReposteriaDeLasArtes">
            <Box display="grid" gridTemplateColumns="auto 1fr" gridGap="4">
              <Instagram css={{}} />
              <Box>Instagram</Box>
            </Box>
          </NavLink>
          <NavLink css={{}} href="https://www.facebook.com/ReposteriaDeLasArtes">
            <Box display="grid" gridTemplateColumns="auto 1fr" gridGap="4">
              <Facebook css={{}} />
              <Box>Facebook</Box>
            </Box>
          </NavLink>
          <NavLink css={{}} href="https://www.messenger.com/t/ReposteriaDeLasArtes">
            <Box display="grid" gridTemplateColumns="auto 1fr" gridGap="4">
              <Messenger css={{}} />
              <Box>Messenger</Box>
            </Box>
          </NavLink>
        </>
      }
      footer={
        <Box display="flex" justifyContent="space-between">
          <Box
            display="grid"
            gridTemplateColumns="auto 50px 50px 50px 50px 50px"
            width="100%"
            alignItems="center"
          >
            <Box />
            <FooterLink css={{}} href="https://api.whatsapp.com/send?phone=5491127778899">
              <Whatsapp css={{}} />
            </FooterLink>
            <FooterLink css={{}} href="https://www.instagram.com/ReposteriaDeLasArtes">
              <Instagram css={{}} />
            </FooterLink>
            <FooterLink css={{}} href="https://www.facebook.com/ReposteriaDeLasArtes">
              <Facebook css={{}} />
            </FooterLink>
            <FooterLink css={{}} href="https://www.messenger.com/t/ReposteriaDeLasArtes">
              <Messenger css={{}} />
            </FooterLink>
          </Box>
        </Box>
      }
    >
      <LandingSection />
      <Info marginBottom={40} />
    </ResponsiveLayout>
  );
}

export default App;

const CompanyName = styled(Box)(() => ({
  marginBottom: -4,
  fontSize: 30,
  fontFamily: "'Tangerine', cursive",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  userSelect: "none",
}));
