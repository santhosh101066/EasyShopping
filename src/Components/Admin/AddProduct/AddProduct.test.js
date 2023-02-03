import { render, screen } from "@testing-library/react";
import { default as AddProduct } from "./AddProduct";
import { Provider } from "react-redux";
import Store from "../../../Redux/Store/Store";
import MockAdapter from "axios-mock-adapter";
import AxiosApi from "../../../Api/AxiosApi";

describe("AddProduct", () => {
  test("Render Addproduct", () => {
    render(
      <Provider store={Store}>
        <AddProduct />
      </Provider>
    );
  });
  
  test("Create Product", async () => {
    const axios = new MockAdapter(AxiosApi);
    const formData = new FormData();
    axios.onPost("newproduct", formData).reply(200, {});
    AxiosApi.post("newproduct", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(console.log)
      .catch(console.log);

    render(
      <Provider store={Store}>
        <AddProduct />
      </Provider>
    );
    const submit = screen.getByTestId("addProduct");
    submit.click();
  });
  test("Render close", async() => {
    render(
      <Provider store={Store}>
      <AddProduct close={()=>{}} />
    </Provider>
    );
    screen.getByText('X').click()
  });
});
