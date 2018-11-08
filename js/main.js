var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
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
    game.load.image('l1', 'assets/letras/n1/letter_A.png');
    game.load.image('l2', 'assets/letras/n1/letter_G.png');
    game.load.image('l3', 'assets/letras/n1/letter_U.png');


}

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
var wordLenght = 0;
var pUActive = false;
var backgrounds = [];
var word1 = [];
var backgroundScore = 200; //Version seungy
var backgroundChange = 0;
var backgroundChangePos = 0;

function create() {

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

    //letters group 
    letters = game.add.group();
    letters.enableBody = true;
    letters.physicsBodyType = Phaser.Physics.ARCADE; 

    //  An explosion pool for enemies
    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(setupEnemy, this);

    //  An explosion pool for points
    pointExplosions = game.add.group();
    pointExplosions.createMultiple(30, 'blueExplosion');
    pointExplosions.forEach(setupPoint, this);

    //  An explosion pool for powerups
    powerupExplosions = game.add.group();
    powerupExplosions.createMultiple(30, 'greenExplosion');
    powerupExplosions.forEach(setupPowerup, this);

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
    createEnemies();
    game.time.events.repeat(Phaser.Timer.SECOND * 6, 100, createEnemies, this);    

    //create points
    createPoints();
    game.time.events.repeat(Phaser.Timer.SECOND * 12, 100, createPoints, this);

    //create points
    createPowerups();
    game.time.events.repeat(Phaser.Timer.SECOND * 13, 100, createPowerups, this);

    //create letters 
    createLetters();
    game.time.events.repeat(Phaser.Timer.SECOND * 5, 100, createLetters, this);

    //Declaration of word (for now)
    word1[0] = 'l1'
    word1[1] = 'l2'
    word1[2] = 'l3'
    word1[3] = 'l1'

    //set Player values
    setPlayer();

    setEmitter();
    

}

function setEmitter(){
    emitter = game.add.emitter(player.body.x, 500, 200);

    emitter.makeParticles('trail');

    emitter.setRotation(0, 0);
    emitter.setAlpha(0.5, 0.8);
    emitter.setScale(1.5, 0.3);
    emitter.gravity = 600;

    //	false means don't explode all the sprites at once, but instead release at a rate of one particle per 100ms
    //	The 5000 value is the lifespan of each particle before it's killed
    emitter.start(false, 500, 10);

}

function setupEnemy (enemy) {

    enemy.anchor.x = 0.5;
    enemy.anchor.y = 0.5;
    enemy.animations.add('kaboom');

}

function setupPoint (light) {

    light.anchor.x = 0.5;
    light.anchor.y = 0.5;
    light.animations.add('blueExplosion');

}

function setupPowerup (light) {

    light.anchor.x = 0.5;
    light.anchor.y = 0.5;
    light.animations.add('greenExplosion');

}


function setPlayer(){
    player.body.gravity.y = 500;
    player.body.collideWorldBounds = true; //collides with world walls
    player.body.setSize(25, 50);
    player.scale.setTo(2,2);
	player.body.checkCollision.up = false; //Turn off collisions up and down the player
	player.body.checkCollision.down = false;
    player.body.immovable = true; //Necessary for collision

    //Animation sprites
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    // game.debug.body(player);
    //Keys 
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function enemyCollision(player, enemies){
    //PLayers collide with enemy 
    enemies.kill();

    // Create an explosion 
    var explosion = explosions.getFirstExists(false);
    explosion.reset(enemies.body.x+30, enemies.body.y+30);
    explosion.play('kaboom', 30, false, true);

    if(pUActive == true){
        resetPlayer();
    } else {
        takeOffLive();
    }
    //Player loses a life
}

function takeOffLive() {
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
        game.input.onTap.addOnce(restart,this);
    }
}

//Seungy
function pointsCollision(bg, points){
    //Player collides with a point
    points.kill();
    score *= 2;
    // Create an explosion 
    var pointExplosion = pointExplosions.getFirstExists(false);
    pointExplosion.reset(points.body.x+30, points.body.y+30);
    pointExplosion.play('blueExplosion', 30, false, true);

}

function letterCollision(bg, letters){
    //Player collides with a letter
    letters.kill();
    xMove += 60;

    // Create an explosion 
    var letterExplosion = pointExplosions.getFirstExists(false);
    letterExplosion.reset(letters.body.x+30, letters.body.y+30);
    letterExplosion.play('blueExplosion', 30, false, true);

    boardPoint = game.add.sprite((window.innerWidth-1000) + xMove, 30, word1[wordLenght]);
    game.physics.enable(boardPoint, Phaser.Physics.ARCADE);
    boardPoint.scale.setTo(0.2,0.2);

    //Change letter
    wordLenght += 1;

    //Check Word 
    if(word1.length == wordLenght){
        console.log("You completed a word")
    }

}

function powerupCollision(player, powerups){
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
}

function resetPlayer(){
    pUActive = false;
    //set Player values
    player.loadTexture('dude');
    player.animations.play('right');
    player.body.setSize(25, 50);
    player.scale.setTo(2,2);
}

function restart () {
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

}

function update() {

    //console.log(pUActive);
    game.physics.arcade.overlap(player, enemies, enemyCollision, null, this);
    game.physics.arcade.overlap(player, points, pointsCollision, null, this);
    game.physics.arcade.overlap(player, powerups, powerupCollision, null, this);
    game.physics.arcade.overlap(player, letters, letterCollision, null, this);

    //Ir incrementando el score
    score += 1 //Score increment

    scoreText.text= "Score: " + score; //Change score board

    // console.log(window.innerHeight);
    // console.log(score)
    //Moving background in x axis
    backgroundSprite.tilePosition.x += backgroundv;

    //Player animation
    if (cursors.left.isDown )
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
    if (jumpButton.isDown)
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
        updateBackground(backgroundChangePos);
    }

    //Background check 
    //If you get to 10 points, the world gets pretty
    // if(score >= 200){
    //     backgroundSprite.loadTexture('backgroundClean');
    // }
}

function updateBackground(backgroundChangePos) {
    backgroundSprite.loadTexture(backgrounds[backgroundChangePos]);
}

function render () {

    //game.debug.text(game.time.suggestedFps, 32, 32);

    // game.debug.text(game.time.physicsElapsed, 32, 32);
    //game.debug.body(player);

}

function createEnemies() {
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

}

function createPoints() {
    
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


}

function createPowerups() {
    
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


}

function createLetters() {
    
    if(pUActive == false){

        //Creates random objects that give the player points 
        lastYSpawn = ySpawn
        ySpawn = this.game.rnd.between(0, window.innerHeight);
        while(ySpawn >= lastYSpawn - 75 && ySpawn <= lastYSpawn + 75){
            ySpawn = this.game.rnd.between(0, 787);
        }
        var ob4 = letters.create(window.innerWidth, ySpawn, word1[wordLenght]);
        game.physics.enable(ob4, Phaser.Physics.ARCADE);
        ob4.scale.setTo(0.3,0.3);
        ob4.body.setSize(1300, 300);
        ob4.body.velocity.x = -500;

    }


}