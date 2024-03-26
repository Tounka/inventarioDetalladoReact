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
    },
    {
        pregunta: 'Cuanto es el tiempo de vida de los nuggets en el UHC? ',
        respuestas: ['20 minutos','30 minutos', '60 minutos', '90 minutos'],
        respuestaCorrecta: '20 minutos'
    },
    {
        pregunta: 'Cuanto es el tiempo de vida de la mcPollo en el UHC? ',
        respuestas: ['20 minutos','30 minutos', '60 minutos', '90 minutos'],
        respuestaCorrecta: '30 minutos'
    },
    {
        pregunta: 'Cuanto es el tiempo de vida del pollo crispy en el UHC? ',
        respuestas: ['20 minutos','30 minutos', '60 minutos', '90 minutos'],
        respuestaCorrecta: '60 minutos'
    },
    {
        pregunta: 'Cual es la proporción de sal-pimienta en el salero de cocina? ',
        respuestas: ['84% - 16%','80% - 20%', '50% - 50%', '92% - 8%'],
        respuestaCorrecta: '84% - 16%'
    },
    {
        pregunta: 'Cual es el tiempo de vida del tomate en la mesa de condimentos? ',
        respuestas: ['20 minutos','2 horas', '4 horas', 'Toda la jornada'],
        respuestaCorrecta: '2 horas'
    },
    {
        pregunta: 'Cuantas porciones de tocino lleva una Club-House? ',
        respuestas: ['3 tiras','2 tiras', '6 tiras', '8 tiras'],
        respuestaCorrecta: '3 tiras'
    },
    {
        pregunta: 'Cual es la temperatura de la maquina de helados? ',
        respuestas: ['34°F a 40°F','36°F a 40°F', '33°F a 37°F', '33°F a 43°F'],
        respuestaCorrecta: '34°F a 40°F'
    },
    {
        pregunta: 'Cuantos quesos tiene una cuarto de libra doble? ',
        respuestas: ['2 tiras','3 tiras', '4 tiras', '1 tira'],
        respuestaCorrecta: '2 tiras'
    },
    {
        pregunta: 'Cuantos disparos de salsa bigMac lleva una Club-House? ',
        respuestas: ['3','2', '1', 'No lleva salsa bigMac, es CBO'],
        respuestaCorrecta: '3'
    },
    {
        pregunta: 'Al descongelar el pan cuanto es si tiempo de vida? ',
        respuestas: ['2 días','3 días', '1 semana', '1 dia'],
        respuestaCorrecta: '2 días'
    },
    {
        pregunta: 'Cuanto tiempo se deja temperando el queso? ',
        respuestas: ['2 Horas','4 Horas', '5 Horas', '6 Horas'],
        respuestaCorrecta: '2 Horas'
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
    },
    {
        pregunta: 'A un cliente se le derramo algo de cafe en mostrador y en su mesa, que trapo usarías para limpiar? ',
        respuestas: ['Rojo','Verde', 'Azul', 'Amarillo'],
        respuestaCorrecta: 'Azul'
    },
    {
        pregunta: 'Se derramo refresco en la isla de bebidas, que trapo usarías para limpiar? ',
        respuestas: ['Rojo','Verde', 'Azul', 'Amarillo'],
        respuestaCorrecta: 'Verde'
    },
    {
        pregunta: 'Un cliente nos comento que esta sucia la tasa del baño, que trapo usarías para limpiar? ',
        respuestas: ['Rojo','Verde', 'Azul', 'Amarillo'],
        respuestaCorrecta: 'Amarillo'
    },
    {
        pregunta: 'Un gerente te pide limpiar las sillas del lobby , que trapo usarías? ',
        respuestas: ['Rojo','Verde', 'Azul', 'Amarillo'],
        respuestaCorrecta: 'Rojo'
    },
    {
        pregunta: 'Cuantas Oz de papas tiene las papas grandes? ',
        respuestas: ['5oz','3.5oz', '10oz', '5.5oz'],
        respuestaCorrecta: '5oz'
    },
    {
        pregunta: 'Cual es la temperatura de la freidora de PAPA HB? ',
        respuestas: ['335°F','425°F', '360°F', '385°F'],
        respuestaCorrecta: '360°F'
    },
    {
        pregunta: 'Cuales son las técnicas de influencer vendedor? ',
        respuestas: ['Salto pequeño y venta cruzada','Salto pequeño y venta anidada', 'Salto pequeño y venta agilizada', 'Salto pequeño y venta apresuradas'],
        respuestaCorrecta: 'Salto pequeño y venta cruzada'
    },
    {
        pregunta: 'Que pinzas usamos para las papas HB ya fritas? ',
        respuestas: ['Azules','Rojas', 'Plateadas', 'La pala de plástico gris'],
        respuestaCorrecta: 'Plateadas'
    },
    {
        pregunta: 'Cual es un enemigo de las papas? ',
        respuestas: ['Carbon','Altas temperaturas', 'Sal', 'Todos lo son'],
        respuestaCorrecta: 'Todos lo son'
    }
    ,
    {
        pregunta: 'Cual es un enemigo de las papas? ',
        respuestas: ['Carbon','Altas temperaturas', 'Sal', 'Todos lo son'],
        respuestaCorrecta: 'Todos lo son'
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
    
    return listadoDePreguntas;
};
 let listadoDePreguntas = crearListadoDePreguntas(todasLasPreguntas);

export default listadoDePreguntas;
