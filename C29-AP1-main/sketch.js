const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var mutee
var blower
var bk_sond
var cut
var sad_sond
var eat_sond
var air
var solo;
var rope ;
var fruit;
var fruit_con;

function preload(){
melon = loadImage('melon.png');
mute = loadImage('mute.png');
backgroundimg = loadImage('background.png');
rabbit = loadImage('Rabbit-01.png');
blink = loadAnimation('blink_1.png','blink_2.png','blink_3.png');
blink.playing=true;
eat = loadAnimation('eat_0.png','eat_1.png','eat_2.png','eat_3.png','eat_4.png');
eat.playing=true;
eat.looping=false;
sad = loadAnimation('sad_1.png','sad_2.png','sad_3.png');
sad.playing=true;
sad.looping=false;
bk_sond = loadSound('sound1.mp3')
sad_sond = loadSound('Cutting Through Foliage.mp3')
cut = loadSound('rope_cut.mp3')
eat_sond = loadSound('eating_sound.mp3')
}


function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  bk_sond.play();
  bk_sond.setVolume(0.1);

  bunny = createSprite(230,590,100,100);
  bunny.scale = 0.3;
  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('sad', sad);
  bunny.changeAnimation('blinking');

  button = createImg('cut_button.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);
  
  solo = new Solo(200,690,700,20);
  rope = new Rope(6,{x:245,y:30});

  var options ={
    density:0.001
  }
  fruit = Bodies.circle(300,300,15,options);
  Matter.Composite.add(rope.body,fruit);
  fruit_con = new Link(rope,fruit);
  
  blower = createImg('blower.png');
  blower.position(10,250);
  blower.size(150,100);
  blower.mouseClicked(airr);

  mutee = createImg('mute.png');
  mutee.position(450,20);
  mutee.size(50,50);
  mutee.mouseClicked(mute);

  //rabbitt = createSprite(250,620,100,100);
  //rabbitt.addImage(rabbit);
  //rabbitt.scale = 0.3

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
  imageMode(CENTER);
}

function draw() 
{
  background(51);
  image(backgroundimg,width/2,height/2,500,700);
  solo.show();
  rope.show();
  if(fruit!=null){
    image(melon,fruit.position.x,fruit.position.y,60,60)
  }
  if(collided(bunny,fruit)==true){
    bunny.changeAnimation('eating');
    eat_sond.play();
  }
  if(collided(solo.body,fruit)==true){
    bunny.changeAnimation('sad');
    sad_sond.play();
  }
  Engine.update(engine);
   drawSprites();
}
function drop(){
  rope.break();
  fruit_con.detach();
  fruit_con = null;
  cut.play();
}
function collided(sprite,body){
  if(body!=null ){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(d <= 80){
      World.remove(engine.world,fruit);
      fruit = null;
      return true;
      
    }
    else{
      return false;
    }
  }

}

function airr(){
Matter.Body.applyForce(melon,{x:0,y:0},{x:0.5,y:0});


}

function mute(){
  if(bk_sond.isPlaying()){
    bk_sond.stop();
  }
  else{
    bk_sond.play();
  }
}