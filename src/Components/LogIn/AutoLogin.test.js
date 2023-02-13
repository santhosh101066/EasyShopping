import { render } from "@testing-library/react";
import AutoLogin from "./AutoLogin";
import { Provider } from "react-redux";
import Store from "../../Redux/Store/Store";
import MockAdapter from "axios-mock-adapter";
import AxiosApi from "../../Api/AxiosApi";
import * as React from 'react'

jest.mock('react',()=>({
  ...jest.requireActual('react'),
  useState:(init)=>[init,()=>jest.fn()]
}))
describe("AutoLogin", () => {
  test("User Login", async () => {
    localStorage.setItem("auth", "123");
    const axios = new MockAdapter(AxiosApi);
    axios
      .onGet("/validate", {
        headers: {
          Authorization:
            localStorage.getItem("auth") &&
            `Bearer ${localStorage.getItem("auth")}`,
        },
      })
      .reply(200, { response: { data: { type: "user" } } }); 
      axios
      .onGet("/cartcount", {
        headers: {
          Authorization:
            localStorage.getItem("auth") &&
            `Bearer ${localStorage.getItem("auth")}`,
        },
      })
      .reply(200, { response: { data: 4 } }); 

    render(
      <Provider store={Store}>
        <AutoLogin />
      </Provider>
    );
  });

  test("Admin Login", async () => {
    localStorage.setItem("auth", "123");
    const axios = new MockAdapter(AxiosApi);
    axios
      .onGet("/validate", {
        headers: {
          Authorization:
            localStorage.getItem("auth") &&
            `Bearer ${localStorage.getItem("auth")}`,
        },
      })
      .reply(200,  {type: "admin" });
      
      axios
      .onGet("/cartcount", {
        headers: {
          Authorization:
            localStorage.getItem("auth") &&
            `Bearer ${localStorage.getItem("auth")}`,
        },
      })
      .reply(200, { data: 4  }); 

    render(
      <Provider store={Store}>
        <AutoLogin />
      </Provider>
    );
  });

  test("Login with exception",()=>{
    localStorage.setItem("auth", "123");
    const axios = new MockAdapter(AxiosApi);
    axios
    .onGet("/validate", {
      headers: {
        Authorization:
          localStorage.getItem("auth") &&
          `Bearer ${localStorage.getItem("auth")}`,
      },
    })
    .reply(401, {}); 
    render(
        <Provider store={Store}>
          <AutoLogin />
        </Provider>
      );
  })

  test ("Login with network error",()=>{
    localStorage.setItem("auth", "123");
    jest.spyOn(global,"setTimeout").mockImplementationOnce((a)=>a()) 
    const axios = new MockAdapter(AxiosApi);
    axios.onGet('/validate').networkError()
    render(
        <Provider store={Store}>
          <AutoLogin />
        </Provider>
      );
  })
});
