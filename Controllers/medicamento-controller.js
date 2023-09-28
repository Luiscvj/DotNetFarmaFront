import { opcMedicamento } from "../Services/medicamento-service.js";
import { opcProveedor } from "../Services/proveedor-service.js";

export class MedicamentoController 
{
    constructor()
    {
        this.proveedorSelect = document.querySelector("#selectProveedorMedicamento");
        this.medicamentoSelect = document.querySelector("#selectMedicamentoCompra");
        this.ArraySelects = [];
    }
/*
*GET de medicamentos **********************************************
*/
    GetAllMedicamento = async() =>
    {
        let response = await opcMedicamento['GET']();
        let listMedicamentoHTML = '';
        let divListMedicamento = document.querySelector("#listarMedicamento")
        console.log("en Get ALL de medicamento")
        response.forEach(Medicamento =>
            {
                    listMedicamentoHTML +=this.CargarMedicamento(Medicamento); 
            })
        
        divListMedicamento.innerHTML=listMedicamentoHTML;
        console.log(divListMedicamento);
        //this.DeleteMedicamentoes();
       // this.UpdateViewToPUTMedicamentoes();
    }


    CargarMedicamento = (Medicamento) =>
    {
        let listPorveedorHTML = '';

        listPorveedorHTML = /* html */
        `
            
                <div class="col-sm-3">
                    <div class="card h-100">
                        <div class="d-flex justify-content-center align-items-center">
                            <img src="Assets/Images/${Medicamento.nombre.toLowerCase()}.jpg" class="card-img-top" style= " width: 10rem;" alt="${Medicamento.nombre}">
                        </div>       
                        <div class="card-body">
                            <h5 class="card-title">${Medicamento.nombre}</h5>
                            <p class="card-text">Expiracion: ${Medicamento.fechaExpiracion.split("T")[0]}</p>
                            <p class="card-text">Precio: ${Medicamento.precio}</p>
                            <p class="card-text">Stock en bodega: ${Medicamento.stock}</p>                 
                        </div>
                        <div class="card-footer">
                            <a href="#" class="btn btn-warning updateMedicamentoButtons" id="${Medicamento.medicamentoId}">editar</a>
                            <a href="#" class="btn btn-danger deleteMedicamento" id="${Medicamento.medicamentoId}">Eliminar</a>
                        </div>
                    </div>
                </div>

            
        `

        return listPorveedorHTML;
    }



    GetByID = async (id) =>
    {
        try
        {   console.log("En controlador",id);
            let reponse = await  opcMedicamento['GETBYID'](id);
            return reponse;
        }catch(error)
        {
            console.error(error);
        }
    }


/*
*POST de medicamentos **********************************************
*/
        PostMedicamento = async (data) =>
        {
            try
            {
                console.log(data);  
                await opcMedicamento['POST'](data);
            }catch(error)
            {
                console.error(error);
            }
        }

        
    cargaSelectMedicamento = async () => 
    {       
        if(!(this.proveedorSelect.options[1] == undefined))
        {
           
            this.ArraySelects.push(this.proveedorSelect,this.medicamentoSelect);
            this.DeleteSelects();
            
        }
        
        
       try
       {
            let responseProveedor = await opcProveedor['GET']();
            let responseMedicamento = await opcMedicamento['GET']();

            responseProveedor.forEach(proveedor => 
                {
                    let optionProveedor = document.createElement('option');
                    optionProveedor.innerHTML =`${proveedor.nombre}`;
                    optionProveedor.value = proveedor.proveedorId;
                    this.proveedorSelect.appendChild(optionProveedor);
                })

            responseMedicamento.forEach(medicamento =>
                 {
                    let optionMedicamento = document.createElement('option');
                    optionMedicamento.innerHTML = `${medicamento.nombre}`;
                  
                    optionMedicamento.value = medicamento.medicamentoId;
                    this.medicamentoSelect.appendChild(optionMedicamento);
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
                console.log(opcionABorrar);
                array.removeChild(opcionABorrar);
            }

        })
    }
 



    

}