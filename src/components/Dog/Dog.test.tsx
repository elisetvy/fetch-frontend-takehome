import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Dog from "./Dog";

import { Dog as DogType } from "../interfaces";

describe("Dog component", function () {
  const testDog: DogType = {
    id: "12345",
    img: "test.com",
    name: "Test Dog",
    age: 100,
    zip_code: "12345",
    breed: "Ankle Biter",
  };

  const mockSetFavorites = jest.fn();

  test("Should render without crashing", function () {
    render(<Dog dog={testDog} setFavorites={mockSetFavorites} />);
  });

  test("Contains expected dog name", function () {
    const result = render(
      <Dog dog={testDog} setFavorites={mockSetFavorites} />
    );
    expect(result.queryByText("Test Dog")).toBeInTheDocument();
  });
});
