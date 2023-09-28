import { MedicamentoController } from "../../../Controllers/medicamento-controller.js";
import { opcMedicamento } from "../../../Services/medicamento-service.js";
import { CompraController } from "../../../Controllers/compra-controller.js";
import {MedicamentoCompraController} from "../../../Controllers/medicamentoCompra-controller.js"
class MedicamentoComponent extends HTMLElement
{
    constructor()
    {
        super();
        this.render();
        this.eventoMostrarMedicamentoFormularios();
        this.eventoChangeSelectMedicamento();

        this._compraControllerMedicamento = new CompraController(); 
        this._medicamentoController = new MedicamentoController();
        this._medicamentoCompraController = new MedicamentoCompraController();

        /* Varibales del formulario por facilidad */
        this.frmMedicamento = document.forms['frmRegMedicamento'];
        this.NombreMedicamento =this.frmMedicamento['nombre'];
        this.CantidadMedicamento =this.frmMedicamento['cantidad'];
        this.PrecioMedicamento =this.frmMedicamento['precioMedicamento'];
        this.FechaExpiracion =this.frmMedicamento['fechaExpiracion'];
        this.FechaCompra =this.frmMedicamento['fechaCompra'];
        this.PrecioCompra = this.frmMedicamento['precioCompra'];
        this.Proveedor =this.frmMedicamento['selectProveedorMedicamento'];
        this.FechaActual(); 
        this.eventoInputPrecios();
        this.guardarDataOrUpdate();


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
                                <input type="number" min="0"  data-stockinicial="0" class="form-control factorValorTotal" id="cantidad">
                            </div>
                            <div class="col-md-3">
                                <label for="inputPassword4" class="form-label">Precio</label>
                                <input type="number" step="0.001" min="0" class="form-control factorValorTotal" id="precioMedicamento">
                            </div>
                            <div class="col-6">
                                <label for="inputAddress2" class="form-label">Fecha Expiración</label>
                                <input type="date" class="form-control" id="fechaExpiracion" >
                            </div>
                            <div class="col-md-6">
                                <label for="inputCity" class="form-label">Fecha Compra</label>
                                <input type="date" class="form-control" readOnly id="fechaCompra">
                            </div>
                            <div class="col-md-4">
                                <label for="inputState" class="form-label">Proveedor</label>
                                <select id="selectProveedorMedicamento" class="form-select">
                                    <option selected>Choose...</option>
                                </select>
                            </div>
                           
                            <div class="col-md-4">
                                    <label for="validationDefaultUsername" class="form-label">Valor Total</label>
                                <div class="input-group">
                                    <span class="input-group-text" id="inputGroupPrepend2">$</span>
                                    <input type="text" class="form-control" id="precioCompra" step="0.001" min="0" readOnly aria-describedby="inputGroupPrepend2" required>
                                </div>
                            </div>
                                                            
                            
                            <div class="col-12">
                                <button type="button" data-action="save"  data-proveedor="0"class="btn btn-primary" id="guardarDataMedicamento">Guardar Datos</button>
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


    FechaActual = () =>
    {
        
            this.FechaCompra.valueAsDate = new Date();
            var fechaHoy = new Date();
            
            // Formatea la fecha como una cadena "YYYY-MM-DD"
            var fechaHoyFormat = fechaHoy.toISOString().split('T')[0];
            this.FechaExpiracion.setAttribute("min", fechaHoyFormat);
       
    }

    eventoMostrarMedicamentoFormularios = () =>
    {
            document.querySelectorAll(".navMedicamento").forEach((val,id) =>
            {
                val.addEventListener("click",(e)=>
                {
                    let datosVerOcultar = JSON.parse(e.target.dataset.hideformmedicamento);
                    datosVerOcultar[0].forEach(opcion => 
                        {
                            let divVer = document.querySelector(opcion);
                            divVer.style.display ='flex';
                            console.log(divVer.style.display);
                            if(opcion.includes("listarMedicamento"))
                             {   
                                this._medicamentoController.GetAllMedicamento();
                                this._medicamentoController.DeleteMedicamentos();
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
        buttonFormRegMedicamento.addEventListener("click", async(e) =>
        { 
            let datasetButtonFormRegister = buttonFormRegMedicamento.dataset.action;
            console.log(datasetButtonFormRegister);
            
         
           
            let   Medicamento = 
            {
               medicamentoId : 0,
               nombre : this.NombreMedicamento.value,
               precio : parseFloat(this.PrecioMedicamento.value),
               stock: parseInt(this.CantidadMedicamento.value) + parseInt(this.CantidadMedicamento.dataset.stockinicial),
               fechaExpiracion: this.FechaExpiracion.value,
               proveedorId: parseInt(this.Proveedor.value)
        
              
            };

            let Compra =
            {
                compraId : 0,
                fechaCompra: this.FechaCompra.value,
                proveedorId : parseInt(this.Proveedor.value)

            }

          
           if(datasetButtonFormRegister =="save")
           {
                try
                {
                    
                      let medicamentoRegistrado = await this._medicamentoController.PostMedicamento(Medicamento);
                        console.log(medicamentoRegistrado);
     
                      let  CompraHecha = await this._compraControllerMedicamento.PostCompra(Compra);
                    console.log(CompraHecha);

                      let MedicamentoCompra =
                      {
                          medicamentoCompraId : 0,
                          cantidadComprada :parseInt(this.CantidadMedicamento.value),
                          precioCompra: parseFloat(this.PrecioCompra.value),
                          compraId: parseInt(CompraHecha.compraId),
                          medicamentoId:parseInt(medicamentoRegistrado.medicamentoId)
                      }
      
                      this._medicamentoCompraController.PostMedicamentoCompra(MedicamentoCompra);
                }catch(error)
                {
                    console.error(`Error al crear compra o medicamento ${error}`);
                }
               
               
             
                
           }
           else if(datasetButtonFormRegister =="update")
           {   

                buttonFormRegMedicamento.innerHTML ="Guardar Informacion";
              


                let idDelRegistro = parseInt(buttonFormRegMedicamento.value);
                Medicamento.stock =parseInt(this.CantidadMedicamento.value);
                Medicamento.medicamentoId= idDelRegistro;
                this._medicamentoController.PutMedicamento(idDelRegistro,Medicamento);
                this._compraControllerMedicamento.PostCompra(Compra); 
                buttonFormRegMedicamento.dataset.action="save"; 
               
           }
           this.NombreMedicamento.value ="";
           this.CantidadMedicamento.value ="";
           this.PrecioMedicamento.value ="";
           this.FechaExpiracion.value ="";
           this.FechaCompra.value ="";
           this.NombreMedicamento.readOnly= false;
           this.Proveedor.selectedIndex = 0;
           this.Proveedor.disabled=false;
           this.PrecioMedicamento.readOnly = false;
           this.FechaActual(); 
           this._medicamentoController.cargaSelectMedicamento();
           
          
          
        })
    
    }

    eventoChangeSelectMedicamento = () =>
    {     let buttonFormRegMedicamento = document.querySelector("#guardarDataMedicamento");
          let  selectMedicamentoCompra = document.querySelector("#selectMedicamentoCompra");

          selectMedicamentoCompra.addEventListener("change" ,async(e)=>
          {    
                let medicamentoElegido = await this._medicamentoController.GetByID(parseInt(e.target.value));

                this.NombreMedicamento.value =medicamentoElegido.nombre;
                this.NombreMedicamento.readOnly= true;
                this.CantidadMedicamento.value ="";
                this.CantidadMedicamento.dataset.stockinicial = medicamentoElegido.stock;
                this.PrecioMedicamento.value =medicamentoElegido.precio;
                this.PrecioMedicamento.readOnly = true;
                this.FechaExpiracion.value ="";     
                this.FechaCompra.valueAsDate= new Date();
                this.Proveedor.value = medicamentoElegido.proveedorId;
                this.Proveedor.disabled= true;
                buttonFormRegMedicamento.dataset.action ="update";
                buttonFormRegMedicamento.value = medicamentoElegido.medicamentoId;
                selectMedicamentoCompra.selectedIndex =0;
                
                
          })
    }

    eventoInputPrecios = ()=>
    {   

        document.querySelectorAll(".factorValorTotal").forEach((val,id)=>
        {
               
                val.addEventListener("input",(e)=>
                {   
                    let CantidadMedicamento = parseFloat(this.CantidadMedicamento.value);
                    let totalCompra = CantidadMedicamento*parseFloat(this.PrecioMedicamento.value);
                    if(!isNaN(totalCompra)) this.PrecioCompra.value = totalCompra;
                    
                })

         })

       
    }



}

customElements.define("frm-reglist-medicamento",MedicamentoComponent);