import { opcVenta } from "../Services/service-venta.js";

export class VentaController 
{
    constructor()
    {
        this.selectCarritoCompras = document.querySelector("#selectCarritoCompras");
        this.ArraySelects = [];
    }

/* 
*POST VENTAS***********************
*/
    PostVentaAll = async (data) =>
    {
        console.log(data);

        try
        {
           let response= await  opcVenta['POSTAll'](data);

           console.log(response);
        }catch(error)
        {
            console.error(error)
        }
    }


/* 
*CARGA selects******************
*/



cargaSelectMedicamento = async () => 
{       
    if(!(this.selectCarritoCompras.options[1] == undefined))
    {
       
        this.ArraySelects.push(this.selectCarritoCompras);
        this.DeleteSelects();
        
    }
    
    
   try
   {
   
        let responseMedicamento = await opcMedicamento['GET']();

       

        responseMedicamento.forEach(medicamento =>
             {
                let optionMedicamento = document.createElement('option');
                optionMedicamento.innerHTML = `${medicamento.nombre}`;
              
                optionMedicamento.value = medicamento.medicamentoId;
                this.selectCarritoCompras.appendChild(optionMedicamento);
             })

   }catch(error)
   {
    console.error(error);
   } 
}

DeleteSelects = () => 
    {   this.ArraySelects.forEach(array=>
        {
            for(let i= 1; i = array.options.length-1;i++)
            {
                let idRegistro =parseInt(array.options[i].value);
                let opcionABorrar = array.querySelector(`option[value="${idRegistro}"]`);
               
                array.removeChild(opcionABorrar);
            }

        })
    }



}