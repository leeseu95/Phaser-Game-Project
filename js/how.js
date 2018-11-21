var textInput;

var howState = {

    preload: function() {},

    update: function () {},

    backAction: function () {game.state.start('menu')},

    create: function (){

        // estilo del mensaje
        style = {font: '50px Arial', fill: '#ffffff', boundsAlignH: "center", boundsAlignV: "middle"}
        welcome = game.add.text(0, 0, "Welcome!", style);
        welcome.setTextBounds(0, 0, window.innerWidth, window.innerWidth/8);

        // en caso de que ya se haya setteado
        if (typeof game.global == 'undefined'){
            welcome.setText("set your name first!")
        } else {
            welcome.setText("Bonjour, "+game.global.playerName+"!")
        }

        b_button = game.add.button(game.world.width/30, game.world.height/6*5, 'b_button', this.backAction, this, 2, 1, 0);
    },
}

