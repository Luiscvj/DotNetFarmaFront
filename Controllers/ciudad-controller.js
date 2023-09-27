import { opcCiudad } from "../Services/ciudad-service.js";

export class CiudadController
 {
    constructor()
    {
    }

    PostCiudad = (data) =>
    {
        try
        {
                opcCiudad['POST'](data);
        }catch(error)
        {
            console.error(error);
        }
    }

    listarCiudades = async () =>
{
    let res = await opc['GET']();
    console.log(res)
    if(res == null) return console.alert('Fallo en la consulta');

    let divListarCiudad = document.querySelector("#listarCiudad");
    let listCiudadHtml = '';
    res.forEach(ciudad => 
    {
           listCiudadHtml += this.CartaCiudadHTML(ciudad);

    });

    divListarCiudad.innerHTML= listCiudadHtml;
}


CartaCiudadHTML = (ciudad)=>
{
    let cardCiudad = /* html */  
    `
    <div class="col-sm-6">
        <div class="card" style="width: 18rem;">
            <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${ciudad.Nombre}</h5>
                    <p class="card-text"></p>
                    <a href="#" class="btn btn-primary">${ciudad.CiudadId}</a>
                </div>
        </div> 	  
    </div>
    `
    return cardCiudad;
}
 }