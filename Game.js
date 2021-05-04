class Game {
    constructor() { }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form()
            form.display();
        }
        player1 = createSprite(200, 500);
        player1.addImage("player1", player_img);

        player2 = createSprite(800, 500);
        player2.addImage("player2", player_img);
        players = [player1, player2];

    }

    play() {

        form.hide();

        Player.getPlayerInfo();
        //image(back_img, 0, 0, 1000, 800);
        var x = 100;
        var y = 200;
        var index = 0;
        var keyState = 0;
        drawSprites();
        

        for (var plr in allPlayers) {

            index = index + 1;
            x = 500 - allPlayers[plr].distance ;
            y = 900;

            players[index - 1].x = x;
            players[index - 1].y = y;
            if (keyState === 0) {
                if (index === 1) {
                    players[index - 1].x = 200;
                }
                if (index === 2) {
                    players[index - 1].x = 1100;
                }
            }
            // Differentiate the main player by printing
            if (index === player.index) {
                fill("red");
                textSize(25);
                text(allPlayers[plr].name, players[index - 1].x, y)
            }
            // the name of the player on the basket. 

            fill("red");
            textSize(25);
            text("PLAYER 1:" + allPlayers.player1.score, 50, 50);
            text("PLAYER 2:" + allPlayers.player2.score, 50, 100);

        }


        // Give movements for the players using arrow keys
        if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
            keyState = 1;
            player.distance += 10;
            player.update();
        }
        if (keyIsDown(LEFT_ARROW) && player.index !== null) {
            keyState = 1;
            player.distance -= 10;
            player.update();
        }
        if (frameCount % 20 === 0) {
            var fruit1 = createSprite(100, 100, 100, 100);
            //fruit.addImage(fruit1_img);
            fruit1.x = Math.round(random(0, 800));
            fruit1.lifetime = 100;
            fruit1.velocityY = 10;
            //fruits1Group.add(fruit);
            var rand = Math.round(random(1, 5))
            switch (rand) {

                case 1: fruit1.addImage(fruit1_img);
                    break;
                case 2: fruit1.addImage(fruit2_img);
                    break;
                case 3: fruit1.addImage(fruit3_img);
                    break;
                case 4: fruit1.addImage(fruit4_img);
                    break;
                case 5: fruit1.addImage(fruit5_img);
                    break;

            }
            fruits1Group.add(fruit1);

            if (frameCount % 20 === 0) {
                var fruit2 = createSprite(100, 100, 100, 100);
                //fruit.addImage(fruit1_img);
                fruit2.x = Math.round(random(900, 1800));
                fruit2.lifetime = 100;
                fruit2.velocityY = 10;
                //fruits1Group.add(fruit);
                var rand = Math.round(random(1, 5))
                switch (rand) {

                    case 1: fruit2.addImage(fruit1_img);
                        break;
                    case 2: fruit2.addImage(fruit2_img);
                        break;
                    case 3: fruit2.addImage(fruit3_img);
                        break;
                    case 4: fruit2.addImage(fruit4_img);
                        break;
                    case 5: fruit2.addImage(fruit5_img);
                        break;

                }
                fruits2Group.add(fruit2);

            }
            if (player.index !== null) {
                for (var i = 0; i < fruits1Group.length; i++) {
                    if (fruits1Group.get(i).isTouching(players)) {
                        fruits1Group.get(i).destroy();
                        player.score += 1;
                        player.update();
                    }

                }
                for (var i = 0; i < fruits2Group.length; i++) {
                    if (fruits2Group.get(i).isTouching(players)) {
                        fruits2Group.get(i).destroy();
                        player.score += 1;
                        player.update();
                    }
                }


            }
        }
        
    }
    end() {
        console.log("ended");
    }
}
