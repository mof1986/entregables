Este repositorio contiene los proyectos desarrollados como parte del curso JavaScript (Comisión 65350) de Coderhouse.

---

## Primer Entregable

### Descripción General
Consiste en un simulador básico de compras que permite:
- Listar productos con sus precios y seleccionar cantidades.
- Agregar productos seleccionados al carrito.
- Visualizar el contenido del carrito con el total calculado.
- Todo se realiza a través de interacciones simples en la consola.

---

## Segundo Entregable

## Descripción General
El segundo entregable amplía las funcionalidades del primero, integrando HTML, CSS y JavaScript para crear un simulador de tienda interactivo:

## Principales Funcionalidades:
1. **Productos Disponibles**:
   - Muestra un listado dinámico de productos (nombre, descripción, precio, categoría).
   - Los productos sin stock no se muestran.
   - Botones de + y - para ajustar la cantidad deseada.
   - Botón para agregar productos al carrito.

2. **Carrito de Compras**:
   - Visualiza los productos añadidos con sus cantidades y subtotales.
   - Muestra el total acumulado de la compra.
   - Botones:
     - **Pagar**: Simula el pago con un mensaje informativo.
     - **Limpiar Carrito**: Elimina los productos del carrito y actualiza el stock.

3. **Modo Administrador**:
   - Gestión de productos existentes:
     - Agregar nuevos productos.
     - Editar productos actuales.
     - Eliminar productos.

4. **Persistencia de Datos**:
   - Los datos del carrito y los productos se almacenan en el `LocalStorage` para persistencia entre sesiones.

---