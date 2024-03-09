import React from "react";
import {DisplayLobby} from '../componentes/Displays'
import Separador from '../componentes/Separador';
function Lobby() {
    return(
        <DisplayLobby>
            <Separador titulo="Selecciona la aplicación "/>

            <div className="contenedorSelector">

                
            </div>
        </DisplayLobby>
    );
}

export default Lobby;