export class IonButton extends HTMLElement {
    static get observedAttributes() {
      return ["label", "type", "disabled", "loading", "options"];
    }
  
    constructor() {
      super();
      this.build();
      this._dropdownVisible = false;
    }
  
    build() {
      const shadow = this.attachShadow({ mode: "open" });
      this._dropdownVisible = false;
      this.render();
    }
  
    render() {
      this.shadowRoot.innerHTML = `
      <style>${this.css.trim()}</style>
      ${this.template().trim()}
      `;
    }
  
    connectedCallback() {
      this.render();
      this.button = this.shadowRoot.querySelector("button");
      this.dropdownElement = this.shadowRoot.querySelector("ion-dropdown");
      this.button.addEventListener("click", this.handleClick.bind(this));
    }
  
    handleClick(event) {
      if (this._loading) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      if (this._options) {
        this.toggleDropdown();
      }
    }
  
    toggleDropdown() {
      if (!this.dropdownElement) {
        console.error("dropdownElement is null");
        return;
      }
  
      this._dropdownVisible = !this._dropdownVisible;
      if (this._dropdownVisible) {
        this.dropdownElement.classList.remove("dropdown-hidden");
      } else {
        this.dropdownElement.classList.add("dropdown-hidden");
      }
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case "label":
          this._label = newValue;
          break;
        case "type":
          this._type = newValue;
          break;
        case "disabled":
          this._disabled = newValue === "true";
          break;
        case "loading":
          this._loading = newValue === "true";
          break;
        case "options":
          try {
            this._options = JSON.parse(newValue);
            if (this.dropdownElement) {
              this.dropdownElement.setAttribute(
                "options",
                JSON.stringify(this._options)
              );
            }
          } catch (e) {
            console.error("Error parsing options:", e);
          }
          break;
      }
      this.render();
    }
  
    template() {
      const attributeDisabled = this._disabled ? "disabled" : "";
      const attributeLoading = this._loading ? "loading" : "";
      return `
          <button type="button" class="ion-btn ${
            this._type
          } ${attributeLoading}" ${attributeDisabled}
          >
          ${this._loading ? this.loaderTemplate(this._type) : ""}
          ${this._label}
          </button>
          ${this._options ? this.dropdownTemplate() : ""}
      `;
    }
  
    loaderTemplate(type) {
      return `
          <div class="loader ${type}"></div>
        `;
    }
  
    dropdownTemplate() {
      if (this._options) {
        return `
          <ion-dropdown class="dropdown-hidden" options='${JSON.stringify(
            this._options
          )}'></ion-dropdown>
        `;
      }
    }
  
    css = `
      .ion-btn {
          gap: 8px;
          width: 109px;
          height: 32px;
  
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px 16px 6px 16px;
          
          border: 0;
          cursor: pointer;
          border-radius: 6px;
          transition: all 300ms;
          
          color: #FCFCFD;
          
          font-size: 12px;
          font-weight: 600;
          
          text-align: left;
          line-height: 16px;
          font-family: 'Source Sans Pro', sans-serif;
      }
  
      .primary {
          background-color: #0858CE;
      }
    
      .primary:not(:disabled):hover {
          background-color: #146FF5;
      }
    
      .primary:disabled {
          color:#AEB2BD;
          background-color: #E4E6EB;
          cursor: not-allowed;
      }
  
      .loader.primary {
          border-top-color: #FCFCFD;
        }
    
      .secondary {
          color: #0858CE;
          background-color: #FCFCFD;
          border: 1px solid #CED2DB;
      }
    
      .secondary:not(:disabled):hover {
          color: #146FF5;
          background-color: #EBF3FE;
          border: 1px solid #84B4FA;
      }
    
      .secondary:disabled {
          color: #AEB2BD;
          background-color: #E4E6EB;
          border: 1px solid #CED2DB;
          cursor: not-allowed;
      }
  
      .loader.secondary {
        cursor: not-allowed;
      }
  
      .ghost {
          color: #0858CE;
          background-color: #FCFCFD;
          border: none;
      }
    
      .ghost:not(:disabled):hover {
          color: #146FF5;
          background-color: #EBF3FE;
      }
    
      .ghost:disabled {
          color: #AEB2BD;
          cursor: not-allowed;
      }
  
      .loader.ghost {
        cursor: not-allowed;
      }
  
    
      .dashed {
          color: #0858CE;
          background-color: #FCFCFD;
          border: 1px solid  #CED2DB;
          border-style: dashed;
      }
    
      .dashed:not(:disabled):hover {
          color: #146FF5;
          background-color: #EBF3FE;
          border: 1px solid  #84B4FA;
          border-style: dashed;
      }
    
      .dashed:disabled {
          color: #AEB2BD;
          background-color: #E4E6EB;
          border: 1px solid #AEB2BD;
          cursor: not-allowed;
      }
  
      .ion-btn.loading {
        cursor: not-allowed;
      }
  
      .loader {
          border: 2px solid transparent;
          border-top-color: #0858CE;
          border-radius: 50%;
          min-width: 10px;
          min-height: 10px;
          animation: spin 2s linear infinite;
          margin-right: 10px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }    
        
        .dropdown-hidden {
          display: none;
        }
      `;
  }
  
  customElements.define("ion-button", IonButton);
  