// Funcion para carga de datos desde LocalStorage
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const productos = JSON.parse(localStorage.getItem("productos")) || [];

// Funcion para guardado de datos en LocalStorage
function guardarDatos() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("productos", JSON.stringify(productos));
}

// Funcion para renderizar productos del carrito
function renderizarCarrito() {
    const carritoList = document.getElementById("carrito-list");
    const carritoTotales = document.getElementById("carrito-totales");
    
    // Limpiamos contenedores y totales
    carritoList.innerHTML = ""; 
    carritoTotales.innerHTML = "";

    // Mostramos texto de carrito vacío previa comprobación
    if (carrito.length === 0) {
        carritoList.innerHTML = "<p class='text-center'>El carrito está vacío.</p>";
        return;
    }

    let totalCompra = 0;

    // Calculo total del carrito (suma de totales de cada producto)
    carrito.forEach(item => {
        const subtotal = item.cantidad * item.precio;
        totalCompra += subtotal;
        
        // Mostramos productos del carrito con plantillas literales
        carritoList.innerHTML += `
            <div class="col-md-12 mb-3">
                <div class="d-flex justify-content-between align-items-center border-bottom pb-2">
                    <div>
                        <h5>${item.nombre}</h5>
                        <p>${item.cantidad} x $${item.precio} = $${subtotal}</p>
                    </div>
                    <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
                </div>
            </div>
        `;
    });

    carritoTotales.innerHTML = `
        <h4>Total: $${totalCompra}</h4>
        <button class="btn btn-success me-2" onclick="pagar()">Pagar</button>
        <button class="btn btn-danger" onclick="limpiarCarrito()">Limpiar Carrito</button>
    `;
}

// Funcion para eliminar un producto del carrito
function eliminarDelCarrito(id) {
    const nuevoCarrito = []; // Creamos un nuevo array
    carrito.forEach(item => {
        if (item.id !== id) {
            nuevoCarrito.push(item); // Agregamos los productos que no coincidan con el ID
        } else {
            // Si coincide, devolvemos el stock al inventario
            const producto = productos.find(p => p.id === id);
            if (producto) {
                producto.stock += item.cantidad;
            }
        }
    });
    // Reasigno carrito con el nuevo array
    carrito.length = 0; // Vacio el array actual y lleno con los elementos restantes
    nuevoCarrito.forEach(item => carrito.push(item));
    
    guardarDatos();
    renderizarCarrito();
}

// Funcion para limpiar el carrito
function limpiarCarrito() {
    carrito.forEach(item => {
        const producto = productos.find(p => p.id === item.id);
        if (producto) {
            producto.stock += item.cantidad; // Devolvemos stock al inventario
        }
    });
    carrito.length = 0; // Vaciar el carrito
    guardarDatos();
    renderizarCarrito();
}

// Simular pago
function pagar() {
    alert("La funcionalidad de pago aún no está implementada.");
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrito();
});
