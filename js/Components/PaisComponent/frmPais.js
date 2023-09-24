import { PaisController } from "../../../Controllers/pais-controller.js";


class PaisComponent extends HTMLElement
{
    constructor()
    {
        super();
        this.render();
        this.eventoMostrarPaisFormularios();
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
                                <input type="text" class="form-control" placeholder="Nombre Pais" aria-label="First name">
                                </div>
                            </div>					
                        </div>
        </form>			
    </div>



    <div class="row" id="listarPais" style="margin: 50px; display: none;  "  >                
         
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
                            divVer.style.display = 'block';
                            if(opcion.includes("listarPais"))
                             {   
                                this._paisController.listarPaises();
                             }


                        })
                    let divOcultar = document.querySelector(datosVerOcultar[1]);
                    divOcultar.style.display = 'none';
                })
            })
    }
}
customElements.define("frm-reglist-pais",PaisComponent)