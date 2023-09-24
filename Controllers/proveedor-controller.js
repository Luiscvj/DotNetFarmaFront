import { opcProveedor } from "../Services/proveedor-service";

export class ProveedorController
 {
    constructor()
    {
    }

    PostProveedor = (data) =>
    {
        try
        {
                opcProveedor['POST'](data);
        }catch(error)
        {
            console.error(error);
        }
    }

 }