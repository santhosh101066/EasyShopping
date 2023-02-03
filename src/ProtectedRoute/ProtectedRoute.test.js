import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import Store from "../Redux/Store/Store";
import ProtectedRoute from "./ProtectedRoute";


jest.mock("react-router-dom",()=>({
    ...jest.requireActual('react-router-dom'),
    Navigate:jest.fn()
}))

describe("Protected Route", () => {
  test("Render with Login", () => {
    render(
      <Provider store={Store}>
          <ProtectedRoute isLogin={true} /> 
      </Provider>
    );
  });
  test("Render Without Login", () => {
    render(
      <Provider store={Store}>
          <ProtectedRoute />
      </Provider>
    );
  });
  
});
