import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import Store from "../../Redux/Store/Store"
import Header from "./Header"

jest.mock("react-router-dom")
describe("Headder",()=>{
    test('Scroll',()=>{
        Object.defineProperty(window, 'innerWidth', {
            value:0 });
        console.log(window.innerWidth);
        render(<Provider store={Store}>
            <Header/>
          </Provider>)
    })
})