var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300, 300);
  ghost.addImage(ghostImg);
  ghost.debug = true;
  ghost.scale = 0.4;
  ghost.setCollider("rectangle", -20, 0, 150, 200)
  climbersGroup = new Group();
  doorsGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);
  if(gameState === PLAY) {
    spookySound.loop();  
    spawnDoors();
    if(tower.y > 400){
        tower.y = 300
    }
    if(keyDown("right_arrow")) {
      ghost.x = ghost.x + 5;
    }
    if(keyDown("left_arrow")) {
      ghost.x = ghost.x - 5;
    }
    if(keyDown("space")) { 
      ghost.velocityY = -5;
    }
    ghost.velocityY = ghost.velocityY + 0.8;
    if(ghost.isTouching(climbersGroup)) {
      ghost.velocityY = 0;
    }
  }
  if(ghost.isTouching(invisibleBlockGroup) || ghost.y > height) {
    gameState = END;
  }
  drawSprites();
  if(gameState === END) {
    fill(20);
    textSize(20);
    text("Game Over", 300, 300);
    tower.velocityY = 0;
  }
}

function spawnDoors() {
  if(frameCount % 200 === 0) {
    door = createSprite(Math.round(random(100, 500)), -60);
    door.addImage(doorImg);
    door.velocityY = 1;
    door.lifetime = height / door.velocityY;
    doorsGroup.add(door);

    climber = createSprite(door.x, door.y + 70);
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.lifetime = door.lifetime;
    climbersGroup.add(climber);

    invisibleBlock = createSprite(climber.x, climber.y + 10, 100, 4);       
    invisibleBlock.velocityY = 1;
    invisibleBlock.visible = false;
    invisibleBlock.lifetime = climber.lifetime;   
    invisibleBlockGroup.add(invisibleBlock);
  }
  // ghost.depth = door.depth + 1;
}

