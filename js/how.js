var textInput;

var howState = {

    preload: function() {
        // //sound
        // game.load.audio('intro', 'assets/audio/new/intro.mp3'); //intro
        
        // background
        game.load.image('h_background','assets/backgrounds/how_filled.png');
    },

    update: function () {},

    backAction: function () {
        game.state.start('menu')
        // introSound.stop();
},

    create: function (){

        // Prioridad de background: width
        c_background = game.add.sprite(0, 0, 'h_background');
        c_background.width = game.width;
        c_background.scale.y = c_background.scale.x;

        // // estilo del mensaje
        // style = {font: '50px Arial', fill: '#ffffff', boundsAlignH: "center", boundsAlignV: "middle"}
        // welcome = game.add.text(0, 0, "Welcome!", style);
        // welcome.setTextBounds(0, 0, window.innerWidth, window.innerWidth/8);

        // // en caso de que ya se haya setteado
        // if (typeof game.global == 'undefined'){
        //     welcome.setText("set your name first!")
        // } else {
        //     welcome.setText("Bonjour, "+game.global.playerName+"!")
        // }

        b_button = game.add.button(game.world.width/30, game.world.height/6*5, 'b_button', this.backAction, this, 2, 1, 0);
    },
}

