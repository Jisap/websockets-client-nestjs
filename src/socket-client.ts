import { Manager, Socket } from "socket.io-client"

let socket: Socket // Socket definido globalmente

export const connectToServer = (token: string) => {                               // Manager nos conecta a la dirección del socket del server, gestionando el token recibido

    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
        extraHeaders:{
            authentication: token                                                 // Aqui enviamos el token al server en los extraHeaders  
        }
    }) 

    socket?.removeAllListeners()
    socket = manager.socket('/');                                                 // socket es una instancia del manager que conecta al root del server

    addListeners();                                                               // Escuchamos los eventos del socket
}

const addListeners = () => { 

    const serverStatusLabel = document.querySelector('#server-status')!; // Identificación del span
    const clientsUl = document.querySelector('#clients-ul')!;            // Identificación del Ul
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messageUl = document.querySelector<HTMLUListElement>('#messages-ul')!;

    socket.on('connect', () => {                                        // Escuchamos información del servidor, en este caso el estado de la conexión.
        serverStatusLabel.innerHTML = 'connected';                      // Si el servidor nos dice que el cliente esta conectado mandamos al span el mensaje de 'connected'
    })

    socket.on('disconnect', () => {                                     // Lo mismo pero para la desconexión.
        serverStatusLabel.innerHTML = 'disconnect'
    })

    socket.on('clients-updated', (clients: string[]) => {               // Escuchamos el evento del server 'clients-updated' que nos devuelve la lista de clientes conectados
        let clientsHtml = '';
        clients.forEach(clientId => {                                   // Recorremos el [] de clientes y los mostramos
            clientsHtml += `
                <li>${clientId}</li>                                    
            `
        });
        clientsUl.innerHTML = clientsHtml;                                           
    })

    messageForm.addEventListener('submit', ( event ) => {               // Obtenemos el value del input del form
        event.preventDefault();
        if (messageInput.value.trim().length <= 0 ) return

        socket.emit('message-from-client',{ id: 'yo', message: messageInput.value }); // y lo emitimos a todo el mundo.
    
        messageInput.value = '';
    })

    socket.on('message-from-server', ( payload: { fullName: string, message: string } ) => { // El cliente escuchará todos los mensajes emitidos por otros clientes 
        
        const newMessage= `
            <li>
                <strong>${ payload.fullName }</strong>
                <span>${ payload.message }</span>
            </li>
        `
        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messageUl.append( li )
    })
}