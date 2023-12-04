function Item(id, nombre,cantidadPorCajas,cantidadPorBolsa, cantidad ,cantidadCritica) {
    this.id = id;
    this.nombre = nombre;
    this.cantidadPorCajas = cantidadPorCajas;
    this.cantidadPorBolsa = cantidadPorBolsa;
    this.cantidad = cantidad;
    this.cantidadCritica = cantidadCritica;
  }
const BaseDeHelado= new Item('BDHelado', 'Base de Helado' ,9,0,   0,50);
const Conos= new Item('Conos', 'Conos' ,576,0,   0,50);
const Conos= new Item('Conos', 'Conos' ,576,0,   0,50);
const Conos= new Item('Conos', 'Conos' ,576,0,   0,50);
const Conos= new Item('Conos', 'Conos' ,576,0,   0,50);

const VasoMcFlurry= new Item('VMcFlurry', 'Vasos McFlurry' ,0,50,  0,50);
const VasoSundae= new Item('VSunsae', 'Vasos Sundae' ,0,50,   0,50);
const VasoMalteada= new Item('VMalteada', 'Vasos Malteada' ,0,64,   0,50);
const Conos= new Item('Conos', 'Conos' ,576,0,   0,50);

export const arregloProducto = [VasoMcFlurry, VasoSundae,VasoMalteada,  Conos];