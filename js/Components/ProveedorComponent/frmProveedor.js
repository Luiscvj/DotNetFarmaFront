import { ProveedorController } from "../../../Controllers/proveedor-controller.js";



class  ProveedorComponent extends HTMLElement
{
    constructor()
    {
        super();
        this.render();
        this.eventoOcultarRegListProveedor();
        this.guardarDataOrUpdate();
        this._proveedorController = new ProveedorController();
    }

    render = () =>
    {
        this.innerHTML =  /* html */
        `
      
  <div class="card-header" id="frmRegProveedor" style="margin: 50px; border-radius:10px "  >  
      <form id="formRegProveedor"  style="margin: 50px; border-radius:10px ;display : none">
            <div class="row">
                    <div class="col-sm-6" style ="padding: 4px" >
                        <input type="text" class="form-control" placeholder="Nombre" id="nombreProveedor" aria-label="First name"  required>
                    </div>
                    <div class="col-sm-6" style ="padding: 4px">
                        <input type="text" class="form-control" placeholder="Telefono" id="telefono" aria-label="Last name" required>
                    </div>
                    <div class="col-sm-6" style ="padding: 4px">
                        <input type="email" class="form-control" placeholder=" Email" id="email" aria-label="First name" required>
                    </div>
                    <div class="col-sm-6" style ="padding: 4px">
                        <input type="text" class="form-control" placeholder="Direccion" id="direccion" aria-label="Last name" required>
                    </div>
            </div>

            <div class="col-12" style ="padding: 10px">
                 <button type="button" id="guardarDataProveedor" data-action="save" class="btn btn-primary">Guardar Informacion</button>
            </div>
      </form>  




   <div class="row" id ="listProveedor" style="display: block">
        
    </div>
    
  </div>
  
        `
    }


eventoOcultarRegListProveedor = ()=>
{
    document.querySelectorAll(".navProveedor").forEach((val,id) =>
    {
        val.addEventListener("click", async (e)=>
        {
            let datos = JSON.parse(e.target.dataset.hideformproveedor);

            datos[0].forEach(divProveedor =>
                {
                    
                    let divVer = document.querySelector(divProveedor);
                    if(divProveedor.includes("listProveedor"))this._proveedorController.GetAllProveedor();
                    if(divProveedor.includes("formRegProveedor")) 
                    {
                        divVer.style.display = 'block';
                      
                    }else
                    {
                        
                                            
                    divVer.style.display = 'flex';

                    }
             
                    
                });
              
            datos[1].forEach(divProveedor =>
                {
                    
                    let divOcultar = document.querySelector(divProveedor);
                    divOcultar.style.display = 'none';
                })


        })
    })
}



guardarDataOrUpdate = async () => 
{
    let buttonFormRegProveedor = document.querySelector("#guardarDataProveedor");
    buttonFormRegProveedor.addEventListener("click", (e) =>
    { 
        let datasetButtonFormRegister = buttonFormRegProveedor.dataset.action;
        console.log(datasetButtonFormRegister);
        let frmSucursal = document.forms['formRegProveedor'];
        let Nombre =frmSucursal['nombreProveedor'];
        let Telefono =  frmSucursal['telefono'];
        let Email = frmSucursal['email'];
        let Direccion = frmSucursal['direccion'];
        let   Proveedor = 
        {
           proveedorId : 0,
           nombre : Nombre.value,
           telefono :Telefono.value,
           email : Email.value,
           direccion : Direccion.value
        };
       if(datasetButtonFormRegister =="save")
       {
            console.log("tengo proveedor", Proveedor);
            this._proveedorController.PostProveedor(Proveedor);
       }
       else if(datasetButtonFormRegister =="update")
       {   
            let idDelRegistro = parseInt(buttonFormRegProveedor.value);
            Proveedor.proveedorId= idDelRegistro;
            this._proveedorController.PutProveedor(idDelRegistro,Proveedor); 
            buttonFormRegProveedor.dataset.action="save";
           
       }
       buttonFormRegProveedor.innerHTML ="Guardar Informacion";
       Nombre.value = "";
       Telefono.value = "";
       Email.value = "";
       Direccion.value = "";

    })

}

}

customElements.define("frm-reglist-proveedor",ProveedorComponent);