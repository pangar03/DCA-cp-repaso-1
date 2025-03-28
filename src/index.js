import './components/dashboard/dashboard.js';

class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        // Aca donde se muestra lo de adentro de la app
        this.shadowRoot.innerHTML = `
            <h1>Bienvenidos a la mejor clinica del mundo</h1>
            <app-dashboard></app-dashboard>
        `;
    }
}

customElements.define('app-container', AppContainer);