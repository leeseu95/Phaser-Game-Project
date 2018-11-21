
var charactersState = { 

    init: function(levelParam) {
        //KEY: DESCOMENTAR ESTA LINEA Y CAMBIARLA DE VUELTA PARA QUE LOS NIVELES SEAN DINÁMICOS
        // level = 1
        level = levelParam;
    },

    backAction: function () {game.state.start('levels')},
    charOne: function () {
        // guardar a variables globales
        // para acceder: game.global.playerName
        game.global = {
            playerName : textInput.value,
            playerScore : 0
        };
        console.log("Saved", game.global.playerName, "as the player's name to global variables");
        game.state.start('intro', true, false, 1, level);
    },
    charTwo: function () {
        // guardar a variables globales
        // para acceder: game.global.playerName
        game.global = {
            playerName : textInput.value,
            playerScore : 0
        };
        console.log("Saved", game.global.playerName, "as the player's name to global variables");
        game.state.start('intro', true, false, 2, level);
    },
    charThree: function () {
        // guardar a variables globales
        // para acceder: game.global.playerName
        game.global = {
            playerName : textInput.value,
            playerScore : 0
        };
        console.log("Saved", game.global.playerName, "as the player's name to global variables");
        game.state.start('intro', true, false, 3, level);
    },
    charFour: function () {
        // guardar a variables globales
        // para acceder: game.global.playerName
        game.global = {
            playerName : textInput.value,
            playerScore : 0
        };
        console.log("Saved", game.global.playerName, "as the player's name to global variables");
        game.state.start('intro', true, false, 4, level)
    },

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

        // importar el plugin
        game.add.plugin(PhaserInput.Plugin);

        textInput = game.add.inputField(game.world.centerX, game.world.centerY, {
            font: '20px Arial',
            fill: '#212121',
            fontWeight: 'bold',
            width: 150,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            forceCase: PhaserInput.ForceCase.upper,
            borderRadius: 6,
            placeHolder: 'Name',
            type: PhaserInput.InputType.text
        });

        // Botones
        l1_button = game.add.button(game.world.centerX-400,game.world.centerY+80,'p_button', this.charOne, this, 2, 1, 0)
        l2_button = game.add.button(game.world.centerX-200,game.world.centerY+80,'p_button', this.charTwo, this, 2, 1, 0)
        l3_button = game.add.button(game.world.centerX+200,game.world.centerY+80,'p_button', this.charThree, this, 2, 1, 0)
        l4_button = game.add.button(game.world.centerX+400,game.world.centerY+80,'p_button', this.charFour, this, 2, 1, 0)

        b_button = game.add.button(game.world.width/30, game.world.height/6*5, 'b_button', this.backAction, this, 2, 1, 0);
    }
}

