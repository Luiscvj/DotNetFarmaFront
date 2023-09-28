import { opcDepartamento } from "../Services/departamento-service.js";
import { opc } from "../Services/pais-service.js";
export class DepartamentoController
{
    constructor()
    {

    }

    GetDepartamentos= async () =>
    {
        let res = await opcDepartamento['GET']();
        console.log(res)
        if(res == null) return console.log('Fallo en la consulta');
    
        let divListarDepartamento = document.querySelector("#listarDepartamento");
        let listDepartamentoHtml = '';
        res.forEach(departamento => 
        {
               listDepartamentoHtml += this.CardDepartamentoHTML(departamento);
    
        });
    
        divListarDepartamento.innerHTML= listDepartamentoHtml;
        this.DeleteDepartamento();
      
        this.UpdateViewToPUTDepartamentoes(); 
    }
    CardDepartamentoHTML = (departamento)=>
    {
        let cardDepartamento = /* html */  
        `
        <div class="col-sm-6 p-2">
            <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${departamento.nombre}</h5>
                        <p class="card-text"></p>
                        <a href="#" class="btn btn-warning updateDepartamentoButtons" id="${departamento.departamentoId}">editar</a>
                        <a href="#" class="btn btn-danger deleteDepartamento" id="${departamento.departamentoId}">Eliminar</a>
                    </div>
            </div> 	  
        </div>
        `
        return cardDepartamento;
    }



/* 
*POST de departamentos **********************************************
*/


    PostDepartamento = async(data) =>
    {
      

        try
        {

        console.log("entrando a departamento controller", data)
        await  opcDepartamento['POST'](data);
        }catch(error)
        {
            console.error(error);
        }
    }

   
    CargaPaisFrmDepartamento = async() =>
    {  
        let responsePaises = await opc['GET']();
      //me trae todas las opciones sin necesidad de usar values y los paso a array
      let selectPaisesDepartamento =  document.querySelector("#selectPaises");
      console.log(selectPaisesDepartamento.options[0]);
    
      if(selectPaisesDepartamento.options[1] == undefined)
      {
        let i =1;
        responsePaises.forEach(pais =>
            {        
                      console.log("Primer entrada", pais.nombre,"pais Id", pais.paisId);
                      let optionPais = document.createElement('option');
                      optionPais.innerHTML= `${pais.nombre}`;
                      optionPais.value = pais.paisId;
                      selectPaisesDepartamento.appendChild(optionPais);
                      console.log(selectPaisesDepartamento.options[i].value);
                      i++;
            });
        
      }
      else
      {
        for(let i = 1 ; i <=responsePaises.length ; i++)
        {   console.log(responsePaises.length, selectPaisesDepartamento.options.length,i);
            let estado = false;
            let idPaisSelect =0;
            if(responsePaises.length == selectPaisesDepartamento.options.length)
            {
               idPaisSelect = parseInt(selectPaisesDepartamento.options[i-1].value);
               console.log(idPaisSelect);
               if(isNaN(idPaisSelect))
               {
                continue;
               }
            }
            else if(responsePaises.length > selectPaisesDepartamento.options.length)
            {
                if((i-1) <= selectPaisesDepartamento.options.length)
                {
                    idPaisSelect = parseInt(selectPaisesDepartamento.options[i-1].value); 
                    if(isNaN(idPaisSelect))
                    {
                     continue;
                    }

                 estado = true;
                }
            }
            else
            {
                idPaisSelect = parseInt(selectPaisesDepartamento.options[i].value); 
         

            }  
            if(!estado)
           { 
                let optionToRemove = selectPaisesDepartamento.querySelector(`option[value="${idPaisSelect}"]`);
                console.log(optionToRemove);

                selectPaisesDepartamento.removeChild(optionToRemove);
            }
            let optionPais = document.createElement('option');
            optionPais.innerHTML= `${responsePaises[i-1].nombre}`;
            optionPais.value = responsePaises[i-1].paisId;
            selectPaisesDepartamento.appendChild(optionPais);

        }
     
        /* for(let i = 1 ; i < responsePaises.length ; i++)
        {
            let idPaisSelect = parseInt(selectPaisesDepartamento.options[i].value);
            let idPaisDb= responsePaises[i-1].paisId
              if(idPaisSelect != idPaisDb)
                    {
                        responsePaises[idPaisDb].pais;
                       
                        let optionPais = document.createElement('option');
                         optionPais.innerHTML= `${.nombre}`;
                         optionPais.value = pais.paisId;
                         selectPaisesDepartamento.appendChild(optionPais);   
                         
                       
                    }
               
            
        } */
      }
                

          

            
           
    }


   
        

 /* 
*DELETE de departamentos **********************************************
*/
   

    DeleteDepartamento = () =>
    {
        document.querySelectorAll(".deleteDepartamento").forEach((val,id)=>
        {
            val.addEventListener("click", (e)=>
            {
                opcDepartamento['DELETE'](e.target.id).then(()=>
                {
                    this.GetDepartamentos();
                })
                
                
            })
        })
    }

 /* 
*DELETE de departamentos **********************************************
*/

PutDepartamento = (id,data)=>
{
    console.log("Entre a PUT de Departamentoe");

    try
    {
        opcDepartamento['PUT'](id,data)
    }catch(error)
    {
        console.error(error);
    }
}



UpdateViewToPUTDepartamentoes = () =>
{   
     let registroId;
     document.querySelectorAll(".updateDepartamentoButtons").forEach((val,id)=>
     {
        val.addEventListener("click",(e)=>
        {
            registroId = e.target.id;//id de mi registro
            this.verOcultarDivsParaActualizar();
            let buttonSaveFormDepartamento =document.querySelector("#guardarDataDepartamento");
            buttonSaveFormDepartamento.dataset.action= "update";
            buttonSaveFormDepartamento.value = registroId;
            buttonSaveFormDepartamento.innerHTML = "Actualizar Registro";
            this.CargaPaisFrmDepartamento();
          

           
        })
     })
   
     
}


verOcultarDivsParaActualizar= () =>
{
    console.log("en verocultar div")
    let navButtons = document.querySelectorAll(".navDepartamento");
    let verocultarDatasetNav = JSON.parse(navButtons[0].dataset.hideformdepartamento)

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