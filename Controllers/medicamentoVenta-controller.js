import { opcMedicamentoVenta } from "../Services/medicamentoVenta-service.js"

export class MedicamentoVentaController  
{
    constructor()
    {

    }


    PostAllMedicamentoVenta = async(data) =>
    {
        try
        {       console.log(data);
                let response = await opcMedicamentoVenta['POST'](data);

                return await response;
        }catch(error)
        {
            console.error(error);
        }
    }
}