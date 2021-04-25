import { Box, H1, Paragraph, transform, useBreakpoint } from "@cabezonidas/shop-ui";
import styled from "@cabezonidas/shop-ui/lib/theme/styled";
import React from "react";

const originalWidth = { w: 4288, h: 2848 };
const heightRatio = originalWidth.h / originalWidth.w;

export const LandingSection = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Container>
>(({ children, ...props }, ref) => {
  const { isLarge, isMediumLarge } = useBreakpoint();

  const [height, setHeight] = React.useState(window.innerWidth * heightRatio);

  React.useLayoutEffect(() => {
    const adjust = () => setHeight(window.innerWidth * heightRatio);
    window.addEventListener("resize", adjust);
    return () => {
      window.removeEventListener("resize", adjust);
    };
  }, []);

  const { w, h } = isLarge
    ? { w: 4288, h: 2848 }
    : isMediumLarge
    ? { w: 2144, h: 1424 }
    : { w: 1072, h: 712 };

  const backgroundImage = `url(${transform(
    "https://img.javascript.kiwi.s3.amazonaws.com/Repo-home/red-curtains-clipart-20.jpeg",
    { width: `${w}px`, height: `${h}px` }
  )})`;

  return (
    <Container ref={ref} {...{ backgroundImage, height }} {...props}>
      <Title />
      {children}
    </Container>
  );
});

const Container = styled(Box)`
  min-width: 250px;
  width: 100%;
  min-height: 500px;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  text-shadow: 0 2px 5px #000;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Title = React.memo(() => {
  const { isLarge, isMediumLarge, isMedium } = useBreakpoint();
  const fontSize = isLarge ? 150 : isMediumLarge ? 120 : isMedium ? 100 : 80;
  const fontSizeLogo = isLarge ? 130 : isMediumLarge ? 100 : 55;
  return (
    <Box>
      <Years css={{}} {...{ fontSize }} textAlign="center">
        1992 - 2021
      </Years>
      <Box display="flex" justifyContent="center" my="8">
        <LogoContainer>
          <Logo {...{ fontSize: fontSizeLogo }}>De las Artes</Logo>
        </LogoContainer>
      </Box>
      <Heading css={{}} my="5">
        🍾 Fin de un ciclo 🎉
      </Heading>
      <Paragraph mb="3" textAlign="center">
        Las puertas de nuestro local se cierran, pero nosotros seguimos estando!
      </Paragraph>
    </Box>
  );
});

const Heading = styled(H1)(({ theme }) => ({
  textAlign: "center",
  textTransform: "uppercase",
}));

const Years = styled(Paragraph)(() => ({
  fontFamily: "'Tangerine', cursive",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  userSelect: "none",
  textAlign: "center",
  marginTop: "-10%",
}));

const Logo = styled(Box)(() => ({
  fontFamily: "'Tangerine', cursive",
  padding: 30,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  userSelect: "none",
}));

const LogoContainer = styled(Box)(() => ({
  borderRadius: "50%",
  border: "3px solid",
  boxShadow: "0 2px 5px #000",
  overflow: "hidden",
}));
