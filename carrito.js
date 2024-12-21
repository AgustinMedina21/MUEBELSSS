document.addEventListener('DOMContentLoaded', () => {
    const carritoIcon = document.getElementById('carrito-icon');
    const carritoPanel = document.getElementById('carrito-panel');
    const cerrarCarritoBtn = document.getElementById('cerrar-carrito');
    const botonesAgregar = document.querySelectorAll('button[data-nombre]');
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    const carritoCount = document.getElementById('carrito-count');

    let carrito = []; // Array para almacenar los productos seleccionados

    // Mostrar/ocultar el panel del carrito
    carritoIcon.addEventListener('click', () => {
        carritoPanel.classList.toggle('abierto');
    });

    cerrarCarritoBtn.addEventListener('click', () => {
        carritoPanel.classList.remove('abierto');
    });

    // Agregar productos al carrito
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', () => {
            const nombre = boton.getAttribute('data-nombre');
            const precio = parseFloat(boton.getAttribute('data-precio'));

            const productoExistente = carrito.find(producto => producto.nombre === nombre);

            if (productoExistente) {
                productoExistente.cantidad += 1;
            } else {
                carrito.push({ nombre, precio, cantidad: 1 });
            }

            actualizarCarrito();
        });
    });

    // Actualizar el carrito en el panel
    function actualizarCarrito() {
        // Limpiar la lista actual
        listaCarrito.innerHTML = '';

        // Calcular el total
        let total = 0;
        carrito.forEach(producto => {
            total += producto.precio * producto.cantidad;

            // Crear el elemento del producto
            const item = document.createElement('li');
            item.textContent = `${producto.nombre} x${producto.cantidad} - $${(producto.precio * producto.cantidad).toFixed(2)}`;

            // Botón para eliminar el producto
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener('click', () => {
                eliminarProducto(producto.nombre);
            });

            item.appendChild(botonEliminar);
            listaCarrito.appendChild(item);
        });

        // Actualizar el total y contador
        totalCarrito.textContent = total.toFixed(2);
        carritoCount.textContent = carrito.reduce((sum, producto) => sum + producto.cantidad, 0);
    }

    // Eliminar un producto del carrito
    function eliminarProducto(nombre) {
        carrito = carrito.filter(producto => producto.nombre !== nombre);
        actualizarCarrito();
    }
});

