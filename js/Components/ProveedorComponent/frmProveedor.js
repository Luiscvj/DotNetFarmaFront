import { ProveedorController } from "../../../Controllers/proveedor-controller";
class  ProveedorComponent extends HTMLElement
{
    constructor()
    {
        super();
        this.render();
        this.eventoOcultarRegListProveedor();
        this._proveedorController = new ProveedorController();
    }

    render = () =>
    {
        this.innerHTML =  /* html */
        `
      
  <div class="card-header" id="frmRegProveedor" style="margin: 50px; display: block; border-radius:10px "  >  
      <form id="formRegPais">
            <div class="row">
                    <div class="col-sm-4" style ="padding: 4px" >
                        <input type="text" class="form-control" placeholder="Nombre" aria-label="First name"  required>
                    </div>
                    <div class="col-sm-4" style ="padding: 4px">
                        <input type="text" class="form-control" placeholder="Telefono" aria-label="Last name" required>
                    </div>
                    <div class="col-sm-4" style ="padding: 4px">
                        <input type="email" class="form-control" placeholder=" Email" aria-label="First name" required>
                    </div>
                    <div class="col-sm-5" style ="padding: 4px">
                        <input type="text" class="form-control" placeholder="Direccion" aria-label="Last name" required>
                    </div>
            </div>

            <div class="col-12" style ="padding: 10px">
                 <button type="submit" class="btn btn-primary">Guardar Informacion</button>
            </div>
      </form>  
  </div>



    <div class="row" id ="listProveedor">
        <div class="col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
        </div>
    <div class="col-sm-6">
            <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
        </div>
    </div>
    
  
  
        `
    }


eventoOcultarRegListProveedor = ()=>
{
    document.querySelectorAll(".navProveedor").forEach((val,id) =>
    {
        val.addEventListener("click", (e)=>
        {
            let datos = JSON.parse(e.target.dataset.hideformproveedor);

            datos[0].forEach(divProveedor =>
                {
                    console.log(divProveedor);
                    let divVer = document.querySelector(divProveedor);
                    divVer.style.display = 'block';

                });
            datos[1].forEach(divProveedor =>
                {
                    console.log(divProveedor);
                    let divOcultar = document.querySelector(divProveedor);
                    divOcultar.style.display = 'none';
                })


        })
    })
}



guardarData = () => 
{
    let formRegProveedor = document.querySelector("#formRegPais");
    formRegProveedor.addEventListener("submit", (e) =>
    {
        e.preventDefault();

        let data = Object.fromEntries( new FormData(e.target));//Aca pas todas las entradas de mi formulario
        this._proveedorController.PostProveedor(data);
    })
}

}

customElements.define("frm-reglist-proveedor",ProveedorComponent);