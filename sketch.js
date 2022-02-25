
var waitimg
var play,about,playimg,howimg,back,backimg,reset,resetimg,home
var gameState="wait"
var bgimg, popup,popupimg
var canvas, player2img, runner, runner2
var obstaclesGroup, obstacle1, obstacle2, obstacle3
var invisibleGround,fonts
var score=0,life=3,scorepop,scorepopimg
var gameoverimg,gameover
var trophy,trophyimg

function preload(){
waitimg=loadImage("bg1.PNG")

bgimg= loadImage("logo.gif")
buttonimg=loadImage("button.png")
playimg=loadImage("Marathon.PNG")
hitsound=loadSound("hitsound.mp3")

popupimg = loadImage("Popup.png")
trackimg=loadImage("Track1.PNG")
fonts = loadFont("font4/fonttype.ttf")

playsound=loadSound("gamesound.mp3")
scorepopimg= loadImage("pop1.png")

gameoverimg=loadImage("gameover.gif")
player1img= loadImage("runner1.gif" )
player2img = loadImage("runner2.gif");
obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");

trophyimg=loadImage("trophy.gif")


}

function setup(){
createCanvas(windowWidth-20,windowHeight-20)

textFont(fonts)
play=createImg("play1.png")
play.position(width/2,height-190)
play.size(200,200)


home=createImg("home.png")
home.position(width-180,height-180)
home.size(200,200)
home.hide();

about=createImg("how1.png")
about.position((width/2)-200,height-190)
about.size(200,200)
about.hide()

track=createSprite(width/2,height/2,width,height)
track.addImage(trackimg)
track.scale=5.5
track.visible=false

livespop=createSprite(width/4,40)
livespop.addImage(scorepopimg)
livespop.scale=.6
livespop.visible=false

scorepop=createSprite(width-width/6,40)
scorepop.addImage(scorepopimg)
scorepop.scale=.6
//scorepop.visible=false

runner=createSprite(200,height/2+85)
runner.addImage(player1img)
runner.visible = false;
runner.scale=2.15
runner.debug=true
runner.setCollider("circle",0,0,runner.width/4)


runner2=createSprite(120, height/2-150,500,500)
runner2.addImage(player2img);
runner2.visible = false;
runner2.scale=1.6

invisibleGround = createSprite(width/2, height-180, width, 40);
invisibleGround.visible= false;

obstaclesGroup = new Group();

/*back=createImg("buttonplain.png")
back.position(play.x+200,height-200)
back.size(200,200)*/

reset=createImg("Reset.png")
reset.position(width/2-100,height/2)
reset.size(200,200)
reset.hide()


logo=createSprite(windowWidth/2,windowHeight/2.75)
logo.addImage(bgimg)
logo.scale=2.5


popup=createSprite(width/2,height/2)
popup.addImage(popupimg)
popup.scale=1.5
popup.visible=false


gameover= createSprite(width/2,height/2)
gameover.addImage(gameoverimg)
gameover.scale=4
gameover.visible=false



trophy=createSprite(width/2,height/2)
trophy.addImage(trophyimg)
trophy.scale=2
trophy.visible=false

}

function draw(){
background(180)
    if(gameState==="wait"){
background(waitimg)
play.show()
gameover.visible=false

scorepop.visible=false
reset.hide()
trophy.visible=false

    about.show()
    logo.visible=true
    home.hide()
    popup.visible=false
    track.visible=false

    runner.visible = false;
    runner2.visible = false;

    obstaclesGroup.destroyEach();
    playsound.stop()

    livespop.visible=false


}


play.mousePressed(()=>{
    gameState="playstate"
    background(180)
    playsound.loop()

    
})

if(gameState==="playstate"){
    play.hide()
    about.hide()
    livespop.visible=true

    trophy.visible=false

    scorepop.visible=true
    logo.visible=false
    home.hide()
    popup.visible=false
    track.visible=true
    reset.hide()

    runner.visible = true;
    runner2.visible = true;

    track.velocityX= -15
    if(track.x<=width/4){
        track.x=width/2

        score = score + Math.round(getFrameRate()/60);



    }


        
    

    if(keyDown("space") && runner.y >= 0) {
        runner.velocityY = -10;
      }
      
    
      runner.velocityY = runner.velocityY + 0.8

      runner.collide(invisibleGround)
    spawnObstacles()


    for(i=0;i<obstaclesGroup.length;i++){
    if(obstaclesGroup.get(i).isTouching(runner)){
       obstaclesGroup.get(i).destroy()
       life -=1
       hitsound.play()
    }}

    if(life<=0){
        gameState  = "end"

    }

  /*  for(i=0;i<obstaclesGroup.length;i++){
        if(obstaclesGroup.get(i).isTouching(runner)){
           obstaclesGroup.get(i).destroy()
            gameState  = "end"
        }}*/


}
else if (gameState === "end"){
    background(0)
    console.log(gameState)
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.destroyEach()
    track.velocityX = 0;
    runner.collide(invisibleGround)
    runner.velocityX  =0;
    reset.show()
    playsound.stop()
    runner.velocityY=0
    runner.visible=false
    runner2.visible=false
    gameover.visible=true
trophy.visible=false

}

reset.mousePressed(()=>{
    gameState="resetstate"
    playsound.stop()
    

})


home.mousePressed(()=>{
    gameState="wait"
})

if(gameState==="resetstate"){
    score=0
    life=3
    gameState="wait"
    track.velocityX= 0
    runner.velocityY=0
    home.hide()
    livespop.visible=false
    trophy.visible=false
   

    
    
}
if(gameState=== "level1" || gameState==="level2" || gameState==="level3"){
    track.velocityX=0
   runner.visible=false
    runner2.visible=false
obstaclesGroup.destroyEach()


}





about.mousePressed(()=>{
    gameState="howstate"
 
})

if(gameState==="howstate"){
    background(waitimg)
    home.show()
    about.hide()
    popup.visible=true
    livespop.visible=false
    playsound.stop()


}
if(score===10 ){
      gameState="level1"
      trophy.visible=true
    }

    if(score===20 ){
        gameState="level2"
        trophy.visible=true
      }

      if(score===30 ){
        gameState="level3"
        trophy.visible=true
      }


drawSprites()

if(gameState==="level1" || gameState==="level2" || gameState==="level3"){

    textSize(42)
    fill("red")
    stroke("yellow")
    strokeWeight(4)
    text("Level Cleared ....Congratulations... press UP Arrow to start next level",10,height/2)
    if( keyDown("UP_ARROW")){
        gameState="playstate"
        score=score+1
runner.visible=true
runner.collide(invisibleGround)        
    }

}
if(gameState!=="wait"){
    textSize(25)
    fill("red")
    stroke("yellow")
    strokeWeight(4)
    text("Score: "+ score, scorepop.x-70,45);
    text("Lives Left: "+ life, livespop.x-80,45);
    
}
}

function spawnObstacles() {
    if(frameCount % 60 === 0) {
      var obstacle = createSprite(width,height/2);
      //obstacle.debug = true;
      obstacle.velocityX = -10;
      var r=Math.round(random(height/3.95,height-210))
      obstacle.y=r
      obstacle.debug=true
obstacle.scale=.75
obstacle.setCollider("circle",0,0,60)
      
      //generate random obstacles
      var rand = Math.round(random(1,3));
      switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle2);
                break;
        case 3: obstacle.addImage(obstacle3);
                break;
        default: break;
      }

      runner.depth=obstacle.depth+1
      
      //assign scale and lifetime to the obstacle           
      obstacle.scale = 0.5;
      obstacle.lifetime = 400;
      //add each obstacle to the group
      obstaclesGroup.add(obstacle);
    }
  }

  