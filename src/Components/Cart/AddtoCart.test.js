import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Store from "../../Redux/Store/Store";
import AddtoCart from "./AddtoCart";
import MockAdapter from "axios-mock-adapter";
import AxiosApi from "../../Api/AxiosApi";
import * as React from "react";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  useHref: jest.fn(),
}));
describe("Cart", () => {
  const mockFn = jest.fn();
  const mockAxios = new MockAdapter(AxiosApi);
  const mockState = jest.spyOn(React, "useState");
  it("Display Cart", () => {
    mockAxios.onGet("cartpage").reply(200, [{}]);
    mockAxios
      .onPut("addtocart/1", { id: 1, p_id: 1, quantity: null })
      .reply(200, {});
    mockState
      .mockImplementationOnce((init) => [
        [
          {
            id: 1,
            title: "ASUS VivoBook 15 (2021)",
            image: "/assets/images/p1.jpg",
            price: 25400,
            category: "laptop",
            cart_id: 1,
            maxQty: 10,
            quantity: 3,
          },
        ],
        (a) => {
          a instanceof Function &&
            a([
              {
                id: 1,
                title: "ASUS VivoBook 15 (2021)",
                image: "/assets/images/p1.jpg",
                price: 25400,
                category: "laptop",
              },
            ]);
          return [
            {
              id: 1,
              title: "ASUS VivoBook 15 (2021)",
              image: "/assets/images/p1.jpg",
              price: 25400,
              category: "laptop",
            },
          ];
        },
      ])
      .mockImplementation((init) => [init, mockFn])
      .mockImplementation((init) => [
        init,
        (a) => a instanceof Function && a(),
      ]);
    mockAxios.onDelete("cart/1").reply(200, {});
    mockAxios.onGet("cartcount").reply(200, 1);
    render(
      <Provider store={Store}>
        <AddtoCart />
      </Provider>
    );
    screen.getByTestId("cart-delete").click();
    screen.getByText("ASUS VivoBook 15 (2021)").click();
    screen.getByText("+").click();
    screen.getByText("+").click();
    screen.getByText("-").click();
  });
  it("Display Cart with Axios exception", () => {
    mockState
      .mockImplementationOnce((init) => [
        [
          {
            id: 1,
            title: "ASUS VivoBook 15 (2021)",
            image: "/assets/images/p1.jpg",
            price: 25400,
            category: "laptop",
            quantity: 6,
          },
        ],
        mockFn,
      ])
      .mockImplementation((init) => [init, mockFn]);
    mockAxios.onGet("cartpage").reply(404, []);
    render(
      <Provider store={Store}>
        <AddtoCart />
      </Provider>
    );
  });
  it("dont filter", () => {
    mockAxios.onGet("cartpage").reply(200, [{}]);
    mockAxios
      .onPut("addtocart/1", { id: 1, p_id: 1, quantity: null })
      .reply(200, {});
    mockState
      .mockImplementationOnce((init) => [
        [
          {
            id: 2,
            title: "ASUS VivoBook 15 (2021)",
            image: "/assets/images/p1.jpg",
            price: 25400,
            category: "laptop",
            cart_id: 1,
            maxQty: 10,
            quantity: 3,
          },
        ],
        (a) => {
          a instanceof Function &&
            a([
              {
                id: 3,
                title: "ASUS VivoBook 15 (2021)",
                image: "/assets/images/p1.jpg",
                price: 25400,
                category: "laptop",
                cart_id: 1,
                maxQty: 10,
                quantity: 3,
              },
              {
                id: 1,
                title: "ASUS VivoBook 15 (2021)",
                image: "/assets/images/p1.jpg",
                price: 25400,
                category: "laptop",
                cart_id: 1,
                maxQty: 10,
                quantity: 3,
              },
            ]);
          return [
            {
              id: 3,
              title: "ASUS VivoBook 15 (2021)",
              image: "/assets/images/p1.jpg",
              price: 25400,
              category: "laptop",
            },
          ];
        },
      ])
      .mockImplementation((init) => [init, mockFn])
      .mockImplementation((init) => [
        init,
        (a) => a instanceof Function && a(),
      ]);
    mockAxios.onDelete("cart/2").reply(200, {});
    mockAxios.onGet("cartcount").reply(200, 1);
    render(
      <Provider store={Store}>
        <AddtoCart />
      </Provider>
    );
    screen.getByTestId("cart-delete").click();
  });
  it("Display Empty Cart", () => {
    mockAxios.onGet("cartpage").reply(200, [{}]);
    mockAxios
      .onPut("addtocart/1", { id: 1, p_id: 1, quantity: null })
      .reply(200, {});
    mockState
      .mockImplementationOnce((init) => [
        [],
        (a) => {
          a instanceof Function && a([]);
          return [];
        },
      ])
      .mockImplementation((init) => [init, mockFn])
      .mockImplementation((init) => [
        init,
        (a) => a instanceof Function && a(),
      ]);
    mockAxios.onDelete("cart/1").reply(200, {});
    mockAxios.onGet("cartcount").reply(200, 1);
    render(
      <Provider store={Store}>
        <AddtoCart />
      </Provider>
    );
  });
  it("Display Exception", () => { 
    mockState.mockImplementation((init) => [true,mockFn]);

    render(
      <Provider store={Store}>
        <AddtoCart />
      </Provider>
    );
  });
  it("Display Cart default qty", () => {
    mockAxios.onGet("cartpage").reply(200, [{}]);
    mockAxios
      .onPut("addtocart/1", { id: 1, p_id: 1, quantity: null })
      .reply(200, {});
    mockState
      .mockImplementationOnce((init) => [
        [
          {
            id: 1,
            title: "ASUS VivoBook 15 (2021)",
            image: "/assets/images/p1.jpg",
            price: 25400,
            category: "laptop",
            cart_id: 1,
            maxQty: 10,
          },
        ],
        (a) => {
          a instanceof Function &&
            a([
              {
                id: 1,
                title: "ASUS VivoBook 15 (2021)",
                image: "/assets/images/p1.jpg",
                price: 25400,
                category: "laptop",
              },
            ]);
          return [
            {
              id: 1,
              title: "ASUS VivoBook 15 (2021)",
              image: "/assets/images/p1.jpg",
              price: 25400,
              category: "laptop",
            },
          ];
        },
      ])
      .mockImplementation((init) => [init, mockFn])
      .mockImplementation((init) => [
        init,
        (a) => a instanceof Function && a(),
      ]);
    mockAxios.onDelete("cart/1").reply(200, {});
    mockAxios.onGet("cartcount").reply(200, 1);
    render(
      <Provider store={Store}>
        <AddtoCart />
      </Provider>
    );
  });
});
