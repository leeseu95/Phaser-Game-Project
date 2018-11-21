var introState = {

    preload: function(){
        game.load.video('intro', 'assets/video/intro.mp4');
    },

    init: function(charParam, levelParam) {
        //KEY: DESCOMENTAR ESTA LINEA Y CAMBIARLA DE VUELTA PARA QUE LOS NIVELES SEAN DINÁMICOS
        // level = 1
        level = levelParam;
        character = charParam;
    },

    textClean: function () {
        // clean up de los textos
        for (let index = 0; index < 14; index++) {
            try {
                document.getElementById("line"+index).remove();   
            }
            catch(err) {
                console.log("user exited before animation was complete")
            }
        }
    },

    backAction: function () {
        this.textClean()
        game.state.start('menu')},

    goAction: function () {
        
        // limpiar el texto
        this.textClean()

        // DESCOMENTAR ESTAS LÍNEAS Y BORRAR LA LÍNEA 49 PARA QUE JALE EL INTRO VIDEO
        
        // play el video
        // video = game.add.video('intro');
        // ratio = window.innerWidth/video.width;
        // video.play(true);

        // //  x, y, anchor x, anchor y, scale x, scale y
        // video.addToWorld(0, 0, 0, 0, ratio, ratio);

        // getReady = setTimeout(function(){
        //     game.state.start('game', true, false, character, level);
        //     video.destroy();
        // }, (video.duration*1000)-100)
        game.state.start('game', true, false, character, level);
    },

    create: function (){

        timeout = 1000;

        textArray = [
            // "Standing on your balcony, you gaze through your telescope.",
            "The news has just reported that another planet has switched",
            "to Black Status: \"Uninhabitable\". Experts say extinctions are",
            "projected in less than five years. As part of an emergency aid",
            "mission, you embark tomorrow to this planet in a last-ditch effort",
            "to try to save this small, blue planet...",

            "Your mission: explore the planet, figure out what has caused",
            "such destruction and report back. Since the planet is not part",
            "of The Federation, you are not authorized to make any sort of",
            "contact with the locals. You have been given a cloaking device",
            "that will alter your appearance as one of the local inhabitants,",
            "allowing you to blend in.",

            // "*** CHOOSE YOUR CHARACTER ***",
            
            "*** READY FOR DROP ***",

            // "3... 2... 1... GO!",
        ]

        // Línea 1
        newDiv = "<div id=\"line0\" visibility=\"hidden\"><p class=\"line-1 anim-typewriter\">Standing on your balcony, you gaze through your telescope.</p></div>"
        element = document.getElementById("gameDiv");
        element.insertAdjacentHTML("afterend", newDiv);

        for (let index = 0; index < textArray.length; index++) {
            myVar = setTimeout(function () {
                calc = (5*index) + 15
                otherDiv = "<div id=\"line" + (index+1) + "\" visibility=\"hidden\"><p class=\"line-1 anim-typewriter\" style=\"top:" + calc + "%;\">" + textArray[index]+ "</p></div>"
                console.log(index)
                console.log(otherDiv)
                element = document.getElementById("line" + index + "")
                element.insertAdjacentHTML("afterend", otherDiv);
            }, timeout*(index+1));
        }

        b_button = game.add.button(game.world.width/30, game.world.height/6*5, 'b_button', this.backAction, this, 2, 1, 0);

        g_button = game.add.button(game.world.centerX-95, game.world.centerY+200, 'g_button', this.goAction, this, 2, 1, 0);
    },
}

