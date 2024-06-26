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
    recordarSesion: boolean;
    device?: {
        os: string;
        version: string;
        model: string;
        ip: string;
    }
    notificacion: {
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
    saldo_pendiente:  number;
    aporte_mes:       number;
    descuento:       number;
    titulo:          string;
    programa:        string;
    liquidacion_aso:  number;
    nombre:          string;
    capital_aportado: number;
    descuentoLetras: string;
    nroSocio:        number;
    empresa:         string;
    total_mes:        number;
}

export interface Detalle {
    nroDoc?:     string;
    cuota?:      string;
    monto?:      string;
    saldo?:      string;
    comentario?: string;
    interes?:    string;
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
    montoSolicitado?:string;
    cantidadCuotas?:number;
    cuotaMes?:number;
    rol?:Rol;
    formaPago?:FormasPago;
}

export interface ResponseSolicitudOrden {
    mensaje:              string;
    descripcionRespuesta: string;
    parametrosGlobales:   ParametrosGlobales;
    codigoRespuesta:      string;
    status:               string;
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

export interface ResponseOrdenPendiente {
    mensaje:            string;
    parametrosGlobales: ParametrosGlobales;
    status:             string;
    solicitudes:        SolicitudPendiente[];
}

export interface SolicitudPendiente {
    aprobante:      string;
    monto:          number;
    fechaSolicitud: string;
    fechaProceso:   string;
    codEmpresa:     number;
    nro:            number;
    nombre:         string;
    cantidadCuotas: number;
    nombreEmpresa:  string;
}


export interface ResponseOrdenRechazada {
    mensaje:            string;
    parametrosGlobales: ParametrosGlobales;
    status:             string;
    solicitudes:        SolicitudRechazada[];
}

export interface SolicitudRechazada {
    rol:            Rol;
    usuarioProceso: string;
    motivo:         string;
    monto:          number;
    fechaSolicitud: string;
    fechaProceso:   string;
    codEmpresa:     number;
    nroSocio:       number;
    nro:            number;
    nombre:         string;
    cantidadCuotas: number;
    nombreEmpresa:  string;
}

export interface ResponseOrdenLeido {
    documento: number;
    mensaje:   string;
    parametrosGlobales: ParametrosGlobales;
    status:    string;
}

export interface ResponseSolicitudTicket {
    tiposSolicitud: TiposSolicitud[];
    mensaje:        string;
    status:         string;
}

export interface TiposSolicitud {
    descripcion: string;
    id:          number;
}

export interface PopoverItem{
    id:     number;
    title:  string;
    route:  string;
    icon:   string;
    enabled: boolean;
}

export interface CrearTicket{
    documento: string;
    tipoSolicitud:number;
    asunto: string;
    rol:string;
    codUsuario:string;
    comentario:string;
}
export interface ResponseTicketSuccess {
    mensaje: string;
    status:  string;
}

export interface RequestCambioContraseña{
    documento:string;
    claveActual:string;
    claveNueva:string;
    confirmacionClave:string;
}

export interface ResponseClaveModificada {
    documento: number;
    mensaje:   string;
    status:    string;
    parametrosGlobales: ParametrosGlobales;
}
export interface ResponseOrdenByRol {
    mensaje:     string;
    status:      string;
    solicitudes: Solicitud[];
}

export interface Solicitud {
    monto:          number;
    fechaSolicitud: string;
    fechaProceso:   string;
    nroSocio:       number;
    codEmpresa:     number;
    nro:            number;
    nombre:         string;
    cantidadCuotas: number;
    nombreEmpresa:  string;
    codAso:         string;
}

export interface ResponseStatusOrden{
    mensaje :string;
    status  :string;
}

export interface ResponseValidaInscripcion {
    nroSolicitud:         number;
    descripcionRespuesta: string;
    beneficio:            string;
    mensaje:              string;
    comentario:           string;
    parametrosGlobales:   ParametrosGlobales;
    codigoRetorno:        number;
    status:               string;
}

export interface ResponseSolicitudPlan {
    Planes:  Plane[];
    mensaje: string;
    status:  string;
}

export interface Plane {
    idplan:   string;
    descPlan: string;
}
export interface ResponseGrupoFamiliar {
    mensaje:      string;
    status:       string;
    GrupoFamilia: GrupoFamilia[];
}

export interface GrupoFamilia {
    codigo:      number;
    Monto:       number;
    DescripSevi: string;
}

export interface ResponseStatusConsultaBeneficio{
    mensaje :string;
    status  :string;
}

export interface ResponseAdherente {
    Adherente: Adherente[];
    mensaje:   string;
    status:    string;
}

export interface Adherente {
    codigo:      number;
    Monto:       number;
    DescripSevi: string;
}

export interface ResponseStatusMessage{
    mensaje: string;
    status: string;
}

export interface ResponseRecuperarAdjuntos {
    ArchivoAdjunto: ArchivoAdjunto[];
    mensaje:        string;
    status:         string;
}

export interface ArchivoAdjunto {
    adjunto: string;
    idreg:   number;
}

export interface ResponseBeneficiarioAdherente {
    descripcionRespuesta: string;
    estado:               string;
    codigo:               number;
    Popcion:              string;
    idplan:               string;
    Nomserv:              string;
    codsegmento:          string;
    comentario:           string;
    parametrosGlobales:   ParametrosGlobalesAdherente;
    codigoRetorno:        number;
    nroSolicitud:         number;
    beneficio:            string;
    nroSocio:             number;
    mensaje:              string;
    status:               string;
}

export interface ParametrosGlobalesAdherente {
    appVersionActualPlayStore: number;
    estado:                    boolean;
    importeMinimoOrden:        number;
    importeMinimoPrestamo:     number;
    requiereUpdate:            boolean;
}

export interface ResponseNuevoGrupoFamiliar {
    NuevoGrupoFamilia: NuevoGrupoFamiliar[];
    mensaje:           string;
    status:            string;
}

export interface NuevoGrupoFamiliar {
    Monto:         number;
    Nuevocodigo:   number;
    DescripSevi:   string;
    Nuevosegmento: string;
}

export interface ResponseAdherente {
    Adherente: Adherente[];
    mensaje:   string;
    status:    string;
}

export interface Adherente {
    codigo:      number;
    Monto:       number;
    DescripSevi: string;
}

export interface ResponseStatusCotizaAdherente{
    nroSolicitud: string;
    mensaje: string;    
    status: string;
}

export interface ResponseValidarBaja {
    descripcionRespuesta: string;
    estado:               string;
    codigo:               number;
    Popcion:              string;
    idplan:               string;
    Nomserv?:              string;
    codsegmento:          string;
    comentario:           string;
    parametrosGlobales:   ParametrosGlobalesBaja;
    codigoRetorno:        number;
    nroSolicitud:         number;
    beneficio:            string;
    nroSocio:             number;
    mensaje:              string;
    status:               string;
}

export interface ParametrosGlobalesBaja {
    appVersionActualPlayStore: number;
    estado:                    boolean;
    importeMinimoOrden:        number;
    importeMinimoPrestamo:     number;
    requiereUpdate:            boolean;
}

export interface ResponseConsultaAdherenteBySocio {
    AdherenteSocio: AdherenteSocio[];
    mensaje:        string;
    status:         string;
}

export interface AdherenteSocio {
    codigo:      number;
    beneficio:   string;
    segmento:    string;
    codplan:     string;
    descripSevi: string;
}

export interface ResponseStatusBajaParcial{
    nroSolicitud:string;
    mensaje: string;
    status: string;
}

export interface ResponseTicketsAbierto {
    tickets:            Ticket[];
    mensaje:            string;
    parametrosGlobales: ParametrosGlobales;
    status:             string;
}

export interface ParametrosGlobales {
    appVersionActualPlayStore: number;
    estado:                    boolean;
    importeMinimoOrden:        number;
    importeMinimoPrestamo:     number;
    requiereUpdate:            boolean;
}

export interface Ticket {
    cabecera: Cabecera;
    detalle:  DetalleTicket[];
}

export interface Cabecera {
    asunto:    string;
    nroticket: number;
}

export interface DetalleTicket {
    fecha:           string;
    nroreg:          number;
    adjunto:         string;
    usuario_responde: UsuarioResponde;
    leido:           Leido;
    comentario:      string;
    url:             string;
}

export enum Leido {
    N = "N",
}

export enum UsuarioResponde {
    Socio = "SOCIO",
    UsuarioRespondeSocio = "socio",
}

export interface ResponseStatusResponderTicket {
    mensaje:            string;
    parametrosGlobales: ParametrosGlobales;
    status:             string;
}

export interface ResponseCalificacionTicket {
    calificaciones: Calificacion[];
    mensaje:        string;
    status:         string;
}

export interface Calificacion {
    descripcion: string;
    id:          number;
}
