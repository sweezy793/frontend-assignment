/* eslint-disable no-undef */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../src/App";
import { describe } from "vitest";

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { "s.no": 0, "percentage.funded": 186, "amt.pledged": 15823 },
        { "s.no": 1, "percentage.funded": 8, "amt.pledged": 6859 },
        { "s.no": 2, "percentage.funded": 102, "amt.pledged": 17906 },
        { "s.no": 3, "percentage.funded": 191, "amt.pledged": 67081 },
        { "s.no": 4, "percentage.funded": 34, "amt.pledged": 32772 },
        { "s.no": 5, "percentage.funded": 114, "amt.pledged": 2065 },
        { "s.no": 6, "percentage.funded": 5778, "amt.pledged": 577844 },
        { "s.no": 7, "percentage.funded": 42, "amt.pledged": 4952 },
        { "s.no": 8, "percentage.funded": 153, "amt.pledged": 45959 },
      ]),
  })
);

describe("Frontend Assignment tests", () => {
  test("shows correct heading", () => {
    render(<App />);
    expect(screen.getByText("Frontend Assignment")).toBeInTheDocument();
  });

  test("shows maximum 5 records per page", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getAllByRole("row")).toHaveLength(6);
    });
  });

  test("shows correct number of records when total number of records are odd", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    await waitFor(() => {
      expect(screen.getAllByRole("row")).toHaveLength(5);
    });
  });

  test("shows and fetches correct record", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(15823)).toBeInTheDocument();
      expect(screen.getByText(186)).toBeInTheDocument();
    });
  });

  test("shows correct page number, button text and state on first page", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Previous page" })
      ).toBeDisabled();
      expect(
        screen.getByRole("button", { name: "Next page" })
      ).not.toBeDisabled();
    });
  });

  test("shows correct page number, button text and state on last page", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    await waitFor(() => {
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Previous page" })
      ).not.toBeDisabled();
      expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
    });
  });
});
