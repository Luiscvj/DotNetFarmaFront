
import { EmpleadoController } from "../../Controllers/empleado-controller.js";
import { MedicamentoController } from "../../Controllers/medicamento-controller.js";

class NavBarContent extends HTMLElement
{
    constructor()
    {
        super();
        this.render();
        this.eventoMostrarNavBar();
        this.selectConsultasEmpleado()
        this.selectConsultasMedicamento();
        this.selectConsultasProveedor()
        this.selectConsultasVenta()
        this._empleadoController = new EmpleadoController();
    }

    render = ()=>
    {
       this.innerHTML = /*html*/ `
        
        
        
      <div id="navPais">
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
              
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                          <a class="nav-link navPais"  data-verocultar='[["#frmRegPais","#divPais","#frmRegistroPais"],"#listarPais"]'  aria-current="page" href="#">Registrar</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link navPais" data-verocultar='[["#listarPais","#divPais","#frmRegPais"],"#frmRegistroPais"]' href="#">Listar</a>
                        </li>
                      
                    
                    </ul>
                    <form class="d-flex">
                      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                      <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                  </div>
            </div>
        </nav>

      </div>

      <div id="navCiudad">
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
              
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                      <li class="nav-item">
                        <a class="nav-link navCiudad "    data-hideformciudad='[["#divCiudad","#frmRegCiudad","#frmRegistroCiudad"],["#listarCiudad"]]' aria-current="page" href="#">Registrar Ciudad</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link  navCiudad"  data-hideformciudad='[["#divCiudad","#listarCiudad","#frmRegCiudad"],["#frmRegistroCiudad"]]' href="#">Listar Ciudades</a>
                      </li>
                      
                    
                    </ul>
                    <form class="d-flex">
                      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                      <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                  </div>
            </div>
        </nav>
      </div>

      <div id="navEps" >
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
              
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                          <a class="nav-link navEps "    data-hideformeps='[["#divEps","#formRegEps","#frmRegEps"],["#listEps"]]' aria-current="page" href="#">Registrar Eps</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link  navEps"  data-hideformeps='[["#divEps","#listEps","#frmRegEps"],["#formRegEps"]]' href="#">Listar Epses</a>
                        </li>
                      
                    
                    </ul>
                    <form class="d-flex">
                      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                      <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                  </div>
            </div>
        </nav>
      </diV>

      <div id="navProveedor" >
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
              
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                          <a class="nav-link navProveedor "    data-hideformproveedor='[["#divProveedor","#formRegProveedor","#frmRegProveedor"],["#listProveedor"]]' aria-current="page" href="#">Registrar Proveedor</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link  navProveedor"  data-hideformproveedor='[["#divProveedor","#listProveedor","#frmRegProveedor"],["#formRegProveedor"]]' href="#">Listar Proveedores</a>
                        </li>
                      
                    
                    </ul>
                    <select id="selectConsultasProveedor" class="form-select" aria-label="Default select example">
                            <option selected></option>
                            <option value="1">Menos de 50 unidades</option>
                            <option value="2">Medicamentos vendidos por proveedor</option>
                            <option value="3">Total compra por proveedor</option>
                            <option value="4">Proveedor mas ha suministrado</option>
                        </select>
                    <form class="d-flex">
                      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                      <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                  </div>
            </div>
        </nav>

      </diV>



        <div id="navDepartamento" >
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
              
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                          <a class="nav-link navDepartamento "    data-hideformdepartamento='[["#divDepartamento","#frmRegDepartamento","#frmRegistroDepartamento"],["#listarDepartamento"]]' aria-current="page" href="#">Registrar Departamento</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link  navDepartamento"  data-hideformdepartamento='[["#divDepartamento","#listarDepartamento","#frmRegDepartamento"],["#frmRegistroDepartamento"]]' href="#">Listar Departamentos</a>
                        </li>
                      
                    
                    </ul>
                    <form class="d-flex">
                      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                      <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                  </div>
            </div>
        </nav>

      </div>


      <div id="navEmpleado" >
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
              
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                          <a class="nav-link navEmpleado "    data-hideformempleado='[["#divEmpleado","#frmRegEmpleado","#frmEmpleado"],["#listarEmpleados"]]' aria-current="page" href="#">Registrar Empleado</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link  navEmpleado"  data-hideformempleado='[["#divEmpleado","#frmRegEmpleado","#listarEmpleados"],["#frmEmpleado"]]' href="#">Listar Empleado</a>
                        </li>
                      
                        
                        </ul>
                        <select id="selectConsultasEmpleado" class="form-select" aria-label="Default select example">
                            <option selected></option>
                            <option value="1">Mas medicamentos vendidos</option>
                            <option value="2">Sin ventas en Abril</option>
                            <option value="3">Menos de 5 ventas</option>
                            <option value="4">5 ventas</option>
                            <option value="5">Sin ventas</option>
                        </select>
                    <form class="d-flex">
                      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                      <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                  </div>
            </div>
        </nav>
      </diV>

      <div id="navMedicamento" >
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
              
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                          <a class="nav-link navMedicamento "    data-hideformmedicamento='[["#divMedicamento","#cardMedicamento"],["#listarMedicamento","#cardHeaderMedicamento"]]' aria-current="page" href="#">Comprar Medicamento</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link  navMedicamento"  data-hideformmedicamento='[["#divMedicamento","#listarMedicamento","#cardHeaderMedicamento"],["#cardMedicamento","#medicamentoCompraTabla"]]' href="#">Listar Medicamento</a>
                        </li>

                        <li class="nav-item">
                          <a class="nav-link  navMedicamento"  data-hideformmedicamento='[["#divMedicamento","#medicamentoCompraTabla"],["#cardMedicamento","#listarMedicamento","#cardHeaderMedicamento"]]' href="#">Listar Compras de Medicamentos</a>
                        </li>
                    </ul>
                    <form class="d-flex">
                      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                      <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <select id="selectConsultasMedicamento" class="form-select" aria-label="Default select example">
                            <option selected></option>
                            <option value="1">No vendidos</option>
                            <option value="2">Mas caros</option>
                            <option value="3">Con info Proveedor</option>
                            <option value="4">Menos 50 stock</option>
                            <option value="5">Expiran antes 2024</option>
                            <option value="6">Pacientes compraron paracetamol</option>
                            <option value="7">Menos vendido</option>
                            <option value="8">Ventas por mes</option>
                            <option value="9">Medicamento compra fecha compra</option>
                            <option value="10">Dinero recaudado ventas</option>
                            <option value="11">Total medicamentos vendidos en marzo</option>
                            <option value="12">Medicamentos sin ventas</option>
                      </select>
                  </div>
            </div>
        </nav>
      </diV>

      <div id="navVenta" >
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <a class="nav-link  navVenta"  data-hideformventa='[["#divVenta","#sectionCarritoCompras"],["#frmEmpleado"]]' href="#"> Carrito de compras</a>
                    </li>
                  
                  <select id="selectConsultasVentas" class="form-select" aria-label="Default select example">
                    <option selected></option>
                    <option value="1">Ventas despues de enero</option>
                    <option value="2">venta por empleado</option>
                    <option value="3">promedio de medicamentos vendidos</option>
                </select>
                </ul>
                <form class="d-flex">
                  <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                  <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
              </div>
        </div>
    </nav>
  </diV>

        
        `
    }


eventoMostrarNavBar = ()=> 
{
    
    document.querySelectorAll(".entidades").forEach((val,id)=>
    {
        val.addEventListener("click",(e)=>
        {
            let datosVerOcultar = JSON.parse(e.target.dataset.verocultar);
            console.log(datosVerOcultar[0]);
            console.log(datosVerOcultar[1]);

           datosVerOcultar[0].forEach(opcionVer =>
            {
               let datosVer = document.querySelector(opcionVer);

               datosVer.style.display ='block';

              



            })
           

            datosVerOcultar[1].forEach(opcion =>
                {
                   
                    let divOcultar = document.querySelector(opcion);
                    divOcultar.style.display = 'none';
                })
            
        })
    })
}

  selectConsultasEmpleado()
  {
    let select = document.querySelector("#selectConsultasEmpleado")
    
    select.addEventListener("change", event => 
    {
      let option = select.value
    
      switch (option) 
      {
        case "1":
          this.getMasMedicamentosVendidos()
          break;
        case "2":
          this.getEmpleadosSinVentasAbril()
          break;
        case "3":
          this.getEmpleadosMenos5Ventas()
          break;
        case "4":
          this.getEmpleados5Ventas()
          break;
        case "5":
          this.getEmpleadoSinVentas()
          break;
        default:
          console.log("sin opcion");  
          break;
      }
    })
  }

  getMasMedicamentosVendidos()
  {

    this._empleadoController.getEmpleadosMasMedicamentosVendidos()
    .then(res => 
    {
      let data = res
      console.log(data);

      const container = document.querySelector("#listarEmpleados")
      container.innerHTML = 
      `
        <div class="container pt-5">
            <div class="card">
                <div class="card-body">
                    <div class="overflow-auto" style="height: 400px;">
                        <table class="table table-striped-columns text-center">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Nombres</th>
                                    <th scope="col">Apellidos</th>
                                    <th scope="col">Telefono</th>
                                    <th scope="col">Direccion</th>
                                    <th scope="col">Fecha Contratacion</th>
                                </tr>
                            </thead>
                            <tbody id="containerLista">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      `

      const containerLista = document.querySelector("#containerLista")
      containerLista.innerHTML = ""
      data.forEach(empleado => 
        {
          containerLista.innerHTML += 
          `
            <tr>
                <th>${empleado.arlId}</th>
                <td>${empleado.nombres}</td>
                <td>${empleado.apellidos}</td>
                <td>${empleado.telefono}</td>
                <td>${empleado.direccion}</td>
                <td>${empleado.fechaContratacion}</td>
            </tr>
          `
        })
    })
    .catch(error => console.log(error))
  }

  getEmpleadosSinVentasAbril()
  {
    this._empleadoController.getEmpleadoSinVentasAbril()
    .then(res => 
    {
      let data = res

      const container = document.querySelector("#listarEmpleados")
      container.innerHTML = 
      `
        <div class="container pt-5">
            <div class="card">
                <div class="card-body">
                    <div class="overflow-auto" style="height: 400px;">
                        <table class="table table-striped-columns text-center">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Nombres</th>
                                    <th scope="col">Apellidos</th>
                                    <th scope="col">Telefono</th>
                                    <th scope="col">Direccion</th>
                                    <th scope="col">Fecha Contratacion</th>
                                </tr>
                            </thead>
                            <tbody id="containerLista">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      `

      const containerLista = document.querySelector("#containerLista")
      containerLista.innerHTML = ""
      data.forEach(empleado => 
        {
          containerLista.innerHTML += 
          `
            <tr>
                <th>${empleado.empleadoId}</th>
                <td>${empleado.nombres}</td>
                <td>${empleado.apellidos}</td>
                <td>${empleado.telefono}</td>
                <td>${empleado.direccion}</td>
                <td>${empleado.fechaContratacion}</td>
            </tr>
          `
        })
    })
    .catch(error => console.log(error))
  }

  getEmpleadosMenos5Ventas()
  {
    this._empleadoController.getEmpleadoMenos5Ventas()
    .then(res => 
    {
      let data = res

      const container = document.querySelector("#listarEmpleados")
      container.innerHTML = 
      `
        <div class="container pt-5">
            <div class="card">
                <div class="card-body">
                    <div class="overflow-auto" style="height: 400px;">
                        <table class="table table-striped-columns text-center">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Nombres</th>
                                    <th scope="col">Apellidos</th>
                                    <th scope="col">Telefono</th>
                                    <th scope="col">Direccion</th>
                                    <th scope="col">Fecha Contratacion</th>
                                </tr>
                            </thead>
                            <tbody id="containerLista">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      `

      const containerLista = document.querySelector("#containerLista")
      containerLista.innerHTML = ""
      data.forEach(empleado => 
        {
          containerLista.innerHTML += 
          `
            <tr>
                <th>${empleado.empleadoId}</th>
                <td>${empleado.nombres}</td>
                <td>${empleado.apellidos}</td>
                <td>${empleado.telefono}</td>
                <td>${empleado.direccion}</td>
                <td>${empleado.fechaContratacion}</td>
            </tr>
          `
        })
    })
    .catch(error => console.log(error))
  }

  getEmpleados5Ventas()
  {
    this._empleadoController.getEmpleado5Ventas()
    .then(res => 
    {
      let data = res

      const container = document.querySelector("#listarEmpleados")
      container.innerHTML = 
      `
        <div class="container pt-5">
            <div class="card">
                <div class="card-body">
                    <div class="overflow-auto" style="height: 400px;">
                        <table class="table table-striped-columns text-center">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Nombres</th>
                                    <th scope="col">Cantidad Ventas</th>
                                </tr>
                            </thead>
                            <tbody id="containerLista">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      `

      const containerLista = document.querySelector("#containerLista")
      containerLista.innerHTML = ""
      data.forEach(empleado => 
        {
          containerLista.innerHTML += 
          `
            <tr>
                <th>${empleado.id}</th>
                <td>${empleado.empleado}</td>
                <td>${empleado.cantidadVentas}</td>
            </tr>
          `
        })
    })
    .catch(error => console.log(error))
  }

  getEmpleadoSinVentas()
  {
    this._empleadoController.getEmpleadoSinVentas()
    .then(res => 
    {
      let data = res

      const container = document.querySelector("#listarEmpleados")
      container.innerHTML = 
      `
        <div class="container pt-5">
            <div class="card">
                <div class="card-body">
                    <div class="overflow-auto" style="height: 400px;">
                        <table class="table table-striped-columns text-center">
                            <thead>
                                <tr>
                                  <th scope="col">Id</th>
                                  <th scope="col">Nombres</th>
                                  <th scope="col">Apellidos</th>
                                  <th scope="col">Telefono</th>
                                  <th scope="col">Direccion</th>
                                  <th scope="col">Fecha Contratacion</th>
                                </tr>
                            </thead>
                            <tbody id="containerLista">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      `

      const containerLista = document.querySelector("#containerLista")
      containerLista.innerHTML = ""
      data.forEach(empleado => 
        {
          containerLista.innerHTML += 
          `
            <tr>
              <th>${empleado.empleadoId}</th>
              <td>${empleado.nombres}</td>
              <td>${empleado.apellidos}</td>
              <td>${empleado.telefono}</td>
              <td>${empleado.direccion}</td>
              <td>${empleado.fechaContratacion}</td>
            </tr>
          `
        })
    })
    .catch(error => console.log(error))
  }

  selectConsultasMedicamento()
  {
    let select = document.querySelector("#selectConsultasMedicamento")
    
    select.addEventListener("change", event => 
    {
      let option = select.value
    
      switch (option) 
      {
        case "1":
          this.getMedicamentosNoVendidos()
          break;
        case "2":
          this.getMedicamentosMasCaro()
          break;
        case "3":
          this.getMedicamentoConInfoProveedor()
          break;
        case "4":
          this.getMedicamentoConMenos50Stock()
          break;
        case "5":
          this.getMedicamentoExpiranAntes2024()
          break;
        case "6":
          this.getPacientesCompraronParacetamol()
            break;
        case "7":
          this.getMedicamentoMenosVendido()
          break;
        case "8":
          this.getMedicamentosVentasXMes()
           break;
        case "9":
        this.getMedicamentoCompraFechaCompra()
          break;
        case "10":
          this.getDineroRecaudadoVentas()
            break;
        case "11":
          this.getTotalMedicamentosVendidosMarzo()
            break;
        case "12":
            this.getMedicamentosSinVentas()
          break;
        default:
          console.log("sin opcion");  
          break;
      }
    })
  }

  getMedicamentosNoVendidos()
  {
    fetch("http://localhost:5000/api/Medicamento/GetMedicamentosNoVendidos",
    {
      method : "GET",
      headers : new Headers
      ({
          "Content-Type":"application/json"
      })
    })
    .then(res => {
      return res.json()
    })
    .then(response => 
    {
      let data = response

      const container = document.querySelector("#listarMedicamento")
      container.innerHTML = 
      `
        <div class="container pt-5">
            <div class="card">
                <div class="card-body">
                    <div class="overflow-auto" style="height: 400px;">
                        <table class="table table-striped-columns text-center">
                            <thead>
                                <tr>
                                  <th scope="col">Id</th>
                                  <th scope="col">Nombre</th>
                                  <th scope="col">Precio</th>
                                  <th scope="col">Stock</th>
                                  <th scope="col">Fecha Expiracion</th>
                                </tr>
                            </thead>
                            <tbody id="containerLista">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      `

      const containerLista = document.querySelector("#containerLista")
      containerLista.innerHTML = ""
      data.forEach(medicamento => 
        {
          containerLista.innerHTML += 
          `
            <tr>
              <th>${medicamento.medicamentoId}</th>
              <td>${medicamento.nombre}</td>
              <td>${medicamento.precio}</td>
              <td>${medicamento.stock}</td>
              <td>${medicamento.fechaExpiracion}</td>
            </tr>
          `
        })
    })
    .catch(error => console.log(error))
  }

  getMedicamentosMasCaro()
  {
    fetch("http://localhost:5000/api/Medicamento/GetMedicamentosMasCaro",
    {
      method : "GET",
      headers : new Headers
      ({
          "Content-Type":"application/json"
      })
    })
    .then(res => {
      return res.json()
    })
    .then(response => 
    {
      let data = response

      const container = document.querySelector("#listarMedicamento")
      container.innerHTML = 
      `
        <div class="container pt-5">
            <div class="card">
                <div class="card-body">
                    <div class="overflow-auto" style="height: 400px;">
                        <table class="table table-striped-columns text-center">
                            <thead>
                                <tr>
                                  <th scope="col">Id</th>
                                  <th scope="col">Nombre</th>
                                  <th scope="col">Precio</th>
                                  <th scope="col">Stock</th>
                                  <th scope="col">Fecha Expiracion</th>
                                </tr>
                            </thead>
                            <tbody id="containerLista">
                                <tr>
                                <th>${data.medicamentoId}</th>
                                <td>${data.nombre}</td>
                                <td>${data.precio}</td>
                                <td>${data.stock}</td>
                                <td>${data.fechaExpiracion}</td>
                              </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      `
    })
    .catch(error => console.log(error))
  }

  getMedicamentoConInfoProveedor()
  {
    fetch("http://localhost:5000/api/Medicamento/GetAllMedicamentoInformacionProveedor",
    {
      method : "GET",
      headers : new Headers
      ({
          "Content-Type":"application/json"
      })
    })
    .then(res => {
      return res.json()
    })
    .then(response => 
    {
      let data = response

      const container = document.querySelector("#listarMedicamento")
      container.innerHTML = 
      `
        <div class="container pt-5">
            <div class="card">
                <div class="card-body">
                    <div class="overflow-auto" style="height: 400px;">
                        <table class="table table-striped-columns text-center">
                            <thead>
                                <tr>
                                  <th scope="col">Id</th>
                                  <th scope="col">Nombre</th>
                                  <th scope="col">Proveedor</th>
                                  <th scope="col">Telefono</th>
                                </tr>
                            </thead>
                            <tbody id="containerLista">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      `

      const containerLista = document.querySelector("#containerLista")
      containerLista.innerHTML = ""
      data.forEach(medicamento => 
        {
          containerLista.innerHTML += 
          `
            <tr>
              <th>${medicamento.medicamentoId}</th>
              <td>${medicamento.nombreMedicamento}</td>
              <td>${medicamento.proveedorNombre}</td>
              <td>${medicamento.proveedorTelefono}</td>
            </tr>
          `
        })
    })
    .catch(error => console.log(error))
  }

  getMedicamentoConMenos50Stock()
  {
    fetch("http://localhost:5000/api/Medicamento/GetAllMedicamentoMenos50",
    {
      method : "GET",
      headers : new Headers
      ({
          "Content-Type":"application/json"
      })
    })
    .then(res => {
      return res.json()
    })
    .then(response => 
    {
      let data = response

      const container = document.querySelector("#listarMedicamento")
      container.innerHTML = 
      `
        <div class="container pt-5">
            <div class="card">
                <div class="card-body">
                    <div class="overflow-auto" style="height: 400px;">
                        <table class="table table-striped-columns text-center">
                            <thead>
                                <tr>
                                  <th scope="col">Id</th>
                                  <th scope="col">Nombre</th>
                                  <th scope="col">Precio</th>
                                  <th scope="col">Stock</th>
                                  <th scope="col">Fecha Expiracion</th>
                                </tr>
                            </thead>
                            <tbody id="containerLista">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      `

      const containerLista = document.querySelector("#containerLista")
      containerLista.innerHTML = ""
      data.forEach(medicamento => 
        {
          containerLista.innerHTML += 
          `
            <tr>
              <th>${medicamento.medicamentoId}</th>
              <td>${medicamento.nombre}</td>
              <td>${medicamento.precio}</td>
              <td>${medicamento.stock}</td>
              <td>${medicamento.fechaExpiracion}</td>
            </tr>
          `
        })
    })
    .catch(error => console.log(error))
  }

  getMedicamentoExpiranAntes2024()
  {
    fetch("http://localhost:5000/api/Medicamento/GetAllMedicamentoExpiranAntesEnero2024",
    {
      method : "GET",
      headers : new Headers
      ({
          "Content-Type":"application/json"
      })
    })
    .then(res => {
      return res.json()
    })
    .then(response => 
    {
      let data = response

      const container = document.querySelector("#listarMedicamento")
      container.innerHTML = 
      `
        <div class="container pt-5">
            <div class="card">
                <div class="card-body">
                    <div class="overflow-auto" style="height: 400px;">
                        <table class="table table-striped-columns text-center">
                            <thead>
                                <tr>
                                  <th scope="col">Id</th>
                                  <th scope="col">Nombre</th>
                                  <th scope="col">Fecha Expiracion</th>
                                </tr>
                            </thead>
                            <tbody id="containerLista">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      `

      const containerLista = document.querySelector("#containerLista")
      containerLista.innerHTML = ""
      data.forEach(medicamento => 
        {
          containerLista.innerHTML += 
          `
            <tr>
              <th>${medicamento.medicamentoId}</th>
              <td>${medicamento.nombre}</td>
              <td>${medicamento.fechaExpiracion}</td>
            </tr>
          `
        })
    })
    .catch(error => console.log(error))
  }

  getPacientesCompraronParacetamol()
  {
    fetch("http://localhost:5000/api/Medicamento/compraronParacetamol",
    {
      method : "GET",
      headers : new Headers
      ({
          "Content-Type":"application/json"
      })
    })
    .then(res => {
      return res.json()
    })
    .then(response => 
    {
      let data = response

      const container = document.querySelector("#listarMedicamento")
      container.innerHTML = 
      `
        <div class="container pt-5">
            <div class="card">
                <div class="card-body">
                    <div class="overflow-auto" style="height: 400px;">
                        <table class="table table-striped-columns text-center">
                            <thead>
                                <tr>
                                  <th scope="col">Id</th>
                                  <th scope="col">Nombre</th>
                                  <th scope="col">Apellido</th>
                                  <th scope="col">Direccion</th>
                                  <th scope="col">Telefono</th>
                                </tr>
                            </thead>
                            <tbody id="containerLista">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      `

      const containerLista = document.querySelector("#containerLista")
      containerLista.innerHTML = ""
      data.forEach(medicamento => 
        {
          containerLista.innerHTML += 
          `
            <tr>
              <th>${medicamento.pacienteId}</th>
              <td>${medicamento.nombre}</td>
              <td>${medicamento.apellidos}</td>
              <td>${medicamento.direccion}</td>
              <td>${medicamento.telefono}</td>
            </tr>
          `
        })
    })
    .catch(error => console.log(error))
  }

  getMedicamentoMenosVendido()
  {
    fetch("http://localhost:5000/api/Medicamento/menosVendido",
    {
      method : "GET",
      headers : new Headers
      ({
          "Content-Type":"application/json"
      })
    })
    .then(res => {
      return res.json()
    })
    .then(response => 
    {
      let data = response

      const container = document.querySelector("#listarMedicamento")
      container.innerHTML = 
      `
        <div class="container pt-5">
            <div class="card">
                <div class="card-body">
                    <div class="overflow-auto" style="height: 400px;">
                        <table class="table table-striped-columns text-center">
                            <thead>
                                <tr>
                                  <th scope="col">Id</th>
                                  <th scope="col">Nombre</th>
                                  <th scope="col">Precio</th>
                                  <th scope="col">Stock</th>
                                  <th scope="col">Fecha Expiracion</th>
                                  <th scope="col">Cantidad ventas</th>
                                </tr>
                            </thead>
                            <tbody id="containerLista">
                                <tr>
                                <th>${data.medicamento.medicamentoId}</th>
                                <td>${data.medicamento.nombre}</td>
                                <td>${data.medicamento.precio}</td>
                                <td>${data.medicamento.stock}</td>
                                <td>${data.medicamento.fechaExpiracion}</td>
                                <td>${data.cantidadVentas}</td>
                              </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      `
    })
    .catch(error => console.log(error))
  }

  getMedicamentosVentasXMes()
  {
    fetch("http://localhost:5000/api/Medicamento/ventasxMes",
    {
      method : "GET",
      headers : new Headers
      ({
          "Content-Type":"application/json"
      })
    })
    .then(res => {
      return res.json()
    })
    .then(response => 
    {
      let data = response

      const container = document.querySelector("#listarMedicamento")
      container.innerHTML = 
      `
        <div class="container pt-5">
            <div class="card">
                <div class="card-body">
                    <div class="overflow-auto" style="height: 400px;">
                        <table class="table table-striped-columns text-center">
                            <thead>
                                <tr>
                                  <th scope="col">Mes</th>
                                  <th scope="col">Total Ventas</th>
                                </tr>
                            </thead>
                            <tbody id="containerLista">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      `

      const containerLista = document.querySelector("#containerLista")
      containerLista.innerHTML = ""
      data.forEach(medicamento => 
        {
          const nombreMes = this.obtenerNombreMes(medicamento.mes)
          containerLista.innerHTML += 
          `
            <tr>
              <th>${nombreMes}</th>
              <td>${medicamento.totalMedicamentosVendidos}</td>
            </tr>
          `
        })
    })
    .catch(error => console.log(error))
  }

  obtenerNombreMes(numeroMes) {
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
  
    if (numeroMes >= 1 && numeroMes <= 12) {
      return meses[numeroMes - 1]; // Restamos 1 porque los meses comienzan desde 0 en el array
    } else {
      return "Mes inválido";
    }
  }

  getMedicamentoCompraFechaCompra()
  {
    fetch("http://localhost:5000/api/MedicamentoCompra/GetAllMedicamentoCompraFechaCompra",
    {
      method : "GET",
      headers : new Headers
      ({
          "Content-Type":"application/json"
      })
    })
    .then(res => {
      return res.json()
    })
    .then(response => 
    {
      let data = response

      const container = document.querySelector("#listarMedicamento")
      container.innerHTML = 
      `
        <div class="container pt-5">
            <div class="card">
                <div class="card-body">
                    <div class="overflow-auto" style="height: 400px;">
                        <table class="table table-striped-columns text-center">
                            <thead>
                                <tr>
                                  <th scope="col">Id</th>
                                  <th scope="col">Cantidad comprada</th>
                                  <th scope="col">Precio Compra</th>
                                  <th scope="col">Fecha</th>
                                  <th scope="col">Medicamento </th>
                                </tr>
                            </thead>
                            <tbody id="containerLista">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      `

      const containerLista = document.querySelector("#containerLista")
      containerLista.innerHTML = ""
      data.forEach(medicamento => 
        {
          containerLista.innerHTML += 
          `
            <tr>
              <th>${medicamento.medicamentoCompraId}</th>
              <td>${medicamento.cantidadComprada}</td>
              <td>${medicamento.precioCompra}</td>
              <td>${medicamento.fechaCompra}</td>
              <td>${medicamento.nombreMedicamento}</td>
            </tr>
          `
        })
    })
    .catch(error => console.log(error))
  }

  getDineroRecaudadoVentas()
  {
    fetch("http://localhost:5000/api/MedicamentoVenta/GetDineroRecaudadoVentas",
    {
      method : "GET",
      headers : new Headers
      ({
          "Content-Type":"application/json"
      })
    })
    .then(res => {
      return res.json()
    })
    .then(response => 
    {
      let data = response

      const container = document.querySelector("#listarMedicamento")
      container.innerHTML = 
      `
        <div class="container pt-5">
            <div class="card">
                <div class="card-body">
                    <div class="overflow-auto" style="height: 400px;">
                        <table class="table table-striped-columns text-center">
                            <thead>
                                <tr>
                                  <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody id="containerLista">
                                <tr>
                                  <td>El total de dinero recaudad en ventas es de: $${data.result}</td>
                              </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      `
    })
    .catch(error => console.log(error))
  }
  
  getTotalMedicamentosVendidosMarzo()
  {
    fetch("http://localhost:5000/api/MedicamentoVenta/marzo",
    {
      method : "GET",
      headers : new Headers
      ({
          "Content-Type":"application/json"
      })
    })
    .then(res => {
      return res.text()
    })
    .then(response => 
    {
      let data = response

      const container = document.querySelector("#listarMedicamento")
      container.innerHTML = 
      `
        <div class="container pt-5">
            <div class="card">
                <div class="card-body">
                    <div class="overflow-auto" style="height: 400px;">
                        <table class="table table-striped-columns text-center">
                            <thead>
                                <tr>
                                  <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody id="containerLista">
                                <tr>
                                  <td>${data}</td>
                              </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      `
    })
    .catch(error => console.log(error))
  }

  getMedicamentosSinVentas()
  {
    fetch("http://localhost:5000/api/MedicamentoVenta/noVentas",
    {
      method : "GET",
      headers : new Headers
      ({
          "Content-Type":"application/json"
      })
    })
    .then(res => {
      return res.json()
    })
    .then(response => 
    {
      let data = response

      const container = document.querySelector("#listarMedicamento")
      container.innerHTML = 
      `
        <div class="container pt-5">
            <div class="card">
                <div class="card-body">
                    <div class="overflow-auto" style="height: 400px;">
                        <table class="table table-striped-columns text-center">
                            <thead>
                                <tr>
                                  <th scope="col">Id</th>
                                  <th scope="col">Nombre</th>
                                  <th scope="col">Precio</th>
                                  <th scope="col">Stock</th>
                                  <th scope="col">Fecha expiracion</th>
                                </tr>
                            </thead>
                            <tbody id="containerLista">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      `

      const containerLista = document.querySelector("#containerLista")
      containerLista.innerHTML = ""
      data.forEach(medicamento => 
        {
          containerLista.innerHTML += 
          `
            <tr>
              <th>${medicamento.medicamentoId}</th>
              <td>${medicamento.nombre}</td>
              <td>${medicamento.precio}</td>
              <td>${medicamento.stock}</td>
              <td>${medicamento.fechaExpiracion}</td>
            </tr>
          `
        })
    })
    .catch(error => console.log(error))
  }

  selectConsultasProveedor()
  {
    let select = document.querySelector("#selectConsultasProveedor")
    
    select.addEventListener("change", event => 
    {
      let option = select.value
    
      switch (option) 
      {
        case "1":
          this.getProveedorMenos50Unidades()
          break;
        case "2":
          this.getMedicamentoVendidosXProveedor()
          break;
        case "3":
          this.totalComprasProveedor()
          break;
        case "4":
          this.getProveedorMasSuministrado()
          break;
        default:
          console.log("sin opcion");  
          break;
      }
    })
  }

  getProveedorMenos50Unidades()
  {
    fetch("http://localhost:5000/api/Proveedor/GetAllProveedorConMedicamentoMenos50U",
    {
      method : "GET",
      headers : new Headers
      ({
          "Content-Type":"application/json"
      })
    })
    .then(res => {
      return res.json()
    })
    .then(response => 
    {
      let data = response

      const container = document.querySelector("#listProveedor")
      container.innerHTML = 
      `
        <div class="container pt-5">
            <div class="card">
                <div class="card-body">
                    <div class="overflow-auto" style="height: 400px;">
                        <table class="table table-striped-columns text-center">
                            <thead>
                                <tr>
                                  <th scope="col">Id</th>
                                  <th scope="col">Nombre</th>
                                  <th scope="col">Telefono</th>
                                  <th scope="col">Email</th>
                                  <th scope="col">Direccion</th>
                                </tr>
                            </thead>
                            <tbody id="containerLista">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      `

      const containerLista = document.querySelector("#containerLista")
      containerLista.innerHTML = ""
      data.forEach(proveedor => 
        {
          containerLista.innerHTML += 
          `
            <tr>
              <th>${proveedor.proveedorId}</th>
              <td>${proveedor.nombre}</td>
              <td>${proveedor.telefono}</td>
              <td>${proveedor.email}</td>
              <td>${proveedor.direccion}</td>
            </tr>
          `
        })
    })
    .catch(error => console.log(error))
  }

  getMedicamentoVendidosXProveedor()
  {
    fetch("http://localhost:5000/api/Proveedor/GetAllMedicamentosVendidosProveedor",
    {
      method : "GET",
      headers : new Headers
      ({
          "Content-Type":"application/json"
      })
    })
    .then(res => {
      return res.json()
    })
    .then(response => 
    {
      let data = response

      const container = document.querySelector("#listProveedor")
      container.innerHTML = 
      `
        <div class="container pt-5">
            <div class="card">
                <div class="card-body">
                    <div class="overflow-auto" style="height: 400px;">
                        <table class="table table-striped-columns text-center">
                            <thead>
                                <tr>
                                  <th scope="col">Id</th>
                                  <th scope="col">Nombre</th>
                                  <th scope="col">Total Vendido</th>
                                </tr>
                            </thead>
                            <tbody id="containerLista">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      `

      const containerLista = document.querySelector("#containerLista")
      containerLista.innerHTML = ""
      data.forEach(proveedor => 
        {
          containerLista.innerHTML += 
          `
            <tr>
              <th>${proveedor.proveedorId}</th>
              <td>${proveedor.nombreProveedor}</td>
              <td>${proveedor.medicamentoVendido}</td>
            </tr>
          `
        })
    })
    .catch(error => console.log(error))
  }

  totalComprasProveedor()
  {
    fetch("http://localhost:5000/api/Proveedor/totalComprasProveedor",
    {
      method : "GET",
      headers : new Headers
      ({
          "Content-Type":"application/json"
      })
    })
    .then(res => {
      return res.json()
    })
    .then(response => 
    {
      let data = response

      const container = document.querySelector("#listProveedor")
      container.innerHTML = 
      `
        <div class="container pt-5">
            <div class="card">
                <div class="card-body">
                    <div class="overflow-auto" style="height: 400px;">
                        <table class="table table-striped-columns text-center">
                            <thead>
                                <tr>
                                  <th scope="col">Id</th>
                                  <th scope="col">Nombre</th>
                                  <th scope="col">Telefono</th>
                                  <th scope="col">Email</th>
                                  <th scope="col">Direccion</th>
                                  <th scope="col">Total compra</th>
                                </tr>
                            </thead>
                            <tbody id="containerLista">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      `

      const containerLista = document.querySelector("#containerLista")
      containerLista.innerHTML = ""
      data.forEach(proveedor => 
        {
          containerLista.innerHTML += 
          `
            <tr>
              <th>${proveedor.proveedor.proveedorId}</th>
              <td>${proveedor.proveedor.nombre}</td>
              <td>${proveedor.proveedor.telefono}</td>
              <td>${proveedor.proveedor.email}</td>
              <td>${proveedor.proveedor.direccion}</td>
              <td>${proveedor.totalCompra}</td>
            </tr>
          `
        })
    })
    .catch(error => console.log(error))
  }

  getProveedorMasSuministrado()
  {
    fetch("http://localhost:5000/api/Proveedor/masHanSuministrado",
    {
      method : "GET",
      headers : new Headers
      ({
          "Content-Type":"application/json"
      })
    })
    .then(res => {
      return res.json()
    })
    .then(response => 
    {
      let data = response

      const container = document.querySelector("#listProveedor")
      container.innerHTML = 
      `
        <div class="container pt-5">
            <div class="card">
                <div class="card-body">
                    <div class="overflow-auto" style="height: 400px;">
                        <table class="table table-striped-columns text-center">
                            <thead>
                                <tr>
                                  <th scope="col">Id</th>
                                  <th scope="col">Nombre</th>
                                  <th scope="col">Telefono</th>
                                  <th scope="col">Email</th>
                                  <th scope="col">Direccion</th>
                                  <th scope="col">Cantidad suministrada</th>
                                </tr>
                            </thead>
                            <tbody id="containerLista">
                                <tr>
                                <th>${data.proveedor.proveedorId}</th>
                                <td>${data.proveedor.nombre}</td>
                                <td>${data.proveedor.telefono}</td>
                                <td>${data.proveedor.email}</td>
                                <td>${data.proveedor.direccion}</td>
                                <td>${data.cantidadMedicamentosSuministrados}</td>
                              </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      `
    })
    .catch(error => console.log(error))
  }

  selectConsultasVenta()
  {
    let select = document.querySelector("#selectConsultasVentas")
    
    select.addEventListener("change", event => 
    {
      let option = select.value
    
      switch (option) 
      {
        case "1":
          this.getVentasDespuesEnero()
          break;
        case "2":
          this.getVentaXEmpleado()
          break;
        case "3":
          this.getPromedioMedicamentosVendidos()
          break;
        default:
          console.log("sin opcion");  
          break;
      }
    })
  }

  getVentasDespuesEnero()
  {

  }

  getVentaXEmpleado()
  {
    fetch("http://localhost:5000/api/Venta/ventaxEmpleado",
    {
      method : "GET",
      headers : new Headers
      ({
          "Content-Type":"application/json"
      })
    })
    .then(res => {
      return res.json()
    })
    .then(response => 
    {
      let data = response

      const container = document.querySelector("#divParaListarElementos")
      container.innerHTML = 
      `
        <div class="container pt-5">
            <div class="card">
                <div class="card-body">
                    <div class="overflow-auto" style="height: 400px;">
                        <table class="table table-striped-columns text-center">
                            <thead>
                                <tr>
                                  <th scope="col">Id</th>
                                  <th scope="col">Nombre</th>
                                  <th scope="col">Total ventas</th>
                                </tr>
                            </thead>
                            <tbody id="containerLista">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      `

      const containerLista = document.querySelector("#containerLista")
      containerLista.innerHTML = ""
      data.forEach(venta => 
        {
          containerLista.innerHTML += 
          `
            <tr>
              <th>${venta.id}</th>
              <td>${venta.nombre}</td>
              <td>${venta.totalVentas}</td>
            </tr>
          `
        })
    })
    .catch(error => console.log(error))
  }

  getPromedioMedicamentosVendidos()
  {
    fetch("http://localhost:5000/api/Venta/promedioMedicamentosVendidos",
    {
      method : "GET",
      headers : new Headers
      ({
          "Content-Type":"application/json"
      })
    })
    .then(res => {
      return res.text()
    })
    .then(response => 
    {
      let data = response

      const container = document.querySelector("#divParaListarElementos")
      container.innerHTML = 
      `
        <div class="container pt-5">
            <div class="card">
                <div class="card-body">
                    <div class="overflow-auto" style="height: 400px;">
                        <table class="table table-striped-columns text-center">
                            <thead>
                                <tr>
                                  <th scope="col">Promedio de Medicamentos vendidos</th>
                                </tr>
                            </thead>
                            <tbody id="containerLista">
                              <tr>
                                <td>El promedio de medicamentos vendidos por venta es de: ${data}</td>
                              </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      `
    })
    .catch(error => console.log(error))
  }

}

customElements.define('navbar-menu',NavBarContent);