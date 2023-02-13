import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import Store from "../../Redux/Store/Store";
import SearchPage from "./SearchPage";
import * as ReactRouter from "react-router-dom";
import MockAdapter from "axios-mock-adapter";
import AxiosApi from "../../Api/AxiosApi";
import { act } from "react-test-renderer";


describe("Search Page", () => {
    const mockAxios=new MockAdapter(AxiosApi)
  it("Render Search Page",async () => {
    mockAxios.onGet("search/dell").reply(200,[])
    render(
      <ReactRouter.MemoryRouter initialEntries={["?q=dell"]}>
        <Provider store={Store}>
          <SearchPage />
        </Provider>
      </ReactRouter.MemoryRouter>
    ); 
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(()=>{}) 
  });
  it("Render Search Page Exception",async () => {
    mockAxios.onGet("search/dell").networkError()
    render(
      <ReactRouter.MemoryRouter initialEntries={["?q=dell"]}>
        <Provider store={Store}>
          <SearchPage />
        </Provider>
      </ReactRouter.MemoryRouter>
    );
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(()=>{}) 
  });
  it("Render Search Page Not Found",async () => {
    mockAxios.onGet("search/dell").reply(404,{response:{statusText:'Not Found'}})
    render(
      <ReactRouter.MemoryRouter initialEntries={["?q=dell"]}>
        <Provider store={Store}>
          <SearchPage />
        </Provider>
      </ReactRouter.MemoryRouter>
    );
   // eslint-disable-next-line testing-library/no-unnecessary-act
   await act(()=>{}) 
  });
  it("Render Search Error", () => {
    render(
      <ReactRouter.MemoryRouter initialEntries={["?q="]}>
        <Provider store={Store}>
          <SearchPage />
        </Provider>
      </ReactRouter.MemoryRouter>
    );
  });
});
