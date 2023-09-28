
import { opcProveedor } from "../Services/proveedor-service.js";

export class ProveedorController
 {
    constructor(){}

/* 
*POST de proveedores **********************************************
*/
    PostProveedor = async (data) =>
    {
        try
        {console.log(data);  
            await opcProveedor['POST'](data);
        }catch(error)
        {
            console.error(error);
        }
    }
/* 
*GET de proveedores **********************************************
*/

    GetAllProveedor = async() =>
    {
        let response = await opcProveedor['GET']();
        let listPorveedorHTML = '';
        let divListProveedor = document.querySelector("#listProveedor")
        console.log("en Get ALL")
        response.forEach(proveedor =>
            {
                    listPorveedorHTML +=this.CargarProveedor(proveedor); 
            })
        
        divListProveedor.innerHTML=listPorveedorHTML;
        console.log(divListProveedor);
        this.DeleteProveedores();
        this.UpdateViewToPUTProveedores();
    }


    CargarProveedor = (proveedor) =>
    {
        let listPorveedorHTML = '';

        listPorveedorHTML = /* html */
        `
        <div class="col-sm-6 p-2">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${proveedor.nombre}</h5>
                    <p class="card-text">${proveedor.email}</p>
                    <p class="card-text">${proveedor.direccion}</p>       
                    <a href="#" class="btn btn-warning updateProveedorButtons" id="${proveedor.proveedorId}">editar</a>
                    <a href="#" class="btn btn-danger deleteProveedor" id="${proveedor.proveedorId}">Eliminar</a>
                </div>
            </div>
        </div>   
        `

        return listPorveedorHTML;
    }

/* 
*DELETE de proveedores **********************************************
*/

    DeleteProveedores =  () =>
    {
         document.querySelectorAll(".deleteProveedor").forEach((val,id)=>
        {
            val.addEventListener("click", (e)=>
            {

                opcProveedor['DELETE'](e.target.id).then(()=>
                {
                    this.GetAllProveedor();
                })
                
               
                


            });
        });
    }
/* 
*PUT de proveedores **********************************************
*/
    PutProveedor = (id,data)=>
    {
        console.log("Entre a PUT de proveedore");

        try
        {
            opcProveedor['PUT'](id,data)
        }catch(error)
        {
            console.error(error);
        }
    }



    UpdateViewToPUTProveedores = () =>
    {let registroId;
         document.querySelectorAll(".updateProveedorButtons").forEach((val,id)=>
         {
            val.addEventListener("click",(e)=>
            {
                 registroId = e.target.id;//id de mi registro
                this.verOcultarDivsParaActualizar();
                let buttonSaveFormProveedor =document.querySelector("#guardarDataProveedor");
                buttonSaveFormProveedor.dataset.action= "update";
                buttonSaveFormProveedor.value = registroId;
                buttonSaveFormProveedor.innerHTML = "Actualizar Registro";

              

               
            })
         })
       
         
    }


    verOcultarDivsParaActualizar= () =>
    {
        console.log("en veroxultar div")
        let navButtons = document.querySelectorAll(".navProveedor");
        let verocultarDatasetNav = JSON.parse(navButtons[0].dataset.hideformproveedor);

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


 }