var textInput;

// Font
WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    // active: function() { game.time.events.add(Phaser.Timer.SECOND, scoresState.createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
    families: ['Revalia']
    }

};

var scoresState = {
    preload: function() {
        //Fonts
        // this.game.load.bitmapFont('myfont', 'assets/fonts/GH.otf');
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    },

    update: function () {},

    backAction: function () {
        game.state.start('menu');
        console.log(game.globalScores[0]);
    },
    
    saveAction: function () {},

    create: function (){
        this.createText();

        b_button = game.add.button(game.world.width/30, game.world.height/6*5, 'b_button', this.backAction, this, 2, 1, 0);
    },

    createText: function() {
        //  The score
        highestScoreText = game.add.text(game.world.centerX-375, 75, "Highest Scores");
        highestScoreText.font = 'Revalia';
        highestScoreText.fontSize = '84px';
        highestScoreText.fill = "#ff0ff";
        highestScoreText.align = 'center';

        grd = highestScoreText.context.createLinearGradient(0, 0, 0, highestScoreText.canvas.height);
        grd.addColorStop(0, '#8ED6FF');   
        grd.addColorStop(1, '#004CB3');
        highestScoreText.fill = grd;
        highestScoreText.stroke = '#000000';
        highestScoreText.strokeThickness = 2;
        highestScoreText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

        //Highscores
        highScore1 = game.add.text(game.world.centerX-475, 225, "1. " + game.globalScores[0].playerName + " - Score: " + game.globalScores[0].playerScore);
        highScore1.font = 'Revalia';
        highScore1.fontSize = '64px';
        highScore1.fill = "#ff0ff";
        highScore1.align = 'center';

        grd = highScore1.context.createLinearGradient(0, 0, 0, highScore1.canvas.height);
        grd.addColorStop(0, '#8ED6FF');   
        grd.addColorStop(1, '#004CB3');
        highScore1.fill = grd;
        highScore1.stroke = '#000000';
        highScore1.strokeThickness = 2;
        highScore1.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

        //Highscores2
        highScore2 = game.add.text(game.world.centerX-475, 325, "2. " + game.globalScores[1].playerName + " - Score: " + game.globalScores[1].playerScore);
        highScore2.font = 'Revalia';
        highScore2.fontSize = '64px';
        highScore2.fill = "#ff0ff";
        highScore2.align = 'center';

        grd = highScore2.context.createLinearGradient(0, 0, 0, highScore2.canvas.height);
        grd.addColorStop(0, '#8ED6FF');   
        grd.addColorStop(1, '#004CB3');
        highScore2.fill = grd;
        highScore2.stroke = '#000000';
        highScore2.strokeThickness = 2;
        highScore2.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

        //Highscores3
        highScore3 = game.add.text(game.world.centerX-475, 425, "3. " + game.globalScores[2].playerName + " - Score: " + game.globalScores[2].playerScore);
        highScore3.font = 'Revalia';
        highScore3.fontSize = '64px';
        highScore3.fill = "#ff0ff";
        highScore3.align = 'center';

        grd = highScore3.context.createLinearGradient(0, 0, 0, highScore3.canvas.height);
        grd.addColorStop(0, '#8ED6FF');   
        grd.addColorStop(1, '#004CB3');
        highScore3.fill = grd;
        highScore3.stroke = '#000000';
        highScore3.strokeThickness = 2;
        highScore3.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
    }
}

