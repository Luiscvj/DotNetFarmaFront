import { CiudadController } from "../../../Controllers/ciudad-controller.js";


class CiudadComponent extends HTMLElement
{
    constructor()
    {
        super();
        this.render();
        this.eventoMostrarCiudadFormularios();
        this.guardarDataOrUpdate();
        this._ciudadController = new CiudadController();
    }

    render = () =>
    {
        this.innerHTML = /* html */
        `
    <div class="card-header" id="frmRegCiudad" style="margin: 50px; display: none; border-radius:10px "  >                
        <form class="row g-3 needs-validation"  id="frmRegistroCiudad" >					
                        <div>										
                            <div class="row  align-items-center">
                                <div class="col">
                                    <select class="form-select" aria-label="Default select example" id="selectDepartamentos">
                                        <option selected> Departamento</option>
                                       
                                    </select>	
                                </div>
                                <div class="col">
                                     <input type="text" class="form-control" placeholder="Nombre Ciudad" id="nombre" aria-label="First name" required>
                                </div>         
                            </div>

                        </div>

                    <div class="col-12" style ="padding: 10px">
                        <button type="button" id="guardarDataCiudad" data-action="save" class="btn btn-primary">Guardar Informacion</button>
                   </div>
        </form>			
    </div>



    <div class="row" id="listarCiudad" style="margin: 50px; display: none;  "  >                
         
    </div>

        
        
        `
    }


    eventoMostrarCiudadFormularios = () =>
    {
            console.log("Hice click en navCiudad")
            document.querySelectorAll(".navCiudad").forEach((val,id) =>
            {
                val.addEventListener("click",(e)=>
                {
                    console.log("Hice click en navCiudad")
                    let datosVerOcultar = JSON.parse(e.target.dataset.hideformciudad);
                   
                    datosVerOcultar[0].forEach(opcion => 
                        {
                            let divVer = document.querySelector(opcion);
                            divVer.style.display = 'block';
                            if(opcion.includes("listarCiudad"))
                             {   
                                this._ciudadController.GetCiudads();

                             }

                             else if(opcion.includes("#frmRegCiudad"))
                             {
                                console.log("Cargando departamentos");
                                this._ciudadController.CargaDepartamentoFrmCiudad();
                             }


                        })
                    let divOcultar = document.querySelector(datosVerOcultar[1]);
                    divOcultar.style.display = 'none';
                })
            })
    }


    guardarDataOrUpdate = async () => 
    {   let selectIDDepartamento = document.querySelector("#selectDepartamentos");
        let buttonFormRegCiudad = document.querySelector("#guardarDataCiudad");
        buttonFormRegCiudad.addEventListener("click", (e) =>
        { 
            let datasetButtonFormRegister = buttonFormRegCiudad.dataset.action;
            let frmSucursal = document.forms['frmRegistroCiudad'];
            let Nombre =frmSucursal['nombre'];
    
            let   Ciudad = 
            {
               ciudadId : 0,
               nombre : Nombre.value,
               ciudadId :selectIDDepartamento.value,       
            };

           if(datasetButtonFormRegister =="save")
           {
                console.log("tengo ciudad", Ciudad);
                this._ciudadController.PostCiudad(Ciudad);
           }
           else if(datasetButtonFormRegister =="update")
           {   
                let idDelRegistro = parseInt(buttonFormRegCiudad.value);
                Ciudad.ciudadId= idDelRegistro;
                this._ciudadController.PutCiudad(idDelRegistro,Ciudad); 
                buttonFormRegCiudad.dataset.action="save";
               
           }
           buttonFormRegCiudad.innerHTML ="Guardar Informacion";
           Nombre.value = "";

        })
    
    }
}

customElements.define("frm-reglist-ciudad",CiudadComponent);