// definir el nivel en el que estamos
var level;
var player;
var facing = 'right';
var jumpTimer = 0;
var score = 0;
var cursors;
var jumpButton;
var backgroundSprite;
var aliens;
var stateText;
var scoreString;
var ySpawn;
var lastYSpawn;
var xMove = 0;
var pUActive = false;
var backgrounds = [];
var backgroundScore = 200; //Version seungy
var backgroundChange = 0;
var backgroundChangePos = 0;
 
var gameState = {
 
    init: function(levelParam) {
        level = levelParam;
    },
     
    preload:function() {
 
        game.load.spritesheet('dude', 'assets/player1.png', 32, 103, 8);
        game.load.spritesheet('kaboom', 'assets/kaboom.png', 128, 128);
        game.load.spritesheet('blueExplosion', 'assets/blue.png', 128, 128);
        game.load.spritesheet('greenExplosion', 'assets/green.png', 128, 128);
        game.load.image('enemy', 'assets/Campo/fart03.png');
        game.load.image('light', 'assets/Campo/ObjetivoAgua.png');
        game.load.image('ovni', 'assets/ovni.png');
        game.load.image('bg0', 'assets/Campo/bg_0.png');
        game.load.image('bg1', 'assets/Campo/bg_1.png');
        game.load.image('bg2', 'assets/Campo/bg_2.png');
        game.load.image('bg3', 'assets/Campo/bg_3.png');
        game.load.image('bg4', 'assets/Campo/bg_4.png');
        game.load.image('bg5', 'assets/Campo/bg_5.png');
        game.load.image('bg6', 'assets/Campo/bg_6.png');
        game.load.image('bg7', 'assets/Campo/bg_7.png');
        game.load.image('bg8', 'assets/Campo/bg_8.png');
        game.load.image('bg9', 'assets/Campo/bg_9.png');
        game.load.image('lives', 'assets/life.png');
        game.load.image('trail', 'assets/particle.png');
        game.load.image('bluetrail', 'assets/particle2.png');
    },
 
    create:function() {
 
        // game.input.addPointer();
        // game.input.addPointer();
        game.input.mouse.capture = true;
         
        game.physics.startSystem(Phaser.Physics.ARCADE);
     
        game.time.desiredFps = 30;
     
        //Background
        backgroundSprite = game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'bg0');
        // backgroundSprite.scale.setTo(0.5, 0.5);
     
        backgroundv = -8;
     
        player = game.add.sprite(20, 300, 'dude');
        game.physics.enable(player, Phaser.Physics.ARCADE);
     
        //  The score
        scoreText = game.add.text(10, 10, 'Score: ', { font: '34px Arial', fill: '#000' });
     
        //  Text
        stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#000' });
        stateText.anchor.setTo(0.5, 0.5);
        stateText.visible = false;
     
        //Background
     
     
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
     
        //  An explosion pool for enemies
        explosions = game.add.group();
        explosions.createMultiple(30, 'kaboom');
        // TODO: BUG HERE
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
            var life = hearts.create((window.innerWidth-200) + (i*50), 50, 'lives');
            life.scale.setTo(0.1,0.1);
        }
     
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
     
        //  false means don't explode all the sprites at once, but instead release at a rate of one particle per 100ms
        //  The 5000 value is the lifespan of each particle before it's killed
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
        player.body.setSize(25, 100);
        player.scale.setTo(2,2);
        player.body.checkCollision.up = false; //Turn off collisions up and down the player
        player.body.checkCollision.down = false;
        player.body.immovable = true; //Necessary for collision
     
        //Animation sprites
        player.animations.add('turn', [1], 20, true);
        player.animations.add('right', [2,3,4,5,6,7], 10, true);
     
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
 
    backAction: function () {
         
        game.state.start('levels')
    },
     
    takeOffLive:function() {
        live = hearts.getFirstAlive();
        if (live){
            live.kill();
        }
        if (hearts.countLiving() < 1) //If lives are over, you lose
        {
            player.kill();
            enemies.kill();
     
            stateText.text=" GAME OVER \n Click to restart";
            stateText.visible = true;
     
            //the "click to restart" handler
            game.input.onTap.addOnce(this.restart,this);
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
     
        boardPoint = game.add.sprite((window.innerWidth-1000) + xMove, 30, 'light');
        game.physics.enable(boardPoint, Phaser.Physics.ARCADE);
        boardPoint.scale.setTo(0.05,0.05);
     
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
        player.body.setSize(25, 50);
        player.scale.setTo(2,2);
    },
     
    restart:function () {
        //  A new level starts
     
        //Reset background
        backgroundSprite.loadTexture('background');
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
         
        //TODO: BUG HERE
        game.physics.arcade.overlap(player, enemies, this.collisionHandler, null, this);
        game.physics.arcade.overlap(player, points, this.playerPoints, null, this);
        game.physics.arcade.overlap(player, powerups, this.powerupAction, null, this);
     
        //Ir incrementando el score
        score += 1 //Score increment
     
        scoreText.text= "Score: " + score; //Change score board
     
        // console.log(window.innerHeight);
        // console.log(score)
        //Moving background in x axis
        backgroundSprite.tilePosition.x += backgroundv;
     
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
            player.animations.stop();
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
     
        //Background check 
        //If you get to 10 points, the world gets pretty
        // if(score >= 200){
        //     backgroundSprite.loadTexture('backgroundClean');
        // }
    },
     
    updateBackground:function(backgroundChangePos) {
        backgroundSprite.loadTexture(backgrounds[backgroundChangePos]);
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
 
 
}