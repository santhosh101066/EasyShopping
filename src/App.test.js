import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import Store from "./Redux/Store/Store";
import { Navigate } from "react-router-dom";
import ProductPage from "./Components/Product/ProductPage";

test("renders category", async() => {
  render(
    <Provider store={Store}>
      <App />
    </Provider>
  );
    expect.stringMatching("Category" ,await screen.findAllByText("Login"));
});

test("renders product", async() => {
  render(
    <Provider store={Store}>
      <ProductPage/>
    </Provider>
  );
  console.log(await screen.findAllByText('Not Found'));
    // expect.stringMatching("Category" ,await screen.findAllByText("Login"));
});