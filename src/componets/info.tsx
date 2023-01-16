import { Box, useBreakpoint } from "@cabezonidas/shop-ui";
import styled from "@cabezonidas/shop-ui/lib/theme/styled";
import React from "react";
import { Products } from "./products";

export const Info = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Container>>(
  ({ children, ...props }, ref) => {
    const { isMediumSmall } = useBreakpoint();

    return (
      <Container ref={ref} {...props}>
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

const Container = styled(Box)`
  min-height: 400px;
`;
