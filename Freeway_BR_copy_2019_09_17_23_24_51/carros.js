//carro.js
//Carro
let xCarros = [600,600,600,600,600,600];
let yCarros = [40, 98, 150,210,260,315];
let velocidadesCarros = [2,1,3,1,1,1];
let comprimentoCarros = [50,50,80,50,50,80];
let altura = 40;




function mostraCarro(){
    for(let i=0; i<imagensCarro.length; i++){    
      image(imagensCarro[i],xCarros[i],yCarros[i],comprimentoCarros[i],altura);
}
       
 }
  
  function movimentaCarro(){
    
     for(let i=0; i<imagensCarro.length; i++){ 
       xCarros[i] -= velocidadesCarros[i];
     
     if (xCarros[i] < -50){
     xCarros[i] = 600; //Volta a posição inicial
  
    }
   }
   
}




   
  


