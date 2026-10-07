import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

describe("Header", () => {
  it("renders brand", () => {
    render(<Header brand="Acme" />);
    expect(screen.getByText("Acme")).toBeInTheDocument();
  });

  it("renders as a banner landmark", () => {
    render(<Header brand="Acme" />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders leading content before the brand", () => {
    render(
      <Header
        brand={<span>Acme</span>}
        leading={<button type="button">Menu</button>}
      />,
    );

    const leading = screen.getByRole("button", { name: "Menu" });
    const brand = screen.getByText("Acme");

    expect(leading).toBeInTheDocument();
    expect(
      leading.compareDocumentPosition(brand) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("renders actions", () => {
    render(
      <Header brand="Acme" actions={<button type="button">Log in</button>} />,
    );
    expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument();
  });

  it("does not render leading or actions when they are omitted", () => {
    render(<Header brand="Acme" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
