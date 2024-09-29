let totalGastos = 0;
let totalIngresos = 0;
let conceptosIngresos = "";
let conceptosGastos = "";

/* retorna el largo que debe tener el espaciado dependiendo del largo 
de la descripcion del registro */
function calcularLargoEspaciado(maximo, cadena) {
  return maximo - cadena.length;
}

/* retorna cadena de caracteres con el largo pasado como parametro */
function espaciado(largo, caracter) {
  let linea = "";
  for (let i = 0; i < largo; i++) {
    linea += caracter;
  }
  return linea;
}

/*retorna una cadena con la descripcion del registro, 
agrega espaciado necesario para que toda la columna tenga el mismo ancho.*/
function crearItemRegistro(concepto, largoMaximo, caracter) {
  let largo = calcularLargoEspaciado(largoMaximo, concepto);
  let espacio = espaciado(largo, caracter);
  return concepto + espacio + "$";
}

//genera un reporte por consola, formato predeterminado y datos ingresados.
function imprimirReporte() {
  let saldo = totalIngresos - totalGastos;

  let template = "***** Registro de INGRESOS y GASTOS *****\n\n";
  template += "INGRESOS\n" + conceptosIngresos + "\n\n";
  template += "GASTOS\n" + conceptosGastos + "\n";
  // template += espaciado(63, "*") + "\n";
  template += "\n";
  template += "SALDO" + espaciado(45, "_") + "$" + espaciado(9 - saldo.toString().length, " ") + saldo.toFixed(2);
  console.log(template);
}

//retorna el valor (string) ingresado por el usuario, tiene validación.
function valorDelConcepto() {
  let dato;
  while (true) {
    dato = prompt("Ingrese el VALOR:");
    if (!isNaN(parseFloat(dato))) {
      break;
    }
  }
  return dato;
}

//retorna una cadena con el espaciado y valor (columnas de importes).
function cadenaDeImporte(valor) {
  valor = parseFloat(valor).toFixed(2);
  let largo = calcularLargoEspaciado(12, valor);
  let valorConEspaciado = espaciado(largo, " ") + valor;
  return valorConEspaciado;
}

//Agrega la cadena completa del nuevo registro (Descripcion e importe);
function registrarNuevoIngreso(tipo, descripcion, valor) {
  let cadenaDelValor = cadenaDeImporte(valor);

  switch (parseInt(tipo)) {
    case 1:
      totalIngresos += parseFloat(valor);
      conceptosIngresos += "\n" + crearItemRegistro(descripcion, 50, "_") + cadenaDelValor;

      break;
    case 2:
      totalGastos += parseFloat(valor);
      conceptosGastos += "\n" + crearItemRegistro(descripcion, 50, "_") + cadenaDelValor;

      break;
  }
}

function inicializarValores() {
  console.clear();
  totalGastos = 0;
  totalIngresos = 0;
  conceptosIngresos = "";
  conceptosGastos = "";
}

function iniciarSistema() {
  inicializarValores();
  let opcion;
  do {
    opcion = prompt("Qué registrar?: \n1 Ingresos\n2 Gastos\nCancelar");
    while (opcion == 1 || opcion == 2) {
      let datoIngresado = prompt("Ingrese el MOTIVO");
      if (datoIngresado == null) {
        opcion = null;
        break;
      } else {
        let valor = valorDelConcepto();
        registrarNuevoIngreso(opcion, datoIngresado, valor);
        opcion = "";
      }
    }
    if (opcion == null) {
      imprimirReporte();
    }
  } while (opcion != null);
}
