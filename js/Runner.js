class Runner extends Personaje {

    constructor() {
        super();
        this.personaje = document.getElementById("personaje");
        this.personaje.addEventListener("animationend", () =>{ this.verificarAnimacion() });
        document.addEventListener('keydown', () => { this.saltar() });
    }
    verificarAnimacion() {
        console.log('verif anim');
        if (this.personaje.classList.contains('saltar')) {
            this.personaje.classList.remove("saltar");
            this.personaje.classList.add('caer');
        } else if (this.personaje.classList.contains('caer')) {
            this.personaje.classList.remove("caer");
            this.personaje.classList.add('correr');
        }
    }
    status() {
        this.personaje.getBoundingClientRect();
    }

    correr() {
        this.clean();
        this.personaje.classList.add("correr");
    }

    saltar() {
        if (this.personaje.classList.contains("correr")) {
            this.clean();

            this.personaje.classList.add("saltar"); 
       }
    }
    caer() {
        this.clean();
        this.personaje.classList.add("caer");
    }

    /**
     * 
     */
    clean() {
        this.personaje.classList.remove("correr");
        this.personaje.classList.remove("saltar");
        this.personaje.classList.remove("caer");
    }
}