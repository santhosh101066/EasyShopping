import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import Store from "./Redux/Store/Store";
import { act } from "react-dom/test-utils";

test("renders category", async () => {
  render(
    <Provider store={Store}>
      <App />
    </Provider>
  );
  expect(screen.getAllByText("Category")[0]).toBeInTheDocument();
});

test("renders product", async () => {
  render(
    <Provider store={Store}>
      <App />
    </Provider>
  );

  const login = screen.getByText("Login");
  act(() => {
    setTimeout(() => {
      login.click();
      expect.any(screen.getByPlaceholderText("Email"));
    }, 1000);
  });
});

test("navigate", async () => {
  render(
    <Provider store={Store}>
      <App />
    </Provider>
  );

  const mobile = await screen.findAllByText("Mobiles");
  act(() => {
    mobile[1].click();
  });
  window.scrollTo = jest.fn();

  const mobileProduct = await screen.findAllByText(
    "Apple iPhone 12 (128GB) - Black"
  );

  expect(mobileProduct[0]).toBeInTheDocument();
  act(() => {
    mobileProduct[0].click();
  });
  expect.any(await screen.findAllByText("Quantity"));
});
