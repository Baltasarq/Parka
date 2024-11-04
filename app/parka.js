// Parka (c) 2024 Baltasar MIT License <baltasarq@gmail.com>
/*
    @ 2024-10-31 20:17: Como se puede ver, escrita en un arrebato para la ECTOComp.
    IfId e9cdeb8d-2f27-4c95-a453-f04cb66ae4df
*/


// -------------------------------------------------- scont ---
const LOC_SCONT = ctrl.locs.crea(
    "SCONT",
    [ "scont", "sala", "control" ],
    "^{<i>La sala de control es muy grande. \
        Cuando la nave está a nivel operacional completo, \
        da cabida a varias docenas de ingenieros, navegantes, pilotos, \
        y otros tripulantes que ofrecen sus distintas habilidades \
        para que la Parka navegue.</i>}</p>\
        <p>Múltiples ${puestos de control, ex puestos} \
        permiten el acceso a distintas funcionalidades de la nave, \
        y tú tienes el ${tuyo, ex controles}. \
        Un ${indicativo, ex indicativo} se sitúa al lado \
        de una de las puertas, junto a una ${placa, ex placa}. \
        Una ${pantalla, ex pantalla} permite observar \
        el resultado de los distintos comandos que se le pueden dar a la nave.",
    function() {
        this.pic = "res/scont.jpg";
        
        const OBJ_INDICATIVO = ctrl.creaObj(
            "indicativo",
            [  ],
            "Solo se puede leer SCONT... tiene sentido, claro.",
            this,
            Ent.Scenery
        );

        const OBJ_PANTALLA = ctrl.creaObj(
            "pantalla",
            [  ],
            "Ocupa el total de una de las paredes de esta sala. Es enorme.",
            this,
            Ent.Scenery
        );

        const OBJ_TRIPULANTES = ctrl.creaObj(
            "tripulantes",
            [ "tripulante", "navegante", "piloto", "capitan" ],
            "Cada uno está sentado en su puesto: navegante, piloto, y capitán \
             son los más importantes.",
            ctrl.places.limbo,
            Ent.Scenery
        );

        const OBJ_CONTROLES = ctrl.creaObj(
            "controles",
            [  ],
            "Ante tu asiento, puedes manejar un teclado y varios botones, \
             mientras que los resultados se muestran en la pantalla.",
            this,
            Ent.Scenery,
            function() {
                this.probeSent = false;
                
                this.prePush = function() {
                    let toret = "";
                    
                    if ( ctrl.places.limbo.has( OBJ_TRIPULANTES ) ) {
                      OBJ_TRIPULANTES.moveTo( this.owner );
                      ctrl.places.doDesc();
                      this.owner.desc += " Los ${tripulantes, ex tripulantes} \
                                          están en sus ${puestos, ex puestos}.";
                      toret = " Los ${tripulantes, ex tripulantes} \
                                          ocupan sus puestos, e informas \
                                          rápidamente al capitán. \
                                          Consternado, te pide que lances \
                                          una sonda: 'Debemos ver si los nativos \
                                          son amigables o no'.";
                      
                    }
                    else
                    if ( !this.probeSent ) {
                        this.probeSent = true;
                        this.owner.pic = "res/probe.jpg";
                        ctrl.places.doDesc();
                        toret = "En la pantalla se puede ver el casco del brazo de \
                                 la nave que sirve de hangar para las sondas. \
                                 Lentamente, las compuertas se abren, \
                                 hasta hacerlo totalmente, tras tantos, y tantos \
                                 años. Todos los mecanismos son operativos, \
                                 afortunadamente. La sonda se aleja. \
                                 Todos miráis la pantalla con emoción contenida, \
                                 esbozando una media sonrisa.";
                    }
                    else
                    if ( this.probeSent ) {
                        const DV_CMDS = document.getElementById( "dvCmds" );

                        DV_CMDS.style.display = "none";
                        ctrl.endGame("El terror se apodera de todos. \
                                      Un escalofrío recorre tu espalda, mientras \
                                      tapas tu cara para no ver ese... horror. \
                                      Tantos años... tantas generaciones...",
                                     "res/fish.jpg" );
                    }

                    return toret;
                };
                
                this.preExamine = function() {
                    let toret = this.desc;

                    if ( ctrl.places.limbo.has( OBJ_TRIPULANTES ) ) {
                        toret += "</p><p>Tras introducir algunos comandos, \
                                  el resultado aparece en pantalla: DST: -0.01 \
                                  ¡No puede ser! ¿Ya hemos llegado? ¿De más?\
                                  </p><p>Es el momento de \
                                  ${despertar a la tripulación, pulsa controles}";
                    }
                    else
                    if ( !this.probeSent ) {
                        toret += "</p><p>El navegante informa, \
                                  ante la incredulidad de todos: señor, \
                                  estamos en un planeta eminentemente \
                                  acuático, un 70% la superficie \
                                  está cubierta por el agua.\
                                  </p><p>Has preparado ya tus controles para \
                                  ${lanzar la sonda, pulsa controles}.";
                    }
                    else
                    if ( this.probeSent ) {
                        this.owner.pic = "res/scont.jpg";
                        ctrl.places.doDesc();
                        toret += "</p><p>¡La sonda ha regresado!\
                                  </p><p>Informas emocionado al capitán,\
                                  quien te pide que pongas la imagen \
                                  que ha traído la sonda como resultado.\
                                  </p><p>Solo tienes que \
                                  ${activar, pulsa controles} los controles.";
                    }

                    return toret;
                }
            }
        );

        const OBJ_PUESTOS = ctrl.creaObj(
            "puestos",
            [ "puesto", "control" ],
            "Todos ellos están formados por un asiento y varias pantallas y \
             controles, además de un teclado.",
            this,
            Ent.Scenery,
        );

        const OBJ_PLACA = ctrl.creaObj(
            "placa",
            [  ],
            "Parece de oro. Se puede leer UN-Parka, y también hay un dibujo \
             desde un punto de vista cenital de esta nave.",
            this,
            Ent.Scenery
        );
    });


// -------------------------------------------------- scriorec ---
const LOC_SCRIOREC = ctrl.locs.crea(
    "SCRIOREC",
    [  ],
    "^{<i>A tu alrededor hay docenas de comodidades \
        listas para ser utilizadas \
        por aquellos que, como tú, \
        se despiertan del sueño criogénico. \
        Te encuentras todavía torpe, y, aunque sabes para qué sirve cada botón, \
        te cuesta razonar cómo usarlos y en qué orden, como si tu cabeza \
        solo pudiera evocar unos recuerdos y otros no.</i>}</p>\
        <p>Destacan ${un indicativo, ex indicativo}, \
        ${una ducha, ex ducha}, ${un armario, ex armario}, \
        ${varias camillas, ex camillas} y cientos de paneles y botones. \
        ${Una puerta, sur} permitiría volver a la sala de criogenia, \
        mientras que ${otra, norte} más grande de doble hoja \
        se sitúa justo enfrente.",
    function() {
        const PLAYER = ctrl.personas.getPlayer();
        
        this.pic = "res/scriorec.jpg";
        this.setExitBi( "norte", LOC_SCONT );
        PLAYER.showered = false;

        const OBJ_UNIFORM = ctrl.creaObj(
            "uniforme",
            [ "mono" ],
            "De color azul marino, tan práctico como ajustado.",
            ctrl.places.limbo,
            Ent.Portable,
            function() {
                this.setClothing();
            }
        );

        const OBJ_ARMARIO = ctrl.creaObj(
            "armario",
            [  ],
            "Coges uno de los monos que sirven de uniforme a la tripulación, y te \
             lo pones.",
            this,
            Ent.Scenery,
            function () {
                this.preExamine = function() {
                    let toret = this.desc;

                    ctrl.clearAnswers();
                    if ( PLAYER.showered ) {
                      if ( ctrl.places.limbo.has( OBJ_UNIFORM ) ) {
                          OBJ_UNIFORM.moveTo( PLAYER );
                          OBJ_UNIFORM.setWorn();
                      } else {
                          PLAYER.say( "No. ¡Ya llevo uno puesto!" );
                          toret = "";
                      }
                    } else {
                        PLAYER.say( "Espera, espera... ¡estoy sin duchar!" );
                        toret = "El armario contiene varios uniformes.";
                    }

                    return toret;
                }
            }
        );

        const OBJ_CAMILLAS = ctrl.creaObj(
            "camillas",
            [ "camilla", "catre", "catres" ],
            "A veces la salida de la criogenia produce espasmos musculares, de \
             forma que no queda otro remedio que tumbarse a esperar que se pasen.",
            this,
            Ent.Scenery
        );

        const OBJ_INDICATIVO = ctrl.creaObj(
            "indicativo",
            [  ],
            "Solo indica SCRIOREC, sala de recuperación de criogenia.",
            this,
            Ent.Scenery
        );

        const OBJ_DUCHA = ctrl.creaObj(
            "ducha",
            [  ],
            "Aunque sea como de forma instintiva, sabes que te vendrá bien. \
             Entras. La cápsula se cierra tras de ti, \
             y notas el agua fría cayendo por tu cuerpo, lo que \
             despierta tu cuerpo y mente a variadas sensaciones, \
             espabilándose por fin y volviéndote a sentir completo.",
            this,
            Ent.Scenery,
            function() {
                this.preExamine = function() {
                    let toret = this.desc;

                    if ( PLAYER.showered ) {
                        ctrl.clearAnswers();
                        PLAYER.say( "No, no... ¡Ya estoy duchado!" );
                        toret = "";
                    }

                    PLAYER.showered = true;
                    return toret;
                }
            }
        );

        this.preGo = function() {
            const SENTENCE = parser.sentence;
            let toret = "";

            if ( SENTENCE.term1 == "norte" ) {
                let playerSays = "";
                ctrl.clearAnswers();
                
                if ( !PLAYER.showered ) {
                    playerSays = "Aún tengo que ducharme";
                }

                if ( !PLAYER.has( OBJ_UNIFORM ) ) {
                    playerSays += " ...¡Pero si voy desnudo!";
                }

                if ( playerSays != "" ) {
                    PLAYER.say( playerSays );
                } else {
                    toret = goAction.exe( SENTENCE );
                }
            } else {
                toret = goAction.exe( SENTENCE );
            }

            return toret;
        }
    });


// ----------------------------------------------------- scrio ---
const LOC_SCRIO = ctrl.locs.crea(
    "SCRIO",
    [  ],
    "^{<i>Te sientes mareado. \
        Y también sientes los labios pegajosos, la boca pastosa, \
        y una sensación en los párpados que no habías sentido nunca, \
        pero que te hace pensar en algo similar a como si \
        no hubieras dormido en un mes. Los párpados se te pegan \
        a la piel de la cara en una desagradable sensación, \
        y notas enormes legañas bajo los ojos. \
        Cuando te has sacudido la cabeza, y limpiado la cara \
        con los dedos, como buenamente has podido, \
        por fin miras a tu alrededor.</i>}</p><p>Cientos de cápsulas aparecen \
        incorporadas en múltiples patrones regulares a esta enorme sala. \
        ${Un indicativo, ex indicativo}, pintado en la pared \
        parece indicar algo. ${Una puerta, norte}, delante de ti, \
        es la única salida aparente.",
    function() {
        this.pic = "res/scrio-tr10.jpg";
        this.setExitBi( "norte", LOC_SCRIOREC );

        const OBJ_INDICATIVO = ctrl.creaObj(
            "indicativo",
            [  ],
            "^{<i>Lees el cartel, lo que parece extraer recuerdos \
                de tu memoria en forma de ráfagas, \
                recuerdos que creías olvidados. \
                Sabes que te encuentras en las salas de criogenia \
                anteriores de la nave, cerca de la sala de control.</i> }\
                El cartel indica brevemente: \"SCRIO-Tr10\", es decir, \
                criogenia para la décima generación de tripulantes de la nave.",
            this,
            Ent.Scenery
        );
    });


// ------------------------------------------------------- Player ---
const PLAYER = ctrl.personas.creaPersona(
    "Jugador",
    ["jugador", "jugadora", "tripulante", "tr10-1001" ],
    "Tripulante TR10-1001.",
    LOC_SCONT
);


// ---------------------------------------------------------- Ini ---
ctrl.ini = async function() {
    const pathToFont = "res/conthrax.otf";
    const font = new FontFace("Cartesian", `url(${pathToFont})`);
    const PUSH_ACTION = actions.getAction( "push" );

    document.fonts.add( font );
    
    this.setTitle( "Parka" );
    this.setIntro( "Despiertas, pero no es agradable. \
     Sientes tu cuerpo entumecido, como \
     si hubieras estado inmóvil, pero rígido, durante mucho tiempo. Al \
     principio, no puedes acostumbrar tus ojos a la inmensa cantida de luz \
     de este lugar, solo ves algunas formas regulares borrosas." );
    this.setPic( "res/parka.jpg" );
    this.setAuthor( "baltasarq@gmail.com" );
    this.setVersion( "1.0 20241031" );
    this.locs.setStart( LOC_SCRIO );
    this.personas.changePlayer( PLAYER );
    PUSH_ACTION.verbs.push( "pulsa", "pulsar", "pulso" );

    await font.load()
};
