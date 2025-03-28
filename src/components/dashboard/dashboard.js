import '../card/card.js';

class Dashboard extends HTMLElement {
    listaPendientes = [];
    listaAtendidos = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    };

    connectedCallback() {
        this.render();
    };

    render() {
        this.shadowRoot.innerHTML = `
            <h2>Dashboard</h2>
            <form id="paciente-form">
                <input type="text" id="nombre" placeholder="Nombre" required>
                <input type="number" id="edad" placeholder="Edad" min-value="0" required>
                <input type="text" id="sintomas" placeholder="Sintomas" required>
                <button type="submit">Agregar</button>
            </form>
            <section>
                <h3>Pacientes Pendientes</h3>
                <div id="container-pendientes">
                </div>
                <h3>Pacientes Atendidos</h3>
                <div id="container-atendidos">
                </div>
            </section>
        `;

        const form = this.shadowRoot.querySelector('#paciente-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = this.shadowRoot.querySelector('#nombre').value;
            const edad = this.shadowRoot.querySelector('#edad').value;
            const sintomas = this.shadowRoot.querySelector('#sintomas').value;

            const paciente = { nombre, edad, sintomas };
            this.listaPendientes.push(paciente);
            this.renderPacientes();
        });
    }

    renderPacientes() {
        // PENDIENTES
        const containerPendientes = this.shadowRoot.querySelector('#container-pendientes');
        containerPendientes.innerHTML = '';
        this.listaPendientes.forEach(paciente => {
            const card = document.createElement('app-card');
            card.nombre = paciente.nombre;
            card.edad = paciente.edad;
            card.sintomas = paciente.sintomas;

            card.addEventListener('click', () => {
                this.listaAtendidos.push(paciente);
                this.listaPendientes = this.listaPendientes.filter(paciente => paciente.nombre !== card.nombre);
                this.renderPacientes();
            });

            containerPendientes.appendChild(card); 
        });

        // ATENDIDOS
        const containerAtendidos = this.shadowRoot.querySelector('#container-atendidos');
        containerAtendidos.innerHTML = '';
        this.listaAtendidos.forEach(paciente => {
            const card = document.createElement('app-card');
            card.nombre = paciente.nombre;
            card.edad = paciente.edad;
            card.sintomas = paciente.sintomas;

            containerAtendidos.appendChild(card); 
        });
    }
};

customElements.define('app-dashboard', Dashboard);
export default Dashboard;