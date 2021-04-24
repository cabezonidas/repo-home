import { Box } from "@cabezonidas/shop-ui";
import styled from "@cabezonidas/shop-ui/lib/theme/styled";
import React from "react";

export const Thumbnail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Container> & {
    cover: string;
    title: string;
    link: string;
    count: number;
  }
>((props, ref) => {
  const { cover, title, link, count, ...rest } = props;

  return (
    <Container cover={cover} {...rest} ref={ref}>
      <Metadata>{title}</Metadata>
    </Container>
  );
});

const Container = styled(Box)<{ cover: string }>(({ cover, theme }) => ({
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  minHeight: 200,
  minWidth: 200,
  backgroundImage: `url(${cover})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "50%",
  cursor: "pointer",
  color: theme.colors.neutral.light,
  transition: "font-size ease 0.2s",
  textShadow: "0 2px 5px #000",
  fontSize: 22,
  "&:hover": {
    fontSize: 24,
  },
})).withComponent("button");

const Metadata = styled(Box)(() => ({
  wordBreak: "break-word",
  margin: 10,
  fontWeight: 400,
  paddingTop: "auto",
})).withComponent("h4");
