var go
var restart
var play=1;
var end=0;
var gameState=play;
var score=0
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage,gameover;

var cloud, cloudGroup,obstacleGroup, cloudImage;
var cactus1,cactus2,cactus3,cactus4,cactus5,cactus6;


var newImage,restartimg;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  gameover=loadImage("gameOver.png")
  cloudImage = loadImage("cloud.png");
 cactus1=loadImage("obstacle1.png");
cactus2=loadImage("obstacle2.png");
cactus3=loadImage("obstacle3.png")
cactus4=loadImage("obstacle4.png")
cactus5=loadImage("obstacle5.png")
cactus6=loadImage("obstacle6.png")
restartimg=loadImage("restart.png")
}

function setup() {
  createCanvas(600, 200);

  
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  // trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  trex.debug=true;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudGroup=createGroup();
  obstacleGroup=createGroup();
  
  console.log("Hello"+ 5)
  go=createSprite(300,100)  
go.addImage(gameover)
go.scale=0.5
 restart=createSprite(300,130)
restart.addImage(restartimg)
restart.scale=0.5;
  
}

function draw() {
  background(55);
  textSize(20)
  text(score,360,20)

  if(gameState===play)
{
    score+=Math.round(getFrameRate()/60); 
  go.visible=false;
  restart.visible=false;
  if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -10;
    
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }  
   trex.collide(invisibleGround);
  spawnClouds();
  swampObstacles();
   if(obstacleGroup.isTouching(trex))
{
    gameState=end;
   // trex.changeImage(trex_collided);
} 
} 
  else if(gameState===end)
{
  
  trex.velocityY=0 ;  
  ground.velocityX=0;
  cloudGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);
  cloudGroup.setLifetimeEach(-1);
  obstacleGroup.setLifetimeEach(-1); 
  go.visible=true;
  restart.visible=true;
  cloudGroup.destroyEach();
  obstacleGroup.destroyEach();
 
}
    
   //spawn the clouds
  reset();
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    //assigning lifetime to the variable
    cloud.lifetime = 134
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    cloudGroup.add(cloud) ;
    }
}

function swampObstacles()
{
  if (frameCount%60===0)
{
  var obstacle=createSprite(600,170);
var ob=Math.round(random(1,6))
  switch(ob)
{
    case 1:obstacle.addImage(cactus1);
    break ;
     case 2:obstacle.addImage(cactus2);
    break ;
     case 3:obstacle.addImage(cactus3);
    break ;
     case 4:obstacle.addImage(cactus4);
    break ;
     case 5:obstacle.addImage(cactus5);
    break ;
     case 6:obstacle.addImage(cactus6);
    break ;
    default:
    break;
}
 
  obstacle.scale=0.4;
  obstacle.velocityX=-3;
  obstacle.lifetime=300;
   obstacle.debug=true;
  obstacleGroup.add(obstacle);
}
}

function reset()
{
  if(mousePressedOver(restart))
    {
       score=0;
      gameState=play;
      
    }
}