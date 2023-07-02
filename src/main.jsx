import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
 
    <App />
  
)




/*O REACT STRICT MODE FAZ COM QUE OS ELEMENTOS SEJAM RENDERED 2VEZES. 
Por vezes são criados objetos duplicados na base de dados como no Pay onde são criadas 2 ordens de payement intent diferente.
Os outros objetos não, porque não têm atributos diferentes entao a mongo nao cria nada de novo

Em dev ele faz isto
Em production não faz isto





*/
