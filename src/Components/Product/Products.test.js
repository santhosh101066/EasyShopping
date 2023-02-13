import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import DetailedProduct from "./DetailedProduct";
import Store from "../../Redux/Store/Store";
import MockAdapter from "axios-mock-adapter";
import AxiosApi from "../../Api/AxiosApi";
import * as React from "react";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ productId: 1 }),
}));
describe("Products", () => {
  const mockAxios = new MockAdapter(AxiosApi);
  test("render", async () => {
    // jest.spyOn(React,"useState").mockImplementation((init)=>[init,(a)=>a instanceof Function? a(): a])
    mockAxios.onGet("product/detailed/1").reply(200, {
      filesCount: 5,
      short_title: "Redmi 11 Prime 5G",
      title:
        "Redmi 11 Prime 5G (Chrome Silver, 4GB RAM 64GB ROM) | Prime Design | MTK Dimensity 700 | 50 MP Dual Cam | 5000mAh | 7 Band 5G",
      quantity: "11",
      more_details:
        "Processor: MediaTek Dimensity 700 with 5G, 7nm Octa-core processor; Up to 2.2GHz\r\nDisplay: 90Hz FHD+(1080x2400) AdaptiveSync Display; 16.71centimeters; 20:9 aspect ratio\r\nCamera: 50MP AI Dual camera | 8MP Front camera\r\nMemory, Storage & SIM: 4GB RAM | 64GB UFS 2.2 storage expandable up to 512GB with dedicated SD card slot | Dual SIM (nano+nano) dual standby (5G+5G)\r\nBattery: 5000 mAh large battery with 18W fast charging support and 22.5W fast charger in-box with Type-C connectivity",
      category: "mobile",
      price: "13999",
      id: 4,
    });
    render(
      <Provider store={Store}>
        <DetailedProduct />
      </Provider>
    );

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      // screen.getByTestId('image-1').click()
    });
    act(() => {
      screen.getByTestId("image-1").click();
    });
  });
  test("Render with exception", async () => {
    mockAxios
      .onGet("product/detailed/1")
      .reply(404, { response: { statusText: "Not Found" } });
    render(
      <Provider store={Store}>
        <DetailedProduct />
      </Provider>
    );
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      
    });
  });
  test("Render with Network error", async () => {
    mockAxios
      .onGet("product/detailed/1").networkError()
    render( 
      <Provider store={Store}>
        <DetailedProduct />
      </Provider>
    );
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
    });
  });
});
