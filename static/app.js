"use strict";

function newLine(app,count){
    // Cria a linha que sera adicionada na coluna
    let linha = $("<tr>");
    let colunaUsuario = $("<td>").text(app);
    let colunaPalavras = $("<td>").text(count);

    // Os três <td> dentro do <tr>
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);

    return linha;
}

const main = () =>{

    let updateCounts = (counts) => {
        $('#awesome').text(counts.awesome);
        $('#cool').text(counts.cool);
    };

    let updateApps = (count) => {
        // Para cada objeto recebido da API esse codigo ira gerar uma linha
        // com o nome da aplicacao e sua quantidade
        let tamanho = Object.keys(count).length;
        for (let i = 0 ; i < tamanho; i++) {
           let line = newLine(count[i].app, count[i].count);
           $('#app').append(line);
        }
    };

    setInterval( () => {
        $.getJSON('http://localhost:3000/counts_terms.json', updateCounts);
    }, 3000 );

    setInterval( () => {
        // Codigo para remover os dados adicionados anteriormente e assim evitar repeticao
        $('#app').remove();
        let linha = $("<tbody>").attr('id', 'app');
        $('#aplicacoes').append(linha);

        $.getJSON('http://localhost:3000/counter_app.json', updateApps);
    }, 3000 );
};

$(document).ready(main);