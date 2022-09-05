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


export interface ResponseCiclosCerrado {
    ciclos:  Ciclo[];
    mensaje: string;
    status:  string;
}

export interface Ciclo {
    anho: number;
    mes:  number;
}
export interface ResponseMesCerrado {
    mensaje?:            string;
    cabecera?:           Cabecera;
    parametrosGlobales?: ParametrosGlobales;
    status?:             string;
    detalle?:            Detalle[];
}

export interface Cabecera {
    descripcion:     string;
    saldoPendiente:  number;
    aporteMes:       number;
    descuento:       number;
    titulo:          string;
    programa:        string;
    liquidacionAso:  number;
    nombre:          string;
    capitalAportado: number;
    descuentoLetras: string;
    nroSocio:        number;
    empresa:         string;
    totalMes:        number;
}

export interface Detalle {
    nroDoc?:     string;
    cuota?:      string;
    monto?:      number;
    saldo?:      number;
    comentario?: string;
    interes?:    number;
}


export interface ResponseMovimientoBR {
    cabecera?:           CabeceraBR;
    mensaje?:            string;
    parametrosGlobales?: ParametrosGlobalesBR;
    detalle?:            DetalleBR[];
    status?:             string;
}

export interface CabeceraBR {
    saldoDisponible?: number;
    fechaSaldo?:      string;
    nombre?:          string;
}

export interface DetalleBR {
    nroTicket?:        string;
    fecha_transaccion?: string;
    total_consumo?:     number;
    horaTransaccion?:  string;
    ahorro_consumo?:    number;
    nroAutorizacion?:  number;
    direccion?:        string;
    estacion?:         string;
    cantidad?:         string;
    producto?:         string;
}

export interface ParametrosGlobalesBR {
    appVersionActualPlayStore: number;
    estado:                    boolean;
    importeMinimoOrden:        number;
    importeMinimoPrestamo:     number;
    requiereUpdate:            boolean;
}
export interface ResponseCasaComercial {
    comercios: Comercio[];
    mensaje:   string;
    status:    string;
}

export interface Comercio {
    codigoComercio: number;
    nombreComercio: string;
    cantMaxCuotas:  number;
}
export interface ResponseFormaDePago {
    FormasPago:         FormasPago[];
    mensaje:            string;
    parametrosGlobales: ParametrosGlobales;
    status:             string;
}

export interface FormasPago {
    formaPagoDesc: string;
    formaPagoId:   number;
}


export interface SolicitudOrden{
    usuario?:Usuario;
    comercio?:Comercio;
    montoSolicitado?:number;
    cantidadCuotas?:number;
    cuotaMes?:number;
    rol?:Rol;
    formaPago?:FormasPago;
}

export interface ResponseSolicitudOrden {
    descripcionRespuesta: string;
    parametrosGlobales:   ParametrosGlobales;
    codigoRespuesta:      string;
}
export interface OrdenSolicitada{
    nroSocio?:number;
    codComercio?:number;
    montoSolicitado?:number;
    cantidadCuotas?:number;
    cuotaMes?:number;
    rol?:string;
    formaPago?:number;
}