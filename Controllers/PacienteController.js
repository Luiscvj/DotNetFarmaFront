import { Fetch } from "./Fetch.js"

export class PacienteController extends Fetch
{
    constructor()
    {
        super()
    }

    controllerGetPaciente() 
    {
        let url = "http://localhost:5000/api/Paciente/GetAll"
        let options = 
        {
            method : "GET",
            headers : new Headers
            ({
                "Content-Type":"application/json"
            })
        }
        return this.fetch(url, options)    
    }

    controllerPostPaciente(data)
    {
        let url = "http://localhost:5000/api/Paciente"
        let options = 
        {
            method : "POST",
            headers : new Headers
            ({
                "Content-Type":"application/json"
            }),
            body : JSON.stringify(data)
        }
        return this.fetch(url, options) 
    }

    controllerPutPaciente(id, data)
    {
        let url = `http://localhost:5000/api/Paciente/${id}`
        let options = 
        {
            method : "PUT",
            headers : new Headers
            ({
                "Content-Type":"application/json"
            }),
            body : JSON.stringify(data)
        }
        return this.fetch(url, options) 
    }

    controllerDeletePaciente(id)
    {
        let url = `http://localhost:5000/api/Paciente/${id}`
        let options = 
        {
            method : "DELETE",
            headers : new Headers
            ({
                "Content-Type":"application/json"
            })
        }
        return this.fetch(url, options)
    }
}