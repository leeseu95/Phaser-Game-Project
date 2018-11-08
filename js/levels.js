// ACTUAL GAME CODE GOES HERE
 
// var LeaderboardState = function() {  };
 
// gameState.prototype = {
//     init: function(level) {
 
//     }};
 
var levelsState = { 
 
    backAction: function () {game.state.start('menu')},
    levelOne: function () {game.state.start('game', true, false, 1)},
    levelTwo: function () {game.state.start('game', true, false, 2)},
    levelThree: function () {game.state.start('game', true, false, 3)},
 
    preload: function() {
 
        // background
        game.load.image('background','assets/backgrounds/main.png');
 
        // level1
        game.load.image('level1','assets/level_icons/field.png');
        game.load.image('level2','assets/level_icons/city.png');
        game.load.image('level3','assets/level_icons/factory.png');
    },
 
    create: function (){
        var label = game.add.text(80, 80, "Level Selection", {font: '50px Arial', fill: '#ffffff'});
 
        l1 = game.add.sprite(game.world.centerX-490, game.world.centerY-180, 'level1');
        l2 = game.add.sprite(game.world.centerX-140, game.world.centerY-180, 'level2');
        l3 = game.add.sprite(game.world.centerX+210, game.world.centerY-180, 'level3');
 
        l1_button = game.add.button(game.world.centerX-450,game.world.centerY+80,'p_button', this.levelOne, this, 2, 1, 0)
        l2_button = game.add.button(game.world.centerX-100,game.world.centerY+80,'p_button', this.levelTwo, this, 2, 1, 0)
        l3_button = game.add.button(game.world.centerX+250,game.world.centerY+80,'p_button', this.levelThree, this, 2, 1, 0)
 
        l1.scale.setTo(.5, .5);
        l2.scale.setTo(.5, .5);
        l3.scale.setTo(.5, .5);
 
        b_button = game.add.button(game.world.centerX - 500, game.world.centerY + 200, 'b_button', this.backAction, this, 2, 1, 0);
    }
}