const opcMedicamentoCompra =
{
    "GET" : () => GetMedicamentoCompra(),
    "GETBYID":(id) => GetByIdMedicamentoCompra(id),
    "POST": (data) => PostMedicamentoCompra(data),
    "PUT" : (id,data)=> UpdateMedicamentoCompra(id,data),
    "DELETE" :(id) => DeleteMedicamentoCompra(id)
}


const URL_API ='http://localhost:5000/api/MedicamentoCompra';
const Header =
{
    headers : new Headers
    ({
        "Content-Type" : "application/json"
    })
}


let GetMedicamentoCompra = async () => 
{   
    const config =
    {
        method : "GET",
        headers : Header.headers
    }
  
    try 
    {
            let res = await fetch(`${URL_API}/GetAllMedicamentoCompraFechaCompra`,config);

            if(res.status == 200)
            {
                console.log("Exito en la consulta");
                
                return await res.json();

            }else if(res.status == 404)
            {
                console.log("Registro No encontrado");
                return null;
            }
            else
            {
                console.log("Fallo en la consulta")
                return null;
            }
    }catch(error)
    {
        console.error(error)
    }
}

let  GetByIdMedicamentoCompra = async(id)=>
{    
    const config =
    {
        method : "GET",
        headers : Header.headers
    }
  
    try
    {
        let response = await fetch(`${URL_API}/${id}`,config);
        if(response.status == 200)
        {
            return await response.json();
        }
    }catch(error)
    {
        console.error(error);
    }
}


let PostMedicamentoCompra = async (data) =>
{
    let datos = JSON.stringify(data);
    

    try
    {
        const config =
        {
            method : "POST",
            headers : Header.headers,
            body : datos        
        }

        let response = await fetch(`${URL_API}`,config);

        if (response.status == 201)
        {
            console.log("Registro exitosa");
            return await response.json();
        }

    }catch(error)
    {
        console.error(error);
    }
}

let DeleteMedicamentoCompra = async(id) =>
{
    const  config = 
    {
        method : "DELETE",
        headers: Header.headers
    };

    try
    {
        let response = await fetch(`${URL_API}/${id}`,config);
        if(response.status == 200) console.log("registro Eliminado")
    }catch(error)
    {
        console.error(error)
    }

}

let UpdateMedicamentoCompra = async (id,data) => 
{    console.log(id,data);
    let datosPais = JSON.stringify(data);
    
    const config =
    {
        method  : "PUT",
        headers : Header.headers,
        body    : datosPais
    }


    try
    {       
        let response = await fetch(`${URL_API}?id=${id}`,config);

        if(response.status ==200)
        {
            console.log("Actualizacion exitosa");
            return response;
        }
    }catch(error)
    {
        console.error(error)
    }
}

export 
{
    opcMedicamentoCompra
}

