import { render } from "@testing-library/react";
import Notification from "./Notification";
import { Provider } from "react-redux";
import Store from '../../Redux/Store/Store'
import { notifyUser } from "../../Redux/Reducer/SendNotification";
import { act } from "react-test-renderer";
describe("Notification", () => {
  it("Notification test", () => {
    jest.spyOn(global,"setTimeout").mockImplementationOnce((a)=>{a()}) 
    render(
      <Provider store={Store}>
        <Notification />
      </Provider>
    );
    act(()=>{ Store.dispatch(notifyUser("Happy"))})
   
  });
});
