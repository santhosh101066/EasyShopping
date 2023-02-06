import { render, screen } from "@testing-library/react"
import Authenticate from "./Authenticate"
import { Provider } from "react-redux"
import Store from "../../Redux/Store/Store"
import { MemoryRouter } from "react-router-dom";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import { act } from "react-dom/test-utils";


jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate:()=> jest.fn(),
    useHref:jest.fn() 
  }));

describe("Login form",()=>{
test('Login',()=>{
    render(
        <MemoryRouter>
        <Provider store={Store}>
        <Authenticate />
      </Provider>
      </MemoryRouter>
    )
    act(()=>{
        screen.getByText('Click here').click()
    })
    
})
test('ESC Key Press',()=>{
    render(
        <MemoryRouter>
        <Provider store={Store}>
        <Authenticate />
      </Provider>
      </MemoryRouter>
    )
    keyboard('{Escape}')
})
test ('close',()=>{
    render(
        <MemoryRouter>
        <Provider store={Store}>
        <Authenticate />
      </Provider>
      </MemoryRouter>
    )
    act(()=>{
        screen.getByText('X').click()
    })
})
})