import React from "react";
import { render as externalRender } from "@testing-library/react";
import { UiProvider } from "@cabezonidas/shop-ui";

export const render = (...args: Parameters<typeof externalRender>) => {
  const [ui, ...other] = args;
  return externalRender(<UiProvider>{ui}</UiProvider>, ...other);
};
