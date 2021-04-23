import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders app element", () => {
  const { getByTestId } = render(<App />);
  const appDiv = getByTestId("repo-home");
  expect(appDiv).toBeInTheDocument();
});
