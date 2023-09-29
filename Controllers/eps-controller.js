
import { opcEps } from "../Services/eps-service.js";

export class EpsController
 {
    constructor(){}

/* 
*POST de epses **********************************************
*/
    PostEps = async (data) =>
    {
        try
        {console.log(data);  
            await opcEps['POST'](data);
        }catch(error)
        {
            console.error(error);
        }
    }
/* 
*GET de Epses **********************************************
*/

    GetAllEps = async() =>
    {
        let response = await opcEps['GET']();
        let listEpsHTML = '';
        let divListEps = document.querySelector("#listEps")
        console.log("en Get ALL")
        response.forEach(eps =>
            {
                    listEpsHTML +=this.CargarEps(eps); 
            })
        
        divListEps.innerHTML=listEpsHTML;
        this.DeleteEpses();
        this.UpdateViewToPUTEpses();
    }


    CargarEps = (eps) =>
    {
        let listEpsHTML = '';

        listEpsHTML = /* html */
        `
        <div class="col-sm-6 p-2">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${eps.nombre}</h5>
                    <p class="card-text">${eps.email}</p>
                    <p class="card-text">${eps.direccion}</p>       
                    <a href="#" class="btn btn-warning updateEpsButtons" id="${eps.epsId}">Editar</a>
                    <a href="#" class="btn btn-danger deleteEps" id="${eps.epsId}">Eliminar</a>
                </div>
            </div>
        </div>   
        `

        return listEpsHTML;
    }

/* 
*DELETE de epses **********************************************
*/

    DeleteEpses =  () =>
    {
         document.querySelectorAll(".deleteEps").forEach((val,id)=>
        {
            val.addEventListener("click", (e)=>
            {

                opcEps['DELETE'](e.target.id);
                setTimeout(() => {
                    this.GetAllEps();
                }, 1000);
                


            });
        });
    }
/* 
*PUT de Epses **********************************************
*/
    PutEps = (id,data)=>
    {
        console.log("Entre a PUT de Epses");

        try
        {
            opcEps['PUT'](id,data)
        }catch(error)
        {
            console.error(error);
        }
    }



    UpdateViewToPUTEpses = () =>
    {let registroId;
         document.querySelectorAll(".updateEpsButtons").forEach((val,id)=>
         {
            val.addEventListener("click",(e)=>
            {
                 registroId = e.target.id;//id de mi registro
                this.verOcultarDivsParaActualizar();
                let buttonSaveFormEps =document.querySelector("#guardarDataEps");
                buttonSaveFormEps.dataset.action= "update";
                buttonSaveFormEps.value = registroId;
                buttonSaveFormEps.innerHTML = "Actualizar Registro";

              

               
            })
         })
       
         
    }


    verOcultarDivsParaActualizar= () =>
    {
        console.log("en veroxultar div")
        let navButtons = document.querySelectorAll(".navEps");
        let verocultarDatasetNav = JSON.parse(navButtons[0].dataset.hideformeps);

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