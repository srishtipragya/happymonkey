var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running,ground;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  survivalTime=0;
  
  //create running monkey
  monkey=createSprite(50,340);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.15;
  monkey.debug=true;
  monkey.setCollider("rectangle",0,0,400,600);
  //create ground
  ground=createSprite(300,390,1200,15);
  ground.shapeColor="brown";
  ground.velocityX=-5;
  
  obstacleGroup=new Group();
  foodGroup=new Group();
}


function draw() {
  background(200);
  fill("brown");
  textSize(20);
  text("Survival Time:"+survivalTime,300,30);
  if(gameState===PLAY){
  survivalTime=survivalTime+(Math.ceil(getFrameRate()/60));
  
  //console.log(monkey.y);
  if(keyDown("space")&& monkey.y>=280){
    monkey.velocityY=-13;
  }
  monkey.velocityY=monkey.velocityY+0.8;
  //infinite ground
  if(ground.x<0){
    ground.x=width/2;
  }
  spawnObstacles();
  spawnFood();
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
  }
  if(obstacleGroup.isTouching(monkey)){
    gameState=END;
  }
  }
  else if(gameState===END){
    ground.velocityX=0;
    monkey.velocityY=0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }
    
    
    
  
  monkey.collide(ground);

  drawSprites();
}

function spawnObstacles(){
  if(frameCount%300===0){
    obstacle=createSprite(600,370);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.13;
    obstacle.velocityX=-5;
    obstacle.lifetime=120;
    obstacleGroup.add(obstacle);
  obstacle.debug=true;
    obstacle.setCollider("rectangle",0,0,400,400);
  }
}
function spawnFood(){
  if(frameCount%80===0){
    banana=createSprite(600,random(120,200),20,20);
    banana.addImage(bananaImage);
    banana.scale=0.15;
    banana.velocityX=-7;
    foodGroup.add(banana);
    banana.debug=true;
    banana.setCollider("rectangle",0,0,500,300);
  }
  
}



