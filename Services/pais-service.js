const opc =
{
    "GET" : () => getAllPais(),
    "GETBYID":() => GetByIdPais(),
    "POST": (data) => PostData(data),
    "PUT" : (id,data)=> Update(id,data),
    "DELETE" :(id) => DeleteData(id)
}


const URL_API ='http://localhost:5000/api';
let config =
{
   headers: new Headers
    ({
          "Content-Type":"application/json",
    }),
};


let getAllPais = async () => 
{
    config.method = "GET";
    try 
    {
            let res = await fetch(`${URL_API}/pais/GetAll`,config);

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

export 
{
    opc
}

