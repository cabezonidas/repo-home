import { Box } from "@cabezonidas/shop-ui";
import styled from "@cabezonidas/shop-ui/lib/theme/styled";
import React from "react";
import { Products } from "./products";

export const Info = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Container>>(
  ({ children, ...props }, ref) => {
    return (
      <Container ref={ref} {...props}>
        <Products />
        {children}
      </Container>
    );
  }
);

const Container = styled(Box)`
  min-height: 400px;
`;
