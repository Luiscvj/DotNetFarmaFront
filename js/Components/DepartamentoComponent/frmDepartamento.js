import { DepartamentoController } from "../../../Controllers/departamento-controller.js";


class DepartamentoComponent extends HTMLElement
{
    constructor()
    {
        super();
        this.render();
        this.eventoMostrarDepartamentoFormularios();
        this.guardarDataOrUpdate();
        this._departamentoController = new DepartamentoController();
    }

    render = () =>
    {
        this.innerHTML = /* html */
        `
    <div class="card-header" id="frmRegDepartamento" style="margin: 50px; display: none; border-radius:10px "  >                
        <form class="row g-3 needs-validation"  id="frmRegistroDepartamento"  style="display:none">					
                        <div>										
                            <div class="row  align-items-center">
                                <div class="col">
                                    <select class="form-select" aria-label="Default select example" id="selectPaises">
                                        <option selected> Pais</option>
                                       
                                    </select>	
                                </div>
                                <div class="col">
                                     <input type="text" class="form-control" placeholder="Nombre Departamento" id="nombreDepartamento" aria-label="First name" required>
                                </div>         
                            </div>

                        </div>

                    <div class="col-12" style ="padding: 10px">
                        <button type="button" id="guardarDataDepartamento" data-action="save" class="btn btn-primary">Guardar Informacion</button>
                   </div>
        </form>			
   



    <div class="row" id="listarDepartamento" style="margin: 50px; display: none;  "  >                
         
    </div>
    </div>

        
        
        `
    }


    eventoMostrarDepartamentoFormularios = () =>
    {
            console.log("Hice click en navDEp")
            document.querySelectorAll(".navDepartamento").forEach((val,id) =>
            {
                val.addEventListener("click",(e)=>
                {
                    console.log("Hice click en navDEp")
                    let datosVerOcultar = JSON.parse(e.target.dataset.hideformdepartamento);
                   
                    datosVerOcultar[0].forEach(opcion => 
                        {
                            let divVer = document.querySelector(opcion);
                            if(opcion.includes("listarDepartamento"))
                            {   console.log("HOLAAA en listaraaaaa")
                                this._departamentoController.GetDepartamentos();
                                divVer.style.display = 'flex';
                                
                            }
                            
                             else if(opcion.includes("#frmRegDepartamento"))
                             {
                                divVer.style.display = 'block';
                                console.log("Cargando paises");
                                this._departamentoController.CargaPaisFrmDepartamento();
                             }else
                             {
                                divVer.style.display = 'block';
                             }


                        })
                    let divOcultar = document.querySelector(datosVerOcultar[1]);
                    divOcultar.style.display = 'none';
                })
            })
    }


    guardarDataOrUpdate = async () => 
    {   let selectIDPais = document.querySelector("#selectPaises");
        let buttonFormRegDepartamento = document.querySelector("#guardarDataDepartamento");
        buttonFormRegDepartamento.addEventListener("click", (e) =>
        { 
            let datasetButtonFormRegister = buttonFormRegDepartamento.dataset.action;
            let frmSucursal = document.forms['frmRegistroDepartamento'];
            let Nombre =frmSucursal['nombreDepartamento'];
    
            let   Departamento = 
            {
               departamentoId : 0,
               nombre : Nombre.value,
               paisId :selectIDPais.value,       
            };

           if(datasetButtonFormRegister =="save")
           {
                console.log("tengo departamento", Departamento);
                this._departamentoController.PostDepartamento(Departamento);
           }
           else if(datasetButtonFormRegister =="update")
           {   
                let idDelRegistro = parseInt(buttonFormRegDepartamento.value);
                Departamento.departamentoId= idDelRegistro;
                this._departamentoController.PutDepartamento(idDelRegistro,Departamento); 
                buttonFormRegDepartamento.dataset.action="save";
               
           }
           buttonFormRegDepartamento.innerHTML ="Guardar Informacion";
           Nombre.value = "";

        })
    
    }
}

customElements.define("frm-reglist-departamento",DepartamentoComponent);