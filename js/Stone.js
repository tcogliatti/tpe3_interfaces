class Stone {
    constructor(container, cant){
        this.container = container;
        this.cant = cant;
        this.arrayOfStones = []

        let altura = container.offsetHeight;
        let ancho = container.offsetWidth;
        let initY = container.offsetTop
    

        for (let i = 0; i < this.cant; i++) {
            // console.log('Alto', altura, "/ Ancho", ancho, '/init Y', initY);
            // crea el elemento
            let stone = document.createElement('div');
            // asigan una altura ramdom
        
            // stone.style.left = '50px';
            stone.style.left = `${Math.floor(Math.random() * (100 + 1))}%`;
            stone.style.width = '178px';
            stone.style.height = '135px';
            stone.style.animation = 'stones 10s linear infinite';
            stone.classList.add("stones");
            
            let stoneHeight = stone.offsetHeight;
            // let posY =  Math.random() * (altura);
            // let posY =  Math.floor(Math.random() * 38);
            let posY =  Math.floor(Math.random() * (63 - 26 + 1)) + 26;
            stone.style.top = `${posY}%`;
            let scale = ((posY-26) / 37)
            stone.style.transform = `scale(${scale})`;
            let spriteStone = 178 * 3;
            stone.style.backgroundPosition = `${spriteStone}px`;
        }
        container.appendChild(stone)
    }
}