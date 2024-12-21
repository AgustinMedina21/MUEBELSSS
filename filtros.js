document.addEventListener('DOMContentLoaded', () => {
    // Obtén todos los selectores de los filtros
    const categoriaFiltro = document.getElementById('categoria');
    const precioFiltro = document.getElementById('precio');
    const colorFiltro = document.getElementById('color');
    const materialFiltro = document.getElementById('material');

    // Obtén todas las tarjetas de los productos
    const productos = document.querySelectorAll('.catalogo .card');

    // Función para filtrar productos según los valores seleccionados en los filtros
    function filtrarProductos() {
        // Recorre todas las tarjetas de los productos y verifica las condiciones de los filtros
        productos.forEach(producto => {
            const categoria = producto.getAttribute('data-categoria');
            const precio = parseFloat(producto.getAttribute('data-precio'));
            const color = producto.getAttribute('data-color');
            const material = producto.getAttribute('data-material');
            
            // Variables de los filtros
            const categoriaSeleccionada = categoriaFiltro.value;
            const precioSeleccionado = precioFiltro.value;
            const colorSeleccionado = colorFiltro.value;
            const materialSeleccionado = materialFiltro.value;

            // Comprueba si la tarjeta del producto coincide con las opciones de los filtros
            const cumpleCategoria = !categoriaSeleccionada || categoria === categoriaSeleccionada;
            const cumplePrecio = cumpleCategoria && (
                (precioSeleccionado === 'menor_100' && precio <= 100) ||
                (precioSeleccionado === '100_200' && precio > 100 && precio <= 200) ||
                (precioSeleccionado === 'mayor_200' && precio > 200) ||
                precioSeleccionado === ''
            );
            const cumpleColor = cumplePrecio && (!colorSeleccionado || color === colorSeleccionado);
            const cumpleMaterial = cumpleColor && (!materialSeleccionado || material === materialSeleccionado);
            
            // Si cumple con todos los filtros, mostramos el producto. Si no, lo ocultamos.
            if (cumpleMaterial) {
                producto.style.display = 'block';
            } else {
                producto.style.display = 'none';
            }
        });
    }

    // Añadir eventos a los select para aplicar los filtros cuando cambien
    categoriaFiltro.addEventListener('change', filtrarProductos);
    precioFiltro.addEventListener('change', filtrarProductos);
    colorFiltro.addEventListener('change', filtrarProductos);
    materialFiltro.addEventListener('change', filtrarProductos);
    
    // Llamar la función al cargar la página por si ya hay filtros seleccionados
    filtrarProductos();
});
