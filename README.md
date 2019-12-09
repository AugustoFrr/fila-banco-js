# fila-banco-js
O mesmo simulador de fila de um banco, dessa vez em JavaScript. 

A mesma ideia do projeto em Java, porém, refeito utilizando JS com adição de uma interface. O objetivo foi treinar os conhecimentos adquiridos em ES6 e relembrar um projeto do passado.

**[Clique aqui para testar!](http://www.augustofrr.ga/fila-banco/)**

**[Clique para acessar o projeto antigo, feito em Java.](https://github.com/AugustoFrr/fila-banco)**

**Está é a minha solução para o problema:**

Implementar um algoritmo que determine o tempo médio que um cliente permanece na fila de uma agência bancária. Quando um cliente entra na fila, o horário é anotado. Quando ele sai, o tempo que ele permaneceu na fila é calculado e adicionado ao tempo total de espera. Assim, no final do expediente, é possível determinar quanto tempo, em média, cada cliente teve que aguardar para ser atendido.

# Cenário da Simulação

Na agência há três guichês que atendem a uma única fila de clientes. À medida que um deles ficar livre, o primeiro cliente da fila o utiliza.
Há apenas duas entidades envolvidas na simulação: guichês e clientes. Tudo o que é necessário saber sobre um guichê é se ele está ocupado e, caso esteja, por quanto tempo permanecerá ocupado. Inicialmente, todos os guichês estão livres. Quando um cliente inicia uma transação num deles, o tempo médio necessário para a realização da transação determina por quanto tempo o guichê permanecerá ocupado.

| Transação  | Código | Tempo Médio |
| --- | --- | --- |
| Saque  | 0  | 60 segundos |
| Depósito  | 1  | 90 segundos |
| Pagamento  | 2  | 120 segundos |

Sobre o cliente, só é necessário saber quando ele entrou na fila para que, ao sair, seja possível calcular quanto tempo ele permaneceu nela.

# Algoritmo de Simulação

Na simulação a ser realizada, há dois eventos importantes:
<ul>
<li>Um cliente chega à agência e entra na fila.</li>
<li>Um guichê é liberado, alguém sai da fila e o utiliza.</li>
</ul>

Em cada instante de tempo, qualquer combinação desses eventos pode ocorrer (ou mesmo nenhum deles).

## Terminou o expediente?
O término do expediente será indicado pelo cronômetro, que marcará o tempo em segundos. O período de atendimento da agência é de 6 horas, o que corresponde a 21600 segundos. O expediente termina após este tempo decorrido.

## Chegou um cliente?
Para que a simulação seja o mais próximo da realidade, será adotado um valor aleatório para simular a chegada do cliente.
A cada segundo decorrido, será chamada uma função aleatória que sorteia um valor entre 0 e 29. Caso o número sorteado seja o número 0, isso indica que o cliente chegou. Caso contrário, o cliente não chegou.

## Cliente entra na fila
Um cliente será representado pelo horário em que ele entrou na fila. Logo, inserir um cliente na fila equivale a simplesmente inserir nela o valor corrente do cronômetro.

## Iniciando a transação
Quando um guichê é liberado e um cliente se dirige a ele, é necessário saber por quanto tempo ele ficará ocupado. Esse tempo depende da transação realizada pelo cliente. As transações realizadas são aleatórias.
Para saber qual será a transação, um número aleatório entre 0 e 2 é gerado. Caso seja gerado o valor 0, a transação será um saque, caso seja gerado o valor 1, a transação será um depósito, e caso seja gerado o valor 2, a transação será um pagamento.

## Finalização do expediente
Ao final do expediente, caso ainda haja clientes na fila, eles devem ser atendidos.
Quando o expediente tiver terminado e não houver mais clientes na fila, as seguintes informações devem ser impressas:

<ul>
<li>Número total de clientes atendidos.</li>
<li>Número de clientes que fizeram saque, depósito e pagamento.</li>
<li>Tempo médio de espera na fila.</li>
<li>Tempo extra de expediente.</li>
</ul>

