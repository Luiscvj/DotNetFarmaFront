import { opcCompra } from "../Services/compra-service.js";
export class CompraController  
{
    constructor()
    {

    }



     PostCompra = async(data) =>
    {
        try
        {  
           let compraHecha = await  opcCompra['POST'](data);

           return compraHecha;
           
        }catch(error)
        {
            console.error(error);
        }
    }
}