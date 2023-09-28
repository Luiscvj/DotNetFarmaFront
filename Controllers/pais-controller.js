import {opc} from '../Services/pais-service.js';

export class PaisController
{
        constructor()
        {
        }

/* 
*GET de paises **********************************************
*/

GetPaises = async () =>
{
    let res = await opc['GET']();
    console.log(res)
    if(res == null) return console.log('Fallo en la consulta');

    let divListarPais = document.querySelector("#listarPais");
    let listPaisHtml = '';
    res.forEach(pais => 
    {
           listPaisHtml += this.CartaPaisHTML(pais);

    });

    divListarPais.innerHTML= listPaisHtml;

    this.DeletePaises();
    this.UpdateViewToPUTPaises();
}


CartaPaisHTML = (pais)=>
{
    let cardPais = /* html */  
    `
    <div class="col-sm-6 p-2">
        <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${pais.nombre}</h5>
                    <p class="card-text"></p>
                    <a href="#" class="btn btn-warning updatePaisButtons" id="${pais.paisId}">editar</a>
                    <a href="#" class="btn btn-danger deletePais" id="${pais.paisId}">Eliminar</a>
                </div>
        </div> 	  
    </div>
    `
    return cardPais;
}


/* 
*POST de paises **********************************************
*/


PostPaises = async(data) =>
{
    try
    {
        console.log("entrando a pais controlle", data)
       await  opc['POST'](data);
    }catch(error)
    {
        console.error(error);
    }
}

/* 
*DELETE de paises **********************************************
*/

DeletePaises = () =>
{
    document.querySelectorAll(".deletePais").forEach((val,id)=>
    {
        val.addEventListener("click", (e)=>
        {

            opc['DELETE'](e.target.id).then(()=>
            {
                this.GetPaises();
            })
                
         
            


        });
    });
}



 /*
*PUT de paises **********************************************
*/
    PutPais = (id,data)=>
    {
        console.log("Entre a PUT de Paises");

        try
        {
            opc['PUT'](id,data)
        }catch(error)
        {
            console.error(error);
        }
    }



    UpdateViewToPUTPaises = () =>
    {    
         let registroId;
         document.querySelectorAll(".updatePaisButtons").forEach((val,id)=>
         {
            val.addEventListener("click",(e)=>
            {
                 registroId = e.target.id;//id de mi registro
                this.verOcultarDivsParaActualizar();
                let buttonSaveFormPais =document.querySelector("#guardarDataPais");
                buttonSaveFormPais.dataset.action= "update";
                buttonSaveFormPais.value = registroId;
                buttonSaveFormPais.innerHTML = "Actualizar Registro";

              

               
            })
         })
       
         
    }


    verOcultarDivsParaActualizar= () =>
    {
        console.log("en verocultar div")
        let navButtons = document.querySelectorAll(".navPais");
        let verocultarDatasetNav = JSON.parse(navButtons[0].dataset.verocultar);

        verocultarDatasetNav[0].forEach(idDivVer =>
            {
                let divVer = document.querySelector(idDivVer);
                console.log(divVer);
                divVer.style.display = 'block';
            })
        let divOcultar = document.querySelector(verocultarDatasetNav[1]);
        divOcultar.style.display = 'none';
           
    }




}


