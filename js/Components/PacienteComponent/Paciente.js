import { PacienteController } from "../../../Controllers/PacienteController.js"
import { PostFormPaciente } from "./PostFormPaciente.js"
import { PutFormPaciente } from "./PutFormPaciente.js"

class Paciente extends HTMLElement
{
    constructor()
    {
        super()
        this.fetch = new PacienteController()
        this.pacientes = []
        this.render()
        this.getPaciente()
        this.postDataPaciente()
    }
    
    render = () => 
    {
        this.innerHTML = 
        `
            <div class="container pt-5">
                <div class="card">
                    <div class="card-header">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#registrarPaciente">
                            REGISTRAR
                        </button>              
                    </div>
                    <div class="card-body">
                        <div class="overflow-auto" style="height: 400px;">
                            <table class="table table-striped-columns text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Nombres</th>
                                        <th scope="col">Apellidos</th>
                                        <th scope="col">Direccion</th>
                                        <th scope="col">Telefono</th>
                                        <th scope="col">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody id="containerPacientes">
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <post-form-paciente></post-form-paciente>
                <put-form-paciente></put-form-paciente>
            </div>
        `
    }

    getPaciente()
    {
        this.fetch.controllerGetPaciente()
        .then(data => 
        {
            this.pacientes = data
            console.log(data);
            this.mostrarPacientes(data)
        })
        .catch(err => console.log(`Error: ${err}`))
    }

    mostrarPacientes(data)
    {
        const containerPaciente = document.querySelector("#containerPacientes")
        containerPaciente.innerHTML = ""
        data.forEach(paciente => {
            containerPaciente.innerHTML +=
            `
                <tr>
                    <th>${paciente.pacienteId}</th>
                    <td>${paciente.nombre}</td>
                    <td>${paciente.apellidos}</td>
                    <td>${paciente.direccion}</td>
                    <td>${paciente.telefono}</td>
                    <td>
                        <button id="deletePaciente" class="btn btn-danger text-white" data-idDelete="${paciente.pacienteId}">
                            ELIMINAR
                        </button>
                        <button id="putPaciente" type="button" class="btn btn-warning text-white" data-idPut="${paciente.pacienteId}" data-bs-toggle="modal" data-bs-target="#editarPaciente">
                            EDITAR
                        </button>
                    </td>
                </tr>
            `
        });
        this.deletePaciente()
        this.listenerBtnsEditar()
    }

    postDataPaciente()
    {
        const formPostPaciente = document.querySelector("#postFormPaciente")
        formPostPaciente.addEventListener("submit", event => 
        {
            event.preventDefault()

            const data = 
            {
                nombre    : document.querySelector("#txtNombresPostPaci").value,
                apellidos : document.querySelector("#txtApellidosPostPaci").value,
                direccion : document.querySelector("#txtDireccionPostPaci").value,
                telefono  : document.querySelector("#txtTelefonoPostPaci").value
            }

            this.postPaciente(data, formPostPaciente)
        })
        
    }

    postPaciente(data, formulario)
    {
        this.fetch.controllerPostPaciente(data)
        .then(() => 
        {
            this.getPaciente()
            console.log("Paciente registrado con exito", data)
            formulario.reset()
        })
        .catch(err => console.log("Error: ", err))
    }

    putData(id)
    {
        const formPutPaciente = document.querySelector("#putFormPaciente")
        formPutPaciente.addEventListener("submit", event =>
        {
            event.preventDefault()

            let data = 
            {
                pacienteId : id,
                nombre    : document.querySelector("#txtNombresPutPaci").value,
                apellidos : document.querySelector("#txtApellidosPutPaci").value,
                direccion : document.querySelector("#txtDireccionPutPaci").value,
                telefono  : document.querySelector("#txtTelefonoPutPaci").value
            }

            this.fetch.controllerPutPaciente(id, data)
            .then(() => 
            {
                formPutPaciente.reset()
                location.reload()
            })
        })
    }

    listenerBtnsEditar()
    {
        let btnsEditar = document.querySelectorAll("#putPaciente")
        btnsEditar.forEach(btn => 
        {
            btn.addEventListener("click", event =>
            {
                event.preventDefault()
                let idPaciente = btn.getAttribute("data-idPut")
                let dataPaciente = this.pacientes.find(x => x.pacienteId == idPaciente)

                document.querySelector("#txtNombresPutPaci").value = dataPaciente.nombre
                document.querySelector("#txtApellidosPutPaci").value = dataPaciente.apellidos
                document.querySelector("#txtDireccionPutPaci").value = dataPaciente.direccion
                document.querySelector("#txtTelefonoPutPaci").value = dataPaciente.telefono

                this.putData(idPaciente) 
            })
        })
    }

    deletePaciente()
    {
        const btnsDelete = document.querySelectorAll("#deletePaciente")
        
        btnsDelete.forEach(btn => 
        {
            btn.addEventListener("click", event => 
            {
                event.preventDefault()
                const idPaciente = btn.getAttribute("data-idDelete")

                this.fetch.controllerDeletePaciente(idPaciente)
                .then(() => 
                {
                    this.getPaciente()
                    console.log("Paciente eliminado con exito");
                })
                .catch(err => console.log("Error: ", err))
            })  
        })
    }
}
customElements.define("paciente-component", Paciente);