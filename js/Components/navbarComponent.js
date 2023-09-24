class NavBarContent extends HTMLElement
{
    constructor()
    {
        super();
        this.render();
        this.eventoMostrarNavBar();

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
                          <a class="nav-link navPais"  data-verocultar='[["#frmRegPais","#divPais"],"#listarPais"]'  aria-current="page" href="#">Registrar</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link navPais" data-verocultar='[["#listarPais","#divPais"],"#frmRegPais"]' href="#">Listar</a>
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



      <div id="navProveedor">
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
              
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                          <a class="nav-link navProveedor "    data-hideformproveedor='[["#divProveedor","#frmRegProveedor"],["#listProveedor"]]' aria-current="page" href="#">Registrar Proveedor</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link  navProveedor"  data-hideformproveedor='[["#divProveedor","#listProveedor"],["#frmRegProveedor"]]' href="#">Listar Proveedores</a>
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

        
        `

    }


eventoMostrarNavBar = ()=> 
{
    
    document.querySelectorAll(".entidades").forEach((val,id)=>
    {
        val.addEventListener("click",(e)=>
        {
            let datosVerOcultar = JSON.parse(e.target.dataset.verocultar);
            console.log(datosVerOcultar[1]);

           datosVerOcultar[0].forEach(opcionVer =>
            {
               let datosVer = document.querySelector(opcionVer);
               datosVer.style.display ='block';
            })
           

            datosVerOcultar[1].forEach(opcion =>
                {
                   console.log(opcion);
                    let divOcultar = document.querySelector(opcion);
                    divOcultar.style.display = 'none';
                })
            
        })
    })
}

}

customElements.define('navbar-menu',NavBarContent);