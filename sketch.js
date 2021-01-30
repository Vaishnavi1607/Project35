var balloon;
var bgI,balloonI,b2,b3;
var database;
var updateHeight,readHeight,showError;

function preload(){
bgI = loadImage("Hot Air ballon-01.png")
balloonI = loadAnimation("Hot Air ballon-02.png")
b2 = loadAnimation("Hot Air ballon-02.png","Hot Air ballon-02.png",
"Hot Air ballon-03.png","Hot Air ballon-03.png","Hot Air ballon-04.png",
"Hot Air ballon-04.png")

}

function setup(){
    createCanvas(800,500)
  database = firebase.database(); 
    
  balloon = createSprite(70,200,10,10)
   balloon.addAnimation("Balloon",balloonI)
   balloon.scale= 0.4
 
  
  var position = database.ref('balloon/height')
   position.on("value",readHeight,showError);
}


function draw(){
    background(bgI)

    if(keyDown(LEFT_ARROW)){
        balloon.x = balloon.x-10
       balloon.addAnimation("Balloon",b2)
       
    }
    else if(keyDown(RIGHT_ARROW)){

        balloon.x = balloon.x+10
       balloon.addAnimation("Balloon",b2)
       
    }
    else if(keyDown(UP_ARROW)){
        balloon.y = balloon.y-10
 balloon.addAnimation("Balloon",b2)
        balloon.scale=balloon.scale -0.008
    }
    else if(keyDown(DOWN_ARROW)){
        balloon.y = balloon.y+10
       // updateHeight(0,10);
        balloon.addAnimation("Balloon",b2)
        balloon.scale=balloon.scale +0.004;
    }

    drawSprites();
}


function updateHeight(x,y){
    database.ref('balloon/height').set({
     'x': height.x + x,
     'y': height.y + y
    })
}
function readHeight(data)
{
    height = data.val();
    balloon.x = height.x;
    balloon.y = height.y;
}

function showError(){
    console.log("Error in writing to the database")
}

  