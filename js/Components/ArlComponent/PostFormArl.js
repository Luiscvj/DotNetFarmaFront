
export class PostFormArl extends HTMLElement
{
    constructor()
    {
        super()
        this.render()
    }
    
    render = () => 
    {
        this.innerHTML = 
        `
        <div class="modal fade" id="registrarArl" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">REGISTRAR ARL</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="postFormArl" class="row g-3">
                            <div class="col-12">
                                <label for="txtNombrePost" class="form-label">Nombre</label>
                                <input type="text" class="form-control" id="txtNombrePost">
                            </div>
                            <div class="col-12">
                                <label for="txtTelefonoPost" class="form-label">Telefono</label>
                                <input type="text" class="form-control" id="txtTelefonoPost">
                            </div>
                            <div class="col-12">
                                <label for="txtEmailPost" class="form-label">Email</label>
                                <input type="text" class="form-control" id="txtEmailPost">
                            </div>
                            <div class="col-12">
                                <label for="txtDireccionPost" class="form-label">Direccion</label>
                                <input type="text" class="form-control" id="txtDireccionPost">
                            </div>
                            <div class="col-12 text-center">
                                <button id="btnFormPost" class="btn btn-success" data-bs-dismiss="modal" type="submit">ENVIAR</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>      
        `
    }
}
customElements.define("post-form-arl", PostFormArl)