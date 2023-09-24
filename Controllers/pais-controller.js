import {opc} from '../Services/pais-service.js';

export class PaisController
{
        constructor()
        {
        }



listarPaises = async () =>
{
    let res = await opc['GET']();
    console.log(res)
    if(res == null) return console.alert('Fallo en la consulta');

    let divListarPais = document.querySelector("#listarPais");
    let listPaisHtml = '';
    res.forEach(pais => 
    {
           listPaisHtml += this.CartaPaisHTML(pais);

    });

    divListarPais.innerHTML= listPaisHtml;
}


CartaPaisHTML = (pais)=>
{
    let cardPais = /* html */  
    `
    <div class="col-sm-6">
        <div class="card" style="width: 18rem;">
            <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${pais.nombre}</h5>
                    <p class="card-text"></p>
                    <a href="#" class="btn btn-primary">${pais.paisId}</a>
                </div>
        </div> 	  
    </div>
    `
    return cardPais;
}

}


