// import Sum from './sum'

// test("Adds 1+2 is equal to 3", ()=>{
//     expect(Sum(20,40)).toBeCloseTo(60);
// })

import Demo from "./demo";
import { render as Render } from "@testing-library/react";

// test("testing components", () => {
//   const { getByText } = Render(<Demo />);
//   expect(getByText(/7/i).toBe(7)
// });

test("alt txt components", () => {
  const { getAllByText } = Render(<Demo />);
  expect(getAllByText(/Demo/i)).toBeTruthy();
});
