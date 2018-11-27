// ACTUAL GAME CODE GOES HERE

// var LeaderboardState = function() {  };

// gameState.prototype = {
//     init: function(level) {

//     }};

var levelsState = { 

    backAction: function () {game.state.start('menu')},
    levelOne: function () {game.state.start('characters', true, false, 1); },
    levelTwo: function () {game.state.start('characters', true, false, 2); },
    levelThree: function () {game.state.start('characters', true, false, 3); },

    preload: function() {

        // background
        game.load.image('l_background','assets/backgrounds/levels_filled.png');
        game.load.image('level1','assets/level_icons/field.png');
        game.load.image('level2','assets/level_icons/city.png');
        game.load.image('level3','assets/level_icons/factory.png');
    },

    create: function (){
        // establecer background
        l_background = game.add.sprite(0, 0, 'l_background');
        l_background.width = game.width;
        l_background.scale.y = l_background.scale.x;

        // style = {font: '50px Arial', fill: '#ffffff', boundsAlignH: "center", boundsAlignV: "middle"}
        // label = game.add.text(0, 0, "Level Selection", style);
        // label.setTextBounds(0, 0, window.innerWidth, window.innerWidth/8);

        l1 = game.add.sprite(game.world.centerX-490, game.world.centerY-140, 'level1');
        l2 = game.add.sprite(game.world.centerX-140, game.world.centerY-140, 'level2');
        l3 = game.add.sprite(game.world.centerX+210, game.world.centerY-140, 'level3');

        l1_button = game.add.button(game.world.centerX-450, game.world.centerY+80,'l_button', this.levelOne, this, 2, 1, 0)
        l2_button = game.add.button(game.world.centerX-100, game.world.centerY+80,'l_button', this.levelTwo, this, 2, 1, 0)
        l3_button = game.add.button(game.world.centerX+250, game.world.centerY+80,'l_button', this.levelThree, this, 2, 1, 0)

        l1.scale.setTo(.5, .5);
        l2.scale.setTo(.5, .5);
        l3.scale.setTo(.5, .5);

        b_button = game.add.button(game.world.width/30, game.world.height/6*5, 'b_button', this.backAction, this, 2, 1, 0);
    }
}

