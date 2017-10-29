
numero = 589
 function sexo() {
    $.ajax({
        dataType: "json",
        url: "https://anapioficeandfire.com/api/characters/"+numero,
        type: "GET",
        success: function (result) {
            if (result.gender == "Female") {
                var imagen = "<img src=\"female.jpg\" >"
                $("#sexo").html();
                $("#sexomodal").html(result.gender);


            } else { var imagen = "<img src=\"man.jpg\" >"
            $("#sexo").html(imagen);
            $("#sexomodal").html(imagen);
             };

            $(".name").html(result.name);
            $("#born").html(result.born)

            

            
            var titulos = "";
            result.titles.forEach(function(item) {
            titulos += item + ", ";
                
            });
            $("#titles").html(titulos);


            var libros = "";
            result.books.forEach(function(item) {
            libros += item + ", ";
                
            });
            $("#books").html(libros);

        }
    });
};

function siguiente() {
        numero += 1;
        sexo();
}
function anterior() {
        numero -= 1;
        sexo();
}







