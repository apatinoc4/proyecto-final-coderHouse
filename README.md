# Proyecto Final CoderHouse

Actualmente el proyecto cuenta con una API simple la cual puede ser accedida por Postman

## Como correr el proyecto

En la raiz del proyecto correr:

    npm install
    npm start

Si se quiere agregar o revocar permiso de administrador, modificar la variable **isAdmin** del [siguiente archivo](https://github.com/apatinoc4/proyecto-final-coderHouse/blob/master/src/variables/isAdmin.js)

## Rutas Actuales

Las siguientes rutas estan disponibles:

#### Productos

Ruta base:

    api/productos

1.  GET: '/:id?' - Permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
2.  POST: '/' - Incorpora productos al listado (disponible para administradores)
3.  PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
4.  DELETE: '/:id' - Borra un producto por su id (disponible para administradores)

#### Carrito

Ruta base:

    api/carrito

1.  POST: '/' - Crea un carrito y devuelve su id.
2.  DELETE: '/:id' - Vacía un carrito y lo elimina.
3.  GET: '/:id/productos' - Permite listar todos los productos guardados en el carrito
4.  POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
5.  DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
