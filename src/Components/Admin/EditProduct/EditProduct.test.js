import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Store from "../../../Redux/Store/Store";
import EditProduct from "./EditProduct";
import MockAdapter from "axios-mock-adapter";
import AxiosApi from "../../../Api/AxiosApi";
import * as  React from "react"; 


const mockFn = jest.fn();
const state= jest.spyOn(React,"useState")
// jest.mock("react", () => ({
//   ...jest.requireActual("react"),
//   useState: () => [
//     { short_title: "abc", title: "123" },
//     (a) => { 
//       a instanceof Function && a({});
//       return {short_title:'abc'};
//     },
//   ],
// }));
describe("Edit Product", () => {
  const axios = new MockAdapter(AxiosApi);
  axios.onGet("product/detailed/1").reply(200, { short_title: "abc" });
  axios.onPut("product/1",true).reply(200, { short_title: "abc" });
    it("Edit Test Changes", () => {
      jest.spyOn(React,"useState").mockImplementationOnce((initialState=true) => [ 
        { short_title: "abc", title: "123" },
        (a) => {
          a instanceof Function && a({}); 
          return true;
        },
      ]).mockImplementationOnce((initialState=true) => [ 
        { short_title: "abc", title: "123" },
        (a) => {
          a instanceof Function && a({}); 
          return true;
        },
      ])
      render(
        <Provider store={Store}>
          <EditProduct id={1} load={mockFn} cancel={mockFn} />
        </Provider>
      );
      const short_title = screen.getByPlaceholderText("Short Title");
      fireEvent.change(short_title, { target: { value: "" ,name:'short_title'} });
    });

    test("Close", () => {
      state.mockImplementation((initialState=true) => [ 
        { short_title: "abc", title: "123" },
        (a) => {
          a instanceof Function && a({}); 
          return { short_title: "abc" };
        },
      ]) 
      render( 
        <Provider store={Store}>
          <EditProduct id={1} load={mockFn} cancel={mockFn} />
        </Provider>
      );
      screen.getByText("Cancel").click()
    });

  it("Save", () => {
     state.mockImplementationOnce(() => [ 
         true,
         (a) => {
           a instanceof Function && a({}); 
           return { short_title: "abc" };
         },
       ]).mockImplementationOnce(() => [ 
        false,
        (a) => {
          a instanceof Function && a({}); 
          return { short_title: "abc" };
        },
      ])
       window.confirm=jest.fn(()=>true) 
     render( 
       <Provider store={Store}>
         <EditProduct id={1} load={mockFn} cancel={mockFn} />
       </Provider>
     );
     const short_title = screen.getByPlaceholderText("Short Title");
     fireEvent.change(short_title, {
       target: { value: "Aspire", name: "short_title" },
     });
     state.mockImplementationOnce(()=>[false,mockFn()])
     
     screen.getByText("Save").click();
   });
   it("Save With Exception",()=>{
    state.mockImplementationOnce(() => [ 
         true,
         (a) => {
           a instanceof Function && a({}); 
           return { short_title: "abc" };
         },
       ]).mockImplementationOnce(() => [ 
        true,
        (a) => {
          a instanceof Function && a({}); 
          return { short_title: "abc" };
        },
      ])
       window.confirm=jest.fn(()=>true) 
     render( 
       <Provider store={Store}>
         <EditProduct id={1} load={mockFn} cancel={mockFn} />
       </Provider>
     );
     const short_title = screen.getByPlaceholderText("Short Title");
     fireEvent.change(short_title, {
       target: { value: "Aspire", name: "short_title" },
     });
     state.mockImplementationOnce(()=>[false,mockFn()])
     
     screen.getByText("Save").click();
   });
});
