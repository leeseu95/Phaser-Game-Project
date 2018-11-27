// FIRST LOADED SCREEN

// var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'gameDiv');
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'gameDiv');

game.state.add('menu', menuState)
game.state.add('levels', levelsState)
game.state.add('how', howState)
game.state.add('scores', scoresState)
game.state.add('credits', creditsState)
game.state.add('game', gameState)
game.state.add('characters', charactersState)
game.state.add('intro', introState)

//KEY: DESCOMENTAR ESTA LINEA Y CAMBIARLA DE VUELTA PARA QUE SIRVAN BIEN LOS MENUS
game.state.start('menu')
// game.state.start('game')

