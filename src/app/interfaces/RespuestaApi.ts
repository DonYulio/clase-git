import { Producto } from "./Producto";

export interface RespuestaApi {
    total: number;
    skip: number;
    limit: number;
    products: Producto[];
}