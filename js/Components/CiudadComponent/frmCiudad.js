import { CiudadController } from "../../../Controllers/ciudad-controller.js";


class CiudadComponent extends HTMLElement
{
    constructor()
    {
        super();
        this.render();
        this.eventoMostrarCiudadFormularios();
        this._ciudadController = new CiudadController();
    }

    render = ()=>
    {
        this.innerHTML = /* html */
        `

    <div class="card-header" id="frmRegCiudad" style="margin: 50px; display: block; border-radius:10px "  >                
        <form id="frmRegistroCiudad" >					
                        <div>										
                            <div class="row  align-items-center">
                                <div class="col">
                                <input type="text" class="form-control" placeholder="Nombre Ciudad" aria-label="First name">
                                </div>
                            </div>					
                        </div>
                        <div class="col-12" style ="padding: 10px">
                            <button type="submit" class="btn btn-primary">Guardar Informacion</button>
                        </div>
        </form>			
    </div>



    <div class="row" id="listarCiudad" style="margin: 50px; display: none;  "  >                
         
    </div>

        
        
        `
    }

    eventoMostrarCiudadFormularios = () =>
    {
            document.querySelectorAll(".navCiudad").forEach((val,id) =>
            {
                val.addEventListener("click",(e)=>
                {
                    let datosVerOcultar = JSON.parse(e.target.dataset.verocultar);
                    datosVerOcultar[0].forEach(opcion => 
                        {
                            let divVer = document.querySelector(opcion);
                            divVer.style.display = 'block';
                            if(opcion.includes("listarCiudad"))
                             {   
                                this._ciudadController.listarCiudades();
                             }


                        })
                    let divOcultar = document.querySelector(datosVerOcultar[1]);
                    divOcultar.style.display = 'none';
                })
            })
    }

    guardarData = () => 
    {
        let formCiudad = document.querySelector("#frmRegistroCiudad");
        formCiudad.addEventListener("submit", (e) =>
        {
            e.preventDefault();

            let data = Object.fromEntries( new FormData(e.target));//Aca pas todas las entradas de mi formulario
            this._CiudadController.PostCiudad(data);
        })
    }

}
customElements.define("frm-reglist-ciudad",CiudadComponent)