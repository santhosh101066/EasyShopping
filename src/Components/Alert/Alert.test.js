import { render } from "@testing-library/react"
import PageError from './PageError'
import PageNotFound from './PageNotFound'
describe("Alert",()=>{
    it("Page Error",()=>{
        render(<PageError/>)
    })
    it("Not Found",()=>{
        render(<PageNotFound/>)
    })
})