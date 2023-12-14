const preguntasCocina =[
    {
        pregunta: "Cual es la temperatura inferior de la parrilla principal?",
        respuestas: ['350°F','425°F', '360°F', 'Ninguna'],
        respuestaCorrecta: '350°F'

    },
    {
        pregunta: 'Cual es la temperatura superior de la parrilla principal? ',
        respuestas: ['450°F','425°F', '360°F', 'Ninguna'],
        respuestaCorrecta: '425°F'
    },
    {
        pregunta: 'Cuanto es la tanda maxima de carne 10/1? ',
        respuestas: ['6','8', '4', 'Ninguna'],
        respuestaCorrecta: '6'
    },
    {
        pregunta: 'Cuanto es la tanda maxima de carne 4/1? ',
        respuestas: ['6','8', '4', 'Ninguna'],
        respuestaCorrecta: '4'
    },
    {
        pregunta: 'Cual es la temperatura interna de calidad de la carne? ',
        respuestas: ['140°F a 150°F','155°F a 170°F', '355°F a 360°F', '360°F a 370°F'],
        respuestaCorrecta: '155°F a 170°F'
    }
]
const preguntasServicio =[
    {
        pregunta: "Que es R2P y cual es su tiempo? ",
        respuestas: ['Ready to Present, 90 segundos','Ready to Present, 120 segundos', 'Response to Protect , 90 segundos', 'Response to Protect , 120 segundos'],
        respuestaCorrecta: 'Ready to Present, 90 segundos'

    },
    {
        pregunta: 'Cual es la temperatura de la freidora de papas fritas? ',
        respuestas: ['335°F','425°F', '360°F', '385°F'],
        respuestaCorrecta: '335°F'
    },
    {
        pregunta: 'Cual es el tiempo de vida de la papa HB? ',
        respuestas: ['5 minutos','10 minutos', '15 minutos', '20 minutos (es esta)'],
        respuestaCorrecta: '10 minutos'
    },
    {
        pregunta: 'En este orden (Servilletas, Catsup, Jalapeño) en menu regular cuanto se debe poner de cada item? ',
        respuestas: ['3 - 2 - 1','1 - 2 - 3', '3 - 2 - 2', 'Solo se pone cuando el cliente lo solicita'],
        respuestaCorrecta: '3 - 2 - 1'
    },
    {
        pregunta: 'Cuantos McTrios pueden ir como máximo por charola? ',
        respuestas: ['2','1', '3', 'Pueden ir los que sea, siempre y cuando quepan.'],
        respuestaCorrecta: '2'
    }
]
const todasLasPreguntas = [preguntasServicio,preguntasCocina]

const crearListadoDePreguntas = (todasLasPreguntas) => {
    let listadoDePreguntas = [];
    todasLasPreguntas.forEach(lista => {
            lista.forEach(pregunta =>{
                listadoDePreguntas.push(pregunta);
            });
    });
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }
    shuffle(listadoDePreguntas);
    console.log(listadoDePreguntas);
    return listadoDePreguntas;
};
 let listadoDePreguntas = crearListadoDePreguntas(todasLasPreguntas);

export default listadoDePreguntas;