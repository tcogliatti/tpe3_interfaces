class Enemigo extends Personaje {

    constructor() {
        super();
        this.speedEnemy = 5;
        this.enemigo = document.createElement("div");
        this.enemigo.classList.add("enemigo");
        document.getElementById("contenedor").appendChild(this.enemigo);
        this.enemigo.style.display = this.status;
    }

    render(render){
        if(render){
            this.status = "block";
            this.enemigo.style.left = '0px';
            
        } else
            this.status =  "none";
        
        this.enemigo.style.display = this.status;
    }
    getOffsetLeft(){
        return this.enemigo.offsetLeft;
    }
    getOffsetWidth(){
        return this.enemigo.offsetWidth;
    }
    getDiv(){
        return this.enemigo;
    }
}