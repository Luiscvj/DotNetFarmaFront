const opcProveedor =
{
    "GET":() => GetAll(),
    "GETBYID": (id) => GetById(id),
    "POST":(data) => Post(),
    "PUT":(id,data)=> Update(id,data),
    "DELETE": (id) => Delete(id)
}


const URL_API = 'http://localhost:5000/api/Proveedor';
const config =
{
    headers: new Headers
    ({
        "Contente-Type" :"application/json"
    }),
};


let GetAll = async()=>
{
    config.method ='GET';

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
    config.method ="POST";
    config.body = datos;
    try
    {

        let res = await (await fetch(`${URL_API}`,config)).json();
    
        if(res.status == 201)
        {
            console.log("Registro Exitoso");

            return res;
        }
    }catch(error)
    {
        console.error(error);
    }

}



export 
{
    opcProveedor

}