import { IonButton } from "./button.js";

const options = [{ label: "Option 1", key: "option1", selected: false }];

describe("IonButton", () => {
  let button;

  beforeEach(() => {
    button = new IonButton();
    document.body.appendChild(button);
  });

  it("should render the button component", () => {
    expect(button).toBeDefined();
  });

  it("shoudl render the correct label", () => {
    const label = "Click me!";
    button.setAttribute("label", label);
    expect(button.getAttribute("label")).toBe(label);
  });

  it("should render the correct button type", () => {
    const type = "primary";
    button.setAttribute("type", type);
    expect(button.getAttribute("type")).toBe(type);
  });

  it("should render the correct disabled state", () => {
    const disabled = "true";
    button.setAttribute("disabled", disabled);
    expect(button.getAttribute("disabled")).toBe(disabled);
  });

  it("should render the correct loading state", () => {
    const loading = "true";
    button.setAttribute("loading", loading);
    expect(button.getAttribute("loading")).toBe(loading);
  });

  it("should render the correct options", () => {
    button.setAttribute("options", JSON.stringify(options));
    expect(button.getAttribute("options")).toBe(JSON.stringify(options));
  });

  it("should call handleClick when button is clicked", () => {
    const spyHandleClick = jest.spyOn(button, "handleClick");

    button.setAttribute("loading", "true");

    button.click("click");

    expect(spyHandleClick).not.toHaveBeenCalled();
  });

  it("should not toggle dropdown when options are not present", () => {
    const spyToggleDropdown = jest.spyOn(button, "toggleDropdown");

    button.setAttribute("options", JSON.stringify([]));

    button.click();

    expect(spyToggleDropdown).not.toHaveBeenCalled();
  });

  it("should prevent default and stop propagation if loading", () => {
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };

    button._loading = true;
    button.handleClick(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it("should toggle dropdown if options present", () => {
    const spyToggleDropdown = jest.spyOn(button, "toggleDropdown");

    button._options = true;
    button.handleClick();
    expect(spyToggleDropdown).toHaveBeenCalled();
    expect(button.classList.contains("dropdown-hidden")).toBe(false);
  });

  it("should toggle dropdown visibility", () => {
    button.dropdownElement = document.createElement("ion-dropdown");
    button.toggleDropdown();
    expect(button.dropdownElement.classList.contains("dropdown-hidden")).toBe(
      false
    );
    button.toggleDropdown();
    expect(button.dropdownElement.classList.contains("dropdown-hidden")).toBe(
      true
    );
  });

  it("should set options attribute when valid JSON string is provided", () => {
    button.dropdownElement = document.createElement("ion-dropdown");
    button.attributeChangedCallback("options", null, JSON.stringify(options));
    expect(button.dropdownElement.getAttribute("options")).toEqual(
      JSON.stringify(options)
    );
  });

  it("should log error when invalid JSON string is provided", () => {
    const spyConsoleError = jest.spyOn(console, "error");
    const newValue = "{ invalid JSON }";

    button.dropdownElement = document.createElement("ion-dropdown");
    button.attributeChangedCallback("options", null, newValue);
    expect(spyConsoleError).toHaveBeenCalledWith(
      "Error parsing options:",
      expect.any(Error)
    );
  });
});
