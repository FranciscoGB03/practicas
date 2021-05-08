import React from 'react'
import pdf from "../../docs/Guía_competencias.pdf";

const VisualizadorPDF = ({archivo,width="100%",height="100vh"}) => {
    return (
        <div style={{width:width, height:height}}>
            <object
                data={archivo?archivo:pdf}
                type={'application/pdf'}
                width={"100%"}
                height={"100%"}

            >
            </object>
        </div>
    );
}
export default VisualizadorPDF;
