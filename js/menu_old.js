var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

    function preload() {

        // credits
        game.load.spritesheet('c_button', 'assets/buttons/c_button2.png', 190, 49);
        
        // play
        game.load.spritesheet('p_button', 'assets/buttons/p_button2.png', 190, 49);
        
        // how to play
        game.load.spritesheet('h_button', 'assets/buttons/h_button2.png', 190, 49);

        // topscrores
        game.load.spritesheet('t_button', 'assets/buttons/t_button2.png', 190, 49);

        game.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 193, 71);
        game.load.image('background','assets/backgrounds/main.png');
        game.load.image('logo','assets/logo.png');

    }

    var c_button, p_button, h_button, t_button;
    var logo;
    var background;

    function create() {

        game.stage.backgroundColor = '#182d3b';

        background = game.add.tileSprite(0, 0, 3500, 2300, 'background');

        // add logo here
        logo = game.add.sprite(game.world.centerX-190, game.world.centerY-210, 'logo');
        // logo.scale.setTo(.5, .5);
        // c_button = game.add.image(game.world.centerX, game.world.centerY, 'logo', creditsAction, this, 2, 1, 0);

        // credits
        c_button = game.add.button(game.world.centerX - 360, game.world.centerY + 140, 'c_button', creditsAction, this, 2, 1, 0);

        // play
        p_button = game.add.button(game.world.centerX-95, game.world.centerY + 90, 'p_button', playAction, this, 2, 1, 0);

        // howtoplay
        h_button = game.add.button(game.world.centerX-95, game.world.centerY + 190, 'h_button', howAction, this, 2, 1, 0);

        // highscores
        h_button = game.add.button(game.world.centerX + 170, game.world.centerY + 140, 't_button', scoresAction, this, 2, 1, 0);
    }

    function creditsAction () {

        game.state.start('credits')

    }

    function playAction () {

        game.state.start('game')

    }

    function howAction () {

        game.state.start('how')

    }

    function scoresAction () {

        game.state.start('scores')

    }