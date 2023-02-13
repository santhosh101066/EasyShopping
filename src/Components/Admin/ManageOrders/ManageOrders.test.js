import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Store from "../../../Redux/Store/Store";
import ManageOrders from "./ManageOrders";
import AxiosApi from "../../../Api/AxiosApi";
import MockAdapter from "axios-mock-adapter";
import * as React from "react";
import { act } from "react-test-renderer";
import CustomerDetails from "./CustomerDetails";

describe("Manage Orders Admin Page", () => {
  const mockFn = jest.fn();
  const mockState = jest.spyOn(React, "useState");
  const axios = new MockAdapter(AxiosApi);
  it("Manage Orders", () => {
    mockState
      .mockImplementationOnce(() => [
        [{ id: 1, status: "Order Placed" }],
        mockFn,
      ])
      .mockImplementationOnce((initialState) => [initialState, mockFn]);
    axios.onGet("adminorder").reply(200, [{ id: 1, status: "Order Placed" }]);
    axios.onPut("adminorder/1", { status: "Dispatched" }).reply(200, {});
    render(
      <Provider store={Store}>
        <ManageOrders />
      </Provider>
    );
    act(() => screen.getAllByText("Details")[0].click());
    const select = screen.getByTestId("select-test");

    fireEvent.change(select, { target: { value: "Dispatched" } });
  });

  it("Customer Details", () => {
    mockState.mockImplementationOnce((initState) => [{first_name:"Person"}, mockFn]);
    axios.onGet("userdetails/1").reply(200, { id: 1, status: "Order Placed" }); 
    render(<CustomerDetails close={mockFn} user_id={1} />);
    screen.getByText('Okay').click()
  });
});
