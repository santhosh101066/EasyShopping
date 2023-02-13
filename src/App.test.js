import { render, screen } from "@testing-library/react";
import App from "./App";
import { act } from "react-test-renderer";
import MockAdapter from "axios-mock-adapter";
import AxiosApi from "./Api/AxiosApi";
import { Provider } from "react-redux";
import Store from "./Redux/Store/Store";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParam: () => ({ type: "laptop" }),
}));

describe("Main", () => {
  const mockAxios = new MockAdapter(AxiosApi);
  test("renders category", () => {
    render(<App />);
    expect(screen.getAllByText("Category")[0]).toBeInTheDocument();
  });
  test("click Carousels", async () => {
    mockAxios.onGet("product/basic/laptop").reply(200, []);
    render(
      <Provider store={Store}>
        <App />
      </Provider>
    );
    await act(async () => {
      screen.getAllByTestId("carousel-1")[0].click();
      screen.getAllByTestId("carousel-2")[0].click();
      screen.getAllByTestId("carousel-3")[0].click();
      screen.getAllByText("Laptops")[1].click();
    });
  });
  test("click  exception", async () => {
    mockAxios.onGet("product/basic/laptop").reply(404, {});
    render(
      <Provider store={Store}>
        <App />
      </Provider>
    );
    await act(async () => {
      screen.getAllByText("Laptops")[0].click();
    });
  });
  test("Network exception", async () => {
    mockAxios.onGet("product/basic/laptop").networkError();
    render(
      <Provider store={Store}>
        <App />
      </Provider>
    );
    await act(async () => {
      screen.getAllByText("Laptops")[0].click();
    });
  });
});
