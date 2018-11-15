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
var wordCount = 2;
var wordLength = 0;
var word1 = [];
var word2 = [];
var backgroundScore = 200; //Version seungy
var backgroundChange = 0;
var backgroundChangePos = 0;

var boardPointUI = [];

var lastHeartPos;


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
        game.load.spritesheet('dude', 'assets/characters/spritesheets/'+character+'.png', 80, 110);
        game.load.spritesheet('kaboom', 'assets/all_levels/kaboom.png', 128, 128);
        game.load.spritesheet('blueExplosion', 'assets/all_levels/blue.png', 128, 128);
        game.load.spritesheet('greenExplosion', 'assets/all_levels/green.png', 128, 128);
        game.load.image('enemy', 'assets/level'+level+'/obs_gas.png');
        game.load.image('light', 'assets/level'+level+'/obj.png');
        game.load.image('ovni', 'assets/all_levels/ovni.png');
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
        game.load.image('letterA', 'assets/level'+level+'/letras/letter_A.png');
        game.load.image('letterG', 'assets/level'+level+'/letras/letter_G.png');
        game.load.image('letterU', 'assets/level'+level+'/letras/letter_U.png');
        game.load.image('letterH', 'assets/level'+level+'/letras/letter_H.png');
        game.load.image('letterO', 'assets/level'+level+'/letras/letter_O.png');
        game.load.image('letterJ', 'assets/level'+level+'/letras/letter_J.png');
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
    
        //  The score
        scoreText = game.add.text(10, 10, 'Score: ', { font: '34px Arial', fill: '#000' });
    
        //  Text
        stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#000' });
        stateText.anchor.setTo(0.5, 0.5);
        stateText.visible = false;    
    
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
    
        //Lives
        for (i = 0; i < 3; i++){
            lastHeartPos = (window.innerWidth - 200) + (i*50);
            var life = hearts.create(lastHeartPos, 50, 'lives');
            life.scale.setTo(0.1,0.1);
        }
        lastHeartPos = window.innerWidth - 200;
    
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
        game.time.events.repeat(Phaser.Timer.SECOND * 8, 100, this.createPowerups, this);

        //Declaration of word
        word1[0] = 'letterA';
        word1[1] = 'letterG';
        word1[2] = 'letterU';
        word1[3] = 'letterA';

        //Declaration of word 
        word2[0] = 'letterH';
        word2[1] = 'letterO';
        word2[2] = 'letterJ';
        word2[3] = 'letterA';

        // console.log(wordArray);
        this.createWordArray();

        //create letters
        this.createLetters();
        game.time.events.repeat(Phaser.Timer.SECOND * 5, 100, this.createLetters, this);

    
        //set Player values
        this.setPlayer();
    
        this.setEmitter();
        
    
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
            lastHeartPos += 50;
            live.kill();
        }
        if (hearts.countLiving() < 1) //If lives are over, you lose
        {
            player.kill();
            enemies.kill();

            stateText.text=" GAME OVER \n Click to restart";
            stateText.visible = true;

            //the "click to restart" handler
            game.input.onTap.addOnce(restart,this);
        }
    },

    addLive:function() {
        lastHeartPos -= 50;
        for (i = 0; i < 2; i++){
            var life = hearts.create(lastHeartPos - (i*50), 50, 'lives');
            life.scale.setTo(0.1,0.1);
        }
    },

    playerPoints:function(bg, points){
        //Player collides with a point
        points.kill();
        score *= 2;
        // Create an explosion 
        var pointExplosion = pointExplosions.getFirstExists(false);
        pointExplosion.reset(points.body.x+30, points.body.y+30);
        pointExplosion.play('blueExplosion', 30, false, true);

    },

    letterCollision:function(bg, letters){
        //Player collides with a letter
        letters.kill();
        xMove += 60;

        // Create an explosion 
        var letterExplosion = pointExplosions.getFirstExists(false);
        letterExplosion.reset(letters.body.x+30, letters.body.y+30);
        letterExplosion.play('blueExplosion', 30, false, true);

        //Agregarlo al top
        boardPoint = game.add.sprite((window.innerWidth-1000) + xMove, 30, wordArray[wordLength]);
        game.physics.enable(boardPoint, Phaser.Physics.ARCADE);
        boardPoint.scale.setTo(0.2,0.2);
        boardPointUI.push(boardPoint);
        //Change letter
        wordLength += 1;

        //Check Word 
        if(wordArray.length == wordLength){
            console.log("You completed a word");
            wordLength = 0;
            xMove = 0;
            addLive();
            createWordArray();
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
    
    restart:function () {
        //  A new level starts
    
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
        //hides the text
        stateText.visible = false;
    
    },
    
    update:function() {
    
        //console.log(pUActive);
        
        game.physics.arcade.overlap(player, enemies, this.collisionHandler, null, this);
        game.physics.arcade.overlap(player, points, this.playerPoints, null, this);
        game.physics.arcade.overlap(player, powerups, this.powerupAction, null, this);
        game.physics.arcade.overlap(player, letters, this.letterCollision, null, this);

    
        //Ir incrementando el score
        score += 1 //Score increment
    
        scoreText.text= "Score: " + score; //Change score board
    
        // console.log(window.innerHeight);
        // console.log(score)
        //Moving background in x axis
        g_background.tilePosition.x += backgroundv;
    
        //Player animation
        if (cursors.left.isDown)
        {
            player.x -= 8;
        }
        else if (cursors.right.isDown && (player.body.x < 200))
        {
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
            backgroundScore *= 10;
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
        lastYSpawn = ySpawn
        ySpawn = this.game.rnd.between(0, window.innerHeight);
        while(ySpawn >= lastYSpawn - 50 && ySpawn <= lastYSpawn + 50){
            ySpawn = this.game.rnd.between(0, 787);
        }
        var ob = enemies.create(window.innerWidth, ySpawn, 'enemy');
        game.physics.enable(ob, Phaser.Physics.ARCADE);
        ob.scale.setTo(0.3,0.3)
        ob.body.velocity.x = -500;
        //game.physics.arcade.moveToObject(ob,player,120) // el objeto sigue al usuario (es más difícil)
    
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
}

