
$(document).ready(function() {
    alert('Disclaimer: los superhéroes que tienen stats como null, les di un poder base de 1 para que el gráfico al menos se muestre xD')
    $('#formularioBusqueda').submit(function(event) {
        event.preventDefault(); 
        var numeroHeroe = $('#numeroHeroe').val();
        if (esNumeroValido(numeroHeroe)) {
            consultarAPI(numeroHeroe);
        } else {
            alert('Por favor, ingresa un número válido.');
        }
    });
});

function esNumeroValido(numero) {
    return /^\d+$/.test(numero); 
}

function consultarAPI(numeroHeroe) {
    $.ajax({
        url: `https://superheroapi.com/api.php/4905856019427443/${numeroHeroe}`, 
        success: function(data) {
             renderizarDatos(data);
            renderizarGrafico(data.powerstats);  
        },
        error: function() {
            alert('Error al obtener la información del superhéroe. Por favor, intenta de nuevo.');
        }
    });
}


function renderizarGrafico(stats) {

    var chart = new CanvasJS.Chart("chartContainer", {
        title: {
            text: "Estadísticas del Superhéroe"
        },
        data: [{
            type: "pie",
            startAngle: 45,
            showInLegend: true,
            legendText: "{label}",
            indexLabel: "{label} ({y})",
            yValueFormatString:"#,##0.#"%"",
            dataPoints: [
                { label: "Fuerza", y: stats.strength !== "null" ? stats.strength : 1},
                { label: "Velocidad", y: stats.speed !== "null" ? stats.strength : 1},
                { label: "Inteligencia", y: stats.intelligence !== "null" ? stats.strength : 1 },
                { label: "Durabilidad", y: stats.durability !== "null" ? stats.strength : 1 },
                { label: "Poder", y: stats.power !== "null" ? stats.strength : 1},
                { label: "Combate", y: stats.combat !== "null" ? stats.strength : 1}
            ]
        }]
    });
    chart.render();
}

function renderizarDatos(heroe) {
    var contenido = `
    <div class="card" style="width: 18rem;">
        <img src="${heroe.image.url}" class="card-img-top" alt="${heroe.name}">
        <div class="card-body">
            <h5 class="card-title">${heroe.name}</h5>
            <p class="card-text font-weight-bold">Género: <span class="font-weight-light">${heroe.appearance.gender === 'Male' ? 'Masculino' : 'Femenino'}</span></p>
            <p class="card-text font-weight-bold">Peso: <span class="font-weight-light">${heroe.appearance.weight[1]}</span></p>
            <p class="card-text font-weight-bold">Altura: <span class="font-weight-light">${heroe.appearance.height[1]}</span></p>
            <p class="card-text font-weight-bold">Publicado por: <span class="font-weight-light">${heroe.biography.publisher}</span></p>
            <p class="card-text font-weight-bold">Trabajo: <span class="font-weight-light">${heroe.work.occupation}</span></p>
        </div>
    </div>
    `;
    $('#resultado').html(contenido); 
}