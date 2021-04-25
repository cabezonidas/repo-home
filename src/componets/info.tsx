import { Box, useBreakpoint, Anchor } from "@cabezonidas/shop-ui";
import styled from "@cabezonidas/shop-ui/lib/theme/styled";
import React from "react";
import { Products } from "./products";

const pic1 = `https://farm2.staticflickr.com/1902/31026521298_84724a4793_o.jpg`;

export const Info = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Container>>(
  ({ children, ...props }, ref) => {
    const { isMediumSmall, isLarge, isMediumLarge } = useBreakpoint();

    const fontSizeHeading = isLarge ? 100 : isMediumLarge ? 80 : 55;

    const style = !isMediumSmall
      ? {
          display: "block",
        }
      : {
          display: "grid",
          gridTemplateColumns: "50% 50%",
        };

    return (
      <Container ref={ref} {...props}>
        <Fader />
        <Heading css={{}} mb="8" textAlign="center" fontSize={fontSizeHeading}>
          Marcela y Claudio
        </Heading>
        <Box style={style}>
          <Img1
            src={pic1}
            my="auto"
            width={"80%"}
            alt={"Marcela y Claudio"}
            m={!isMediumSmall ? "auto" : undefined}
            ml={isMediumSmall ? "auto" : undefined}
            pr={isMediumSmall ? "20px" : undefined}
          />
          <Box
            display="grid"
            height="max-content"
            gridGap="2"
            my="auto"
            maxWidth="80%"
            textAlign="justify"
            mx={!isMediumSmall ? "auto" : undefined}
          >
            <Box>
              ¡Hola! 👋🏻 Espero que estés muy bien. Nosotros, Marcela y Claudio, fundamos De las
              Artes en 1992.
            </Box>
            <Box>
              Durante casi 30 años nos dedicamos a la elaboración de comidas y postres y nos ha ido
              muy bien.
            </Box>
            <Box>
              Lamentablemente, llegó la hora de cerrar las puertas de nuestra sucursal luego de
              tantos años de trabajo.
            </Box>
            <Box>
              La buena noticia, es que mantendremos un catálogo pequeño de nuestros postres y
              comidas más taquilleras.
            </Box>
            <Box>
              Podés seguir encontrándonos en nuestras redes 📲, y la mejor manera de contactarte es
              a través de nuestro celular.
            </Box>
            <Box fontWeight="bold">Contacto</Box>
            <Box>
              ➡️{" "}
              <Anchor css={{}} href="https://api.whatsapp.com/send?phone=5491127778899">
                11 2777 8899
              </Anchor>{" "}
              (WhatsApp - Sólo mensajes)
            </Box>
          </Box>
        </Box>
        <Box
          fontSize={isMediumSmall ? "50px" : "30px"}
          display="grid"
          gridTemplateColumns={`repeat(4, ${isMediumSmall ? "100px" : "65px"})`}
          width="max-content"
          mx="auto"
          mt="50px"
          textAlign="center"
        >
          <Box>🍰</Box>
          <Box>🥧</Box>
          <Box>🎂</Box>
          <Box>🍪</Box>
        </Box>

        <Products />
        {children}
      </Container>
    );
  }
);

const Heading = styled(Box)(() => ({
  fontFamily: "'Tangerine', cursive",
  padding: 30,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  userSelect: "none",
}));

const Container = styled(Box)`
  min-height: 400px;
`;

const Img1 = styled(Box)`
  display: block;
  max-width: 350px;
`.withComponent("img");

const Fader = styled(Box)(({ theme }) => ({
  width: "100%",
  height: 130,
  backgroundImage: `linear-gradient(black, ${theme.colors.neutral.darkest})`,
}));
