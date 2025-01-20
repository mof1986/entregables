// Productos (PENDIENTE: Pensar logica que cargue productos sin necesidad de ingresar 1ro a una seccion especifica)
let productos = JSON.parse(localStorage.getItem("productos")) || [];

// Guardo datos de PRODUCTOS en klocalStorage
function guardarDatos() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

// fn que genera Id Unico para cada producto 
function generarIdUnico() {
    return productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
}

// Render lista de productos
function renderizarProductos() {
    const productList = document.querySelector("#product-list ul");
    productList.innerHTML = "";

    if (productos.length === 0) {
        productList.innerHTML = "<p class='text-center'>No hay productos cargados disponibles.</p>";
        return;
    }

    productos.forEach((producto) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            <div>
                <strong>${producto.nombre}</strong> - ${producto.descripcion} 
                (Categoría: ${producto.categoria}, Precio: $${producto.precio}, Stock: ${producto.stock})
            </div>
            <div>
                <button class="btn btn-sm btn-warning me-2" onclick="editarProducto(${producto.id})">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${producto.id})">Eliminar</button>
            </div>
        `;
        productList.appendChild(li);
    });
}

// Agregar/editar producto existente
document.querySelector("#product-form").addEventListener("submit", () => {
    const nombre = document.querySelector("#product-name").value;
    const descripcion = document.querySelector("#product-description").value;
    const precio = document.querySelector("#product-price").value;
    const stock = document.querySelector("#product-stock").value;
    const categoria = document.querySelector("#product-category").value;

    const editId = document.querySelector("#product-form").dataset.edit;
    if (editId) {
        // Editar existente
        const producto = productos.find(p => p.id === parseInt(editId));
        if (producto) {
            producto.nombre = nombre;
            producto.descripcion = descripcion;
            producto.precio = parseFloat(precio);
            producto.stock = parseInt(stock);
            producto.categoria = categoria;
        }
        document.querySelector("#product-form").removeAttribute("data-edit");
    } else {
        // Agrego nuevo producto con ID único
        productos.push({
            id: generarIdUnico(),
            nombre,
            descripcion,
            precio: parseFloat(precio),
            stock: parseInt(stock),
            categoria
        });
    }
//guardo, renderizo y limpio form
    guardarDatos();
    renderizarProductos();
    document.querySelector("#product-form").reset(); 
});

// Funcion para  elimnar producto
function eliminarProducto(id) {
    productos = productos.filter(p => p.id !== id);
    guardarDatos();
    renderizarProductos();
}

// Edito producto
function editarProducto(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    document.querySelector("#product-name").value = producto.nombre;
    document.querySelector("#product-description").value = producto.descripcion;
    document.querySelector("#product-price").value = producto.precio;
    document.querySelector("#product-stock").value = producto.stock;
    document.querySelector("#product-category").value = producto.categoria;
    document.querySelector("#product-form").dataset.edit = id;
}

//Inicio con render
renderizarProductos();
