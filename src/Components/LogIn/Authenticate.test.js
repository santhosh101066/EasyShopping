import { fireEvent, render, screen } from "@testing-library/react";
import Authenticate from "./Authenticate";
import { Provider } from "react-redux";
import Store from "../../Redux/Store/Store";
import { MemoryRouter } from "react-router-dom";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import { act } from "react-dom/test-utils";
import * as React from "react";
import MockAdapter from "axios-mock-adapter";
import AxiosApi from "../../Api/AxiosApi";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  useHref: jest.fn(),
}));
jest.mock('react',()=>({
  ...jest.requireActual('react'),
  createRef:()=>({current:{email:{value:"1223",setCustomValidity:jest.fn()},password:{value:"1223",setCustomValidity:jest.fn()}}})
}))
// jest.spyOn(React, "createRef").mockImplementation(() => ({
//   current: {
//     email: { value: "123", setCustomValidity: jest.fn() },
//     password: { value: "123", setCustomValidity: jest.fn() },
//   },
// }));
describe("Login form", () => {
  const mockAxios=new MockAdapter(AxiosApi)
  test("Login", () => {
    render(
      <MemoryRouter>
        <Provider store={Store}>
          <Authenticate />
        </Provider>
      </MemoryRouter>
    );
    act(() => {
      screen.getByText("Click here").click();
    });
  });
  test("ESC Key Press", () => {
    render(
      <MemoryRouter>
        <Provider store={Store}>
          <Authenticate />
        </Provider>
      </MemoryRouter>
    );
    keyboard("{Escape}");
  });
  test("close", () => {
    render(
      <MemoryRouter>
        <Provider store={Store}>
          <Authenticate />
        </Provider>
      </MemoryRouter>
    );
    act(() => {
      screen.getByText("X").click();
    });
  });
  test("Login user", async() => {
    mockAxios.onPost('login',{email:'sample123@gmail.com',password:"1223456"}).reply(200,{token:'1234'})
    mockAxios.onGet('cartcount').reply(200,1)
    render(
      <MemoryRouter>
        <Provider store={Store}>
          <Authenticate />
        </Provider>
      </MemoryRouter>
    );
    act(()=>{
      screen.getByText('Login').click()  
    }) 
    const email = screen.getByPlaceholderText("Email");
    const password = screen.getByPlaceholderText("Password");
    fireEvent.change(email, { target: { value: "sample123@gmail.com" } });
    act(()=>{
      screen.getByText('Login').click()  
    }) 
    fireEvent.change(password, { target: { value: "1223456" } });
  await  act(async ()=>{
      screen.getByText('Login').click()  
    })
    mockAxios.onPost('login',{email:'sample123@gmail.com',password:"1223456"}).reply(404,{response:{statusText:"incorrect"}}) 
    await  act(async ()=>{
      screen.getByText('Login').click()  
    }) 
    mockAxios.onPost('login',{email:'sample123@gmail.com',password:"1223456"}).networkError()
      await  act(async ()=>{
      screen.getByText('Login').click()  
    }) 
    mockAxios.onPost('login',{email:'sample123@gmail.com',password:"1223456"}).reply(200,{token:'1234',type:'admin'})
    await  act(async ()=>{
    screen.getByText('Login').click()  
  }) 

  }); 

  
}); 
