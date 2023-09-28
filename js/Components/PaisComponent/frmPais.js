import { PaisController } from "../../../Controllers/pais-controller.js";


class PaisComponent extends HTMLElement
{
    constructor()
    {
        super();
        this.render();
        this.eventoMostrarPaisFormularios();
        this.guardarDataOrUpdate();
        this._paisController = new PaisController();
    }

    render = ()=>
    {
        this.innerHTML = /* html */
        `

    <div class="card-header" id="frmRegPais" style="margin: 50px; display: block; border-radius:10px "  >                
        <form class="row g-3 needs-validation"  id="frmRegistroPais" >					
                        <div>										
                            <div class="row  align-items-center">
                                <div class="col">
                                <input type="text" class="form-control" placeholder="Nombre Pais" id="nombrePais" aria-label="First name" required>
                                </div>
                            </div>	

                        </div>

                    <div class="col-12" style ="padding: 10px">
                        <button type="button" id="guardarDataPais" data-action="save" class="btn btn-primary">Guardar Informacion</button>
                   </div>
        </form>			
        
        
        
                <div class="row" id="listarPais" style="margin: 50px; display: none;  "  >                
                
                </div>
        
        </div>
        
        
        `
    }

    eventoMostrarPaisFormularios = () =>
    {
            document.querySelectorAll(".navPais").forEach((val,id) =>
            {
                val.addEventListener("click",(e)=>
                {
                    let datosVerOcultar = JSON.parse(e.target.dataset.verocultar);
                    datosVerOcultar[0].forEach(opcion => 
                        {
                            let divVer = document.querySelector(opcion);
                           
                            if(opcion.includes("listarPais"))
                             {   
                                this._paisController.GetPaises();
                                divVer.style.display = 'flex';
                             }
                             else
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
    {
        let buttonFormRegPais = document.querySelector("#guardarDataPais");
        buttonFormRegPais.addEventListener("click", (e) =>
        { 
            let datasetButtonFormRegister = buttonFormRegPais.dataset.action;
            console.log(datasetButtonFormRegister);
            let frmSucursal = document.forms['frmRegistroPais'];
            let Nombre =frmSucursal['nombrePais'];
           
            let   Pais = 
            {
               paisId : 0,
               nombre : Nombre.value,
              
            };
           if(datasetButtonFormRegister =="save")
           {
              
                this._paisController.PostPaises(Pais);
           }
           else if(datasetButtonFormRegister =="update")
           {   
                let idDelRegistro = parseInt(buttonFormRegPais.value);
                Pais.paisId= idDelRegistro;
                this._paisController.PutPais(idDelRegistro,Pais); 
                buttonFormRegPais.dataset.action="save";
               
           }
           buttonFormRegPais.innerHTML ="Guardar Informacion";
           Nombre.value = "";
       
    
        })
    
    }

}
customElements.define("frm-reglist-pais",PaisComponent)