import React from "react";
import '../hojas-de-estilo/TopMcHoot.css'

function TopMcHoot({score}){

    return(
        <div className="contenedorTop">
            <div className="timer">
                3:00
            </div>
            <div className="contenedorScore">
                <div className="mcPuntos">
                    McPuntos:
                </div>
                <div className="score">
                 {score} 
                </div>
            </div>

        </div>
    );
}

export default TopMcHoot;