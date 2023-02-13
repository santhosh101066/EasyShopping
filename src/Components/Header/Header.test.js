import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Store from "../../Redux/Store/Store";
import Header from "./Header";
import { act } from "react-dom/test-utils";
import { initialLoad, setAdmin, setCartNumber, setName, setUserLogin } from "../../Redux/Reducer/AuthKey";
import { MemoryRouter } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate:()=> jest.fn(),
  useHref:jest.fn()
}));
describe("Headder", () => {
  test("Scroll",() => {
    Object.defineProperty(window, "innerWidth", {
      value: 0, 
    });
    render(
      <Provider store={Store}>
        <Header />
      </Provider>
    );
  });
  test("Headder Clicks", async() => {
    render(
        <Provider store={Store}>
          <MemoryRouter> 
          <Header />
          </MemoryRouter>
        </Provider>
      ); 
    act(()=>{      
        screen.getByText("Category").click()
        screen.getByText("Laptops").click()
        screen.getByText("Easy Shopping").click()
        screen.getByTestId("navicon").click()
    }) 
   await act(()=>{
        screen.getByText("Login").click()
    })
  });

  test("Headder with user Login",()=>{
    Store.dispatch(setUserLogin())
    Store.dispatch(setCartNumber(1))
    Store.dispatch(setName("Santhosh"))
    render( 
        <Provider store={Store}>
            <MemoryRouter>
          <Header />
          </MemoryRouter> 
        </Provider>
      ); 
      Store.dispatch(initialLoad())
      act(()=>{
        screen.getByText("Wish List").click()
        screen.getByText("My Cart").click()
        screen.getByTestId("profile").click()
        screen.getByText("Your Order").click()
        screen.getByText("LogOut").click()
    }) 

  })
  test("Headder with Admin Login",()=>{
    Store.dispatch(setAdmin(true))
    render( 
        <Provider store={Store}>
            <MemoryRouter>
          <Header />
          </MemoryRouter>
        </Provider>
      ); 
      act(()=>{
        screen.getByText("Orders").click()
        screen.getByText("Add Product").click()
        screen.getByText("LogOut").click()
    }) 

  })
});
