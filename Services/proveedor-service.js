


const opcProveedor =
{
    "GET":() => GetAll(),
    "GETBYID": (id) => GetById(id),
    "POST":(data) => Post(data),
    "PUT":(id,data)=> Update(id,data),
    "DELETE": (id) => Delete(id)
}

const URL_API = 'http://localhost:5000/api/Proveedor';

   const Header= 
   {
       headers: new Headers
       ({
           "Content-Type" :"application/json"
       }),

   }


let GetAll = async()=>
{   
    const config =
    {
        method :"GET",
        headers :Header.headers
    };
    
    

    try
    {   
        let res = await fetch(`${URL_API}/GetAll`,config);

        if(res.status == 200)
        {
            console.log("Exito en la consulta");
            return await res.json()
        }
        else if(res.status == 404)
        {
            return console.log("No hay registros en la base de datos")
            return null;
        }
        else
        {
           console.log("Error en el servidor");
           return null;
        }

    }catch(error)
    {
        console.error(error)
    }
}



let Post = async (data) =>
{ 

    let datos = JSON.stringify(data);
    
    const config =
    {
        method :"POST",
        headers :Header.headers,
        body :datos
    };
   
    
   
    try
    {

        let res =await fetch(`${URL_API}`,config);
    
        if(res.status == 201)
        {
            console.log("Registro Exitoso");

            return await res.json();
        }
    }catch(error)
    {
        console.error(error);
    }

}


    let Delete = async(id) =>
    {
           
    const config =
    {
        method :"DELETE",
        headers :Header.headers,
       
    };

        try
        {
            let response = await fetch(`${URL_API}/${id}`,config)

            if(response.status == 200)
            {
                console.log("Registro eliminado con exito");
                return response;
            }

        }catch(error)
        {
            console.error(error)
        }

    }

 let Update = async (id,data) =>
 {  
    const config =
    {
        method :"PUT",
        headers :Header.headers,
       
    };
     try
     { 
        let datos = JSON.stringify(data);
        config.body = datos;
        let response = await fetch(`${URL_API}?id=${id}`,config)
    
        if(response.status == 200)  
            {
                console.log('Registro actualizado con exito');
                return response;
            }

        else
        {
            return `Error en la consulta ${response.status}`;
        }

     }catch(error)
     {
        console.log(error);
     }


   
    
 }
export 
{
    opcProveedor

}