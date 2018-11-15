// ACTUAL HOWTOPLAY CODE GOES HERE

var creditsState = {

    backAction: function () {
        
        game.state.start('menu')},

    preload: function () {

        // background
        game.load.image('c_background','assets/backgrounds/credits_filled.png');
        
    },

    create: function (){

        // Prioridad de background: width
        c_background = game.add.sprite(0, 0, 'c_background');
        c_background.width = game.width;
        c_background.scale.y = c_background.scale.x;

        // b_button = game.add.button(game.world.centerX - 500, game.world.centerY + 200, 'b_button', this.backAction, this, 2, 1, 0);
        b_button = game.add.button(game.world.width/30, game.world.height/6*5, 'b_button', this.backAction, this, 2, 1, 0);
    }
}

