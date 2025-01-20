// Productos disponibles, segun esten cargados o unos . POdria ver de cargar un boton que lleve a una funcion que cargue una lista inicial de productos para evitar que aparezca 
// vacia si el usr va directo a admin. PENDIENTE
//Otro pendiente es al agregar un producto desde admin, no queda bien el id. PENDIENTE.
const productos = JSON.parse(localStorage.getItem("productos")) || [
    { id: 1, nombre: "Cemento", descripcion: "Marca: Hercal. Cantidad: Bolsa 50kg ", precio: 500, stock: 10, categoria: "Materiales de Construcción" },
    { id: 2, nombre: "Arena", descripcion: "Tipo: Fina. Cantidad: Metro cúbico", precio: 300, stock: 5, categoria: "Materiales de Construcción" },
    { id: 3, nombre: "Ladrillos", descripcion: "Tipo: Horno tradicional. Cantidad: Unidad", precio: 800, stock: 20, categoria: "Materiales de Construcción" }
];

// cargo info de carrito, sea vacio o ya con elementos cargados previamente.
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Cantidades seleccionadas por usr
const cantidadesSeleccionadas = {};

// Guardo datos ('productos´y 'carrito') en LocalStorage
function guardarDatos() {
    localStorage.setItem("productos", JSON.stringify(productos));
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Renderizo productos
function renderizarProductos() {
    const productosList = document.getElementById("productos-list");
    productosList.innerHTML = ""; // Limpio (para refrescar), sino se acumula
    productos.filter(producto => producto.stock > 0).forEach(producto => { // Uso un array temporal filtrado con stock(>0) y luego aplico metodo p sync con el carrito: si el producto está en el carrito, uso su cantidad. Uso metodos en misma linea para eficiencia memoria y lineas.
        const itemEnCarrito = carrito.find(item => item.id === producto.id);
        cantidadesSeleccionadas[producto.id] = itemEnCarrito ? itemEnCarrito.cantidad : 0; //si no está en carrito, uso 0 ya que sino devuelde undefined

        productosList.innerHTML += //agrego (concateno) los elementos al codigo asegurando el render de todos los objetos segun condiciones.
            `<div class="col-md-4 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                        <p class="card-text">Categoría: ${producto.categoria}</p>
                        <p class="card-text">Precio: $${producto.precio}</p>
                        <p class="card-text">Cantidad seleccionada: <span id="cantidad-${producto.id}">${cantidadesSeleccionadas[producto.id]}</span></p> <!--Uso id unico del span para evitar conflictos con DOM-->
                        <button class="btn btn-danger" onclick="actualizarCantidad(${producto.id}, -1)">-</button>
                        <button class="btn btn-success" onclick="actualizarCantidad(${producto.id}, 1)">+</button>
                        <button class="btn btn-primary mt-2" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Actualizo cantidad seleccionada
function actualizarCantidad(id, cambio) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    // Actualizo cantidad seleccionada (temporal)
    const nuevaCantidad = cantidadesSeleccionadas[id] + cambio;

    // Valido que la cantidad no sea menor a 0 ni mayor al stock disponible. Hago render en HTML
    if (nuevaCantidad >= 0 && nuevaCantidad <= producto.stock) {
        cantidadesSeleccionadas[id] = nuevaCantidad;
        document.getElementById(`cantidad-${id}`).textContent = nuevaCantidad;
    }
}

// funcion para agregar al carrito efectivamente
function agregarAlCarrito(id) {
    const cantidad = cantidadesSeleccionadas[id];

    const producto = productos.find(p => p.id === id);

    // Si cantidad= 0, elimino el producto del carrito
    if (cantidad === 0) {
        carrito = carrito.filter(item => item.id !== id);
        alert("Producto eliminado del carrito.");
    } else {
        const itemEnCarrito = carrito.find(item => item.id === id);
        if (itemEnCarrito) {
            itemEnCarrito.cantidad = cantidad; // Actualizar cantidad
        } else {
            carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad });
        }
    }

    // Actualizo datos y vista
    guardarDatos();
    renderizarProductos();
}

// Inicializo
renderizarProductos();

