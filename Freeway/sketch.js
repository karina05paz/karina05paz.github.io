function setup() {
createCanvas(500, 400);
 // trilhaSonora.loop();
}

function draw() {
  background(imagemDaEstrada);
 if(!(placar >= 10 || placar2 >=10))
    jogo();
  else
    mostraVencedor();
  
   //fim do draw
}

function mostraVencedor(){
 if(placar >= 10){ 
   textAlign(CENTER);
   fill(0);
   textSize(30);
   text("Lado esquerdo é campeão",300,200);
  }else{
    if(placar2 >= 10){ 
   textAlign(CENTER);
   fill(0);
   textSize(30);
   text("Lado direito é campeão",300,200);
    
  }
  }
}
function jogo(){
 mostraAtor();
  movimentaAtor();
  mostraCarro();
  movimentaCarro();
  verificaColisao();
  mostraPlacar ();
  mostraAtor2();
  movimentaAtor2();
  verificaColisao2();
  mostraPlacar2();
  mostraVencedor();
}