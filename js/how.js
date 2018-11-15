var howState = {

    preload: function() {
        game.add.text(100, 100, "Loading videos ...", { font: "65px Arial", fill: "#ff0044" });
        game.load.video('intro', 'assets/video/intro.mp4');
    },

    backAction: function () {

        game.state.start('menu')},

    create: function (){

        video = game.add.video('intro');
        ratio = window.innerWidth/video.width;
        video.play(true);

        //  x, y, anchor x, anchor y, scale x, scale y
        video.addToWorld(0, 0, 0, 0, ratio, ratio);
        // video.destroy();

        b_button = game.add.button(game.world.width/30, game.world.height/6*5, 'b_button', this.backAction, this, 2, 1, 0);
    },
}

