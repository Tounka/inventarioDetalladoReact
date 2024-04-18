function Item(id, nombre,cantidadPorCajas,cantidadPorBolsa, cantidad ,cantidadCritica) {
    this.id = id;
    this.nombre = nombre;
    this.cantidadPorCajas = cantidadPorCajas;
    this.cantidadPorBolsa = cantidadPorBolsa;
    this.cantidad = cantidad;
    this.cantidadCritica = cantidadCritica;
  }
  const CucharasSundae= new Item('CucharaS', 'Cuchara Sundae' ,0,200,   0,75);
  const CucharasMcFlurry= new Item('CucharasMcF', 'Cuchara Mcflurry' ,0,75,   0,75);
  const Popotes= new Item('Popotes', 'Popotes' ,0,205,   0,50);
  const ServilletaCono= new Item('ServilletaCono', 'Servilletas Cono' ,0,0,   0,4);
  
  const arregloDesechablesProducto = [CucharasSundae, CucharasMcFlurry, Popotes, ServilletaCono];

const Conos= new Item('Conos', 'Conos' ,576,0,   0,250);
const VasoMcFlurry= new Item('VMcFlurry', 'Vasos McFlurry' ,0,50,  0,50);
const VasoSundae= new Item('VSunsae', 'Vasos Sundae' ,0,50,   0,50);
const VasoMalteada= new Item('VMalteada', 'Vasos Malteada' ,0,64,   0,20);

const arregloContenedoresProducto = [VasoMcFlurry, VasoSundae,VasoMalteada,  Conos];

const BaseDeHelado= new Item('BDHelado', 'Base de Helado' ,9,0 ,  0,18);
const Leche= new Item('Leche', 'Leche' ,0,0,   0,1);
const Mms= new Item('Mms', 'M&Ms (Oz)' ,0,0,   0,20);
const Oreo= new Item('Oreo', 'Oreo (Oz)' ,0,0,   0,20);
const Pinguinos= new Item('Pinguinos', 'Pinguinos (Unidades)' ,0,0,   0,10);
const Chocolate= new Item('Chocolate', 'Chocolate' ,0,0,   0,2);
const Fresa= new Item('Fresa', 'Fresa' ,0,0,   0,2);
const Caramelo= new Item('Caramelo', 'Caramelo' ,0,0,   0,2);

const arregloProducto = [BaseDeHelado, Leche, Mms, Oreo, Pinguinos, Chocolate, Fresa, Caramelo];



const RolloTermico= new Item('RolloTermico', 'Rollo Térmico' ,0,0,   0,5);
const PapelCafe= new Item('PapelCafe', 'Papel Cafe' ,0,0,   0,1);
const SobresDeposito= new Item('SobresDeposito', 'Sobres Deposito' ,0,0,   0,20);
const Trapos= new Item('Trapos', 'Trapos' ,0,0,   0,3);
const JabonParaManos= new Item('JabonParaManos', 'Jabón Para Manos' ,0,0,   0,1);
const GelAntibacterial= new Item('GelAntibacterial', 'Gel Antibacterial' ,0,0,   0,1);
const BolsaBasura= new Item('BolsaBasura', 'Bolsa Basura' ,0,0,   0,8);
const Pluma= new Item('Pluma', 'Pluma' ,0,0,   0,1);
const Engrapadora= new Item('Engrapadora', 'Engrapadora' ,0,0,   0,1);
const Grapas= new Item('Grapas', 'Grapas' ,0,0,   0,30);
const Escoba= new Item('Escoba', 'Escoba' ,0,0,   0,1);
const Trapeador= new Item('Trapeador', 'Trapeador' ,0,0,   0,1);
const OverRun= new Item('TOverun', 'Taza OverRun' ,0,0,   0,1);
const Bascula= new Item('Bascula', 'Bascula' ,0,0,   0,1);
const Cuchillo= new Item('Cuchillo', 'Cuchillo' ,0,0,   0,1);

const arregloOperacional = [
  RolloTermico, PapelCafe, SobresDeposito, Trapos, JabonParaManos,
  GelAntibacterial, BolsaBasura, Pluma, Engrapadora, Grapas,
  Escoba, Trapeador, OverRun, Bascula, Cuchillo
];

export {
  arregloProducto,
  arregloContenedoresProducto,
  arregloDesechablesProducto,
  arregloOperacional
};