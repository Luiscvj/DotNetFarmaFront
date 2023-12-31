import { opcCiudad } from "../Services/ciudad-service.js";
import { opcDepartamento } from "../Services/departamento-service.js";
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
        <div class="col-sm-6 p-2">
            <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${ciudad.nombre}</h5>
                        <p class="card-text"></p>
                        <a href="#" class="btn btn-warning updateCiudadButtons" id="${ciudad.ciudadId}">Editar</a>
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
        let responseDepartamentos = await opcDepartamento['GET']();
      //me trae todas las opciones sin necesidad de usar values y los paso a array
      let selectDepartamentosCiudad =  document.querySelector("#selectDepartamentos");
      console.log(selectDepartamentosCiudad.options[0]);

      if(selectDepartamentosCiudad.options[1] == undefined)
      {
        let i = 1;
        responseDepartamentos.forEach(departamento =>
            { 
                console.log("Primer entrada", departamento.nombre,"departamento Id", departamento.departamentoId);
                let optionDepartamento = document.createElement('option');
                optionDepartamento.innerHTML= `${departamento.nombre}`;
                optionDepartamento.value = departamento.departamentoId;
                selectDepartamentosCiudad.appendChild(optionDepartamento);
                console.log(selectDepartamentosCiudad.options[i].value);
                i++;
            });
      }
      else
      {
        for(let i = 1 ; i <=responseDepartamentos.length ; i++)
        {   console.log(responseDepartamentos.length, selectDepartamentosCiudad.options.length,i);
            let estado = false;
            let idDepartamentoSelect =0;
            if(responseDepartamentos.length == selectDepartamentosCiudad.options.length)
            {
               idDepartamentoSelect = parseInt(selectDepartamentosCiudad.options[i-1].value);
               console.log(idDepartamentoSelect);
               if(isNaN(idDepartamentoSelect))
               {
                continue;
               }
            }
            else if(responseDepartamentos.length > selectDepartamentosCiudad.options.length)
            {
                if((i-1) <= selectDepartamentosCiudad.options.length)
                {
                    idDepartamentoSelect = parseInt(selectDepartamentosCiudad.options[i-1].value); 
                    if(isNaN(idDepartamentoSelect))
                    {
                     continue;
                    }

                 estado = true;
                }
            }
            else
            {
                idDepartamentoSelect = parseInt(selectDepartamentosCiudad.options[i].value); 
         

            }  
            if(!estado)
           { 
                let optionToRemove = selectDepartamentosCiudad.querySelector(`option[value="${idDepartamentoSelect}"]`);
                console.log(optionToRemove);

                selectDepartamentosCiudad.removeChild(optionToRemove);
            }
            let optionDepartamento = document.createElement('option');
            optionDepartamento.innerHTML= `${responseDepartamentos[i-1].nombre}`;
            optionDepartamento.value = responseDepartamentos[i-1].departamentoId;
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
            this.CargaDepartamentoFrmCiudad();
          

           
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