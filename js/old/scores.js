var textInput;

var scoresState = {

    preload: function() {},

    update: function () {},

    backAction: function () {game.state.start('menu')},
    
    saveAction: function () {
        // guardar a variables globales
        // para acceder: game.global.playerName
        game.global = {playerName : textInput.value}
        console.log("Saved", game.global.playerName, "as the player's name to global variables");
        welcome.setText("Welcome, "+game.global.playerName+"!")
    },

    create: function (){

        // estilo del mensaje
        style = {font: '50px Arial', fill: '#ffffff', boundsAlignH: "center", boundsAlignV: "middle"}
        welcome = game.add.text(0, 0, "Welcome!", style);
        welcome.setTextBounds(0, 0, window.innerWidth, window.innerWidth/8);

        // importar el plugin
        game.add.plugin(PhaserInput.Plugin);

        // mostrar el textinput field
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

        b_button = game.add.button(game.world.width/30, game.world.height/6*5, 'b_button', this.backAction, this, 2, 1, 0);
        s_button = game.add.button(200, 200, 'g_button', this.saveAction, this, 2, 1, 0);
    },
}

