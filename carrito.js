document.addEventListener('DOMContentLoaded', () => {
    const carritoIcon = document.getElementById('carrito-icon');
    const carritoPanel = document.getElementById('carrito-panel');
    const cerrarCarritoBtn = document.getElementById('cerrar-carrito');
    const botonesAgregar = document.querySelectorAll('button[data-nombre]');
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    const carritoCount = document.getElementById('carrito-count');

    let carrito = [];

    carritoIcon.addEventListener('click', () => {
        carritoPanel.classList.toggle('abierto');
    });

    cerrarCarritoBtn.addEventListener('click', () => {
        carritoPanel.classList.remove('abierto');
    });

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

    function actualizarCarrito() {
        listaCarrito.innerHTML = '';

        let total = 0;
        carrito.forEach(producto => {
            total += producto.precio * producto.cantidad;

            const item = document.createElement('li');
            item.textContent = `${producto.nombre} x${producto.cantidad} - $${(producto.precio * producto.cantidad).toFixed(2)}`;

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener('click', () => {
                eliminarProducto(producto.nombre);
            });

            item.appendChild(botonEliminar);
            listaCarrito.appendChild(item);
        });

        totalCarrito.textContent = total.toFixed(2);
        carritoCount.textContent = carrito.reduce((sum, producto) => sum + producto.cantidad, 0);
    }

    function eliminarProducto(nombre) {
        carrito = carrito.filter(producto => producto.nombre !== nombre);
        actualizarCarrito();
    }
});

