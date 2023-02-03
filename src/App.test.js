import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders category", async () => {
  render(
      <App />
  );
  expect(screen.getAllByText("Category")[0]).toBeInTheDocument();
});

// test("renders product", async () => {
//   render(
//     <Provider store={Store}>
//       <App />
//     </Provider>
//   );

//   const login = screen.getByText("Login");
//   act(() => {
//     setTimeout(() => {
//       login.click();
//       expect.any(screen.getByPlaceholderText("Email"));
//     }, 1000);
//   });
// });

// test("navigate", async () => {
//   render(
//     <Provider store={Store}>
//       <App />
//     </Provider>
//   );

//   const mobile = await screen.findAllByText("Mobiles");
//   act(() => {
//     mobile[1].click();
//   });


//   const mobileProduct = await screen.findAllByText(
//     "Apple iPhone 12 (128GB) - Black"
//   );

//   expect(mobileProduct[0]).toBeInTheDocument();
//   act(() => {
//     mobileProduct[0].click();
//   });
//   expect.any(await screen.findAllByText("Quantity"));
// });
