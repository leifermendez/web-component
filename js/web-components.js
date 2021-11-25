class UIModal extends HTMLElement {

    //TODO: Se necesita para evitar Cannot set property shadowRoot of #<Element>
    shadowRoot = undefined;

    //TODO: Definir atributos que se desean escuchar
    static observedAttributes = ['data-mode']

    //TODO Estilos

    innerStyle = `
        *{
            transition: all ease 350ms;
        }
        :host{
            position:fixed;
            width:100%;
            height:100%;
            display:flex;
            align-items:center;
            justify-content:center;
            pointer-events:none;
            background-color:#bdbdbd33
        }
        .canvas{
            width:400px;
            height:300px;
            background-color:#4895ef;
            border-radius: 10px;
            border: solid 3px white;
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        }

        .canvas.max{
            width:600px;
            height:500px;
        }
    `

    constructor() {
        super()
    }

    connectedCallback() {
        const mode = this.getAttribute('data-mode');
        this.shadowRoot = this.attachShadow({ mode: 'open' });
        const canvas = document.createElement('canvas');
        canvas.classList.add('canvas');

        if (mode === 'max') {
            canvas.classList.add('max');
        }

        const style = document.createElement('style')
        style.innerHTML = this.innerStyle
        this.shadowRoot.appendChild(style)
        this.shadowRoot.appendChild(canvas)
        console.log('Custom square element added to page.');
    }

    disconnectedCallback() {
        console.log('Custom square element removed from page.');
    }

    adoptedCallback() {
        console.log('Custom square element moved to new page.');
    }

    attributeChangedCallback() {
        const mode = this.getAttribute('data-mode');
        const canvas = this.shadowRoot.querySelector('canvas');
        const listClass = canvas.classList.toString();
        if (listClass.includes('max')) {
            canvas.classList.remove('max')
            canvas.classList.add('min')
        } else {
            canvas.classList.remove('min')
            canvas.classList.add('max')
        }

    }

    createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.classList.add('canvas');
        return canvas
    }

}

window.customElements.define('ui-modal', UIModal)