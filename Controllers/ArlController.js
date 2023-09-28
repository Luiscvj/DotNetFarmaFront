import { Fetch } from "./Fetch.js"

export class ArlController extends Fetch
{
    constructor()
    {
        super()
    }

    controllerGetArl() 
    {
        let url = "http://localhost:5000/api/Arl"
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

    controllerPostArl(data)
    {
        let url = "http://localhost:5000/api/Arl/"
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

    controllerPutArl(id, data)
    {
        let url = `http://localhost:5000/api/Arl/${id}`
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

    controllerDeleteArl(id)
    {
        let url = `http://localhost:5000/api/Arl/${id}`
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