export class PutFormPaciente extends HTMLElement
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
        <div class="modal fade" id="editarPaciente" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">EDITAR PACIENTE</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="putFormPaciente" class="row g-3">
                            <div class="col-12">
                                <label for="txtNombresPut" class="form-label">Nombres</label>
                                <input type="text" class="form-control" id="txtNombresPutPaci">
                            </div>
                            <div class="col-12">
                                <label for="txtApellidosPut" class="form-label">Apellidos</label>
                                <input type="text" class="form-control" id="txtApellidosPutPaci">
                            </div>
                            <div class="col-12">
                                <label for="txtDireccionPut" class="form-label">Direccion</label>
                                <input type="text" class="form-control" id="txtDireccionPutPaci">
                            </div>
                            <div class="col-12">
                                <label for="txtTelefonoPut" class="form-label">Telefono</label>
                                <input type="text" class="form-control" id="txtTelefonoPutPaci">
                            </div>
                            <div class="col-12 text-center">
                                <button id="btnFormPacientePut" class="btn btn-success" data-bs-dismiss="modal" type="submit">ACTUALIZAR</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>      
        `
    }
}
customElements.define("put-form-paciente", PutFormPaciente)