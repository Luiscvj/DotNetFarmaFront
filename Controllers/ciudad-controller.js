import { opcCiudad } from "../Services/ciudad-service.js";
import { opc } from "../Services/departamento-service.js";
export class CiudadController
{
    constructor()
    {

    }

    GetCiudades= async () =>
    {
        let res = await opcCiudad['GET']();
        console.log(res)
        if(res == null) return console.log('Fallo en la consulta');
    
        let divListarCiudad = document.querySelector("#listarCiudad");
        let listCiudadHtml = '';
        res.forEach(ciudad => 
        {
               listCiudadHtml += this.CardCiudadHTML(ciudad);
    
        });
    
        divListarCiudad.innerHTML= listCiudadHtml;
        this.DeleteCiudad();
      
        this.UpdateViewToPUTCiudades(); 
    }
    CardCiudadHTML = (ciudad)=>
    {
        let cardCiudad = /* html */  
        `
        <div class="col-sm-6">
            <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${ciudad.nombre}</h5>
                        <p class="card-text"></p>
                        <a href="#" class="btn btn-warning updateCiudadButtons" id="${ciudad.ciudadId}">editar</a>
                        <a href="#" class="btn btn-danger deleteCiudad" id="${ciudad.ciudadId}">Eliminar</a>
                    </div>
            </div> 	  
        </div>
        `
        return cardCiudad;
    }



/* 
*POST de ciudades **********************************************
*/


    PostCiudad = async(data) =>
    {
      

        try
        {

        console.log("entrando a ciudad controller", data)
        await  opcCiudad['POST'](data);
        }catch(error)
        {
            console.error(error);
        }
    }

   
    CargaDepartamentoFrmCiudad = async() =>
    {  
        let responseDepartamentos = await opc['GET']();
      //me trae todas las opciones sin necesidad de usar values y los paso a array
      let selectDepartamentosCiudad =  document.querySelector("#selectDepartamentos");
      if(selectDepartamentosCiudad.options[1] == undefined)
      {
        responseDepartamentos.forEach(ciudad =>
            { 
                     let optionCiudad = document.createElement('option');
                      optionCiudad.innerHTML= `${ciudad.nombre}`;
                      optionDepartamento.value = ciudad.ciudadId;
                      selectDepartamentosCiudad.appendChild(optionDepartamento);
            });
      }
      else
      {
        for(let i = 1 ; i < responseDepartamentos.length ; i++)
        {
            let idDepartamentoSelect = parseInt(selectDepartamentosCiudad.options[i].value);
            let optionToRemove = selectDepartamentoesCiudad.querySelector(`option[value="${idDepartamentoSelect}"]`);
            console.log(optionToRemove);
            selectDepartamentosCiudad.removeChild(optionToRemove);
            let optionDepartamento = document.createElement('option');
            optionDepartamento.innerHTML= `${responseDepartamentos[i].nombre}`;
            optionDepartamento.value = responseDepartamentos[i].departamentoId;
            selectDepartamentosCiudad.appendChild(optionDepartamento);

        }
     
        /* for(let i = 1 ; i < responseDepartamentos.length ; i++)
        {
            let idDepartamentoSelect = parseInt(selectDepartamentosCiudad.options[i].value);
            let idDepartamentoDb= responseDepartamentos[i-1].departamentoId
              if(idDepartamentoSelect != idDepartamentoDb)
                    {
                        responseDepartamentos[idDepartamentoDb].departamento;
                       
                        let optionDepartamento = document.createElement('option');
                         optionDepartamento.innerHTML= `${.nombre}`;
                         optionDepartamento.value = departamento.departamentoId;
                         selectDepartamentosCiudad.appendChild(optionDepartamento);   
                         
                       
                    }
               
            
        } */
      }
                

          

            
           
    }


   
        

 /* 
*DELETE de ciudades **********************************************
*/
   

    DeleteCiudad = () =>
    {
        document.querySelectorAll(".deleteCiudad").forEach((val,id)=>
        {
            val.addEventListener("click", (e)=>
            {
                opcCiudad['DELETE'](e.target.id);
                setTimeout(() => {
                    this.GetCiudades();
                }, 500); 
            })
        })
    }

 /* 
*DELETE de ciudades **********************************************
*/

PutCiudad = (id,data)=>
{
    console.log("Entre a PUT de Ciudad");

    try
    {
        opcCiudad['PUT'](id,data)
    }catch(error)
    {
        console.error(error);
    }
}



UpdateViewToPUTCiudades = () =>
{   
     let registroId;
     document.querySelectorAll(".updateCiudadButtons").forEach((val,id)=>
     {
        val.addEventListener("click",(e)=>
        {
            registroId = e.target.id;//id de mi registro
            this.verOcultarDivsParaActualizar();
            let buttonSaveFormCiudad =document.querySelector("#guardarDataCiudad");
            buttonSaveFormCiudad.dataset.action= "update";
            buttonSaveFormCiudad.value = registroId;
            buttonSaveFormCiudad.innerHTML = "Actualizar Registro";
            this.CargaCiudadFrmCiudad();
          

           
        })
     })
   
     
}


verOcultarDivsParaActualizar= () =>
{
    console.log("en verocultar div")
    let navButtons = document.querySelectorAll(".navCiudad");
    let verocultarDatasetNav = JSON.parse(navButtons[0].dataset.hideformciudad)

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