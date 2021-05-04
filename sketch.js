var bg;
var database;
var back_img;
var gameState =0;
var playerCount = 0;
var allPlayers;
var score =0;
var player, form,game;
var player1,player2, players,fruits, fruitGroup;
var fruit1_img, fruit2_img, fruit3_img, fruit4_img, fruit5_img;
var player_img, player1score =0, player2score =0;

function preload() {
    back_img = loadImage("jungle.jpg");
    player_img = loadImage("basket2.png");
    fruit1_img = loadImage("apple2.png");
    fruit2_img = loadImage("banana2.png");
    fruit3_img = loadImage("melon2.png");
    fruit4_img = loadImage("orange2.png");
    fruit5_img = loadImage("pineapple2.png");
    
}
function setup() {
    createCanvas(displayWidth-10, displayHeight-111);
    database = firebase.database();
    game = new Game();
    game.getState();
    game.start();
    bg = createSprite(displayWidth / 2, displayHeight / 2, 1920, 1080)
    bg.addImage(back_img);
    bg.scale = 2;
    
    fruitGroup = new Group();
    
}

function draw() {
    background(0);
    if (playerCount === 2) {
        game.update(1);
    }
    if (gameState === 1) {
        clear();
        game.play();
        
        
    }
    if (gameState === 2) {
        game.end();
    }
    // Add conditions for gameStates and playerCount
    //drawSprites();
}