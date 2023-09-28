import { opcMedicamentoCompra } from "../Services/medicamentoCompra-service.js";

export class MedicamentoCompraController
{
    constructor()
    {

    }

/* 
*POST MedicamentoCompra*****************************
*/
    PostMedicamentoCompra = async(data) =>
    {
        try
        {
           await  opcMedicamentoCompra['POST'](data);
        }catch(error)
        {
            console.error(error);
        }
    }
}