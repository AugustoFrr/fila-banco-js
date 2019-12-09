function request() {
    let ajax = new XMLHttpRequest();

    ajax.open('GET', "./resultado.html");


    ajax.onreadystatechange = () => {
        if (ajax.readyState == 4 && ajax.status == 200) {
            document.querySelector("body").innerHTML = ajax.responseText;

            var resultados = getResultados();

            document.getElementById('clientes').innerHTML = resultados[0];
            document.getElementById('saques').innerHTML = resultados[1];
            document.getElementById('depositos').innerHTML = resultados[2];
            document.getElementById('pagamentos').innerHTML = resultados[3];
            document.getElementById('minMedia').innerHTML = `${resultados[4]} min`;
            document.getElementById('segMedia').innerHTML = `${resultados[5]} seg`
            document.getElementById('minExtra').innerHTML = `${resultados[6]} min`
            document.getElementById('segExtra').innerHTML = `${resultados[7]} seg`

        }

        if (ajax.readyState == 4 && ajax.status == 404) {
            alert('tente novamente!')
        }
    }

    ajax.send(null);
}

