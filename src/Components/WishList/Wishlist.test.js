import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Store from "../../Redux/Store/Store";
import Wishlist from "./Wishlist";
import * as React from "react";
import MockAdapter from "axios-mock-adapter";
import AxiosApi from "../../Api/AxiosApi";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => () => jest.fn(),
}));
describe("Wishlist", () => {
  const mockAxios = new MockAdapter(AxiosApi);
  test("Render Component", async () => {
    Object.defineProperty(window, "scrollTo", { value: jest.fn() });
    mockAxios.onGet("wishlistpage").reply(200, [
      {
        id: 6,
        title: "OPPO A74 5G (Fantastic Purple,6GB RAM,128GB Storage)",
        price: "15490",
        wish_id: 7,
      },
    ]);
    render(
      <Provider store={Store}>
        <Wishlist />
      </Provider>
    );
    mockAxios.onDelete("wishlist/6").reply(200, []);
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {});
    screen
      .getByText("OPPO A74 5G (Fantastic Purple,6GB RAM,128GB Storage)")
      .click();
  });
  test("Render Component with Exception", async () => {
    Object.defineProperty(window, "scrollTo", { value: jest.fn() });
    mockAxios.onGet("wishlistpage").networkError();
    render(
      <Provider store={Store}>
        <Wishlist />
      </Provider>
    );
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {});
  });
  test("Render Component delete", async () => {
    Object.defineProperty(window, "scrollTo", { value: jest.fn() });
    mockAxios.onGet("wishlistpage").reply(200, [
      {
        id: 6,
        title: "OPPO A74 5G (Fantastic Purple,6GB RAM,128GB Storage)",
        price: "15490",
        wish_id: 7,
      },
    ]);
    render(
      <Provider store={Store}>
        <Wishlist />
      </Provider>
    );
    mockAxios.onDelete("wishlist/6").reply(200, []);
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {});
    screen.getByTestId("delete-button").click();
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {});
  });
});
