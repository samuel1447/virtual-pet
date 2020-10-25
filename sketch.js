//Create variables here
var dog,happy_DogImg,dog_img;
var foodS,foodStock;
var database;

function preload()
{
  //load images here
  
  dog_img = loadImage("dog.png");
  happy_DogImg = loadImage("doghappy.png");

}

function setup() {
  createCanvas(500,500);
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  dog = createSprite(250,250);
  dog.addImage("dog",dog_img);
  //dog.scale(5);

}


function draw() {  
  background(46,139,87)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage("dog",happy_DogImg);
    foodStock -= 1;
  }  

  drawSprites();
  //add styles here
  textSize(20);
  fill("white");
  stroke(10)
  text("Food Remaining:" + foodS,150,100);
  text("NOTE:"+ "Press Up Arrow key to feed milk to your dog",25,50);

drawSprites()

}

function readStock(data){
    foodS = data.val();
}

function writeStock(x){
    if(x<=0){
      x=0;
    }else{
      x -= 1;
    }

    database.ref('/').update({
      Food:x,
    })
}
