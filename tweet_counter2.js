"use strict";

const ntwitter = require('ntwitter');
const credentials = require('./secrets.json');

let twitter = ntwitter(credentials);
let terms = ['awesome', 'cool'];
let counts_terms = {
    awesome : 0,
    cool : 0
};

let counter_app = [];

function biuldApp(x){
    let obj ={}
    obj['app'] = x;
    obj['count'] = 1;
    counter_app.push(obj);
}

twitter.stream(
    'statuses/filter',
    {'track': terms},
    stream =>{
        stream.on('data', tweet =>{
            if (tweet.text.indexOf('awesome') >= 0)
                counts_terms.awesome += 1;
            if (tweet.text.indexOf('cool') >= 0)
                counts_terms.cool += 1;

            // retira da tag apenas o seu coteudo de texto
            let x = tweet.source.split('>')[1];
            x = x.split('<')[0];

            // procura se o valor inserido de aplictivo já está no array
            let app = counter_app.filter((app) => {
                return app.app === x;
            });

            // se o applicativo ainda nao foi cadastrado ele é adicionado ao array
            // e caso ele já tenho sido adicionado soma-se 1 ao count (medidor de frequencia)
            if ( app.length == 0)
                biuldApp(x);
            else
                counter_app.filter((app) => {
                    if (app.app === x)
                        app.count += 1;
                        return;
                });
        });
    }
);
module.exports = [counts_terms, counter_app];
