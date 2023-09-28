export class PutFormArl extends HTMLElement
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
        <div class="modal fade" id="editarArl" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">EDITAR ARL</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="putFormArl" class="row g-3">
                            <div class="col-12">
                                <label for="txtNombrePut" class="form-label">Nombre</label>
                                <input type="text" class="form-control" id="txtNombrePut">
                            </div>
                            <div class="col-12">
                                <label for="txtTelefonoPut" class="form-label">Telefono</label>
                                <input type="text" class="form-control" id="txtTelefonoPut">
                            </div>
                            <div class="col-12">
                                <label for="txtEmailPut" class="form-label">Email</label>
                                <input type="text" class="form-control" id="txtEmailPut">
                            </div>
                            <div class="col-12">
                                <label for="txtDireccionPut" class="form-label">Direccion</label>
                                <input type="text" class="form-control" id="txtDireccionPut">
                            </div>
                            <div class="col-12 text-center">
                                <button id="btnFormPut" class="btn btn-success" data-bs-dismiss="modal" type="submit">ACTUALIZAR</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>      
        `
    }
}
customElements.define("put-form-arl", PutFormArl)