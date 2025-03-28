class Card extends HTMLElement {
    nombre;
    edad;
    sintomas;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['nombre', 'edad', 'sintomas'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    padding: 10px;
                    margin: 10px;
                    border: 1px solid #444;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                    cursor: pointer;
                }
            </style>
            <div>
                <h4>${this.nombre}</h4>
                <p>${this.edad}</p>
                <p>${this.sintomas}</p>
            </div>
        `;
    }
}

customElements.define('app-card', Card);
export default Card;