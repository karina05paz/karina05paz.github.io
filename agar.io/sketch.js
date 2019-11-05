let showTitle = true;
let showRules = false;
let gameEnd = false;
let clicked = false;
let circle, eatSound, gameOverSound, player;
let circles = [];
let circleColour = [' #98FB98', '#87CEFA', '#FF69B4', '#EE82EE'];
let velocidadeX = [];
let velocidade = [];

function setup() {
  createCanvas(1350,599);
  player = new Player();
  circle = new Circle(random([-40, width + 40]), random(0, height), random(2, 50), random(circleColour));
  circles.push(circle);
}

function draw() {
  background(16, 199, 168);
  startGame(dist(mouseX, mouseY, 200, 250));
  rules();
  move();
  

  if (showTitle == false && showRules == false) {
    
   // Se o jogo não terminar, mostre e mova o círculo do jogador
    if (gameEnd == false) {
      player.display(player.score);
      player.move(player.score);
    }
    
    // Mostra a pontuação no canto da tela
    fill(0);
    noStroke();
    textSize(30);
    text(player.score, 30, 30);
    
    if (frameCount % 15 == 0) { // Após 15 quadros, gera um novo círculo
      circle = new Circle(random([-40, width + 40]), random(0, height), random(2, 50), random(circleColour));
      circles.push(circle);
    }
    
    
// Para cada círculo na matriz, mova a exibição e teste a colisão

    for (let circle of circles) {
      circle.collision(player.playerX, player.playerY, player.score + 15, player.score);
      
  // Se o jogo não terminou, mova-se e exiba os círculos
      if (gameEnd == false) {
        circle.display();
        circle.move();
      }
    }
    
   // Para cada círculo na matriz, teste se foi 'comido' pelo jogador ou fora da tela e remova-o da lista
    for (let index = circles.length - 1; index >= 0; index--) {
      if (circles[index].circleX > width + 45 || circles[index].circleY > height + 30 || circles[index].circleY < -30 || circles[index].circleX < -45) {
        circles.splice(index, 1)
      }

      if (circles[index].hit == true) {
        player.score += 1;
     	circles.splice(index, 1);
      } 
    }
  win();
  }
}
// Exibe o círculo do jogador e controla o movimento do jogador
class Player {
  constructor () {
    this.playerY = height/8;
    this.playerX = width/8;
    this.score = 0;
  }
  
  move(_score) {
    
    // Se o mouse estiver pressionado, mova a bola, a menos que esteja fora dos limites, mantenha-a na borda
    if (mouseIsPressed) {
      if (mouseX < (_score + 10) / 2 || mouseX > width - (_score + 10) / 2 ) {
        this.playerX = this.playerX;   
      } else {
          this.playerX = mouseX;
      }
    
      if (mouseY < (_score + 10) / 2 || mouseY > height - (_score + 10) / 2) {
        this.playerY = this.playerY
      } else {
          this.playerY = mouseY;
      }
    }
  }
  
  display(_score) {
    fill(0);
    noStroke();
    ellipse(this.playerX, this.playerY, _score + 20);
  }
}

class Circle {
  constructor(_circleX, _circleY, _circleSize, _circleColour) {
    this.circleX = _circleX;
    this.circleY = _circleY;
    this.circleSize = _circleSize;
    this.circleColour = _circleColour;
    this.movementX = random(1, 1); // Defina a velocidade em que o círculo se moverá
    this.movementY = random(-0.1, 0.1);
    this.hit = false;
    this.timer = 0;
  }
  
  display() {
    fill(this.circleColour);
    stroke(0);
    strokeWeight(0);
    ellipse(this.circleX, this.circleY, this.circleSize);
  }
  
  move() {
// Se o círculo aparecer no lado direito da tela, inverta o valor X para fazê-lo recuar
    if (this.circleX == width + 40) {
      this.movementX *= -1;
    }
    
    this.circleX+= this.movementX;
    this.circleY += this.movementY;
  }
  
  collision(_playerX, _playerY, _playerSize, _score) {
    
// Teste se o círculo do jogador está dentro dos círculos inimigos 
   	if (dist(this.circleX, this.circleY, _playerX, _playerY) < this.circleSize/2 + (10 + _score)/2) {
      
// se o círculo inimigo for maior que o círculo do jogador, finalize o jogo
      if (this.circleSize > _playerSize) {
        fill(0);
        noStroke();
        textSize(30);
        text('Você perdeu.: \n sua pontuação: '+ _score, width/2, height/2 - 10);
        replay();
        clicked = false;
        
        if (this.timer == 0) {
          gameOverSound.play();
          this.timer += 1;
        }
        
      } else {
        this.hit = true;
        eatSound.play();
      }
    }
  }
}

// Tela inicial
function startGame(distance) {
  if (showTitle == true) {
    
    // título do jogo
    strokeWeight(2);
    noStroke();
    fill(0);
    textAlign(CENTER);
      text("\n\n SENAI - Serviço Nacional  \n de Aprendizagem Industrial. \n\n Aprendizagem Indústrial\n Programador de Computador. \n\n PROFESSOR: Tarcísio Nunes\n\n  ALUNAS: \n  Fabiula, Gabriele, Karina e Tainara\n\n Ucr: Linguagem de Programação Web.\n\n", width/2, 50);
    textSize(30);
    
      // botão play
    strokeWeight(5);
    stroke(0);
    fill(255);
    ellipse(200, 250, 160);
    
 // teste se o mouse está sobre a parte superior do botão play
    if (distance < 80) {
      stroke(255);
      fill(0);
      ellipse(200, 250, 170);
   // se o mouse for pressionado dentro do botão, desapareça
      if (mouseIsPressed) {
        showTitle = false;
        showRules = true;
      }
    }
    
    triangle(245, 250, 170, 210, 170, 290);
  }
}

// Se o botão play foi pressionado, exiba as regras
function rules() {
  if (showTitle == false && showRules == true) {
    textSize(20);
    fill(0);
    textStyle(BOLD);
    text("Como jogar", width/2, 50);
    textStyle(NORMAL);
    text("\n\n 1. Você é um pequeno circulo preto. \n Você pode mover arrastando o mouse ou com as setas. \n\n 2. Seu objetivo é engolir o outro, movendo-se  \n  em circulos,no entanto, você só pode comer  \n  circulos menores que você. \n\n 3.Você ganha quando sua pontuação bater 20.", width/2, 50);

    // Desenha o botão   
    rectMode(CENTER);
    fill(255);
    strokeWeight(5);
    stroke(0);
    rect(width/2, height - 55, 120, 40, 15, 15, 15, 15);
    noStroke();
    fill(0);
    text('Boa sorte!', width/2, height-50);
    
// Teste se o mouse está passando o mouse sobre a 'boa sorte!' botão e mude de cor
    if (mouseX > width/2 - 60 && mouseX < width/2 + 60 && mouseY > height - 80 && mouseY < height - 30) {
      fill(0);
      rect(width/2, height - 55, 120, 40, 15, 15, 15, 15);
      noStroke();
      fill(255);
      text('Boa sorte!', width/2, height-50);
      
 // Se o mouse for pressionado ao passar o mouse sobre o botão, não exiba as regras
      if (mouseIsPressed) {
        showRules = false;
      }
    }
  }
}

// Teste se a pontuação é >10  e, em caso afirmativo, pare o jogo e exiba a mensagem final
function win() {
  if (player.score == 20) {
    textSize(30);
    fill(0);
    noStroke();
    text('Parabéns ! \n Você venceu!', width/2, height/2 - 10);
    replay();
    clicked = false;
  }
}
// Impede que os círculos e o jogador apareçam e se movam e crie um botão play again
function replay() {
  gameEnd = true;
  fill(255);
  strokeWeight(5);
  stroke(0);
  rect(width/2, height/2 + 60, 160, 40, 15, 15, 15, 15);
  fill(0);
  noStroke();
  text('De novo!', width/2, height/2 + 70);
  
  // Teste se o mouse está passando o mouse sobre o botão
  if (mouseX > width/2 - 80 && mouseX < width/2 + 80 && mouseY > height/2 + 30 && mouseY < height/2 + 90) {
    fill(0);
    rect(width/2, height/2 + 60, 160, 40, 15, 15, 15, 15);
    fill(255);
    noStroke();
    text('De novo!', width/2, height/2 + 70);
    

// Teste se o mouse está sendo pressionado enquanto passa o mouse sobre o botão
    if (clicked == true) {
      circles = [];
      player.score = 0;
      gameEnd = false;
    }
  }
}

function mouseClicked() {
  clicked = true;
}

function move(){
  if(keyIsDown(UP_ARROW)){
       player.playerY -= 2;
     }
  if (keyIsDown(DOWN_ARROW)) {
    player.playerY += 2;
  }
  if(keyIsDown(LEFT_ARROW)){
       player.playerX -= 2;
     }
  if (keyIsDown(RIGHT_ARROW)) {
    player.playerX += 2;
  }
}

function preload() {
  eatSound = loadSound('Ding Sound Effect.mp3');
  gameOverSound = loadSound('Splat.mp3');
}
