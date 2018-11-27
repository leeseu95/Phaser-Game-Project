
var charactersState = { 

    init: function(levelParam) {
        //KEY: DESCOMENTAR ESTA LINEA Y CAMBIARLA DE VUELTA PARA QUE LOS NIVELES SEAN DINÁMICOS
        // level = 1
        level = levelParam;
    },

    backAction: function () {game.state.start('levels')},
    charOne: function () {game.state.start('intro', true, false, 1, level)},
    charTwo: function () {game.state.start('intro', true, false, 2, level)},
    charThree: function () {game.state.start('intro', true, false, 3, level)},
    charFour: function () {game.state.start('intro', true, false, 4, level)},

    preload: function() {

        // background
        game.load.image('h_background','assets/backgrounds/characters.png');
        
        // personajes
        game.load.image('char1','assets/characters/selection/1.png');
        game.load.image('char2','assets/characters/selection/2.png');
        game.load.image('char3','assets/characters/selection/3.png');
        game.load.image('char4','assets/characters/selection/4.png');
    },

    create: function (){
        // Prioridad de background: width
        h_background = game.add.sprite(0, 0, 'h_background');
        h_background.width = game.width;
        h_background.scale.y = h_background.scale.x;

        // Título
        label = game.add.text(80, 80, "Character Selection", {font: '50px Arial', fill: '#ffffff'});

        // Personajes
        c1 = game.add.sprite(game.world.centerX-400,game.world.centerY-80, 'char1');
        c2 = game.add.sprite(game.world.centerX-200,game.world.centerY-80, 'char2');
        c3 = game.add.sprite(game.world.centerX+200,game.world.centerY-80, 'char3');
        c4 = game.add.sprite(game.world.centerX+400,game.world.centerY-80, 'char4');

        // Botones
        l1_button = game.add.button(game.world.centerX-400,game.world.centerY+80,'p_button', this.charOne, this, 2, 1, 0)
        l2_button = game.add.button(game.world.centerX-200,game.world.centerY+80,'p_button', this.charTwo, this, 2, 1, 0)
        l3_button = game.add.button(game.world.centerX+200,game.world.centerY+80,'p_button', this.charThree, this, 2, 1, 0)
        l4_button = game.add.button(game.world.centerX+400,game.world.centerY+80,'p_button', this.charFour, this, 2, 1, 0)

        b_button = game.add.button(game.world.width/30, game.world.height/6*5, 'b_button', this.backAction, this, 2, 1, 0);
    }
}

