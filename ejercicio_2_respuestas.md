
2.1) ¿Cómo implementarías las acciones del frontend utilizando redux? (por
ejemplo autenticación, solicitud de clientes activos para el usuario y
solicitud de casos por cliente)
 
 al igual que con BrowserRouter, Redux es una librería que devemos instalar (npm install --save redux) si queremos utilizarlo. tambien existen redux-thunk y redux-saga que en este caso no usaria ya que no es necesario pedidos de informacion con un backend y no es necesario utilizar el middleware de redux-thunk.
 una vez instalado redux, se debe importar en el archivo principal de nuestra aplicación.
 en este caso el index.js 

 ReactDOM.render(

    <Provider store = {store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    </Provider>,
  
  document.getElementById('root')
);

provider es un componente que nos permite utilizar redux en nuestra aplicación.
el store sirve para almacenar los datos de nuestra aplicación. dando un valor inicial a nuestra aplicación.

en la carpeta action se encuentran las acciones que se ejecutaran en nuestra aplicación. 
   
   por ejemplo: 
   ```
   export const login = createAsyncThunk(
        'client/login',
        async () => {
           const response = await axios.post('https://admindev.inceptia.ai/api/v1/login/', {
                "email": "reactdev@iniceptia.ai",
                "password": "4eSBbHqiCTPdBCTj",
            })
            return response.data.token;
        }
    );
 ```

2.2) Si quisiéramos agregar una ruta nueva a la app, ¿cómo reestructurarías
el index.js?

Para usar mas de una ruta en React es necesario usar el enrutador de react-router-dom (BrowserRouter) que permite la navegación entre vistas de varios componentes en una aplicación React, permite cambiar la URL del navegador y mantiene la interfaz de usuario sincronizada con la URL.
haciendo npm install – -save react-router-dom y importando BrowserRouter de react-router-dom en el index.js
y lluego usando el componente Route para crear las rutas que definiria en el componente app.
quedaria algo asi como:
```
import {BrowserRouter} from 'react-router-dom';

 ReactDOM.render(
  <React.StrictMode>
       <BrowserRouter>
        <App />
      </BrowserRouter>,
  </React.StrictMode>,
  document.getElementById("root")
  ;
```
 Si estamos usando redux para el estado de la aplicación, podemos usar el componente Provider para pasarle el estado a todos los componentes de la aplicación. 

    import {Provider} from 'react-redux';   
    import store from './store';
    import {BrowserRouter} from 'react-router-dom';
    import App from './App';

    ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </React.StrictMode>,
      document.getElementById('root')
    );
