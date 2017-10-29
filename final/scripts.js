numero = 589
 function sexo() {
    $.ajax({
        dataType: "json",
        url: "https://anapioficeandfire.com/api/characters/" + numero,
        type: "GET",
        success: function (result) {
            if (result.gender == "Female") {

                var imagen = "<img class=\"img-responsive center-block\" src=\"female.jpg\" data-toggle=\"modal\" data-target=\"#myModal\" alt=\"Card image cap\">" //eso
                $("#sexo").html(imagen);
                $("#sexomodal").html(result.gender);


            } else { var imagen = "<img class=\"img-responsive center-block\" src=\"man.jpg\" data-toggle=\"modal\" data-target=\"#myModal\" alt=\"Card image cap\">" //esto
            $("#sexo").html(imagen);
            $("#sexomodal").html(result.gender);
             };

            $(".name").html(result.name);
            $("#born").html(result.born)




            var titulos = "";
            result.titles.forEach(function(item) {
            titulos += item + ", ";

            });
            $("#titles").html(titulos);


            var libros = result.books; // no le gustaba al foreach cargar los libros result.books.foreach. 
            var lnombre ="", lisbn ="", lnropag="", ltipotap="", lpublicacion="";
            
            libros.forEach(function(linkLibro) {
                
                $.ajax({
                    dataType: "json",
                    url: linkLibro,
                    type: "GET",
                    crossDomain : true,
                    success: function (dataLibro) {
                        
                        lnombre += dataLibro.name + ",";
                        $("#books").html(lnombre);
                        
                        lisbn += dataLibro.isbn + ","; 
                        $("#isbn").html(lisbn); 
                        
                        lnropag += dataLibro.numberOfPages + ",";
                        $("#nropag").html(lnropag);

                        ltipotap += dataLibro.mediaType + ","; 
                        $("#tipotap").html(ltipotap);

                        lpublicacion += dataLibro.released + ",";                          
                        $("#publicacion").html(lpublicacion);
                       
               
                    },
                });
                
                




            

            });
            

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