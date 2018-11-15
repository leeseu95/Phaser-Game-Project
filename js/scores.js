// ACTUAL HOWTOPLAY CODE GOES HERE

var scoresState = {

    backAction: function () {game.state.start('menu')},

    create: function (){
        var label = game.add.text(80, 80, "this is the scoresState", {font: '50px Arial', fill: '#ffffff'});

        b_button = game.add.button(game.world.width/30, game.world.height/6*5, 'b_button', this.backAction, this, 2, 1, 0);
    }
}

