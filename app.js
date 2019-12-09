//Criação das classes
class Guiche {
    constructor(livre) {
        this.livre = livre;
        this.tempoOcupado = 0;
    }
}

class Cliente {
    constructor(horaEntrada) {
        this.horaEntrada = horaEntrada;
    }
}

//Variáveis que serão utilizadas
var guiche, guicheInput, horas, horasInput, saque, saqueInput, deposito, depositoInput, pagamento, pagamentoInput;
var totalClientes = 0, saques = 0, depositos = 0, pagamentos = 0, somaEspera = 0, tempoTransacao = 0, mediaEspera = 0;
var minMedia, minExtra, segMedia, segExtra;

function startSimulation(guiches, expediente, tempoSaque, tempoDeposito, tempoPagamento) {

    //Instanciando a quantidade desejada de guiches
    var qtdGuiche = guiches;
    var tempoExpediente = expediente * 3600;
    var listaGuiches = new Array();
    for (var i = 0; i < qtdGuiche; i++) {
        var guiche = new Guiche(true);
        listaGuiches.push(guiche)
    }

    //Criando a fila que armazena os clientes
    var filaClientes = new Array();

    //Variáveis que controlam a duração do expediente
    var tempo = 0, tempoExtra = 0;

    //Início do expediente
    while (tempo <= tempoExpediente || filaClientes.length != 0) {

        if (tempo > tempoExpediente) { //Tempo Extra
            tempoExtra++;
        }

        if (tempo <= tempoExpediente) { //Impede a entrada de clientes depois do fim do expediente
            if (chegouCliente()) {
                filaClientes.push(new Cliente(tempo)); //Adiciona o cliente na fila no momento que chegou
                totalClientes++;
            }
        }

        //Verifica se há um guiche livre e a fila não está vazia
        if (guicheLivre(listaGuiches, qtdGuiche) && filaClientes.length > 0) {

            //Soma o tempo de espera de cada cliente
            somaEspera += (tempo - filaClientes.shift().horaEntrada);

            for (var i = 0; i < qtdGuiche; i++) { //Verifica qual guiche está livre
                if (listaGuiches[i].livre) {
                    listaGuiches[i].livre = false; //Ocupa o guiche

                    var random = Math.floor(Math.random() * 3);

                    switch (random) {
                        case 0:
                            //Transação de saque
                            tempoTransacao = tempo + tempoSaque;
                            saques++;
                            break;
                        case 1:
                            //Transação de depósito
                            tempoTransacao = tempo + tempoDeposito;
                            depositos++;
                            break;
                        case 2:
                            //Transação de pagamento
                            tempoTransacao = tempo + tempoPagamento;
                            pagamentos++;
                            break;
                    }
                    listaGuiches[i].tempoOcupado = tempoTransacao;

                    break;
                }
            }
        }

        for (var i = 0; i < qtdGuiche; i++) {
            if (listaGuiches[i].livre == false && tempo == listaGuiches[i].tempoOcupado) {
                listaGuiches[i].livre = true; //Libera o guiche após a transação
            }
        }

        tempo++;

    }

    if (totalClientes > 0) {
        mediaEspera = somaEspera / totalClientes;
    }

    //Calculos utilizados para processar as saídas

    segMedia = Math.round(mediaEspera % 60);
    mediaEspera /= 60;
    minMedia = Math.round(mediaEspera % 60);

    segExtra = Math.round(tempoExtra % 60);
    tempoExtra /= 60;
    minExtra = Math.round(tempoExtra % 60);

    //Resultados
    request()

}

//Retorna true se um cliente chegou
function chegouCliente() {
    var random = Math.floor(Math.random() * 30);
    return random == 0;
}

//Verifica se há um guiche livre
function guicheLivre(lista, qtdGuiche) {
    var retorno = false;
    for (var i = 0; i < qtdGuiche; i++) {
        if (lista[i].livre) {
            retorno = true;
            break;
        }
    }
    return retorno;
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        if (document.getElementById('container').style.width == "60%") {
            document.getElementById('container').style.width = "30%";
        } else {
            document.getElementById('container').style.width = "60%"
        }
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

document.getElementById("botaoIniciar").onclick = () => {
    guicheInput = document.getElementById('guiche').value * 1;
    guiche = guicheInput < 1 ? 3 : guicheInput;
    horasInput = document.getElementById('horas').value * 1;
    horas = horasInput < 1 ? 6 : horasInput;
    saqueInput = document.getElementById('saque').value * 1;
    saque = saqueInput < 1 ? 60 : saqueInput;
    depositoInput = document.getElementById('deposito').value * 1;
    deposito = depositoInput < 1 ? 90 : depositoInput;
    pagamentoInput = document.getElementById('pagamento').value * 1;
    pagamento = pagamentoInput < 1 ? 120 : pagamentoInput;

    startSimulation(guiche, horas, saque, deposito, pagamento);
};

function getResultados(){
    return [totalClientes, saques, depositos, pagamentos, minMedia, segMedia, minExtra, segExtra];
   
}
