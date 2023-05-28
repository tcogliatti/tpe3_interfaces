class Cliente extends Personaje {

    constructor() {
        super();
        this.speedEnemy = 5;
        this.cliente = document.createElement("div");
        this.cliente.classList.add("cliente");
        document.getElementById("contenedor").appendChild(this.cliente);
        this.cliente.style.display = this.status;
    }

    render(render){
        if(render){
            this.status = "block";
            this.cliente.style.left = '0px';
            
        } else
            this.status =  "none";
        
        this.cliente.style.display = this.status;
    }
    getOffsetLeft(){
        return this.cliente.offsetLeft;
    }
    getOffsetWidth(){
        return this.cliente.offsetWidth;
    }
    getDiv(){
        return this.cliente;
    }
}