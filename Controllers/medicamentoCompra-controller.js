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

/* 
*GET MedicamentoCompra*****************************
*/


    GetMedicamentoCompra= async () =>
    {
        let response = await opcMedicamentoCompra['GET']();
        console.log(response)
        if(response == null) return console.log('Fallo en la consulta');

        let divListarDepartamento = document.querySelector("#medicamentoCompraTabla");
    
       
        let tbody =   divListarDepartamento.tBodies[0];

        response.forEach(medicamento =>{
                    console.log(medicamento.medicamentoCompraId)
                    let row = document.createElement('tr');
                for(let propiedades in medicamento)
                {   
                    let td = document.createElement('td');
                    td.textContent =medicamento[propiedades],
                    row.appendChild(td);
                }
                    
                       
                    
                    tbody.appendChild(row);
            })


       // divListarmedicamento.innerHTML= listmedicamentoHtml;
        //this.Deletemedicamento();
    
        //this.UpdateViewToPUTmedicamentoes(); 
    }
    





}