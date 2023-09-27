import { opcEps } from "../Services/eps-service.js";

export class EpsController
 {
    constructor()
    {
    }

    PostEps = (data) =>
    {
        try
        {
                opcEps['POST'](data);
        }catch(error)
        {
            console.error(error);
        }
    }

    listarEpses = async () =>
    {
        let res = await opc['GET']();
        console.log(res)
        if(res == null) return console.alert('Fallo en la consulta');

        let divListarEps = document.querySelector("#listarEps");
        let listEpsHtml = '';
        res.forEach(eps => 
        {
            listEpsHtml += this.CartaEpsHTML(eps);

        });

        divListarEps.innerHTML= listEpsHtml;
    }


    CartaEpsHTML = (eps)=>
    {
        let cardEps = /* html */  
        `
        <div class="col-sm-6">
            <div class="card" style="width: 18rem;">
                <img src="..." class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${eps.nombre}</h5>
                        <p class="card-text"></p>
                        <a href="#" class="btn btn-primary">${eps.EpsId}</a>
                    </div>
            </div> 	  
        </div>
        `
        return cardEps;
    }
 }