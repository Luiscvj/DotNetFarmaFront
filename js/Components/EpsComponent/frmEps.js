import { EpsController } from "../../../Controllers/eps-controller.js";



class EpsComponent extends HTMLElement
{
    constructor()
    {
        super();
        this.render();
        this.eventoOcultarRegListEps();
        this.guardarDataOrUpdate();
        this._epsController = new EpsController();
    }

    render = ()=>
    {
        this.innerHTML = /* html */
        `

    <div class="card-header" id="frmRegEps" style="margin: 50px; display: block; border-radius:10px "  >                
            <form id="formRegEps">
                <div class="row">
                        <div class="col-sm-4" style ="padding: 4px" >
                            <input type="text" class="form-control" placeholder="Nombre" id="nombre" aria-label="First name"  required>
                        </div>
                        <div class="col-sm-4" style ="padding: 4px">
                            <input type="text" class="form-control" placeholder="Telefono" id="telefono" aria-label="Last name" required>
                        </div>
                        <div class="col-sm-4" style ="padding: 4px">
                            <input type="email" class="form-control" placeholder="Email" id="email" aria-label="First name" required>
                        </div>
                        <div class="col-sm-5" style ="padding: 4px">
                            <input type="text" class="form-control" placeholder="Direccion" id="direccion" aria-label="Last name" required>
                        </div>
                </div>

                <div class="col-12" style ="padding: 10px">
                    <button type="button" id="guardarDataEps" data-action="save" class="btn btn-primary">Guardar Informacion</button>
                </div>
            </form>  		
    </div>



    <div class="row" id="listEps" style="display: none">                
         
    </div>

        
        
        `
    }

    eventoOcultarRegListEps = ()=>
    {
        document.querySelectorAll(".navEps").forEach((val,id) =>
        {
            val.addEventListener("click", async (e)=>
            {
                let datos = JSON.parse(e.target.dataset.hideformeps);

                datos[0].forEach(divEps =>
                    {
                        
                        let divVer = document.querySelector(divEps);
                        if(divEps.includes("listEps"))this._epsController.GetAllEps();
                            
                                                
                        divVer.style.display = 'block';
                        
                    });
                
                datos[1].forEach(divEps =>
                    {
                        
                        let divOcultar = document.querySelector(divEps);
                        divOcultar.style.display = 'none';
                    })


            })
        })
    }


    guardarDataOrUpdate = async () => 
    {
        let buttonFormRegEps = document.querySelector("#guardarDataEps");
        buttonFormRegEps.addEventListener("click", (e) =>
        { 
            let datasetButtonFormRegister = buttonFormRegEps.dataset.action;
            console.log(datasetButtonFormRegister);
            let frmEps = document.forms['formRegEps'];
            let Nombre =frmEps['nombre'];
            let Telefono =  frmEps['telefono'];
            let Email = frmEps['email'];
            let Direccion = frmEps['direccion'];
            let   Eps = 
            {
            epsId : 0,
            nombre : Nombre.value,
            telefono :Telefono.value,
            email : Email.value,
            direccion : Direccion.value
            };
        if(datasetButtonFormRegister =="save")
        {
                console.log("tengo eps", Eps);
                this._epsController.PostEps(Eps);
        }
        else if(datasetButtonFormRegister =="update")
        {   
                let idDelRegistro = parseInt(buttonFormRegEps.value);
                Eps.epsId= idDelRegistro;
                this._epsController.PutEps(idDelRegistro,Eps); 
                buttonFormRegEps.dataset.action="save";
            
        }
        buttonFormRegEps.innerHTML ="Guardar Informacion";
        Nombre.value = "";
        Telefono.value = "";
        Email.value = "";
        Direccion.value = "";

        })

    }

}
customElements.define("frm-reglist-eps",EpsComponent)