import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders category", async () => {
  localStorage.setItem("auth","123")
  render(
      <App />
  );
  expect(screen.getAllByText("Category")[0]).toBeInTheDocument();
});
  