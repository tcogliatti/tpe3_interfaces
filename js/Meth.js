class Meth extends Personaje {

    constructor() {
        super();
        this.speedMeth = 5;
        this.meth = document.createElement("div");
        this.meth.classList.add("meth");
        this.meth.classList.add("things");
        document.getElementById("contenedor").appendChild(this.meth);
        this.meth.style.display = this.status;
    }
    render(render){
        if(render){
            this.status = "block";
            this.meth.style.left = '0px';
            
        } else
            this.status =  "none";
        
        this.meth.style.display = this.status;
    }
    getOffsetLeft(){
        return this.meth.offsetLeft;
    }
    getOffsetWidth(){
        return this.meth.offsetWidth;
    }
    getDiv(){
        return this.meth;
    }
}