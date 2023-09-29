import { opcMedicamento } from "../Services/medicamento-service.js";
import { opcProveedor } from "../Services/proveedor-service.js";
import { Fetch } from "./Fetch.js";

export class MedicamentoController 
{
    constructor()
    {
        this.proveedorSelect = document.querySelector("#selectProveedorMedicamento");
        this.medicamentoSelect = document.querySelector("#selectMedicamentoCompra");
        this.ArraySelects = [];


        this.frmMedicamento = document.forms['frmRegMedicamento'];
        this.NombreMedicamento =this.frmMedicamento['nombre'];
        this.CantidadMedicamento =this.frmMedicamento['cantidad'];
        this.PrecioMedicamento =this.frmMedicamento['precioMedicamento'];
        this.FechaExpiracion =this.frmMedicamento['fechaExpiracion'];
        this.FechaCompra =this.frmMedicamento['fechaCompra'];
        this.PrecioCompra = this.frmMedicamento['precioCompra'];
        this.Proveedor =this.frmMedicamento['selectProveedorMedicamento'];
        this.fetch = new Fetch()
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
         this.DeleteMedicamentos();
         this.UpdateViewToPUTMedicamentos();
    }


    CargarMedicamento = (Medicamento) =>
    {
        let listPorveedorHTML = '';

        listPorveedorHTML = /* html */
        `
            
                <div class="col-sm-3">
                    <div class="card h-100">
                        <div class="d-flex justify-content-center align-items-center">
                            <img src="Assets/Images/${Medicamento.nombre.toLowerCase()}.jpg" class="card-img-top imagenesMedicamento" style= " width: 10rem;" alt="${Medicamento.nombre}">
                        </div>       
                        <div class="card-body">
                            <h5 class="card-title">${Medicamento.nombre}</h5>
                            <p class="card-text">Expiracion: ${Medicamento.fechaExpiracion.split("T")[0]}</p>
                            <p class="card-text">Precio: ${Medicamento.precio}</p>
                            <p class="card-text">Stock en bodega: ${Medicamento.stock}</p>                 
                        </div>
                        <div class="card-footer">
                            <a href="#" class="btn btn-warning updateMedicamentoButtons" data-proveedor="${Medicamento.proveedorId}" id="${Medicamento.medicamentoId}">editar</a>
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
            return await reponse;
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
                
            let medicamentoRegistrado = await  opcMedicamento['POST'](data);
            return medicamentoRegistrado;
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
               
                array.removeChild(opcionABorrar);
            }

        })
    }
 
/*
*PUT de medicamentos ************************ 
*/



PutMedicamento = (id,data)=>
{
    console.log("Entre a PUT de Medicamento");
    console.log(data);
    try
    {
        opcMedicamento['PUT'](id,data)
    }catch(error)
    {
        console.error(error);
    }
}


UpdateViewToPUTMedicamentos = () =>
{
    
     let registroId;
     document.querySelectorAll(".updateMedicamentoButtons").forEach((val,id)=>
     {
        val.addEventListener("click",(e)=>
        {



      

            this.NombreMedicamento.value ="";
            this.CantidadMedicamento.value ="";
            this.PrecioMedicamento.value ="";
            this.FechaExpiracion.value ="";
            this.FechaCompra.value ="";
            this.NombreMedicamento.readOnly= false;
            this.Proveedor.selectedIndex = 0;
            this.Proveedor.disabled=false;
            this.PrecioMedicamento.readOnly = false;

            registroId = e.target.id;//id de mi registro
            this.verOcultarDivsParaActualizar();
            let buttonSaveFormProveedor =document.querySelector("#guardarDataMedicamento");
            buttonSaveFormProveedor.dataset.action= "update";
            buttonSaveFormProveedor.value = registroId;
            buttonSaveFormProveedor.dataset.proveedor = e.target.dataset.proveedor;
            buttonSaveFormProveedor.innerHTML = "Actualizar Registro";
            this.cargaSelectMedicamento();
          

           
        })
     })
   
     
}


verOcultarDivsParaActualizar= () =>
{
    console.log("en verocultar div")
    let navButtons = document.querySelectorAll(".navMedicamento");
    let verocultarDatasetNav = JSON.parse(navButtons[0].dataset.hideformmedicamento);

    verocultarDatasetNav[0].forEach(idDivVer =>
        {
            let divVer = document.querySelector(idDivVer);
            console.log(divVer);
            divVer.style.display = 'block';
        })
    verocultarDatasetNav[1].forEach(idDivOcultar =>
        {
            let divOcultar = document.querySelector(idDivOcultar);
            divOcultar.style.display = 'none';
        })
}

VerificarCargaImagen = () =>
{   let srcPorDefecto ='';
    document.querySelectorAll(".imagenesMedicamento").forEach((elemento) => {
        var imagen = new Image();
        
        imagen.onload = function() {
            console.log(`La imagen con src ${imagen.src} se cargó correctamente`);
            imagen.src = elemento.src;
        };
        
        imagen.onerror = function() {
            console.log(`Error al cargar la imagen con src ${imagen.src}`);

        };
        
        // Establece la fuente (src) de la imagen
        
    });
}




DeleteMedicamentos = () =>
{
    document.querySelectorAll(".deleteMedicamento").forEach((val,id)=>
    {
        val.addEventListener("click", (e)=>
        {

            opcMedicamento['DELETE'](e.target.id).then(()=>
            {
                this.GetAllMedicamento();
            })
                
         
            


        });
    });

}
    
}
