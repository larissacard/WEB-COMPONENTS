export class IonDropdown extends HTMLElement {
    static get observedAttributes() {
      return ["options"];
    }
  
    constructor() {
      super();
      this.build();
    }
  
    build() {
      const shadow = this.attachShadow({ mode: "open" });
      this.render();
    }
  
    render() {
      this.shadowRoot.innerHTML = `
          <style>${this.css.trim()}</style>
          ${this.templateDropdown().trim()}
      `;
  
      this.button = this.shadowRoot.querySelector("ion-button");
    }
  
    connectedCallback() {
      this.render();
      if (this._options) {
        Array.from(this._options).map((option, index) => {
          this.shadowRoot
            .getElementById("item-" + index)
            .addEventListener(
              "click",
              this.optionClicked.bind(this, option, index)
            );
        });
      }
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case "options":
          this._options = JSON.parse(newValue);
          break;
      }
      this.render();
    }
  
    templateDropdown() {
      return `
          <div class="ion-dropdown">
              <div class="options-list">
                  ${this.templateOption()}
              </div>
          </div>
      `;
    }
  
    templateOption() {
      if (!this._options) {
        return `Dados? Estão em férias!`;
      }
  
      return Array.from(this._options)
        .map((option, index) => {
          return `
              <div class="dropdown-item"  id="item-${index}">
                <div class="container">
                  <div class="option-label">
                    ${option.label} 
                  </div>
                </div>
              </div>
          `;
        })
        .join("");
    }
  
    optionClicked(option, index) {
      const optionDiv = this.shadowRoot.getElementById("item-" + index);
      option.selected = !option.selected;
      if (option.selected) {
        optionDiv.classList.add("selected");
        if (this.button) {
          this.button.innerHTML = option.label;
          this.render();
        }
      } else {
        optionDiv.classList.remove("selected");
      }
    }
  
    css = `
    .ion-dropdown {
      position: absolute;
      
        gap: 4px;
        margin-top: 4px;
        padding: 12px 8px;
        
        z-index: 10;
  
        display: flex;
        flex-direction: column;
  
        
        min-width: 182px;
        max-height: 244px;
        max-width: max-content;
        
        overflow-y: auto;
        
        border-radius: 8px;
        
        background-color: #fcfcfd;
        box-shadow: 0px 8px 6px -4px rgba(0,0,0,.15), 0px 0px 2px rgba(0,0,0,.15);
      }
      
      .options-list {
          gap: 4px;
          
          display: flex;
          flex-direction: column;
          
          overflow-y: auto;
      }
  
      .dropdown-item {
          color: #505566;
          
          cursor: pointer;
          
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          font-family: 'Source Sans Pro', sans-serif;
          
          padding: 8px 16px;
          
          border-radius: 8px;
          background-color: #fcfcfd;
      }
  
      .container {
        gap: 12px;
        
        align-items: center;
        justify-content: space-between;
      }
  
      .option-label {
        display: flex;
        align-items: center;
      }
  
      .dropdown-item:hover {
          background-color: #ebf3fe;
      }
  
      .dropdown-item.selected {
        color: #0858ce;
        background-color: #ebf3fe;
      }
    `;
  }
  
  customElements.define("ion-dropdown", IonDropdown);
  