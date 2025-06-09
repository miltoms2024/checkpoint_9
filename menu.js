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
            { id: 1, nombre: "Clásico", descripcion: "Café solo + tostadas", precio: 3.50 },
            { id: 2, nombre: "Energético", descripcion: "Café con leche + huevos revueltos", precio: 6.00 },
            { id: 3, nombre: "Saludable", descripcion: "Té verde + yogur con frutas", precio: 7.00 }
        ],
        acompanamientos: [ // Primera lista de acompañamientos para desayuno
            { id: 1, nombre: "Jugo natural", precio: 3.00 },
            { id: 2, nombre: "Macedonia", precio: 3.00 },
            { id: 3, nombre: "Fruta fresca", precio: 3.00 }
        ],
        acompanamientos2: [ // Segunda lista de acompañamientos para desayuno
            { id: 1, nombre: "Mantequilla", precio: 1.50 },
            { id: 2, nombre: "Mermelada", precio: 1.50 },
            { id: 3, nombre: "Muffin de arándanos", precio: 3.50 }
        ]
        // No hay postres para el desayuno
    },
    almuerzo: {
        principales: [
            { id: 1, nombre: "Paella de Mixta", precio: 10.00 },
            { id: 2, nombre: "Hamburguesa Clásica", precio: 10.00 },
            { id: 3, nombre: "Pasta Alfredo", precio: 8.50 }
        ],
        acompanamientos: [ // Primera lista de acompañamientos para almuerzo
            { id: 1, nombre: "Patatas Fritas", precio: 3.50 },
            { id: 2, nombre: "Ensalada Mixta", precio: 4.00 },
            { id: 3, nombre: "Sopa del Día", precio: 5.00 }
        ],
        acompanamientos2: [ // Segunda lista de acompañamientos para almuerzo
            { id: 1, nombre: "Aros de Cebolla", precio: 4.00 },
            { id: 2, nombre: "Pan de Ajo", precio: 3.00 },
            { id: 3, nombre: "Ensalada de Col", precio: 3.50 }
        ],
        postres: [ // Lista de postres para almuerzo
            { id: 1, nombre: "Helado de Vainilla", precio: 4.00 },
            { id: 2, nombre: "Tarta de Queso", precio: 5.50 },
            { id: 3, nombre: "Fruta de Temporada", precio: 3.00 }
        ]
    },
    cena: {
        // Mismos platos que almuerzo, pero con precios ajustados para cena
        principales: [
            { id: 1, nombre: "Paella Mixta", precio: 12.00 },
            { id: 2, nombre: "Hamburguesa Clásica", precio: 12.00 },
            { id: 3, nombre: "Pasta Alfredo", precio: 10.50 }
        ],
        acompanamientos: [ // Primera lista de acompañamientos para cena
            { id: 1, nombre: "Patatas Fritas", precio: 4.00 },
            { id: 2, nombre: "Ensalada Mixta", precio: 4.50 },
            { id: 3, nombre: "Sopa del Día", precio: 5.50 }
        ],
        acompanamientos2: [ // Segunda lista de acompañamientos para cena
            { id: 1, nombre: "Pan Casero", precio: 3.50 },
            { id: 2, nombre: "Verduras al Vapor", precio: 5.00 },
            { id: 3, nombre: "Arroz Blanco", precio: 3.00 } // Cambié el ejemplo para que no sea un postre aquí
        ],
        postres: [ // Lista de postres para cena
            { id: 1, nombre: "Brownie con Helado", precio: 6.00 },
            { id: 2, nombre: "Crema Catalana", precio: 5.00 },
            { id: 3, nombre: "Mousse de Limón", precio: 4.50 }
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
 * Formatea una lista de platos (principales, acompañamientos, etc.) en una sola línea,
 * separados por guiones y sin precios, en mayúsculas.
 * @param {Array<Object>} listaPlatos El array de objetos de platos.
 * @returns {string} Una cadena con los nombres de los platos separados por " - ".
 */
function formatearListaParaVisualizacion(listaPlatos) {
    if (!listaPlatos || listaPlatos.length === 0) {
        return "No disponible.";
    }
    return listaPlatos.map(plato => plato.nombre.toUpperCase()).join(' - ');
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
    } else if (hora >= HORARIOS.cena.inicio && hora < HORARIOS.cena.fin) {
        return 'cena';
    }
    return null; // Fuera de horario de servicio
}

/**
 * Permite al usuario seleccionar un plato (principal o acompañamiento) de una lista específica.
 * Incluye validación de la selección.
 * @param {string} tituloPrompt El título o etiqueta para el prompt (ej. 'Plato Principal', 'Primer Acompañamiento').
 * @param {Array<Object>} listaPlatos El array de platos (principales o acompañamientos) para elegir.
 * @returns {Object|null} El objeto del plato elegido o null si el usuario cancela.
 */
function seleccionarPlato(tituloPrompt, listaPlatos) {
    let mensajeOpciones = `--- Seleccione su ${tituloPrompt} ---\n\n`;
    listaPlatos.forEach(item => {
        // Mostrar ID, nombre y precio en el prompt de selección
        mensajeOpciones += `${item.id}. ${item.nombre} (${item.precio.toFixed(2)}€)\n`;
    });
    mensajeOpciones += "\nIngrese el número de su elección:";

    let seleccionId = obtenerEntrada(mensajeOpciones, (input) => {
        const numero = parseInt(input);
        // Debe ser un número, estar entre 1 y el número de opciones disponibles
        return !isNaN(numero) && numero >= 1 && numero <= listaPlatos.length;
    });

    if (seleccionId === null) { // Usuario canceló la selección del plato
        return null;
    }

    const idNumerico = parseInt(seleccionId);
    let platoElegido = listaPlatos.find(plato => plato.id === idNumerico);

    if (!platoElegido) {
        alert("¡Error interno! La opción seleccionada no se encontró. Por favor, intente de nuevo.");
        return null;
    }

    return platoElegido;
}

/**
 * Gestiona las opciones de personalización para un plato si las tiene.
 * @param {Object} plato El objeto del plato seleccionado.
 * @returns {{costo: number, descripcion: string}} Objeto con el costo adicional y la descripción de la personalización.
 */
function gestionarPersonalizacion(plato) {
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
            return { costo: 0, descripcion: "" };
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
    return { costo: 0, descripcion: "" };
}

/**
 * Inicia el proceso de pedido para un turno específico.
 * @param {string} turnoActual El turno de comida actual ('desayuno', 'almuerzo', 'cena').
 * @returns {boolean} True si el pedido se completó, false si fue cancelado.
 */
function iniciarPedido(turnoActual) {
    costoTotalPedidoActual = 0;
    let detallesPedido = [];

    // MODIFICACIÓN: Aquí es donde se muestra el "tipo de menú" y el resumen de platos sin precios
    let mensajeMenuGeneral = `Ha elegido el menú de ${turnoActual.toUpperCase()}.\n\n`; // Primero el tipo de menú
    mensajeMenuGeneral += `--- Menú de ${turnoActual.charAt(0).toUpperCase() + turnoActual.slice(1)} ---\n\n`;

    mensajeMenuGeneral += `PRINCIPAL:\n${formatearListaParaVisualizacion(MENUS[turnoActual].principales)}\n\n`;

    mensajeMenuGeneral += `ACOMPAÑAMIENTOS (Primer Selección):\n${formatearListaParaVisualizacion(MENUS[turnoActual].acompanamientos)}\n\n`;

    if (MENUS[turnoActual].acompanamientos2 && MENUS[turnoActual].acompanamientos2.length > 0) {
        mensajeMenuGeneral += `ACOMPAÑAMIENTOS (Segunda Selección):\n${formatearListaParaVisualizacion(MENUS[turnoActual].acompanamientos2)}\n\n`;
    } else {
        mensajeMenuGeneral += `ACOMPAÑAMIENTOS (Segunda Selección):\nNo disponible.\n\n`; // Mostrar explícitamente si no hay
    }

    if (MENUS[turnoActual].postres && MENUS[turnoActual].postres.length > 0) {
        mensajeMenuGeneral += `POSTRES:\n${formatearListaParaVisualizacion(MENUS[turnoActual].postres)}\n\n`;
    } else {
        mensajeMenuGeneral += `POSTRES:\nNo disponible.\n\n`; // Mostrar explícitamente si no hay
    }

    alert(mensajeMenuGeneral); // Muestra este resumen antes de pedir la selección


    // --- SELECCIÓN PLATO PRINCIPAL ---
    let platoPrincipal = seleccionarPlato("Plato Principal", MENUS[turnoActual].principales);
    if (platoPrincipal === null) {
        alert("Pedido cancelado.");
        return false;
    }
    costoTotalPedidoActual += platoPrincipal.precio;
    let mensajeDetalle = `Has elegido "${platoPrincipal.nombre}".`;
    if (platoPrincipal.descripcion && platoPrincipal.descripcion !== "" && platoPrincipal.descripcion !== null) {
        mensajeDetalle += ` Incluye: ${platoPrincipal.descripcion}.`;
    }
    mensajeDetalle += ` ${obtenerComentarioAleatorio()}`;
    alert(mensajeDetalle);

    let personalizacionPrincipalInfo = gestionarPersonalizacion(platoPrincipal);
    costoTotalPedidoActual += personalizacionPrincipalInfo.costo;
    let personalizacionPrincipalTexto = personalizacionPrincipalInfo.descripcion ?
        ` + ${personalizacionPrincipalInfo.descripcion} (${personalizacionPrincipalInfo.costo.toFixed(2)}€)` : "";

    detallesPedido.push({
        tipo: "Plato Principal",
        nombre: platoPrincipal.nombre,
        precioBase: platoPrincipal.precio,
        personalizacion: personalizacionPrincipalInfo.descripcion,
        costoPersonalizacion: personalizacionPrincipalInfo.costo
    });


    // --- SELECCIÓN DOS ACOMPAÑAMIENTOS ---
    const titulosAcomp = ["Primer Acompañamiento", "Segundo Acompañamiento"];

    for (let i = 0; i < 2; i++) {
        let listaAcompParaSeleccionar;
        let tituloAcompPrompt = titulosAcomp[i];

        if (i === 0) {
            listaAcompParaSeleccionar = MENUS[turnoActual].acompanamientos;
        } else {
            // Asegurarse de que el segundo acompañamiento exista antes de intentar seleccionarlo
            if (MENUS[turnoActual].acompanamientos2 && MENUS[turnoActual].acompanamientos2.length > 0) {
                listaAcompParaSeleccionar = MENUS[turnoActual].acompanamientos2;
            } else {
                alert(`No hay opciones para ${tituloAcompPrompt} en el menú de ${turnoActual}. Se saltará este paso.`);
                continue; // Salta a la siguiente iteración del bucle si no hay opciones
            }
        }

        let acomp = seleccionarPlato(tituloAcompPrompt, listaAcompParaSeleccionar);
        if (acomp === null) {
            alert("Pedido cancelado.");
            return false;
        }

        let personalizacionAcompInfo = gestionarPersonalizacion(acomp);
        costoTotalPedidoActual += personalizacionAcompInfo.costo;
        acomp.personalizacionTexto = personalizacionAcompInfo.descripcion ?
            ` + ${personalizacionAcompInfo.descripcion} (${personalizacionAcompInfo.costo.toFixed(2)}€)` : "";

        alert(`Has elegido "${acomp.nombre}". ${obtenerComentarioAleatorio()}`);

        costoTotalPedidoActual += acomp.precio;

        detallesPedido.push({
            tipo: tituloAcompPrompt,
            nombre: acomp.nombre,
            precioBase: acomp.precio,
            personalizacion: personalizacionAcompInfo.descripcion,
            costoPersonalizacion: personalizacionAcompInfo.costo
        });
    }

    // --- SELECCIÓN DE POSTRE (Solo para Almuerzo y Cena) ---
    if (MENUS[turnoActual].postres && MENUS[turnoActual].postres.length > 0) {
        let postre = seleccionarPlato("Postre", MENUS[turnoActual].postres);
        if (postre === null) {
            alert("No se ha seleccionado ningún postre.");
        } else {
            costoTotalPedidoActual += postre.precio;
            alert(`Has elegido "${postre.nombre}". ${obtenerComentarioAleatorio()}`);

            detallesPedido.push({
                tipo: "Postre",
                nombre: postre.nombre,
                precioBase: postre.precio,
                personalizacion: "",
                costoPersonalizacion: 0
            });
        }
    }


    // --- TICKET FINAL CON TODO DESGLOSADO ---
    let ticket = `--- TICKET DE TU PEDIDO ---\n\n`;

    detallesPedido.forEach(item => {
        let linea = `${item.tipo}: ${item.nombre} (${item.precioBase.toFixed(2)}€)`;
        if (item.personalizacion) {
            linea += ` (${item.personalizacion} +${item.costoPersonalizacion.toFixed(2)}€)`;
        }
        ticket += `${linea}\n`;
    });

    ticket += `\nCosto Total: ${costoTotalPedidoActual.toFixed(2)}€`;

    alert(ticket);
    return true;
}

/**
 * Función que inicia todo el programa del restaurante.
 */
function iniciarRestaurante() {
    let continuarPrograma = true;
    while (continuarPrograma) {
        // MODIFICACIÓN PRINCIPAL: Fusión de bienvenida, horario general y solicitud de hora en un solo prompt
        let horaEntrada = obtenerEntrada(
            `¡Bienvenido a Bottega Diner!\n\n` +
            `Horario de atención: de ${HORARIOS.desayuno.inicio}:00 a ${HORARIOS.cierreTotal}:00.\n\n` +
            `Ingrese la hora a la que desea acudir para su pedido (formato 24h). O presione Cancelar para salir.`,
            (input) => validarYFormatearHora(input)
        );

        if (horaEntrada === null) {
            salirDelPrograma();
            continuarPrograma = false;
            break;
        }

        const validacionHora = validarYFormatearHora(horaEntrada);
        let hora = validacionHora.hora;

        let turnoActual = obtenerTurno(hora);

        if (turnoActual) {
            // Si hay un turno válido, se procede con iniciarPedido
            const pedidoRealizado = iniciarPedido(turnoActual);
            if (!pedidoRealizado) {
                let reintentar = confirm("El pedido ha sido cancelado. ¿Desea intentar hacer otro pedido o salir?");
                if (!reintentar) {
                    salirDelPrograma();
                    continuarPrograma = false;
                }
            } else {
                let otroPedido = confirm("¡Pedido completado! ¿Desea hacer otro pedido?");
                if (!otroPedido) {
                    salirDelPrograma();
                    continuarPrograma = false;
                }
            }
        } else {
            alert(`Lo sentimos, no estamos abiertos a las ${hora.toFixed(2)}. Por favor, ingrese una hora dentro de nuestro horario de ${HORARIOS.desayuno.inicio}:00 a ${HORARIOS.cierreTotal}:00.`);
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
