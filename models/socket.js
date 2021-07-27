const shuffle = require('lodash.shuffle');
//import shuffle from 'lodash.shuffle';
const FontAwesomeClasses = require('./fontAwesomeClasses')
//import FontAwesomeClasses from './fontAwesomeClasses'
const NUMERO_DE_CARTAS = 20;
class Sockets {

    constructor(io) {
        this.io = io;

        this.socketEvents();
    }

    mezclarCartas () {
        const fontAwesomeClasses =  ["fa-adjust", "fa-adn", "fa-align-center", "fa-align-justify", "fa-align-left", "fa-align-right",
        "fa-ambulance", "fa-anchor", "fa-android", "fa-angellist", "fa-angle-double-down", "fa-angle-double-left",
        "fa-angle-double-right", "fa-angle-double-up", "fa-angle-down", "fa-angle-left", "fa-angle-right", "fa-angle-up",
        "fa-apple", "fa-archive", "fa-area-chart", "fa-arrow-circle-down", "fa-arrow-circle-left", "fa-arrow-circle-o-down",
        "fa-arrow-circle-o-left", "fa-arrow-circle-o-right", "fa-arrow-circle-o-up", "fa-arrow-circle-right", "fa-arrow-circle-up",
        "fa-arrow-down", "fa-arrow-left", "fa-arrow-right", "fa-arrow-up", "fa-arrows", "fa-arrows-alt", "fa-arrows-h",
        "fa-arrows-v", "fa-asterisk", "fa-at", "fa-automobile", "fa-backward", "fa-ban"]
        
        let cartas = [];
    
        while (cartas.length < NUMERO_DE_CARTAS) {
            const index = Math.floor(Math.random() * fontAwesomeClasses.length);
            const carta = {
                icono: fontAwesomeClasses.splice(index, 1)[0],
                fueAdivinada: false
            };
    
            cartas.push(carta);
            cartas.push({...carta});
        }
    
        return shuffle(cartas);
    };

    socketEvents() {
        let deck = this.mezclarCartas();
        this.io.on('connection', client => {

            client.on('msj-input-server', (data) => {
                console.log(data);

                this.io.emit('msj-output-client', data);
            })

            client.emit('deck',deck);
            client.emit('connection', 'Conexion exitosa')

        });
    }

}

module.exports = Sockets;