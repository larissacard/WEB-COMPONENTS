import { IonDropdown } from "./dropdown.js";

const options = [
  {
    label: "Option 1",
    key: "option1",
    selected: false,
  },
  {
    label: "Option 2",
    key: "option2",
    selected: false,
  },
  {
    label: "Option 3",
    key: "option3",
    selected: false,
  },
];

describe("IonDropdown", () => {
  let dropdown;

  beforeEach(() => {
    dropdown = new IonDropdown();
  });

  it("should render the dropdown component", () => {
    expect(dropdown).toBeDefined();
  });

  it("should have the correct default attributes", () => {
    expect(dropdown.getAttribute("selected")).toBeNull();
    expect(dropdown.getAttribute("options")).toBeNull();
  });

  it("should update the selected option when an option is clicked", () => {
    const spyHandleClick = jest.spyOn(dropdown, "optionClicked");

    dropdown.setAttribute("options", JSON.stringify(options));
    expect(dropdown.getAttribute("options")).toBe(JSON.stringify(options));
    dropdown.optionClicked(options[0], 0);
    expect(options[0].selected).toBe(true);
  });

  it("should update the selected option when an option is clicked", () => {
    const spyHandleClick = jest.spyOn(dropdown, "optionClicked");

    dropdown.setAttribute("options", JSON.stringify(options));
    expect(dropdown.getAttribute("options")).toBe(JSON.stringify(options));
    dropdown.optionClicked(options[0], 0);
    expect(options[0].selected).toBe(false);
  });

  it("should initialize dropdown when connected to the DOM", () => {
    dropdown._options = options;

    dropdown.connectedCallback();

    expect(dropdown.shadowRoot.getElementById("item-0")).toBeDefined();
    expect(dropdown.shadowRoot.getElementById("item-1")).toBeDefined();
    expect(dropdown.shadowRoot.getElementById("item-2")).toBeDefined();
  });
});
