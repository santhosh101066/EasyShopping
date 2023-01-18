import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import Store from "./Redux/Store/Store";
import { act } from "react-dom/test-utils";


test("renders category", async () => {
  render(
    <Provider store={Store}>
      <App />
    </Provider>
  );
  expect( screen.getAllByText("Category")[0]).toBeInTheDocument();
});

test("renders product", async () => {
  render(
    <Provider store={Store}>
      <App />
    </Provider>
  );

  const login=screen.getByText("Login")
  act(()=>{
    login.click()
  })
  
  console.log(screen.getByPlaceholderText('Email'));

  
});

test ("navigate",async()=>{
  render(
    <Provider store={Store}>
      <App />
    </Provider>
  );
  const mobile=await screen.findAllByText('Mobiles')
  act(()=>{
    mobile[1].click();
  //  setTimeout(async()=>{console.log(await screen.findAllByText('loading'));})
  })
  window.scrollTo = jest.fn()
  console.log(await screen.findAllByText('Apple iPhone 12 (128GB) - Black'))
  
})
