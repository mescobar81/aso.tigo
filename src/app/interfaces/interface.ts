export interface ResponseUsuario {
    recordarSesion: boolean;
    usuario: Usuario;
    parametrosGlobales: ParametrosGlobales;
}

export interface ParametrosGlobales {
    appVersionActualPlayStore: number;
    estado: boolean;
    importeMinimoOrden: number;
    importeMinimoPrestamo: number;
    requiereUpdate: boolean;
    topicos: any[];
}

export interface Usuario {
    nroSocio: string;
    valido: boolean;
    documento: number;
    mensaje: string;
    nombre: string;
    solicitarNuevoPass: string;
    rol: Rol;
    codaso: string;
    status: string;
}

export interface Rol {
    roles: string[];
}

export interface UsuarioRequest {
    documento: string;
    clave: string;
    recordarSesion?: boolean;
    device?: {
        os: string;
        version: string;
        model: string;
        ip: string;
    }
    notificacion?: {
        idTokenFirebase: string;
    }
}
export interface MenuItem {
    rol:   string;
    menus: Menu[];
}

export interface Menu {
    title?:    string;
    icon?:     string;
    ruta?:     string;
    activo?:   boolean;
    open:      boolean,
    submenus?: Menu[];
}

export interface ResponseMesAbierto {
    cabecera:           Cabecera;
    mensaje:            string;
    parametrosGlobales: ParametrosGlobales;
    detalle:            Detalle[];
    status:             string;
}

export interface Cabecera {
    descripcion:    string;
    fecha:          string;
    estado:         string;
    nombreApellido: string;
    integrado:      number;
    totalDescuento: number;
    empresa:        string;
    totalCuenta:    number;
}

export interface Detalle {
    cuota:        string;
    monto:        number;
    saldo:        number;
    comentario:   string;
    nroDocumento: null | string;
    interes:      number;
}

export interface ParametrosGlobales {
    appVersionActualPlayStore: number;
    estado:                    boolean;
    importeMinimoOrden:        number;
    importeMinimoPrestamo:     number;
    requiereUpdate:            boolean;
}
