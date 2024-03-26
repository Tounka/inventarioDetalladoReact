import React, {useState} from "react";
import '../hojas-de-estilo/item.css'

function Item ({objetoProducto}){
    const [cajaValue, setCajaValue] = useState(0.0);
    const [bolsaValue, setBolsaValue] = useState(0.0);
    const [unidadesValue, setUnidadesValue] = useState(0.0);


    const modificarCantidad = () => {

        
        const idCajas = document.getElementById(`caja${objetoProducto.id}`);
        const idBolsas = document.getElementById(`bolsa${objetoProducto.id}`);
        const idUnidades = document.getElementById(`unidades${objetoProducto.id}`);
        
        const arregloCantidades = [0,0,0];

        const eliminarCerosALaIzquierda = (valor) => {
            // Si el valor es "0", devolverlo tal cual
            if (valor === "0") {
                return valor;
            }
            
            return valor.replace(/^0+/, '');
        };

        if (idCajas) {
            
            setCajaValue(eliminarCerosALaIzquierda(idCajas.value));
          let cantidadCajas = objetoProducto.cantidadPorCajas * parseFloat(idCajas.value);
         
          arregloCantidades[0] = cantidadCajas;
        }
        if (idBolsas) {
            setBolsaValue(eliminarCerosALaIzquierda(idBolsas.value));
            let cantidadBolsas = objetoProducto.cantidadPorBolsa * parseFloat(idBolsas.value);
            
            arregloCantidades[1] = cantidadBolsas;
          }
        setUnidadesValue(eliminarCerosALaIzquierda(idUnidades.value))

        const cantidadUnidades = parseFloat(idUnidades.value);
        arregloCantidades[2] = cantidadUnidades;

        const cantidadTotal = arregloCantidades[0] + arregloCantidades[1]+ arregloCantidades[2];
        
        objetoProducto.cantidad = cantidadTotal;
        
        
        

      };
      
    return(
        
        <div className="d-flex row contenedor">
            
            <div className="contenedorIzquierdoItem col-sm-7 ">
                <h2>{objetoProducto.nombre}</h2>
            </div>
            <div className="contenedorDerechoItem col-sm-5 ">
            <div className="instanciaInput"></div>
                <div className="contenedorInputsItems container-fluid row" id={objetoProducto.id}>

                    {objetoProducto.cantidadPorCajas !== 0 ? (
                        <div className="col">
                          <label htmlFor="caja" className="form-label lblInput">Caja</label>
                          <input type="number" className="form-control" id={`caja${objetoProducto.id}`} placeholder="Caja" onChange={modificarCantidad} value={cajaValue} min={0} />

                        </div>
                      ) : null}
                      
                    {objetoProducto.cantidadPorBolsa !== 0 ?(
                    <div className="col ">
                        <label htmlFor="bolsa" className="form-label lblInput">Paquetes</label>
                        <input type="number" className="form-control" id={`bolsa${objetoProducto.id}`} placeholder="Bolsas" onChange={modificarCantidad} value={bolsaValue} min={0} />
                    </div>
                    )
                    :null}

                    <div className="col ">
                        <label htmlFor="unidades" className="form-label lblInput">Unidades</label>
                        <input type="number" className="form-control" id={`unidades${objetoProducto.id}`} placeholder="Unidades" onChange={modificarCantidad} value={unidadesValue} min={0} />
                    </div>
                </div>
            </div>
        </div>
        

    );
}

export default Item;