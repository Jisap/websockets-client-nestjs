import { connectToServer } from './socket-client'
import './style.css'
//import typescriptLogo from './typescript.svg'
//import { setupCounter } from './counter'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websocket - Client</h2>

    <input id="jwt-token" placeholder="Json Web Token"/>
    <button id="btn-connect">Connect</button>

    <br/>
    <span id="server-status">Offline</span>

    <ul id="clients-ul">
      <li>DLKFGKLJFL</li>
    </ul>
  </div>

  <form id="message-form">
    <input placeholder="message" id="message-input" />
  </form>

  <h3>Messages</h3>
  <ul id="messages-ul"></ul>
`

//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
//connectToServer()

const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!;      // Identificamos el input del token    
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!; // Identificamos el bton de conexión 

btnConnect.addEventListener('click', () => {                                   // Escuchamos el evento click del boton. 

  if(jwtToken.value.trim().length <= 0 ) return alert('Enter a valid JWT')     // Si no hay token mensaje de error



  connectToServer( jwtToken.value.trim() )                                     // Si si hay token lo enviamos a la función connectToServer 
})
