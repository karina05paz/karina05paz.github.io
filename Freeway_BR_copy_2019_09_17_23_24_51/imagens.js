//imagens.js
// Definição das Variáveis do jogo
let imagemDaEstrada;
let imagemDoAtor;
let imagensCarro =[]; //Array de  imagens




//sons
let trilhaSonora;
let somColidiu;
let somPonto;

function preload(){
  
  ///Pré carregamento dos sons
  trilhaSonora =loadSound("sons/trilha.mp3");
  somColidiu =loadSound("sons/colidiu.mp3");
  somPonto =loadSound("sons/pontos.wav");
  
  
  //Pré-carregamento das imagens nas variáveis 
   imagemDaEstrada = loadImage("imagens/estrada.png");
   imagemDoAtor = loadImage("imagens/ator-1.png");
   imagensCarro[0] = loadImage ("imagens/carro-1.png");
   imagensCarro[1] = loadImage ("imagens/carro-2.png");
   imagensCarro[2] = loadImage ("imagens/carro-3.png");
  //mais3
   imagensCarro[3] = loadImage ("imagens/carro-1.png");
   imagensCarro[4] = loadImage ("imagens/carro-2.png");
   imagensCarro[5] = loadImage ("imagens/carro-3.png");


}
