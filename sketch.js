//Create variables here
var dog, database, foodStock, foodS
var dogH, dogI
function preload() {
  dogI = loadImage("dogImg.png");
  dogH = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(800, 1600);
  database = firebase.database();
  dog = createSprite(400, 500, 50, 50);
  dog.addImage(dogI);
  dog.scale = 0.4;
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  foodStock.set(40)



}


function draw() {
background(51, 204, 51);

textSize(20);
  fill("Black");
  text("Note: Press UpArrow Key To Feed Percy Milk!", 40, 50);
  text("Food Remaining : " + foodS, 155, 110);

if (keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(dogH);
}

if (keyWentUp(UP_ARROW)){
  dog.addImage(dogI);
}

if(foodS===0){
  foodS=20;
}



  drawSprites();
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}


