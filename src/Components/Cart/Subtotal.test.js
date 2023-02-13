import { render, screen } from "@testing-library/react";
import Subtotal from "./Subtotal";
import { Provider } from "react-redux";
import Store from "../../Redux/Store/Store";
import { act } from "react-test-renderer";

it("Render Subtotal", () => {
  render(
    <Provider store={Store}>
      <Subtotal data={[1, 2, 3]} />
    </Provider>
  );

  act(() => {
    screen.getByText("Buy Now").click();
  });
  act(() => {
    screen.getByText("Cancel").click();
  });
});
