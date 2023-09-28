const opcMedicamento =
{
    "GET" : () => GetMedicamento(),
    "GETBYID":(id) => GetByIdMedicamento(id),
    "POST": (data) => PostMedicamento(data),
    "PUT" : (id,data)=> UpdateMedicamento(id,data),
    "DELETE" :(id) => DeleteMedicamento(id)
}


const URL_API ='http://localhost:5000/api/Medicamento';
const Header =
{
    headers : new Headers
    ({
        "Content-Type" : "application/json"
    })
}


let GetMedicamento = async () => 
{   
    const config =
    {
        method : "GET",
        headers : Header.headers
    }
  
    try 
    {
            let res = await fetch(`${URL_API}`,config);

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

let  GetByIdMedicamento = async(id)=>
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


let PostMedicamento = async (data) =>
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

let DeleteMedicamento = async(id) =>
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

let UpdateMedicamento = async (id,data) => 
{
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
    opcMedicamento
}

