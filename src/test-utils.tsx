import React from "react";
import { render as externalRender } from "@testing-library/react";
import { UiProvider } from "@cabezonidas/shop-ui";
import { NetworkProvider } from "./network-provider";

export const render = (...args: Parameters<typeof externalRender>) => {
  const [ui, ...other] = args;
  return externalRender(
    <UiProvider>
      <NetworkProvider>{ui}</NetworkProvider>
    </UiProvider>,
    ...other
  );
};
