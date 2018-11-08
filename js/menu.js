menuState = {
 
    preload: function() {
 
        // credits
        game.load.spritesheet('c_button', 'assets/buttons/c_button2.png', 190, 49);
         
        // play
        game.load.spritesheet('p_button', 'assets/buttons/p_button2.png', 190, 49);
         
        // how to play
        game.load.spritesheet('h_button', 'assets/buttons/h_button2.png', 190, 49);
 
        // topscores
        game.load.spritesheet('t_button', 'assets/buttons/t_button2.png', 190, 49);
 
        // back button
        game.load.spritesheet('b_button', 'assets/buttons/b_button2.png', 190, 49);
 
        // background
        game.load.image('background','assets/backgrounds/main.png');
 
        // logo
        game.load.image('logo','assets/logo.png');
    },
     
    // action functions for each button
    creditsAction: function () {game.state.start('credits')},
    playAction: function () {game.state.start('levels')},
    howAction: function () {game.state.start('how')},
    scoresAction: function () {game.state.start('scores')},
 
    // main function
    create: function () {
 
        game.stage.backgroundColor = '#ffff';
 
        // establecer background
        background = game.add.tileSprite(0, 0, 3500, 2300, 'background');
 
        // meter logo
        logo = game.add.sprite(game.world.centerX-190, game.world.centerY-210, 'logo');
 
        // botón de créditos
        c_button = game.add.button(game.world.centerX - 360, game.world.centerY + 140, 'c_button', this.creditsAction, this, 2, 1, 0);
 
        // botón de jugar
        p_button = game.add.button(game.world.centerX-95, game.world.centerY + 90, 'p_button', this.playAction, this, 2, 1, 0);
 
        // botón de how to play
        h_button = game.add.button(game.world.centerX-95, game.world.centerY + 190, 'h_button', this.howAction, this, 2, 1, 0);
 
        // botón de high scores
        h_button = game.add.button(game.world.centerX + 170, game.world.centerY + 140, 't_button', this.scoresAction, this, 2, 1, 0);
    }
}