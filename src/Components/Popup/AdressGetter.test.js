import { fireEvent, render, screen } from "@testing-library/react";
import AddressGetter from "./AddressGetter";
import { Provider } from "react-redux";
import Store from "../../Redux/Store/Store";
import MockAdapter from "axios-mock-adapter";
import AxiosApi from "../../Api/AxiosApi";

const mockFn = jest.fn();
describe("Address", () => {
  const axios = new MockAdapter(AxiosApi);
  const address = "18/1 Sample Street , Sample place , sample pincode 123";
  it("Get Address with click cancel", () => {
    render(
      <Provider store={Store}>
        <AddressGetter p_id={1} cancel={mockFn} list={[]} reload={mockFn} />
      </Provider>
    );
    screen.getByText("Cancel").click();
  });
  it("Posting a List of data", () => {
    const list = [1, 2, 3, 4];
    axios.onPost("orders", { list, address }).reply(200, {});
    axios.onGet("cartcount").reply(200, 2);
    render(
      <Provider store={Store}>
        <AddressGetter p_id={1} cancel={mockFn} list={list} reload={mockFn} />
      </Provider>
    );
    const inputField = screen.getByPlaceholderText(
      "Enter the Delivery Address"
    );
    fireEvent.change(inputField, { target: { value: address } });
    screen.getByText("Confirm to order").click();
  });
  it("Posting A single Porduct", () => {
    axios
      .onPost("singleorder", {
        p_id: 1,
        quantity: 1,
        address: address,
      })
      .reply(200, {});
    render(
      <Provider store={Store}>
        <AddressGetter p_id={1} cancel={mockFn} quantity={1} reload={mockFn} />
      </Provider>
    );
    const inputField = screen.getByPlaceholderText(
      "Enter the Delivery Address"
    );
    fireEvent.change(inputField, { target: { value: address } });
    screen.getByText("Confirm to order").click();
  });
});
