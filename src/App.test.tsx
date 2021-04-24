import React from "react";
import App from "./App";
import { render } from "./test-utils";

test("renders header", async () => {
  const { findByTestId } = render(<App />);
  const headerDiv = await findByTestId("repo-header");
  expect(headerDiv.innerHTML).toBe("De las Artes");
});
