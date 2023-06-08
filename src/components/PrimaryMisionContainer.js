import "../styles/PrimaryMision.css"
import React from 'react';
import GraficoLine from "./GraficoLine";

function PrimaryMision({name}) {

    return (
        <section className="PContainer">
            <div className="PContainerTop">

            </div>
            <div className="PContainerBottom">
                <GraficoLine canal={"T"} name={"TEMPERATURA"} width={{width: "33vw"}} />
                <GraficoLine canal={"A"} name={"ALTURA"} width={{width: "33vw"}}/>
                <GraficoLine canal={"P"} name={"PRESION"} width={{width: "33vw"}}/>
            </div>
        </section>
    );
}

export default PrimaryMision
