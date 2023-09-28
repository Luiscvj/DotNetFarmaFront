import { MedicamentoController } from "../../../Controllers/medicamento-controller.js";
import { opcMedicamento } from "../../../Services/medicamento-service.js";
class MedicamentoComponent extends HTMLElement
{
    constructor()
    {
        super();
        this.render();
        this.eventoMostrarMedicamentoFormularios();
        this.eventoChangeSelectMedicamento();
        this._medicamentoController = new MedicamentoController();

        /* Varibales del formulario por facilidad */
        this.frmMedicamento = document.forms['frmRegMedicamento'];
        this.NombreMedicamento =this.frmMedicamento['nombre'];
        this.CantidadMedicamento =this.frmMedicamento['cantidad'];
        this.PrecioMedicamento =this.frmMedicamento['precio'];
        this.FechaExpiracion =this.frmMedicamento['fechaExpiracion'];
        this.FechaCompra =this.frmMedicamento['fechaCompra'];
        this.Proveedor =this.frmMedicamento['selectProveedorMedicamento'];




    }

    render = () =>
    {
        this.innerHTML = /* html */ 
        `
            
		<div class="card" id="cardMedicamento" style="display:none">
                <div class="card-header">
                    <select class="form-select" id="selectMedicamentoCompra" aria-label="Default select example">
                        <option selected>Escoge existente</option>
        
                    </select>
                </div>


                <div class="card-body">
                        <form class="row g-3" id="frmRegMedicamento">
                            <div class="col-md-6">
                                <label for="inputEmail4" class="form-label">Nombre</label>
                                <input type="text" class="form-control" id="nombre">
                            </div>
                            <div class="col-3">
                                <label for="inputAddress" class="form-label">Cantidad</label>
                                <input type="number" min="0"  class="form-control" id="cantidad" placeholder="1234 Main St">
                            </div>
                            <div class="col-md-3">
                                <label for="inputPassword4" class="form-label">Precio</label>
                                <input type="number" step="0.001" min="0" class="form-control" id="precio">
                            </div>
                            <div class="col-6">
                                <label for="inputAddress2" class="form-label">Fecha Expircaion</label>
                                <input type="date" class="form-control" id="fechaExpiracion" placeholder="Apartment, studio, or floor">
                            </div>
                            <div class="col-md-6">
                                <label for="inputCity" class="form-label">Fecha Compra</label>
                                <input type="date" class="form-control" id="fechaCompra">
                            </div>
                            <div class="col-md-4">
                                <label for="inputState" class="form-label">Proveedor</label>
                                <select id="selectProveedorMedicamento" class="form-select">
                                    <option selected>Choose...</option>
                                </select>
                            </div>
                            
                            
                            <div class="col-12">
                                <button type="button" data-action="save" class="btn btn-primary" id="guardarDataMedicamento">Sign in</button>
                            </div>
                        </form>
                </div>

        </div>


        <div class="card-header" id="cardHeaderMedicamento" style="margin: 50px; display: none;"  > 
                <div class="row"  id="listarMedicamento" style="display:block">


                </div>
        </div>
    </div>
        `
    }

    eventoMostrarMedicamentoFormularios = () =>
    {
            document.querySelectorAll(".navMedicamento").forEach((val,id) =>
            {
                val.addEventListener("click",(e)=>
                {
                    let datosVerOcultar = JSON.parse(e.target.dataset.hideformempleado);
                    datosVerOcultar[0].forEach(opcion => 
                        {
                            let divVer = document.querySelector(opcion);
                            divVer.style.display ='flex';
                            console.log(divVer.style.display);
                            if(opcion.includes("listarMedicamento"))
                             {   
                                this._medicamentoController.GetAllMedicamento();
                               // this._empleadoController.DeleteEmpleado();
                             }
                             if(opcion.includes("cardMedicamento"))
                             {
                                this._medicamentoController.cargaSelectMedicamento();
                             }


                        })
                    let divOcultar = document.querySelector(datosVerOcultar[1]);
                    divOcultar.style.display = 'none';
                })
            })
    }

    
    guardarDataOrUpdate = async () => 
    {
        let buttonFormRegMedicamento = document.querySelector("#guardarDataMedicamento");
        buttonFormRegMedicamento.addEventListener("click", (e) =>
        { 
            let datasetButtonFormRegister = buttonFormRegMedicamento.dataset.action;
            console.log(datasetButtonFormRegister);
          
         
           
            let   Medicamento = 
            {
               medicamentoId : 0,
               nombre : this.NombreMedicamento.value,
               precio : this.recioMedicamento.value,
               stock: this.CantidadMedicamento.value,
               fechaExpiracion: this.FechaExpiracion.value,
               proveedorId: this.Proveedor.value

              
            };
           if(datasetButtonFormRegister =="save")
           {
              
                this._medicamentoController.PostMedicamento(Medicamento);
           }
           else if(datasetButtonFormRegister =="update")
           {   
              /*   let idDelRegistro = parseInt(buttonFormRegMedicamento.value);
                Pais.paisId= idDelRegistro;
                this._paisController.PutPais(idDelRegistro,Pais); 
                buttonFormRegMedicamento.dataset.action="save"; */
               
           }
           buttonFormRegMedicamento.innerHTML ="Guardar Informacion";
           this.NombreMedicamento.value ="";
           this.CantidadMedicamento.value ="";
           this.PrecioMedicamento.value ="";
           this.FechaExpiracion.value ="";
           this.FechaCompra.value ="";
           this.Proveedor.selectedIndex = 0;
          
        })
    
    }

    eventoChangeSelectMedicamento = () =>
    {
          let  selectMedicamentoCompra = document.querySelector("#selectMedicamentoCompra");

          selectMedicamentoCompra.addEventListener("change" ,async(e)=>
          {     
                let medicamentoElegido = await this._medicamentoController.GetByID(parseInt(e.target.value));

                console.log(medicamentoElegido);
                console.log(this.NombreMedicamento);
                this.NombreMedicamento.value =medicamentoElegido.nombre;
                this.NombreMedicamento.readOnly= true;
                this.CantidadMedicamento.value ="";
                this.PrecioMedicamento.value =medicamentoElegido.precio;
                this.PrecioMedicamento.readOnly = true;
                this.FechaExpiracion.value =medicamentoElegido.fechaExpiracion.split("T")[0];
                this.FechaExpiracion.readOnly = true;
                this.FechaCompra.value ="";
                this.Proveedor.selectedIndex = 0;
                
                
          })
    }



}

customElements.define("frm-reglist-medicamento",MedicamentoComponent);