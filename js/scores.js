var textInput;

var scoresState = {

    preload: function() {},

    update: function () {},

    backAction: function () {
        game.state.start('menu');
        console.log(game.globalScores[0]);
    },
    
    saveAction: function () {},

    create: function (){

        // estilo del mensaje
        style = {font: '50px Arial', fill: '#ffffff', boundsAlignH: "center", boundsAlignV: "middle"}
        welcome = game.add.text(0, 0, "Highest Scores", style);
        welcome.setTextBounds(0, 0, window.innerWidth, window.innerWidth/8);
        highScore1 = game.add.text(0, 0, "1. " + game.globalScores[0].playerName + "  Score: " + game.globalScores[0].playerScore, style);
        highScore1.setTextBounds(0, 0, window.innerWidth, window.innerWidth/3);
        highScore1 = game.add.text(0, 0, "2. " + game.globalScores[1].playerName + "  Score: " + game.globalScores[1].playerScore, style);
        highScore1.setTextBounds(0, 0, window.innerWidth, window.innerWidth/2);
        highScore1 = game.add.text(0, 0, "3. " + game.globalScores[2].playerName + "  Score: " + game.globalScores[2].playerScore, style);
        highScore1.setTextBounds(0, 0, window.innerWidth, window.innerWidth-500);

        b_button = game.add.button(game.world.width/30, game.world.height/6*5, 'b_button', this.backAction, this, 2, 1, 0);
    },
}

