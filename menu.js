// --- DATOS DEL RESTAURANTE ---

// Información de horarios
const HORARIOS = {
    desayuno: { inicio: 6, fin: 11 }, // 6:00 a 10:59 (11.00 ya no es desayuno)
    almuerzo: { inicio: 12, fin: 17 }, // 12:00 a 16:59
    cena: { inicio: 18, fin: 23.00 }, // 18:00 a 22:59 (hasta justo antes de las 23:00)
    cierreTotal: 23.00 // El restaurante cierra a las 23:00, no se toman pedidos después de esta hora
};

// Menús (Platos Principales y Acompañamientos)
const MENUS = {
    desayuno: {
        principales: [
            { id: 1, nombre: "Clásico", descripcion: "Café solo + tostadas", precio: 2.50 },
            { id: 2, nombre: "Energético", descripcion: "Café con leche + huevos revueltos", precio: 6.00 },
            { id: 3, nombre: "Saludable", descripcion: "Té verde + yogur con frutas", precio: 7.00 }
        ],
        acompanamientos: [
            { id: 1, nombre: "Jugo natural", precio: 2.00 },
            { id: 2, nombre: "Croissant", precio: 3.00 },
            { id: 3, nombre: "Fruta fresca", precio: 4.00 }
        ]
    },
    almuerzo: {
        principales: [
            { id: 1, nombre: "Ensalada César", precio: 10.00 },
            { id: 2, nombre: "Hamburguesa Clásica", precio: 12.00 },
            { id: 3, nombre: "Pasta Alfredo", precio: 11.50 }
        ],
        acompanamientos: [
            { id: 1, nombre: "Patatas Fritas", precio: 3.50 },
            { id: 2, nombre: "Ensalada Mixta", precio: 4.00 },
            { id: 3, nombre: "Sopa del Día", precio: 5.00 }
        ]
    },
    cena: {
        // Mismos platos que almuerzo, pero con precios ajustados para cena
        principales: [
            { id: 1, nombre: "Ensalada César", precio: 12.00 },
            { id: 2, nombre: "Hamburguesa Clásica", precio: 14.00 },
            { id: 3, nombre: "Pasta Alfredo", precio: 13.50 }
        ],
        acompanamientos: [
            { id: 1, nombre: "Patatas Fritas", precio: 4.00 },
            { id: 2, nombre: "Ensalada Mixta", precio: 4.50 },
            { id: 3, nombre: "Sopa del Día", precio: 5.50 }
        ]
    }
};

// Comentarios del camarero (para la bonificación)
const COMENTARIOS_ALEATORIOS = [
    "¡Excelente elección!",
    "Un clásico que nunca falla.",
    "¡Ideal para un día como hoy!",
    "Esa es una de nuestras especialidades.",
    "No te arrepentirás de esa elección.",
    "Una opción deliciosa y muy popular.",
    "¡Con eso vas a disfrutar mucho!"
];

// Opciones de personalización y sus costos adicionales (Bonificación)
const PERSONALIZACIONES = {
    "Clásico": [ // Personalización para el plato "Clásico" de Desayuno (Café)
        { opcion: "con leche de soja", costo: 0.50 },
        { opcion: "descafeinado", costo: 0.25 },
        { opcion: "extra de azúcar", costo: 0.00 }
    ],
    "Energético": [ // Personalización para el plato "Energético" de Desayuno (Huevos)
        { opcion: "huevos muy hechos", costo: 0.00 },
        { opcion: "huevos poco hechos", costo: 0.00 },
        { opcion: "con queso en los huevos", costo: 1.00 }
    ],
    "Hamburguesa Clásica": [ // Ejemplo para hamburguesa
        { opcion: "sin cebolla", costo: 0.00 },
        { opcion: "extra de queso", costo: 1.50 },
        { opcion: "pan sin gluten", costo: 2.00 }
    ]
    // Puedes añadir más personalizaciones para otros items por su nombre
};

// --- FIN DATOS DEL RESTAURANTE ---


// --- FUNCIONES DE AYUDA ---

/**
 * Solicita una entrada al usuario y maneja errores, reintentando si es necesario.
 * @param {string} mensaje El mensaje a mostrar en el prompt.
 * @param {function} [validacionFn] Función opcional para validar la entrada. Debe devolver true o false.
 * @returns {string|null} La entrada del usuario o null si el usuario cancela.
 */
function obtenerEntrada(mensaje, validacionFn = null) {
    let entrada;
    while (true) { // Bucle infinito hasta que se obtenga una entrada válida o el usuario cancele
        try {
            entrada = prompt(mensaje);

            // Si el usuario presiona Cancelar (entrada es null)
            if (entrada === null) {
                // Lanzamos un error específico que el catch manejará para salir
                throw new Error("Usuario canceló la operación.");
            }

            // Si se proporciona una función de validación, la ejecutamos
            if (validacionFn) {
                const resultadoValidacion = validacionFn(entrada);
                if (typeof resultadoValidacion === 'object' && resultadoValidacion.valido === false) {
                    // Si la validación devuelve un objeto con {valido: false, mensaje: ...}
                    throw new Error(resultadoValidacion.mensaje);
                } else if (resultadoValidacion === false) {
                    // Si la validación es solo un booleano y es false
                    throw new Error("Entrada inválida. Por favor, intente de nuevo.");
                }
            }
            return entrada; // Si todo es válido, salimos del bucle y devolvemos la entrada
        } catch (error) {
            // Capturamos cualquier error (cancelación o validación)
            alert(`Error: ${error.message}`);
            if (error.message === "Usuario canceló la operación.") {
                return null; // Devolvemos null para indicar que el user quiso salir
            }
            // Si es un error de validación, el bucle continúa para volver a pedir la entrada
        }
    }
}

/**
 * Valida y formatea la hora ingresada por el usuario.
 * @param {string} horaTexto La hora en formato de texto (ej. "8", "19:30", "7.5").
 * @returns {{valido: boolean, hora?: number, mensaje?: string}} Objeto con resultado de validación.
 */
function validarYFormatearHora(horaTexto) {
    // Convertir a minúsculas, reemplazar comas por puntos y quitar espacios en blanco
    horaTexto = horaTexto.toLowerCase().replace(',', '.').trim();

    // Intentar parsear como float (maneja enteros y flotantes)
    let hora = parseFloat(horaTexto);

    // Si el texto es "0" o "00", asegúrate de que se trate como 0
    if (horaTexto === "0" || horaTexto === "00") {
        hora = 0;
    }

    // Comprobar si es un número válido y si está en el rango de 0 a 23.99
    if (isNaN(hora) || hora < 0 || hora >= 24) {
        return { valido: false, mensaje: "La hora debe ser un número entre 0 y 23. Por ejemplo: 8, 19.5, 22. Utilice '.' para decimales." };
    }

    // Comprobar si hay minutos inválidos (ej. 8.65)
    // Se divide la cadena original, no el flotante
    let partesHora = horaTexto.split('.');
    if (partesHora.length > 1) { // Si hay parte decimal
        let minutosStr = partesHora[1];
        if (minutosStr.length > 2) { // Más de dos decimales podría ser un error de formato
            return { valido: false, mensaje: "Formato de minutos incorrecto. Use solo uno o dos decimales para los minutos (ej. 8.5 para 8:30)." };
        }
        let minutosParte = parseFloat("0." + minutosStr);
        if (minutosParte >= 0.60) { // Si la parte decimal es .60 o más, significa minutos >= 60
             return { valido: false, mensaje: "Minutos inválidos. La parte decimal de la hora debe ser menor a .60 (ej. 8.5 para 8:30, no 8.65)." };
        }
    }

    return { valido: true, hora: hora };
}

/**
 * Obtiene un comentario aleatorio del camarero.
 * @returns {string} Un comentario aleatorio.
 */
function obtenerComentarioAleatorio() {
    const indice = Math.floor(Math.random() * COMENTARIOS_ALEATORIOS.length);
    return COMENTARIOS_ALEATORIOS[indice];
}

/**
 * Genera el texto del menú completo para un turno específico (desayuno, almuerzo, cena).
 * @param {string} tipoMenu El turno del menú ('desayuno', 'almuerzo', 'cena').
 * @returns {string} El texto formateado del menú.
 */
function mostrarMenu(tipoMenu) {
    const menuActual = MENUS[tipoMenu];
    let mensaje = `--- Menú de ${tipoMenu.charAt(0).toUpperCase() + tipoMenu.slice(1)} ---\n\n`;

    mensaje += "PLATOS PRINCIPALES:\n";
    menuActual.principales.forEach(plato => {
        mensaje += `${plato.id}. ${plato.nombre}: ${plato.descripcion} (${plato.precio.toFixed(2)}€)\n`;
    });

    mensaje += "\nACOMPAÑAMIENTOS:\n";
    menuActual.acompanamientos.forEach(acomp => {
        mensaje += `${acomp.id}. ${acomp.nombre} (${acomp.precio.toFixed(2)}€)\n`;
    });

    return mensaje;
}

// --- FIN FUNCIONES DE AYUDA ---


// --- LÓGICA PRINCIPAL DEL RESTAURANTE ---

let costoTotalPedidoActual = 0; // Para llevar la cuenta del pedido actual del usuario

/**
 * Determina el turno de comida (desayuno, almuerzo, cena) según la hora.
 * @param {number} hora La hora actual en formato decimal.
 * @returns {string|null} El nombre del turno ('desayuno', 'almuerzo', 'cena') o null si no hay servicio.
 */
function obtenerTurno(hora) {
    if (hora >= HORARIOS.desayuno.inicio && hora < HORARIOS.desayuno.fin) {
        return 'desayuno';
    } else if (hora >= HORARIOS.almuerzo.inicio && hora < HORARIOS.almuerzo.fin) {
        return 'almuerzo';
    } else if (hora >= HORARIOS.cena.inicio && hora < HORARIOS.cena.fin) { // Asegura que 23.00 no esté incluido
        return 'cena';
    }
    return null; // Fuera de horario de servicio
}

/**
 * Permite al usuario seleccionar un plato (principal o acompañamiento) del menú.
 * Incluye validación de la selección.
 * @param {string} tipoPlato Etiqueta del plato ('Plato Principal', 'Acompañamiento 1', etc.).
 * @param {Array<Object>} listaPlatos El array de platos (principales o acompañamientos) para el turno actual.
 * @param {string} turnoActual El turno de comida actual ('desayuno', 'almuerzo', 'cena').
 * @returns {Object|null} El objeto del plato elegido o null si el usuario cancela.
 */
function seleccionarPlato(tipoPlato, listaPlatos, turnoActual) {
    let platoElegido = null;
    let mensajeMenuCompleto = mostrarMenu(turnoActual); // Muestra todo el menú
    let mensajeSeleccion = `${mensajeMenuCompleto}\n\nSeleccione el número de ${tipoPlato}:`; // Texto más claro

    let seleccionId = obtenerEntrada(mensajeSeleccion, (input) => {
        const numero = parseInt(input);
        // Debe ser un número, estar entre 1 y el número de opciones disponibles
        return !isNaN(numero) && numero >= 1 && numero <= listaPlatos.length;
    });

    if (seleccionId === null) { // Usuario canceló la selección del plato
        return null;
    }

    const idNumerico = parseInt(seleccionId);
    platoElegido = listaPlatos.find(plato => plato.id === idNumerico);

    // Aunque la validación de obtenerEntrada debería evitar esto, es un seguro
    if (!platoElegido) {
        alert("¡Error interno! La opción seleccionada no se encontró. Por favor, intente de nuevo.");
        return null; // Devuelve null para que la función llamadora lo maneje
    }

    return platoElegido;
}

/**
 * Gestiona las opciones de personalización para un plato si las tiene.
 * @param {Object} plato El objeto del plato seleccionado.
 * @returns {{costo: number, descripcion: string}} Objeto con el costo adicional y la descripción de la personalización.
 */
function gestionarPersonalizacion(plato) {
    // Comprueba si este plato tiene opciones de personalización definidas
    const opcionesPersonalizacion = PERSONALIZACIONES[plato.nombre];

    if (opcionesPersonalizacion && opcionesPersonalizacion.length > 0) {
        let personalizacionMensaje = `Opciones de personalización para "${plato.nombre}":\n`;
        opcionesPersonalizacion.forEach((opcion, i) => {
            personalizacionMensaje += `${i + 1}. ${opcion.opcion} (+${opcion.costo.toFixed(2)}€)\n`;
        });
        personalizacionMensaje += "\nIngrese el número de su opción o presione Cancelar/0 para ninguna:";

        let seleccionUsuario = obtenerEntrada(personalizacionMensaje, (input) => {
            const numero = parseInt(input);
            return !isNaN(numero) && numero >= 0 && numero <= opcionesPersonalizacion.length;
        });

        if (seleccionUsuario === null || parseInt(seleccionUsuario) === 0) {
            alert("No se ha añadido personalización.");
            return { costo: 0, descripcion: "" }; // Devuelve 0 y una descripción vacía si no se personalizó
        } else {
            const personalizacionElegida = opcionesPersonalizacion[parseInt(seleccionUsuario) - 1];
            if (personalizacionElegida) {
                alert(`Personalización añadida: "${personalizacionElegida.opcion}". Costo adicional: ${personalizacionElegida.costo.toFixed(2)}€`);
                return {
                    costo: personalizacionElegida.costo,
                    descripcion: personalizacionElegida.opcion
                };
            } else {
                alert("Opción de personalización no válida. No se añadió personalización.");
                return { costo: 0, descripcion: "" };
            }
        }
    }
    return { costo: 0, descripcion: "" }; // Si no hay personalizaciones para este plato
}

/**
 * Inicia el proceso de pedido para un turno específico.
 * @param {string} turnoActual El turno de comida actual ('desayuno', 'almuerzo', 'cena').
 * @returns {boolean} True si el pedido se completó, false si fue cancelado.
 */
function iniciarPedido(turnoActual) {
    costoTotalPedidoActual = 0; // Reiniciar el costo para cada nuevo pedido

    alert(`¡Bienvenido a Bottega Diner en horario de ${turnoActual.toUpperCase()}!`);

    // --- SELECCIÓN PLATO PRINCIPAL ---
    let platoPrincipal = seleccionarPlato("Plato Principal", MENUS[turnoActual].principales, turnoActual);
    if (platoPrincipal === null) {
        alert("Pedido cancelado.");
        return false; // El usuario canceló
    }
    costoTotalPedidoActual += platoPrincipal.precio;
    alert(`Has elegido "${platoPrincipal.nombre}". ${obtenerComentarioAleatorio()} (Precio: ${platoPrincipal.precio.toFixed(2)}€)`);

    // Gestión de personalización para el plato principal
    let personalizacionPrincipalInfo = gestionarPersonalizacion(platoPrincipal);
    costoTotalPedidoActual += personalizacionPrincipalInfo.costo;
    // Crea el texto de personalización para el resumen
    let personalizacionPrincipalTexto = personalizacionPrincipalInfo.descripcion ?
                                        ` + ${personalizacionPrincipalInfo.descripcion} (${personalizacionPrincipalInfo.costo.toFixed(2)}€)` : "";


    // --- SELECCIÓN DOS ACOMPAÑAMIENTOS ---
    let acompanamientosSeleccionados = [];
    const nombresAcomp = ["su primer acompañamiento", "su segundo acompañamiento"]; // Para mayor claridad

    for (let i = 0; i < 2; i++) {
        let acomp = seleccionarPlato(nombresAcomp[i], MENUS[turnoActual].acompanamientos, turnoActual);
        if (acomp === null) {
            alert("Pedido cancelado.");
            return false; // El usuario canceló
        }
        
        // Gestión de personalización para los acompañamientos (si aplica)
        let personalizacionAcompInfo = gestionarPersonalizacion(acomp);
        costoTotalPedidoActual += personalizacionAcompInfo.costo;
        // Almacena el texto de personalización directamente en el objeto acomp para el resumen
        acomp.personalizacionTexto = personalizacionAcompInfo.descripcion ?
                                      ` + ${personalizacionAcompInfo.descripcion} (${personalizacionAcompInfo.costo.toFixed(2)}€)` : "";

        // Push el acompañamiento después de añadirle la info de personalización
        acompanamientosSeleccionados.push(acomp);
        costoTotalPedidoActual += acomp.precio; // Suma el precio base del acompañamiento
        alert(`Has elegido "${acomp.nombre}". ${obtenerComentarioAleatorio()} (Precio: ${acomp.precio.toFixed(2)}€)`);
    }

    // --- RESUMEN Y COSTO TOTAL ---
    let resumen = `--- RESUMEN DE TU PEDIDO ---\n`;
    // Añade el texto de personalización al plato principal
    resumen += `Plato Principal: ${platoPrincipal.nombre} (${platoPrincipal.precio.toFixed(2)}€)${personalizacionPrincipalTexto}\n`;

    // AÑADIDO: Listar los acompañamientos seleccionados con su personalización
    if (acompanamientosSeleccionados.length > 0) {
        resumen += `Acompañamientos:\n`;
        acompanamientosSeleccionados.forEach(acomp => {
            // Usa acomp.personalizacionTexto que ya contiene la info de la personalización
            resumen += `- ${acomp.nombre} (${acomp.precio.toFixed(2)}€)${acomp.personalizacionTexto}\n`;
        });
    } else {
        resumen += `Acompañamientos: Ninguno seleccionado.\n`;
    }

    resumen += `\nCosto Total del Pedido: ${costoTotalPedidoActual.toFixed(2)}€`;

    alert(resumen);
    return true; // Pedido completado exitosamente
}

/**
 * Función que inicia todo el programa del restaurante.
 */
function iniciarRestaurante() {
    alert(`Bienvenido a Bottega Diner.\nHorario de atención: ${HORARIOS.desayuno.inicio}:00 a ${HORARIOS.cierreTotal}:00`);

    let continuarPrograma = true;
    while (continuarPrograma) { // Bucle principal para permitir múltiples pedidos o reintentos
        let horaEntrada = obtenerEntrada(
            "Ingrese la hora actual (formato 24h, ej: 8, 19.5 para 19:30). O presione Cancelar para salir.",
            (input) => validarYFormatearHora(input) // Pasa la función de validación
        );

        if (horaEntrada === null) { // Usuario canceló al pedir la hora
            salirDelPrograma();
            continuarPrograma = false;
            break; // Salir del bucle principal
        }

        const validacionHora = validarYFormatearHora(horaEntrada);
        let hora = validacionHora.hora; // hora ya validada

        let turnoActual = obtenerTurno(hora);

        if (turnoActual) {
            const pedidoRealizado = iniciarPedido(turnoActual);
            if (!pedidoRealizado) { // Si el pedido fue cancelado en alguna fase intermedia
                let reintentar = confirm("¿Desea intentar hacer otro pedido o salir?");
                if (!reintentar) {
                    salirDelPrograma();
                    continuarPrograma = false;
                }
            } else {
                let otroPedido = confirm("¿Desea hacer otro pedido?");
                if (!otroPedido) {
                    salirDelPrograma();
                    continuarPrograma = false;
                }
            }
        } else {
            alert(`Lo sentimos, no estamos abiertos en esa hora para servir (${hora.toFixed(2)}). Por favor, intente de nuevo en el horario de ${HORARIOS.desayuno.inicio}:00 a ${HORARIOS.cierreTotal}:00.`);
        }
    }
}

/**
 * Muestra un mensaje de despedida y finaliza el programa.
 */
function salirDelPrograma() {
    alert("Gracias por visitar Bottega Diner. ¡Esperamos verte pronto!");
}

// --- INICIAR EL PROGRAMA AL CARGAR ---
iniciarRestaurante();