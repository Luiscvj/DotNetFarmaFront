import { VentaController } from "../../../Controllers/venta-controller.js";


class VentaComponent extends HTMLElement 
{
	
    constructor()
    {
        super();
        this.render();
        this._ventaController = new VentaController();
	
        this.eventoMostrarVentaFormularios();
		this.eventoChangeSelectCarritoCompras();
		this.guardarDataOrUpdate();
    }

    render = () =>
    {
       this.innerHTML=  /* html */ 
       `

      
       <section class="h-100 h-custom" id="sectionCarritoCompras" style="background-color: #eee; display: none" >
					<div class="container py-5 h-100">
					  <div class="row d-flex justify-content-center align-items-center h-100">
						<div class="col">
						  <div class="card">
							<div class="card-body p-4">
				  
							  <div class="row">
				  
								<div class="col-lg-7">


									<select class="form-select"  id="selectCarritoCompras" aria-label="Default select example">
										<option selected>Open this select menu</option>
									  </select>
								  <hr>
				  
								  <div class="d-flex justify-content-between align-items-center mb-4">
									<div>
									  <p class="mb-1">Shopping cart</p>
									
									</div>
									<div>
									  <p class="mb-0"><span class="text-muted">Sort by:</span> <a href="#!"
										  class="text-body">price <i class="fas fa-angle-down mt-1"></i></a></p>
									</div>
								  </div>
				  
								  <div id="divParaListarElementos">
									
								

								  </div>




								</div>

								<div class="col-lg-5">
				  
								  <div class="card bg-primary text-white rounded-3">
									<div class="card-body">
									  <div class="d-flex justify-content-between align-items-center mb-4">
										<h5 class="mb-0">Customer details</h5>
										<img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
										  class="img-fluid rounded-3" style="width: 45px;" alt="Avatar">
									  </div>
				  
									 
				  
									  <form class="mt-4" id="frmVenta">
									  <select class="form-select m-2"  id="selectEmpleadoCompra" aria-label="Default select example">
										<option selected>Empleado</option>
									  </select>

									  <select class="form-select m-2"  id="selectPacienteCompra" aria-label="Default select example">
										<option selected>Paciente</option>
									  </select>
										

										
				  
				  
										<div class="row mb-4">
										  <div class="col-md-6">
											<div class="form-outline form-white">
											  <input type="text" id="typeExp" class="form-control form-control-lg"
												placeholder="MM/YYYY" size="7" id="exp" minlength="7" maxlength="7" />
											  <label class="form-label" for="typeExp">Expiration</label>
											</div>
										  </div>
										  <div class="col-md-6">
											<div class="form-outline form-white">
											  <input type="password" id="typeText" class="form-control form-control-lg"
												placeholder="&#9679;&#9679;&#9679;" size="1" minlength="3" maxlength="3" />
											  <label class="form-label" for="typeText">Cvv</label>
											</div>
										  </div>
										</div>
				  
									  </form>
				  					
									  <hr class="my-4">
				  
									
									 
				  
				  
									  <button type="button" id="totalVenta" class="btn btn-info btn-block btn-lg btnActualizarValor">
										<div class="d-flex justify-content-between">
										  <span></span>
										  <span>Checkout <i class="fas fa-long-arrow-alt-right ms-2"></i></span>
										</div>
									  </button>
									  <button type="button" data-action="save" class="btn btn-primary" id="guardarDataVenta">Vender</button>
									</div>
								  </div>
				  
								</div>
				  
							  </div>
				  
							</div>
						  </div>
						</div>
					  </div>
					</div>
				  </section>
                
       
       `
    }


    
    eventoMostrarVentaFormularios = () =>
    {
            document.querySelectorAll(".navVenta").forEach((val,id) =>
            {
                val.addEventListener("click",async (e)=>
                {
                    let datosVerOcultar = JSON.parse(e.target.dataset.hideformventa);
                   
                    datosVerOcultar[0].forEach(opcion => 
                        {
                            let divVer = document.querySelector(opcion);
                            divVer.style.display ='block';
                            console.log(divVer.style.display);
                           /*  if(opcion.includes("listarMedicamento"))
                             {   
                                this._medicamentoController.GetAllMedicamento();
                                this._medicamentoController.DeleteMedicamentos();
                             }
                            else if(opcion.includes("cardMedicamento"))
                             {
                                this._medicamentoController.cargaSelectMedicamento();
                             }
                             else
                             {
                                divVer.style.display = 'block'
                                this._medicamentoCompraController.GetMedicamentoCompra();
                             } */

                             if(opcion.includes("sectionCarritoCompras"))
                             {
                                  this._ventaController.cargaSelectMedicamento()
                             }



                        })
                    
                    datosVerOcultar[1].forEach(opcion=>
                        {
                            let divOcultar =  document.querySelector(opcion);
                            divOcultar.style.display = 'none';
                        })
                })
            })
    }


	guardarDataOrUpdate = async () => 
    {

		const tiempoTranscurrido = Date.now();
		const hoy = new Date(tiempoTranscurrido);
		let fecha = hoy.toISOString().split("T")[0];
		console.log(fecha);
        let buttonFormRegVenta = document.querySelector("#guardarDataVenta");
        buttonFormRegVenta.addEventListener("click", async(e) =>
        { 
            let datasetButtonFormRegister = buttonFormRegVenta.dataset.action;
            console.log(datasetButtonFormRegister);
            let frmSucursal = document.forms['frmVenta'];
            let EmpleadoVenta =frmSucursal['selectEmpleadoCompra'];
            let PacienteVenta = frmSucursal['selectPacienteCompra'];
          
           
            let   Venta = 
            {
               empleadoId : parseInt(EmpleadoVenta.value),
               pacienteId : parseInt(PacienteVenta.value),
			   fechaVenta : fecha
              
              
            };
			console.log(Venta);
           if(datasetButtonFormRegister =="save")
           {
              
               let venta = await this._ventaController.PostVentaAll(Venta);
				this._ventaController.postAllMedicamento(venta.ventaId);

           }
           else if(datasetButtonFormRegister =="update")
           {   
                let idDelRegistro = parseInt(buttonFormRegVenta.value);
                Empleado.empleadoId= idDelRegistro;
                this._empleadoController.PutEmpleado(idDelRegistro,Empleado); 
                buttonFormRegVenta.dataset.action="save"; 
               
           }
           buttonFormRegVenta.innerHTML ="Vender";
        
		   EmpleadoVenta.selectedIndex = 0;
		   PacienteVenta.selectedIndex = 0;

          
       
    
        })
    
    }


    eventoChangeSelectCarritoCompras = () => 
    {
        let selectCarritoCompras =  document.querySelector("#selectCarritoCompras");
        selectCarritoCompras.addEventListener("change",async (e)=> 
        {
               await this._ventaController.GetMedicamentoAñadido(parseInt(e.target.value));    
        })
    }

}

customElements.define("frm-reglist-venta",VentaComponent);