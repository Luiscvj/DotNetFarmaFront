import { opcEmpleado } from "../Services/empleado-service.js";

export class EmpleadoController
 {
    constructor()
    {
        this.URL_API__ARL = 'http://localhost:5000/api/Arl';
        this.URL_API__CIUDAD = 'http://localhost:5000/api/Ciudad/all';
        this.URL_API_EPS = 'http://localhost:5000/api/Eps/all';
        this.URL_API_CARGO = 'http://localhost:5000/api/Cargo';
        this.Header =
        {
          headers:  new Headers
                    ({
                        "Content-Type" : "application/json"
                    })
        };

        this.arlSelect = document.querySelector("#arlSelect");
        this.ciudadSelect = document.querySelector("#ciudadSelect");
        this.epsSelect = document.querySelector("#epsSelect");
        this.cargoSelect = document.querySelector("#cargoSelect");
        this.ArraySelects = [];

    }
   
/* 
*POST de Empleadoes **********************************************
*/
    PostEmpleado = async (data) =>
    {
        try
        {console.log(data);  
            await opcEmpleado['POST'](data);
        }catch(error)
        {
            console.error(error);
        }
    }


/* 
*GET de Empleadoes **********************************************
*/

    GetEmpleado = async () =>
{
    let res = await opcEmpleado['GET']();
    console.log(res)
    if(res == null) return console.log('Fallo en la consulta');

    let divListarEmpleado = document.querySelector("#listarEmpleados");
    let listEmpleadoHtml = '';
    res.forEach(Empleado => 
    {
           listEmpleadoHtml += this.CartaEmpleadoHTML(Empleado);

    });

    divListarEmpleado.innerHTML= listEmpleadoHtml;

    this.DeleteEmpleado();
    this.UpdateViewToPUTEmpleado();
}


CartaEmpleadoHTML = (empleado)=>
{
    let cardEmpleado = /* html */  
    `
    <div class="col-sm-6 p-2">
        <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${empleado.nombres}</h5>
                    <p class="card-text">empleadoCargo</p>
                    <a href="#" class="btn btn-warning updateEmpleadoButtons" id="${empleado.empleadoId}">editar</a>
                    <a href="#" class="btn btn-danger deleteEmpleado" id="${empleado.empleadoId}">Eliminar</a>
                </div>
        </div> 	  
    </div>
    `
    return cardEmpleado;
}



    cargaSelectEmpleado= async () => 
    {       
        if(!(this.epsSelect.options[1] == undefined))
        {
            this.ArraySelects.push(this.arlSelect,this.epsSelect,this.cargoSelect,this.ciudadSelect);

            this.DeleteSelects();
            
        }
        
        
        const config =
        {
            method : 'GET',
            headers: this.Header.headers
        }

        
        let responseArl = await  (await fetch(`${this.URL_API__ARL}`,config)).json();
        let responseCiudad = await  (await fetch(`${this.URL_API__CIUDAD}`,config)).json();
        let responseEps = await  (await fetch(`${this.URL_API_EPS}`,config)).json();
        let responseCargo = await  (await fetch(`${this.URL_API_CARGO}`,config)).json();
        
        console.log(responseEps);
        responseArl.forEach(arl=>
            {   
                let optionArl = document.createElement('option');
                optionArl.innerHTML=`${arl.nombre}`;
                optionArl.value = arl.arlId;
                this.arlSelect.appendChild(optionArl);
            })
        
        responseCiudad.forEach(ciudad=>
            {
                let optionCiudad = document.createElement('option');
                optionCiudad.innerHTML=`${ciudad.nombre}`;
                optionCiudad.value = ciudad.ciudadId;
                this.ciudadSelect.appendChild(optionCiudad);
            })
        responseEps.forEach(eps => 
            {
                let optionEps = document.createElement('option');
                optionEps.innerHTML =`${eps.nombre}`;
                optionEps.value = eps.epsId;
                this.epsSelect.appendChild(optionEps);
            })
        responseCargo.forEach(cargo => 
            {
                let optionCargo = document.createElement('option');
                optionCargo.innerHTML =`${cargo.nombre}`;
                optionCargo.value = cargo.cargoId;
                this.cargoSelect.appendChild(optionCargo);
            })
        



        

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
 


    DeleteEmpleado = () => 
    {
        document.querySelectorAll(".deleteEmpleado").forEach((val,id)=>
        {
            val.addEventListener("click",(e)=>
            {
                opcEmpleado['DELETE'](e.target.id).then(()=>
                {
                    this.GetEmpleado();
                })

            })
        })
    }


 /*   
*PUT de Empleado **********************************************
*/
    PutEmpleado = (id,data)=>
    {
        console.log("Entre a PUT de Empleado");

        try
        {
            opcEmpleado['PUT'](id,data)
        }catch(error)
        {
            console.error(error);
        }
    }



    UpdateViewToPUTEmpleado = () =>
    {let registroId;
         document.querySelectorAll(".updateEmpleadoButtons").forEach((val,id)=>
         {
            val.addEventListener("click",(e)=>
            {
                registroId = e.target.id;//id de mi registro
                this.verOcultarDivsParaActualizar();
                this.cargaSelectEmpleado();
                let buttonSaveFormProveedor =document.querySelector("#guardarDataEmpleado");
                buttonSaveFormProveedor.dataset.action= "update";
                buttonSaveFormProveedor.value = registroId;
                buttonSaveFormProveedor.innerHTML = "Actualizar Registro";

              

               
            })
         })
       
         
    }


    verOcultarDivsParaActualizar= () =>
    {
        console.log("en verocultar div")
        let navButtons = document.querySelectorAll(".navEmpleado");
        let verocultarDatasetNav = JSON.parse(navButtons[0].dataset.hideformempleado);

        verocultarDatasetNav[0].forEach(idDivVer =>
            {
                let divVer = document.querySelector(idDivVer);
                console.log(divVer);
                divVer.style.display = 'flex';
            })
        verocultarDatasetNav[1].forEach(idDivOcultar =>
            {
                let divOcultar = document.querySelector(idDivOcultar);
                divOcultar.style.display = 'none';
            })
    }



    
}