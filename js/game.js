var player;
var facing = 'right';
var jumpTimer = 0;
var score = 0;
var cursors;
var jumpButton;
var g_background;
var aliens;
var stateText;
var scoreString;
var ySpawn;
var lastYSpawn;
var xMove = 0;
var pUActive = false;
var backgrounds = [];
var wordLength;
var wordArray;
var wordCount = 3;
var wordLength = 0;
var word1 = [];
var word2 = [];
var word3 = [];
var backgroundScore = 200; //Version seungy
var backgroundChange = 0;
var backgroundChangePos = 0;

var boardPointUI = [];

var lastHeartPosX;
var lastHeartPosY;
var counterHearts;

var swapDifficulty = true;

//TODO Lucia : Arreglar lo de dificultad de nivel, cambiar velocidad si puedes (por nivel), arreglar collisiones, agregar efectos cuando completas un array
//TODO Alonso : Arreglar nubes o gases (que se vean como gases), arreglar howtoplay, Agregar sonidos

//Font
WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    // active: function() { game.time.events.add(Phaser.Timer.SECOND, gameState.createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Revalia']
    }

};

var gameState = {

    init: function(charParam, levelParam) {
        //KEY: DESCOMENTAR ESTA LINEA Y CAMBIARLA DE VUELTA PARA QUE LOS NIVELES SEAN DINÁMICOS
        // level = 1
        level = levelParam;
        character = charParam;
    },
    
    preload:function() {

        // game.load.spritesheet('dude', 'assets/all_levels/dude.png', 32, 48);
        // game.load.spritesheet('dude', 'assets/characters/adventurer/adventurer_tilesheet.png', 80, 110);
        //Sprites
        game.load.spritesheet('dude', 'assets/characters/spritesheets/'+character+'.png', 80, 110);
        game.load.spritesheet('kaboom', 'assets/all_levels/kaboom.png', 128, 128);
        game.load.spritesheet('blueExplosion', 'assets/all_levels/blue.png', 128, 128);
        game.load.spritesheet('greenExplosion', 'assets/all_levels/green.png', 128, 128);
        game.load.image('enemy', 'assets/level'+level+'/obs_gas.png');
        game.load.image('light', 'assets/level'+level+'/obj.png');
        game.load.image('ovni', 'assets/all_levels/ovni.png');
        //Backgrounds
        game.load.image('bg0', 'assets/level'+level+'/bgs/bg_0_new.png');
        game.load.image('bg1', 'assets/level'+level+'/bgs/bg_1_new.png');
        game.load.image('bg2', 'assets/level'+level+'/bgs/bg_2_new.png');
        game.load.image('bg3', 'assets/level'+level+'/bgs/bg_3_new.png');
        game.load.image('bg4', 'assets/level'+level+'/bgs/bg_4_new.png');
        game.load.image('bg5', 'assets/level'+level+'/bgs/bg_5_new.png');
        game.load.image('bg6', 'assets/level'+level+'/bgs/bg_6_new.png');
        game.load.image('bg7', 'assets/level'+level+'/bgs/bg_7_new.png');
        game.load.image('bg8', 'assets/level'+level+'/bgs/bg_8_new.png');
        game.load.image('bg9', 'assets/level'+level+'/bgs/bg_9_new.png');
        game.load.image('lives', 'assets/all_levels/life.png');
        game.load.image('trail', 'assets/all_levels/particle.png');
        game.load.image('bluetrail', 'assets/all_levels/particle2.png');
        //Leters (for word arrays)
        game.load.image('letterA', 'assets/level'+level+'/letras/letter_A.png');
        game.load.image('letterB', 'assets/level'+level+'/letras/letter_B.png');
        game.load.image('letterC', 'assets/level'+level+'/letras/letter_C.png');
        game.load.image('letterD', 'assets/level'+level+'/letras/letter_D.png');
        game.load.image('letterE', 'assets/level'+level+'/letras/letter_E.png');
        game.load.image('letterF', 'assets/level'+level+'/letras/letter_F.png');
        game.load.image('letterG', 'assets/level'+level+'/letras/letter_G.png');
        game.load.image('letterH', 'assets/level'+level+'/letras/letter_H.png');
        game.load.image('letterI', 'assets/level'+level+'/letras/letter_I.png');
        game.load.image('letterJ', 'assets/level'+level+'/letras/letter_J.png');
        game.load.image('letterK', 'assets/level'+level+'/letras/letter_K.png');
        game.load.image('letterL', 'assets/level'+level+'/letras/letter_L.png');
        game.load.image('letterM', 'assets/level'+level+'/letras/letter_M.png');
        game.load.image('letterN', 'assets/level'+level+'/letras/letter_N.png');
        game.load.image('letterP', 'assets/level'+level+'/letras/letter_P.png');
        game.load.image('letterO', 'assets/level'+level+'/letras/letter_O.png');
        game.load.image('letterQ', 'assets/level'+level+'/letras/letter_Q.png');
        game.load.image('letterR', 'assets/level'+level+'/letras/letter_R.png');
        game.load.image('letterS', 'assets/level'+level+'/letras/letter_S.png');
        game.load.image('letterT', 'assets/level'+level+'/letras/letter_T.png');
        game.load.image('letterU', 'assets/level'+level+'/letras/letter_U.png');
        game.load.image('letterV', 'assets/level'+level+'/letras/letter_V.png');
        game.load.image('letterY', 'assets/level'+level+'/letras/letter_Y.png');
        game.load.image('letterW', 'assets/level'+level+'/letras/letter_W.png');
        game.load.image('letterX', 'assets/level'+level+'/letras/letter_X.png');
        game.load.image('letterZ', 'assets/level'+level+'/letras/letter_Z.png');
        //Sounds -- TODO ALONSO
        //Level 1
        game.load.audio('waterSound', 'assets/audio/digital/laser1.ogg'); //Efecto cuando chocamos con puntos
        game.load.audio('gasSound', 'assets/audio/digital/pepSound3.ogg'); //Efecto cuando chocamos con enemigo gas
        game.load.audio('powerUpSound', 'assets/audio/digital/powerUp1.ogg'); //Efecto cuando chocamos con una nave
        game.load.audio('letterSound', 'assets/audio/digital/lowDown.ogg'); //Efecto cuando chocamos con una letra
        game.load.audio('wordCompleted', 'assets/audio/digital/powerUp11.ogg'); //Efecto cuando completamos una palabra
        game.load.audio('jetpackSound', 'assets/audio/digital/phaseJump2.ogg'); //Sonidos para brincar
        game.load.audio('walkingSound', 'assets/audio/digital/phaserUp5.ogg'); //Sonidos para caminar
        game.load.audio('bgm1', 'assets/audio/FamiliarRoads.ogg'); //BGM
        //Level 2
        //Fonts
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        },

    create:function() {

        // game.input.addPointer();
        // game.input.addPointer();
        game.input.mouse.capture = true;
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
    
        game.time.desiredFps = 30;

        //Background
        g_background = game.add.tileSprite(0, 0, game.width, game.height, 'bg0');

        // temp para calcular los ratios
        temp = game.add.sprite(0, 0, 'bg0')
        ratio = game.height/temp.height
        temp.destroy()
        
        console.log(ratio);
        g_background.tileScale.set(ratio, ratio);
        
        backgroundv = -8;

        player = game.add.sprite(20, 300, 'dude');
        game.physics.enable(player, Phaser.Physics.ARCADE);
    
        // //  The score
        // scoreText = game.add.text(10, 10, "Score: ");
        // scoreText.font = 'Revalia';
        // scoreText.fontSize = '60';
        // scoreText.fill = "#ff0ff";
        this.createText();
    
        //Enemies group
        enemies = game.add.group();
        enemies.enableBody = true;
        enemies.physicsBodyType = Phaser.Physics.ARCADE;
    
        //Points group
        points = game.add.group();
        points.enableBody = true;
        points.physicsBodyType = Phaser.Physics.ARCADE;
    
        //Powerups group
        powerups = game.add.group();
        powerups.enableBody = true;
        powerups.physicsBodyType = Phaser.Physics.ARCADE;
    
        //Lives group
        hearts = game.add.group();
        hearts.enableBody = true;
        hearts.physicsBodyType = Phaser.Physics.ARCADE;

        //letters group 
        letters = game.add.group();
        letters.enableBody = true;
        letters.physicsBodyType = Phaser.Physics.ARCADE; 
    
        //  An explosion pool for enemies
        explosions = game.add.group();
        explosions.createMultiple(30, 'kaboom');
        explosions.forEach(this.setupEnemy, this);
    
        //  An explosion pool for points
        pointExplosions = game.add.group();
        pointExplosions.createMultiple(30, 'blueExplosion');
        pointExplosions.forEach(this.setupPoint, this);
    
        //  An explosion pool for powerups
        powerupExplosions = game.add.group();
        powerupExplosions.createMultiple(30, 'greenExplosion');
        powerupExplosions.forEach(this.setupPowerup, this);
        
        //Audios
        //TODO ALONSO : Agregar aqui los diferentes sonidos igual que como estan en nivel 1 (pero dependiendo)
        if(level == 1) {
            waterSound = game.add.audio('waterSound');
            gasSound = game.add.audio('gasSound');
            wordCompletedSound = game.add.audio('wordCompleted');
            jetpackSound = game.add.audio('jetpackSound');
            letterSound = game.add.audio('letterSound');
            walkingSound = game.add.audio('walkingSound');
            bgmMusic = game.add.audio('bgm1');
            bgmMusic.loop = true;
        } else if (level == 2) {

        } else if (level == 3) {

        }

        //Insert all audios
        // game.sound.setDecodedCallback([waterSound, gasSound], create, this);

        //Lives
        for (i = 0; i < 3; i++){
            lastHeartPosX = (window.innerWidth - 50) - (i*50);
            var life = hearts.create(lastHeartPosX, 50, 'lives');
            life.scale.setTo(0.1,0.1);
        }
        lastHeartPosX = window.innerWidth - 50;
        lastHeartPosY = 100;
        counterHearts = 0;
    
        backgrounds[0] = 'bg0';
        backgrounds[1] = 'bg1';
        backgrounds[2] = 'bg2';
        backgrounds[3] = 'bg3';
        backgrounds[4] = 'bg4';
        backgrounds[5] = 'bg5';
        backgrounds[6] = 'bg6';
        backgrounds[7] = 'bg7';
        backgrounds[8] = 'bg8';
        backgrounds[9] = 'bg9';
    
        //create enemies
        this.createEnemies();
        game.time.events.repeat(Phaser.Timer.SECOND * 3, 100, this.createEnemies, this);    
    
        //create points
        this.createPoints();
        game.time.events.repeat(Phaser.Timer.SECOND * 5, 100, this.createPoints, this);
    
        //create points
        this.createPowerups();
        game.time.events.repeat(Phaser.Timer.SECOND * 15, 100, this.createPowerups, this);

        //Crear palabras dependiendo del nivel
        if(level == 1) {
            //Palabra 1
            word1[0] = 'letterR';
            word1[1] = 'letterE';
            word1[2] = 'letterD';
            word1[3] = 'letterU';
            word1[4] = 'letterC';
            word1[5] = 'letterI';
            word1[6] = 'letterR';

            //Palabra 2
            word2[0] = 'letterE';
            word2[1] = 'letterC';
            word2[2] = 'letterO';
            word2[3] = 'letterS';
            word2[4] = 'letterI';
            word2[5] = 'letterS';
            word2[6] = 'letterT';
            word2[7] = 'letterE';
            word2[8] = 'letterM';
            word2[9] = 'letterA';
            
            //Palabra 3
            word3[0] = 'letterA';
            word3[1] = 'letterT';
            word3[2] = 'letterM';
            word3[3] = 'letterO';
            word3[4] = 'letterS';
            word3[5] = 'letterF';
            word3[6] = 'letterE';
            word3[7] = 'letterR';
            word3[8] = 'letterA';

        } else if (level == 2) {
            //Palabra 1
            word1[0] = 'letterC';
            word1[1] = 'letterO';
            word1[2] = 'letterN';
            word1[3] = 'letterC';
            word1[4] = 'letterI';
            word1[5] = 'letterE';
            word1[6] = 'letterN';
            word1[7] = 'letterC';
            word1[8] = 'letterI';
            word1[9] = 'letterA';

            //Palabra 2
            word2[0] = 'letterP';
            word2[1] = 'letterU';
            word2[2] = 'letterR';
            word2[3] = 'letterI';
            word2[4] = 'letterF';
            word2[5] = 'letterI';
            word2[6] = 'letterC';
            word2[7] = 'letterA';
            word2[8] = 'letterR';
            
            //Palabra 3
            word3[0] = 'letterR';
            word3[1] = 'letterE';
            word3[2] = 'letterU';
            word3[3] = 'letterT';
            word3[4] = 'letterI';
            word3[5] = 'letterL';
            word3[6] = 'letterI';
            word3[7] = 'letterZ';
            word3[8] = 'letterA';
            word3[9] = 'letterR';
        } else if (level == 3) {
            //Palabra 1
            word1[0] = 'letterR';
            word1[1] = 'letterE';
            word1[2] = 'letterC';
            word1[3] = 'letterI';
            word1[4] = 'letterC';
            word1[5] = 'letterL';
            word1[6] = 'letterA';
            word1[7] = 'letterR';

            //Palabra 2
            word2[0] = 'letterR';
            word2[1] = 'letterE';
            word2[2] = 'letterN';
            word2[3] = 'letterO';
            word2[4] = 'letterV';
            word2[5] = 'letterA';
            word2[6] = 'letterB';
            word2[7] = 'letterL';
            word2[8] = 'letterE';
            
            //Palabra 3
            word3[0] = 'letterS';
            word3[1] = 'letterU';
            word3[2] = 'letterS';
            word3[3] = 'letterT';
            word3[4] = 'letterE';
            word3[5] = 'letterN';
            word3[6] = 'letterT';
            word3[7] = 'letterA';
            word3[8] = 'letterR';
        }

        // console.log(wordArray);
        this.createWordArray();

        //create letters
        this.createLetters();
        game.time.events.repeat(Phaser.Timer.SECOND * 5, 100, this.createLetters, this);

    
        //set Player values
        this.setPlayer();
    
        this.setEmitter();
        
        bgmMusic.play();
    
    },
    
    createText:function(){
        //  The score
        scoreText = game.add.text(10, 10, "Score: ");
        scoreText.font = 'Revalia';
        scoreText.fontSize = '34px';
        scoreText.fill = "#ff0ff";

        grd = scoreText.context.createLinearGradient(0, 0, 0, scoreText.canvas.height);
        grd.addColorStop(0, '#8ED6FF');   
        grd.addColorStop(1, '#004CB3');
        scoreText.fill = grd;
        scoreText.stroke = '#000000';
        scoreText.strokeThickness = 2;
        scoreText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

        //  Text End of game
        stateText = game.add.text(game.world.centerX, game.world.centerY, "Score: ");
        stateText.anchor.setTo(0.5, 0.5);
        stateText.font = 'Revalia';
        stateText.fontSize = '64px';
        stateText.fill = "#ff0ff";

        grd = stateText.context.createLinearGradient(0, 0, 0, stateText.canvas.height);
        grd.addColorStop(0, '#8ED6FF');   
        grd.addColorStop(1, '#004CB3');
        stateText.fill = grd;
        stateText.stroke = '#000000';
        stateText.strokeThickness = 2;
        stateText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        stateText.visible = false;    
    },

    setEmitter:function(){
        emitter = game.add.emitter(player.body.x, 500, 200);
    
        emitter.makeParticles('trail');
    
        emitter.setRotation(0, 0);
        emitter.setAlpha(0.5, 0.8);
        emitter.setScale(1.5, 0.3);
        emitter.gravity = 600;
    
        //	false means don't explode all the sprites at once, but instead release at a rate of one particle per 100ms
        //	The 5000 value is the lifespan of each particle before it's killed
        emitter.start(false, 500, 10);
    
    },
    
    setupEnemy:function (enemy) {
    
        enemy.anchor.x = 0.5;
        enemy.anchor.y = 0.5;
        enemy.animations.add('kaboom');
    
    },
    
    setupPoint:function (light) {
    
        light.anchor.x = 0.5;
        light.anchor.y = 0.5;
        light.animations.add('blueExplosion');
    
    },
    
    setupPowerup:function (light) {
    
        light.anchor.x = 0.5;
        light.anchor.y = 0.5;
        light.animations.add('greenExplosion');
    
    },

    setPlayer:function(){
        player.body.gravity.y = 500;
        player.body.collideWorldBounds = true; //collides with world walls
        // player.body.setSize(25, 50);
        player.body.setSize(80, 110);
        // player.scale.setTo(2,2);
        player.scale.setTo(1,1);
        player.body.checkCollision.up = false; //Turn off collisions up and down the player
        player.body.checkCollision.down = false;
        player.body.immovable = true; //Necessary for collision
    
        //Animation sprites
        // player.animations.add('left', [0, 1, 2, 3], 10, true);
        // player.animations.add('turn', [4], 20, true);
        // player.animations.add('right', [5, 6, 7, 8], 10, true);
        // player.animations.add('left', [0, 1, 2, 3], 10, true);
        // player.animations.add('turn', [4], 20, true);

        player.animations.add('jump', [20], 20, true);
        player.animations.add('right', [9, 10], 10, true);
    
        // game.debug.body(player);
        //Keys 
        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    collisionHandler:function(player, enemies){
        //PLayers collide with enemy 
        gasSound.play();
        enemies.kill();
    
        // Create an explosion 
        var explosion = explosions.getFirstExists(false);
        explosion.reset(enemies.body.x+30, enemies.body.y+30);
        explosion.play('kaboom', 30, false, true);
    
        if(pUActive == true){
            this.resetPlayer();
        } else {
            this.takeOffLive();
        }
        //Player loses a life
    },

    // backAction: function () {
        
    //     game.state.start('levels')
    // },
    
    takeOffLive:function() {
        live = hearts.getFirstAlive();
        if (live){
            live.kill();
        }
        if (hearts.countLiving() < 1) //If lives are over, you lose
        {
            //Agregamos puntos al main
            game.global.playerScore = score;
            //Funcion para reemplazar los puntos
            for(let i = 0; i < 3; i ++) {
                if(game.global.playerScore > game.globalScores[i].playerScore) {
                    game.globalScores.splice(i, 0, game.global);
                    break;
                } else {
                    
                }
            }
            console.log(game.globalScores[0].playerName);
            player.kill();
            enemies.kill();
            bgmMusic.stop();

            stateText.text="       GAME OVER \n Click to go to Menu \n       Score: " + score;
            stateText.visible = true;

            //the "click to restart" handler
            game.input.onTap.addOnce(this.restartGame,this);
        }
    },

    addLive:function() {
        if(counterHearts == 5) {
            lastHeartPosX = window.innerWidth - 50;
            lastHeartPosY += 50;
        }
        var life = hearts.create(lastHeartPosX, lastHeartPosY, 'lives');
        life.scale.setTo(0.1,0.1);
        lastHeartPosX -= 50;
        counterHearts += 1;
    },

    playerPoints:function(bg, points){
        //Player collides with a point
        points.kill();
        waterSound.play();
        score += 500;
        // Create an explosion 
        var pointExplosion = pointExplosions.getFirstExists(false);
        pointExplosion.reset(points.body.x+30, points.body.y+30);
        pointExplosion.play('blueExplosion', 30, false, true);

    },

    letterCollision:function(bg, letters){
        //Player collides with a letter
        letters.kill();
        xMove += 60;
        letterSound.play();

        // Create an explosion 
        var letterExplosion = pointExplosions.getFirstExists(false);
        letterExplosion.reset(letters.body.x+30, letters.body.y+30);
        letterExplosion.play('blueExplosion', 30, false, true);

        //Agregarlo al top
        boardPoint = game.add.sprite((window.innerWidth-1100) + xMove, 30, wordArray[wordLength]);
        game.physics.enable(boardPoint, Phaser.Physics.ARCADE);
        boardPoint.scale.setTo(0.2,0.2);
        boardPointUI.push(boardPoint);
        //Change letter
        wordLength += 1;

        //Check Word 
        if(wordArray.length == wordLength){
            console.log("You completed a word");
            wordCompletedSound.play();
            wordLength = 0;
            xMove = 0;
            this.addLive();
            this.createWordArray();
            for(let i = 0; i < boardPointUI.length; i++) {
                boardPointUI[i].kill();
            }
        }
    },
    
    powerupAction:function(player, powerups){
        //Player collides with a point
        powerups.kill();
        pUActive = true;
    
    
        // Create an explosion 
        var powerupExplosion = powerupExplosions.getFirstExists(false);
        powerupExplosion.reset(powerups.body.x+30, powerups.body.y+30);
        powerupExplosion.play('greenExplosion', 30, false, true);
    
        //set Player values
        player.loadTexture('ovni');
        player.body.setSize(1300, 1000);
        player.scale.setTo(0.1,0.1);
    },
    
    resetPlayer:function(){
        pUActive = false;
        //set Player values
        player.loadTexture('dude');
        player.animations.play('right');
        // player.body.setSize(25, 50);
        player.body.setSize(80, 110);
        // player.scale.setTo(2,2);
        player.scale.setTo(1,1);
    },
    
    restartGame:function (){
        // //  A new level starts
    
        //Reset background
        g_background.loadTexture('background');
        //Reset score
        score = 0;
        scoreText.text = "Score: "
        //Reset lives 
        for (i = 0; i < 3; i++){
            var life = hearts.create((window.innerWidth-200) + (i*50), 50, 'lives');
            life.scale.setTo(0.1,0.1);
        }
        //revives the player
        player.revive();
        //Reiniciamos word array a 0
        wordLength = 0;
        //hides the text
        stateText.visible = false;
        console.log(game.global.playerName, game.global.playerScore);
        game.state.start('menu'); //Reiniciar al menu despues de perder
    },
    
    update:function() {
    
        //console.log(pUActive);
        
        game.physics.arcade.overlap(player, enemies, this.collisionHandler, null, this);
        game.physics.arcade.overlap(player, points, this.playerPoints, null, this);
        game.physics.arcade.overlap(player, powerups, this.powerupAction, null, this);
        game.physics.arcade.overlap(player, letters, this.letterCollision, null, this);

    
        //Ir incrementando el score
        score += 1 //Score increment

        // player.body.velocity.x += .05
    
        scoreText.text= "Player: " + game.global.playerName + "\nScore: " + score; //Change score board
    
        // console.log(window.innerHeight);
        // console.log(score)
        //Moving background in x axis
        g_background.tilePosition.x += backgroundv;
    
        //Player animation
        if (cursors.left.isDown)
        {
            walkingSound.play("", 0, 1, false, true);
            player.x -= 8;
        }
        else if (cursors.right.isDown && (player.body.x < 200))
        {
            walkingSound.play("", 0, 1, false, true);
            player.x += 8;
        }
        if (player.body.onFloor())
        {
            if (facing != 'right')
            {
                player.animations.play('right');
                facing = 'right';
            }
        }
        else
        {
            if (facing != 'idle')
            {
    
                if (facing == 'left')
                {
                    player.frame = 0;
                }
                else
                {
                    player.frame = 5;
                }
    
                facing = 'idle';
            }
        }
        
        //Jumps when space key is pressed
        if (jumpButton.isDown || game.input.activePointer.leftButton.isDown)
        {
            // player.animations.stop();
            player.animations.play('jump');
            jetpackSound.play("", 0, 1, false, true);
            player.body.velocity.y = -300
            player.body.acceleration.y = 600;
            emitter.on = true;
        }
        else if (jumpButton.isUp){
            emitter.on = false;
        }
    
        //Particles following the player 
        emitter.emitX = player.position.x+30;
        emitter.emitY = player.position.y+120;
    
        //Funciones para ir cambiando el background
        if(score >= backgroundScore) {
            backgroundChange = 1;
            
        }
    
        if(backgroundChange == 1) {
            backgroundChange = 0;
            backgroundScore += 7000;
            backgroundChangePos += 1; //O esto esta comentado, o el if else de abajo
            // if(backgroundChangePos == 0) {
            //     backgroundChangePos = 1;
            // } else {
            //     backgroundChangePos = 0;
            // }
            this.updateBackground(backgroundChangePos);
        }
    },
    
    updateBackground:function(backgroundChangePos) {
        g_background.loadTexture(backgrounds[backgroundChangePos]);
    },
    
    render:function () {
    
        // game.debug.pointer(game.input.mousePointer);
        // game.debug.pointer(game.input.pointer1);
        //game.debug.text(game.time.suggestedFps, 32, 32);
    
        // game.debug.text(game.time.physicsElapsed, 32, 32);
        // game.debug.body(player);
        // game.debug.bodyInfo(player, 16, 24);
    
    },
    
    createEnemies:function() {
        //pointsY = 250
        //enemiesY = 175 / 325
        //enemiesY >= pointsY - 75 && 
        //Create the random enemies
        if(swapDifficulty == true) {swapDifficulty = false}
        else {swapDifficulty = true}
        console.log(swapDifficulty);

        lastYSpawn = ySpawn
        ySpawn = this.game.rnd.between(0, window.innerHeight);
        while(ySpawn >= lastYSpawn - 50 && ySpawn <= lastYSpawn + 50){
            ySpawn = this.game.rnd.between(0, 787);
        }

        var ob = enemies.create(window.innerWidth, ySpawn, 'enemy');
        game.physics.enable(ob, Phaser.Physics.ARCADE);
        ob.scale.setTo(0.3,0.3)
        ob.body.velocity.x = -500;

        //TODO LUCIA
        if(level == 2) 
            game.physics.arcade.moveToObject(ob, player, 120) // el objeto sigue al usuario (es más difícil)

        if(level == 3 && swapDifficulty == true)
            game.physics.arcade.moveToObject(ob, player, 120)
    },
    
    createPoints:function() {
        
        //Creates random objects that give the player points 
        lastYSpawn = ySpawn
        ySpawn = this.game.rnd.between(0, window.innerHeight);
        while(ySpawn >= lastYSpawn - 75 && ySpawn <= lastYSpawn + 75){
            ySpawn = this.game.rnd.between(0, 787);
        }
        var ob2 = points.create(window.innerWidth, ySpawn, 'light');
        game.physics.enable(ob2, Phaser.Physics.ARCADE);
        ob2.scale.setTo(0.1,0.1)
        ob2.body.velocity.x = -400;
    
    
    },
    
    createPowerups:function() {
        
        if(pUActive == false){
    
            //Creates random objects that give the player points 
            lastYSpawn = ySpawn
            ySpawn = this.game.rnd.between(0, window.innerHeight);
            while(ySpawn >= lastYSpawn - 75 && ySpawn <= lastYSpawn + 75){
                ySpawn = this.game.rnd.between(0, 787);
            }
            var ob3 = powerups.create(window.innerWidth, ySpawn, 'ovni');
            game.physics.enable(ob3, Phaser.Physics.ARCADE);
            ob3.scale.setTo(0.1,0.1);
            ob3.body.setSize(1300, 1000);
            ob3.body.velocity.x = -500;
    
        }
    
    
    },


    createWordArray:function(){
        var randWord = Math.floor((Math.random() * wordCount)); //Crear un numero entre 0 y cantiad de palabras que existen

        if(randWord == 0)
            wordArray = word1;
        if(randWord == 1)
            wordArray = word2;
        if(randWord == 2)
            wordArray = word3;
    
        console.log("word", wordArray);
    },

    createLetters:function(){
        if(pUActive == false){
            //Creates random objects that give the player points 
            lastYSpawn = ySpawn
            ySpawn = this.game.rnd.between(0, window.innerHeight);
            while(ySpawn >= lastYSpawn - 75 && ySpawn <= lastYSpawn + 75){
                ySpawn = this.game.rnd.between(0, 787);
            }
            var ob4 = letters.create(window.innerWidth, ySpawn, wordArray[wordLength]);
            game.physics.enable(ob4, Phaser.Physics.ARCADE);
            ob4.scale.setTo(0.3,0.3);
            ob4.body.setSize(1300, 300);
            ob4.body.velocity.x = -500;
        }
    },

    //Sounds
    playFx:function(key) {

        switch (key.keyCode)
        {
            case Phaser.Keyboard.ONE:
                text1.text = "Blaster: Playing";
                blaster.play();
                break;
    
            case Phaser.Keyboard.TWO:
                text2.text = "Explosion: Playing";
                explosion.play();
                break;
    
            case Phaser.Keyboard.THREE:
                text3.text = "Sword: Playing";
                sword.play();
                break;
        }
    
    }
}

