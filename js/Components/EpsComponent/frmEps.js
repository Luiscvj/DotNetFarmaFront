import { EpsController } from "../../../Controllers/eps-controller.js";


class EpsComponent extends HTMLElement
{
    constructor()
    {
        super();
        this.render();
        this.eventoMostrarEpsFormularios();
        this._epsController = new EpsController();
    }

    render = ()=>
    {
        this.innerHTML = /* html */
        `

    <div class="card-header" id="frmRegEps" style="margin: 50px; display: block; border-radius:10px "  >                
        <form id="frmRegistroEps" >					
                        <div>										
                            <div class="row  align-items-center">
                                <div class="col">
                                <input type="text" class="form-control" placeholder="Nombre Eps" aria-label="First name">
                                </div>
                            </div>					
                        </div>
                        <div class="col-12" style ="padding: 10px">
                            <button type="submit" class="btn btn-primary">Guardar Informacion</button>
                        </div>
        </form>			
    </div>



    <div class="row" id="listarEps" style="margin: 50px; display: none;  "  >                
         
    </div>

        
        
        `
    }

    eventoMostrarEpsFormularios = () =>
    {
            document.querySelectorAll(".navEps").forEach((val,id) =>
            {
                val.addEventListener("click",(e)=>
                {
                    let datosVerOcultar = JSON.parse(e.target.dataset.verocultar);
                    datosVerOcultar[0].forEach(opcion => 
                        {
                            let divVer = document.querySelector(opcion);
                            divVer.style.display = 'block';
                            if(opcion.includes("listarEps"))
                             {   
                                this._epsController.listarEpses();
                             }


                        })
                    let divOcultar = document.querySelector(datosVerOcultar[1]);
                    divOcultar.style.display = 'none';
                })
            })
    }

    guardarData = () => 
    {
        let formEps = document.querySelector("#frmRegistroEps");
        formEps.addEventListener("submit", (e) =>
        {
            e.preventDefault();

            let data = Object.fromEntries( new FormData(e.target));//Aca pas todas las entradas de mi formulario
            this._EpsController.PostEps(data);
        })
    }

}
customElements.define("frm-reglist-eps",EpsComponent)