import { opcMedicamento } from "../Services/medicamento-service.js";
import { opcVenta } from "../Services/service-venta.js";
import { opcEmpleado } from "../Services/empleado-service.js";
import { Paciente } from "../js/Components/PacienteComponent/Paciente.js";
import { MedicamentoVentaController } from "./medicamentoVenta-controller.js";
export class VentaController 
{
    constructor()
    {   this._pacienteController = new Paciente();
        this._medicamentoVentaController = new MedicamentoVentaController();
        this.selectCarritoCompras = document.querySelector("#selectCarritoCompras");
        this.selectEmpleadoACargo = document.querySelector("#selectEmpleadoCompra");
        this.selectPaciente = document.querySelector("#selectPacienteCompra");
        this.buttonUpdatePrice = document.querySelector(".btnActualizarValor");
        this.ArraySelects = [];
        this.ArrayIdsMedicamentosAñadidos = [];
        this.precioPruebaGlobal = 0;
        this.arrayVentas = [];
        this.precioTotalPorFin = 0; 
        this.totalLabel = document.querySelector("#totalVenta");//
        
    }

/* 
*POST VENTAS***********************
*/
    PostVentaAll = async (data) =>
    {
        console.log(data);

        try
        {
           let response= await  opcVenta['POSTAll'](data);

           return response;
        }catch(error)
        {
            console.error(error)
        }
    }


/* 
*CARGA selects******************
*/



cargaSelectMedicamento = async () => 
{       
    if(!(this.selectCarritoCompras.options[1] == undefined))
    {
       
        this.ArraySelects.push(this.selectCarritoCompras,this.selectEmpleadoACargo,this.selectPaciente);
        this.DeleteSelects();
        
    }
    
    
   try
   {
   
        let responseMedicamento = await opcMedicamento['GET']();
        let responseEmpleado = await opcEmpleado['GET']();
        let responsePaciente =  await  this._pacienteController.getPaciente();
        console.log(responsePaciente);
        responseMedicamento.forEach(medicamento =>
             {
                let optionMedicamento = document.createElement('option');
                optionMedicamento.innerHTML = `${medicamento.nombre}`;
              
                optionMedicamento.value = medicamento.medicamentoId;
                this.selectCarritoCompras.appendChild(optionMedicamento);
             })

        responseEmpleado.forEach(empleado =>
             {
                let optionEmpleado = document.createElement('option');
                optionEmpleado.innerHTML = `${empleado.nombres} ${empleado.apellidos}`;
              
                optionEmpleado.value = empleado.empleadoId;
                this.selectEmpleadoACargo.appendChild(optionEmpleado);
             })

        responsePaciente.forEach(paciente =>
             {
                let optionPaciente = document.createElement('option');
                optionPaciente.innerHTML = `${paciente.nombre} ${paciente.apellidos}`;
              
                optionPaciente.value = paciente.pacienteId;
                this.selectPaciente.appendChild(optionPaciente);
             })

   }catch(error)
   {
    console.error(error);
   } 

   this.actualizarPrecio();
}

DeleteSelects = () => 
    {   this.ArraySelects.forEach(array=>
        {
            for(let i= 1; i = array.options.length-1;i++)
            {
                let idRegistro =parseInt(array.options[i].value);
                let opcionABorrar = array.querySelector(`option[value="${idRegistro}"]`);
               
                array.removeChild(opcionABorrar);
            }

        })
    }




/* 
*CARGA elementos del carrito de compras
*/

GetMedicamentoAñadido = async(idMedicamento) =>
{
    let response = await opcMedicamento['GETBYID'](idMedicamento);
    let listMedicamentoHTML = '';
    let divListElementosComprados = document.querySelector("#divParaListarElementos")
   
  
    let divDeMedicamentoAñadido = document.createElement("div");
    divDeMedicamentoAñadido.classList="divsMedicamentosAñadidos";
    divDeMedicamentoAñadido.id = response.medicamentoId;
 
    if(!this.ArrayIdsMedicamentosAñadidos.includes(response.medicamentoId))
    {

      divDeMedicamentoAñadido.innerHTML = this.CargarMedicamento(response); 
      divListElementosComprados.appendChild(divDeMedicamentoAñadido);
      this.ArrayIdsMedicamentosAñadidos.push(parseInt(response.medicamentoId));
      
    }
    else
    (
      alert(`${response.nombre} ya añadido`)
    )

    this.calculoPrecio();
    console.log(this.precioPruebaGlobal);


    this.precioTotalPorFin += this.precioPruebaGlobal
          
    this.totalLabel.innerHTML=this.precioTotalPorFin;

   /*   this.DeleteMedicamentos();
     this.UpdateViewToPUTMedicamentos(); */
}


CargarMedicamento = (medicamento) =>
{
    let listPorveedorHTML = '';

    listPorveedorHTML = /* html */
    `
        
           			<div class="card mb-3">
									<div class="card-body">
									  <div class="d-flex justify-content-between">
										 <div class="d-flex flex-row align-items-center">
                        <div>
                            <img src="Assets/Images/${medicamento.nombre.toLowerCase()}.jpg"class="img-fluid rounded-3"  alt="Shopping item" style="width: 65px;">
                        </div>
                        <div class="ms-3">
                              <h5>${medicamento.nombre}</h5>
                              <p class="small mb-0">VEN: ${medicamento.fechaExpiracion.split("T")[0]}</p>
                        </div>
										</div>
										<div class="d-flex flex-row align-items-center">
                        <div style="width: 50px;">
                       
                            <div class="" >
                                <input min="0" value="0" id="cantidadMedicamentoAñadido"  data-precioactual="0" data-evento="desactivado"  data-identificacion="${medicamento.medicamentoId}" data-preciomedicamento="${medicamento.precio}" type="number"  class="form-control" />
                                <label class="form-label"  max ="${medicamento.stock}" for="typeNumber">Cantidad</label>
                            </div>

                            </div>
                            
										            <a href="#!" style="color: #cecece;"><i class="fas fa-trash-alt"></i></a>
										</div>
                        <div style="width: 80px;">
                          <h5 class="mb-0"  >${medicamento.precio} $</h5>
                        </div>
                    
									 </div>
									</div>
								</div>
    `
    return listPorveedorHTML;
}


    // ... (otras funciones)
  /*   calculoPrecio = () => {
        document.querySelectorAll("#cantidadMedicamentoAñadido").forEach(val => {
            console.log(val);
    
            if (val.dataset.evento == "desactivado") {
                val.addEventListener("change", (e) => {
                    let precioDelMedicamento = parseFloat(e.target.dataset.preciomedicamento);
                    let cantidad = parseInt(e.target.value);
    
                    // Calcular el precio del medicamento actual
                    let precioActual = precioDelMedicamento * cantidad;
    
                    // Sumar el precio actual al precio total global
                    this.precioPruebaGlobal = precioActual;
    
                    console.log(this.precioPruebaGlobal, "   precioMedicamento ", precioActual);
    
                    // No reiniciar precioPruebaNueva a 0 aquí
                });
    
                
                val.dataset.evento = "activo";
            }
        });
    } */
    calculoPrecio = () => {
        document.querySelectorAll("#cantidadMedicamentoAñadido").forEach(val => {
            console.log(val);
    val.addEventListener("change", (e) => {
        let precioDelMedicamento = parseFloat(e.target.dataset.preciomedicamento);
        let cantidadActual = parseInt(e.target.value);
    
        // Obtener la cantidad anterior (guardada en el atributo "data-cantidad-anterior")
        let cantidadAnterior = parseInt(e.target.dataset.cantidadAnterior);
    
        // Calcular la diferencia entre la cantidad actual y la cantidad anterior
        let diferencia = (cantidadActual*precioDelMedicamento) - (cantidadAnterior*precioDelMedicamento);
    
        // Calcular el precio del medicamento actual
        let precioActual = precioDelMedicamento * cantidadActual;
    
        // Si la diferencia es negativa, se restaron unidades
        if (diferencia < 0) {
            precioActual +diferencia

        } 
        
        
        
    
        // Actualizar el atributo "data-cantidad-anterior" con la cantidad actual
        e.target.dataset.cantidadAnterior = cantidadActual;
        e.target.dataset.precioactual = (cantidadActual*precioDelMedicamento); 
        // Sumar el precio actual al precio total global
        this.precioPruebaGlobal = precioActual;
    
        this.totalLabel.innerHTML=this.precioPruebaGlobal;
    });
   

});


    }




    actualizarPrecio = () => 
    {
        this.buttonUpdatePrice.addEventListener("click", (e)=>
        {   

            
            e.target.innerHTML = this.precioTotalPorFin;
        })
    }




    postAllMedicamento = (ventaId) =>
    {
        let divListarElementoParent = document.querySelector("#divParaListarElementos");
        let imagenes = "";
        document.querySelectorAll("#cantidadMedicamentoAñadido").forEach((val,id)=>
       {
           if(parseInt(val.dataset.precioactual) != 0)
           {
               let VentaMedicamento = 
               {
                 cantidadVendida :parseInt( val.value),
                 precioVenta : parseFloat(val.dataset.precioactual),
                 medicamentoId : parseInt(val.dataset.identificacion),
                 ventaId: parseInt(ventaId)

               }

               this.arrayVentas.push(VentaMedicamento);
                   
           }
           this._medicamentoVentaController.PostAllMedicamentoVenta(this.arrayVentas);
           console.log(this.arrayVentas);


       })

    }
}






