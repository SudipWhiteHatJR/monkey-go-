var backgroundImage,backgroun;
var monkey, player_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gameOver;
var score=0;

var banana;

function preload(){
  backgroundImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  

  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  backgroun=createSprite(0,0,800,400);
  backgroun.addImage(backgroundImage);
  backgroun.scale=1.5;
  backgroun.x=backgroun.width/2;
  backgroun.velocityX=-4;
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("Running",player_running);
  monkey.scale = 0.17;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-10;
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(backgroun.x<100){
    backgroun.x=backgroun.width/2;
  }
  
    if(FoodGroup.isTouching(monkey)){
       FoodGroup.destroyEach();
    score = score + 1;
    }
    switch(score){
        case 10: monkey.scale=0.14;
                break;
        case 20: monkey.scale=0.16;
                break;
        case 30: monkey.scale=0.18;
                break;
        case 40: monkey.scale=0.20;
                break;
        default: break;
    }
  
    if(keyDown("space") && monkey.y >=264 ) {
      monkey.velocityY = -18;
     
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);
    spawnFood();
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(monkey)){ 
        monkey.scale=0.08;
    }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 400,50);
}

function spawnFood() {

  if (frameCount % 70 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);  
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}


  
