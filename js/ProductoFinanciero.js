var miDialogoProducto;

$( function() {
    $( "#AccordionClientes" ).accordion();
    var miDialogo = $( "#dialogoNuevoCliente" ).dialog({
        autoOpen: false,
        height: 500,
        width: 500,
        modal: true,
        buttons: {
            Save: function (){
                var nombre = $("#nombre").val();
                var apellido = $("#apellido").val();
                var telefono = $("#telefono").val();
                var email = $("#email").val();
                // ACA!!!
                var tipoDoc= $("#tipoDoc").val();
                var nroDoc = $("#nroDoc").val();
                var edad = $("#edad").val();
                var fechaNacimiento = $("#fechaNacimiento").val();
                var nuevoCliente = new Cliente(nombre, apellido, telefono, email, tipoDoc, nroDoc, edad, "", fechaNacimiento);
                vectorTodosMisClientes.push(nuevoCliente);

                MostrarClienteYsusProductos();
            
            },
            Cancel: function (){
                miDialogo.dialog("close");
            }
        },
    });
    $("#nuevoCliente").on("click", function(){
        miDialogo.dialog("open");
    });
    cargarclientes();    


    miDialogoProducto = $( "#dialogoNuevoProducto" ).dialog({
        autoOpen: false,
        height: 500,
        width: 500,
        modal: true,       
        buttons :  {
            Save: function () {
                var idcliente = miDialogoProducto.data("idcliente");
                var pnombre = $("#pnombre").val();
                var ptipo = $("#ptipo").val();
                var psaldo = $("#psaldo").val();
                var ptasa= $("#ptasa").val();
                var pvencimiento = $("#pvencimiento").val();
                //_codigoCuenta, _nombre, _tipo, _saldoDisponible, _tasaMensual, _fechaVencimiento)
                var nuevoProducto = new Producto("", pnombre, ptipo, psaldo, ptasa, pvencimiento);
                vectorTodosMisClientes[idcliente].addProducto(nuevoProducto);
                MostrarClienteYsusProductos();
                miDialogoProducto.dialog("close");

                             

            },
            Cancel: function (){
                miDialogoProducto.dialog("close");
            }
        },    
    });
});


function buscarCantidadCliente() {

    //var att = $("#atributo").val();
    var vatt = $("#valorAtributo").val();

    var resultado = vectorTodosMisClientes.filter (
        function(item) {
            return item[$("#atributo").val()].indexOf(vatt) != -1;
            
        });
        alert("clientes con la propiedad " + $("#atributo").val() + " son " + resultado.length)
}


/*
//---- prueba filter
var ages = [ 10, 20, 30]:
function testfilter(){
    document.getElementById("dmeo").innerHTML = ages.filter (
        function(item) {
            return item >= 18;
        }
    )
}

//--- otro filter
var toto = []
toto.push ([nombre: "veronica", apellido: "rodrigez"]);
toto.push ([nombre: "maria", apellido: "diaz"]);
toto.push ([nombre: "prisca", apellido: "quiroga"]);

function testfilter(){
    var resultado = toto.filter (
        function(item) {
            return item == "rodrigez";
            
        }
    )
}

// 

function testforeach()){
    var resultado = toto.foreach (
        document.getElementById("dmeo").innerHTML = ages.filte
        }
    )
}

//
function testindexof(){
    var valorbuscado = 13;
    var r = ages.indexOf(valorbuscado);
    return r
}*/

var nroClienteMostrado = 0;
var vectorTodosMisClientes = [];
var Persona = function (_nombre, _apellido) {
    this.Nombre = _nombre;
    this.Apellido = _apellido;
}
//Ejemplo de Estructura recibidad: "Kendry Alejandro", "Martin Urdaneta", "1133465787", "kendry@gmail.com", "CUIL", "209987863", 23,
var Cliente = function (_nombre, _apellido, _telef, _email, tipoDoc, _nroDoc, _edad, _productos, _fechaNacimiento, _region, _pais, _idioma) {
    this.NroDocumento = _nroDoc;
    this.TipoDocumento = tipoDoc;
    this.Telefono = _telef;
    this.Email = _email;
    this.Edad = _edad;
    this.persona = Persona;
    this.persona(_nombre, _apellido);
    this.productos = [];
    this.FechaNacimiento = _fechaNacimiento;
    this.Region = _region;
    this.Pais = _pais;
    this.Idioma = _idioma;

    for (var i = 0; i < _productos.length; i++) {
        this.productos.push(new Producto(_productos[i][0], _productos[i][1], _productos[i][2], _productos[i][3], _productos[i][4], _productos[i][5]))
    }

    this.addProducto = function (nuevoProducto) {
        this.productos.push(nuevoProducto);
    }
}
//Ejemplo de Estructura recibidad: CODIGO CUENTA, NOMBRE PRODUCTO, TIPO PRODUCTO, SALDO, TASA INTERES MENSUAL, FECHA VENCIMIENTO
var Producto = function (_codigoCuenta, _nombre, _tipo, _saldoDisponible, _tasaMensual, _fechaVencimiento) {
    this.nombre =_nombre;
    this.tipo =_tipo;
    this.saldo = _saldoDisponible;
    this.tasaMensual = _tasaMensual;
    this.codigoCuenta = _codigoCuenta;
    //this.fechaVencimiento = convertirFecha(_fechaVencimiento);
}

function convertirFecha(fechaComoString){
    var anio = fechaComoString.toString().substr(0,4);
    var mes = fechaComoString.toString().substr(4,2) - 1;
    var dia = fechaComoString.toString().substr(6,2);
    return new Date(anio, mes, dia).toISOString();
}

var MasterPage = (function() {
    var instanciaMasterPage;

    function crearObjeto(clientesArray) {
        var nroTotalClientes = clientesArray.length;
        var ProductosCliente = function (clientesArray) {
            var nroProducto = 0;
            for (var i = 0; i < clientesArray.length; i++) {
                for (var j = 0; j < clientesArray[i].productos.length; j++) {
                    nroProducto++;
                }
            }
            return nroProducto / clientesArray.length;
        }(clientesArray);
        return {
            nroTotalClientes: nroTotalClientes,
            ProductosCliente: ProductosCliente
        }
    };
    return {
        instanciar: function(clientesArray) {
            if (!instanciaMasterPage)
                instanciaMasterPage = new crearObjeto(clientesArray);
            return instanciaMasterPage;
        }
    }
})();

function MostrarClienteYsusProductos(c) {
    var itemsAccordion = "";
    /*for (var i = 0; i < vectorTodosMisClientes.length; i++) {
        var titulo = "<h3>" + vectorTodosMisClientes[i].Nombre + " " + vectorTodosMisClientes[i].Apellido + "</h3>";
        "<div>"
        var cuerpo = "<div><table>" + "<input type=\"button\" id=\"nuevoProducto\" name=\"NuevoProducto\" onclick=\"miDialogoProducto.data('idcliente'," + i + ").dialog('open')\" value=\" Nuevo Producto\" class=\"ui-button ui-widget ui-corner-all\" /></div>" + getProductosAnonima(vectorTodosMisClientes[i].productos) + "</table></div>";
        itemsAccordion += titulo + cuerpo; 
*/

        vectorTodosMisClientes.forEach(
            function(item, index) {
                var titulo = "<h3>" + item.Nombre + " " + item.Apellido + "</h3>";
                "<div>"
                var cuerpo = "<div><table>" + "<input type=\"button\" id=\"nuevoProducto\" name=\"NuevoProducto\" onclick=\"miDialogoProducto.data('idcliente')," + index + ").dialog('open')\" value=\" Nuevo Producto\" class=\"ui-button ui-widget ui-corner-all\" /></div>" + getProductosAnonima(item.productos) + "</table></div>";
                itemsAccordion += titulo + cuerpo; 
    });

    $("#AccordionClientes").html(itemsAccordion);
    //$("#AccordionClientes").accordion("refresh");

$('#AccordionClientes').accordion("refresh");


/*    $("#lblNombre").text(c.Nombre);
    $("#lblApellido").text(c.Apellido);
    $("#lblTipDoc").text(c.TipoDocumento);
    $("#lblNroDocumento").text(c.NroDocumento);
    $("#lblTelefono").text(c.Telefono);
    $("#lblEmail").text(c.Email);
    $("#lblEdad").text(c.Edad); 
  */  


}
// aca forma parte del acordeon
var getProductosAnonima = function (productos) {
        var filas = "";
        var filaCabecera = "<tr><td>Nombre</td>" + "<td>Tipo</td>" + "<td>Saldo</td>" + "<td>Tasa Mensual</td>" + "<td>Fecha Vencimiento</td></tr>"
       /* for (var i = 0; i < productos.length; i++) {
            filas = filas + "<tr><td>" + productos[i].nombre + "</td>" + "<td>" + productos[i].tipo + "</td>" + "<td>" + productos[i].saldo + "</td>" + "<td>" + productos[i].tasaMensual  + "</td>"+ "<td>" + productos[i].fechaVencimiento + "</td></tr>";
        }
        return filaCabecera + filas; 
        */

        productos.forEach(function (item) {
            filas = filas + "<tr><td>" + item.nombre + "</td>" + "<td>" + item.tipo + "</td>" + "<td>" + item.saldo + "</td>" + "<td>" + item.tasaMensual  + "</td>"+ "<td>" + item.fechaVencimiento + "</td></tr>";
        })
        return filaCabecera + filas; 
    
    
    
    
    }

function showProductos(productos){
    
    $("#tblProductos").html(getProductosAnonima(productos));
}


function getProductosPorFila() {
    var filas = "";
    for (var i = 0; i < productos.length; i++) {
        filas = filas + "<tr><td>" + productos[i] + "</td></tr>"
    }
    return filas;
}

function getProductoDeCadena(vectorProductos) {
    var productos = [];
    for (var i = 0; i < vectorProductos.length; i++) {
        var prodTemp = vectorProductos[i].split(",");//obtengo los atributos de c/producto
        productos[i] = new Producto(prodTemp[0], prodTemp[2], prodTemp[2], prodTemp[3]);
    }
    return productos;
}


function cargarclientes() {

    for (var i = 0; i < datosClientes.length; i++) {
        var nuevoCliente = new Cliente(datosClientes[i][0], datosClientes[i][1], datosClientes[i][2], datosClientes[i][3], datosClientes[i][4], datosClientes[i][5], datosClientes[i][6], datosClientes[i][7]);
        vectorTodosMisClientes.push(nuevoCliente);
    } 
 


/*

    datosClientes.forEach(function(index){
        var nuevoCliente = new Cliente(item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7]);
        vectorTodosMisClientes.push(nuevoCliente);

    })

    */

   


    

    var testSinglenton = MasterPage.instanciar(vectorTodosMisClientes);
    
    construccionMasterPage(testSinglenton);
    MostrarClienteYsusProductos();
    
    
}
// construcion  de la pagina
function construccionMasterPage(mastePageObject) {

    $("body").prepend("<header id='h01' style='display: flex;'></header>");
    var span01 = "<span style='width: 50%;'>" + "Total de Clientes registrados: " + mastePageObject.nroTotalClientes + "</span>";
    var span02 = "<span style='width: 50%;'>" + "Promedio de Productos del Cliente: " + mastePageObject.ProductosCliente + "</span>";

    var buttonSiguiente = "<input type='button'  name='btnSiguiente' id='btn01' value='Ver Cliente Siguiente' />";
    var buttonAnterior = "<input type='button' name='btnAnterior' id='btn02' value='Ver Cliente Anterior' />";

    $("header").prepend(buttonAnterior, span01, span02, buttonSiguiente);
    


    /*document.getElementById("btn01").addEventListener("click", siguiente);
    document.getElementById("btn02").addEventListener("click", anterior);*/

    $("#btn01").click(function(){
        siguiente()
});

     $("#btn02").click(function(){
        anterior()
});


    
    

}

//Metodo que recorre el vector hacia adelante..
function siguiente() {
    if (nroClienteMostrado + 1 < vectorTodosMisClientes.length) {
        var clienteQuieroMostrar = vectorTodosMisClientes[nroClienteMostrado + 1];
        nroClienteMostrado++;
        MostrarClienteYsusProductos(clienteQuieroMostrar);
        showProductos(clienteQuieroMostrar.productos);
    } else {
        alert("Ya estas viendo el ultimo cliente");
    }
}
//Metodo que recorre el vector de clientes hacia atras..
function anterior() {
    debugger;
    if (nroClienteMostrado - 1 < vectorTodosMisClientes.length) {
        var clienteQuieroMostrar = vectorTodosMisClientes[nroClienteMostrado - 1];
        nroClienteMostrado;
        MostrarClienteYsusProductos(clienteQuieroMostrar);
        showProductos(clienteQuieroMostrar.productos);
    } else {
        alert("Ya estas viendo el pirmer cliente");
    }
}

//Cliente: NOMBRE, APELLIDOS, TELEFONO, EMAIL, TIPO DOCUMENTO, NRO DOCUMENTO, EDAD
//VECTOR   [CODIGO CUENTA, NOMBRE PRODUCTO, TIPO PRODUCTO, SALDO, TASA INTERES MENSUAL, FECHA VENCIMIENTO]
var datosClientes  = [
    [
        "Kendry Alejandro", "Martin Urdaneta", "1133465787", "kendry@gmail.com", "CUIL", "209987863", 23,
        [
            [12345, "Prestamo Vehiculo", "PE", 43000, 12, "20191223"],
            [45343, "Prestamos Hipotecario", "PE", 0, 14, "20210423"],
            [13454, "Tarjeta Credito Visa", "TC",0, 23, "20190416"],
            [9292,"Prestamos Hipotecario", "PE", 0, 19,"20180723"],
        ],
    ],
    [
        "Greykel", "Perez", "112448997", "Greykel@gmail.com", "DNI", "76887678", 18,
        [
            [34566, "Caja de ahorro", "CH", 23000.66, 12, "20191223"],
            [452323, "Caja de Salario", "CH", 0, 15, "20210423"],
            [13454, "Tarjeta Credito Master", "TC", 34876.99, 25, "20190416"],
            [534566, "Prestamos Hipotecario", "PE", 0, 14, "20180723"],
        ],
    ],
    [
        "Dylianis", "Lopez", "543567763333", "Dylianis@gmail.com", "DNI", "213332312", 64,
        [
            [2332323, "Caja de ahorro", "CH", 3443.66, 12, "20191223"],
            [12233, "Caja de Salario", "CH", 34343, 15, "20210423"],
            [3234, "Tarjeta Credito Master", "TC", 3434.99, 25, "20190416"],
            [45546, "Prestamos Hipotecario", "PE", 3434, 14, "20180723"],
        ],
    ],
    [
        "Dylan", "Lopez", "5433453243", "Dylan@gmail.com", "DNI", "23445667", 45,
        [
            [2332323, "Caja de ahorro", "CH", 3342344.66, 12, "20191223"],
            [12233, "Caja de Salario", "CH", 2343242, 15, "20210423"],
            [3234, "Tarjeta Credito Master", "TC", 88786.99, 25, "20190416"],
            [45546, "Cuenta Super Ahorro", "CC", 787687, 14, "20260723"],
        ],
    ],
]




function BuscarCiudades() {
    var regionSeleccionada = $("#regiones option:select").val();
    $.ajax({
        data:"json",
        url: "https://restcountries.eu/rest/v2/region/" + regionSeleccionada,
        type: "GET",
        success: function(result) {
            result.forEach (function(item) {
                paises += "<option value=\""  +item.name +"\">" +item.name+ "</option>";

            });
            $("#paises").html(paises);

            }

        };
        error: function() {

        }
    })
}



/*
json.parse
json.parse.forEach{
    var
    function (){

    }
}
     vectorTodosMisClientes.forEach(
            function(item, index) {
                var titulo = "<h3>" + item.Nombre + " " + item.Apellido + "</h3>";
                "<div>"
                var cuerpo = "<div><table>" + "<input type=\"button\" id=\"nuevoProducto\" name=\"NuevoProducto\" onclick=\"miDialogoProducto.data('idcliente')," + index + ").dialog('open')\" value=\" Nuevo Producto\" class=\"ui-button ui-widget ui-corner-all\" /></div>" + getProductosAnonima(item.productos) + "</table></div>";
                itemsAccordion += titulo + cuerpo; 

$.ajax({
    type: 'GET',
    url: filename,
    data: data,
    async: false,
    beforeSend: function (xhr) {
      if (xhr && xhr.overrideMimeType) {
        xhr.overrideMimeType('application/json;charset=utf-8');
      }
    },
    dataType: 'json',
    success: function (data) {
      //Do stuff with the JSON data
    }
  });
*/