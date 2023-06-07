import "../styles/PrimaryMision.css"
import React from 'react';
import GraficoLine from "./GraficoLine";

function PrimaryMision({name}) {

    return (
        <section className="PContainer">
            <div className="PContainerTop">

            </div>
            <div className="PContainerBottom">
                <GraficoLine name={"TEMPERATURA"} width={{width: "33vw"}} min={15} />
                <GraficoLine name={"ALTURA"} width={{width: "33vw"}}/>
                <GraficoLine name={"PRESION"} width={{width: "33vw"}}/>
            </div>
        </section>
    );
}

export default PrimaryMision
