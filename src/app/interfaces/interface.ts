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