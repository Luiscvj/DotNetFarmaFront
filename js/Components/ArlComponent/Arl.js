import { ArlController } from "../../../Controllers/ArlController.js"
import { PostFormArl } from "./PostFormArl.js"
import { PutFormArl } from "./PutFormArl.js"

class Arl extends HTMLElement
{
    constructor()
    {
        super()
        this.fetch = new ArlController()
        this.arls = []
        this.render()
        this.getArl()
        this.postDataArl()
    }
    
    render = () => 
    {
        this.innerHTML = 
        `
            <div class="container pt-5">
                <div class="card">
                    <div class="card-header">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#registrarArl">
                            REGISTRAR
                        </button>              
                    </div>
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
                                        <th scope="col">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody id="containerArls">
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <post-form-arl></post-form-arl>
                <put-form-arl></put-form-arl>
            </div>
        `
    }

    getArl()
    {
        this.fetch.controllerGetArl()
        .then(data => 
        {
            this.arls = data
            console.log(data);
            this.mostrarArls(data)
        })
        .catch(err => console.log(`Error: ${err}`))
    }

    mostrarArls(data)
    {
        const containerArls = document.querySelector("#containerArls")
        containerArls.innerHTML = ""
        data.forEach(arl => {
            containerArls.innerHTML +=
            `
                <tr>
                    <th>${arl.arlId}</th>
                    <td>${arl.nombre}</td>
                    <td>${arl.telefono}</td>
                    <td>${arl.email}</td>
                    <td>${arl.direccion}</td>
                    <td>
                        <button id="deleteArl" class="btn border border-3 border-danger text-danger" data-idDelete="${arl.arlId}">
                            ELIMINAR
                        </button>
                        <button id="putArl" type="button" class="btn border border-3 border-warning text-warning" data-idPut="${arl.arlId}" data-bs-toggle="modal" data-bs-target="#editarArl">
                            EDITAR
                        </button>
                    </td>
                </tr>
            `
        });
        this.deleteArl()
        this.listenerBtnsEditar()
    }

    postDataArl()
    {
        const formPostArl = document.querySelector("#postFormArl")
        formPostArl.addEventListener("submit", event => 
        {
            event.preventDefault()

            const data = 
            {
                nombre :   document.querySelector("#txtNombrePost").value,
                telefono:  document.querySelector("#txtTelefonoPost").value,
                email:     document.querySelector("#txtEmailPost").value,
                direccion: document.querySelector("#txtDireccionPost").value
            }

            this.postArl(data, formPostArl)
        })
        
    }

    postArl(data, formulario)
    {
        this.fetch.controllerPostArl(data)
        .then(() => 
        {
            this.getArl()
            console.log("Arl registrado con exito", data)
            formulario.reset()
        })
        .catch(err => console.log("Error: ", err))
    }

    putData(id)
    {
        const formPutArl = document.querySelector("#putFormArl")
        formPutArl.addEventListener("submit", event =>
        {
            event.preventDefault()

            let data = 
            {
                nombre :   document.querySelector("#txtNombrePut").value,
                telefono:  document.querySelector("#txtTelefonoPut").value,
                email:     document.querySelector("#txtEmailPut").value,
                direccion: document.querySelector("#txtDireccionPut").value
            }

            this.fetch.controllerPutArl(id, data)
            .then(() => 
            {
                formPutArl.reset()
                location.reload()
            })
        })
    }

    listenerBtnsEditar()
    {
        let btnsEditar = document.querySelectorAll("#putArl")
        btnsEditar.forEach(btn => 
        {
            btn.addEventListener("click", event =>
            {
                event.preventDefault()
                let idArl = btn.getAttribute("data-idPut")
                let dataArl = this.arls.find(x => x.arlId == idArl)

                document.querySelector("#txtNombrePut").value = dataArl.nombre
                document.querySelector("#txtTelefonoPut").value = dataArl.telefono
                document.querySelector("#txtEmailPut").value = dataArl.email
                document.querySelector("#txtDireccionPut").value = dataArl.direccion

                this.putData(idArl) 
            })
        })
    }

    deleteArl()
    {
        const btnsDelete = document.querySelectorAll("#deleteArl")
        
        btnsDelete.forEach(btn => 
        {
            btn.addEventListener("click", event => 
            {
                event.preventDefault()
                const idArl = btn.getAttribute("data-idDelete")

                this.fetch.controllerDeleteArl(idArl)
                .then(() => 
                {
                    this.getArl()
                    console.log("Arl eliminado con exito");
                })
                .catch(err => console.log("Error: ", err))
            })  
        })
    }
}
customElements.define("arl-component", Arl);