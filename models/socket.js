const shuffle = require('lodash.shuffle');
//import shuffle from 'lodash.shuffle';
const FontAwesomeClasses = require('./fontAwesomeClasses')
const NUMERO_DE_CARTAS = 20;
class Sockets {

    constructor(io) {
        this.io = io;

        this.socketEvents();
    }

    mezclarCartas () {
        const fontAwesomeClasses =  new FontAwesomeClasses();
        
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