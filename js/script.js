// ==========================================
// 1. ANIMACIÓN DE ELEMENTOS AL HACER SCROLL (Intersection Observer)
// ==========================================
// Buena práctica: El observador detecta cuándo un elemento entra en la pantalla 
// para añadirle la clase 'mostrar' y ejecutar la animación en el momento justo.
const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('mostrar');
        } else {
            entrada.target.classList.remove('mostrar');
        }
    });
}, { threshold: 0.15 }); // 0.15 significa que la animación salta cuando el 15% del elemento es visible

// Le decimos al observador que vigile todos los elementos que tienen la clase '.oculto'
document.querySelectorAll('.oculto').forEach((elemento) => observador.observe(elemento));


// ==========================================
// 2. LÓGICA DE SKELETON LOADING (Simulación de carga)
// ==========================================
// Buena práctica: Esperar a que el DOM esté completamente cargado antes de ejecutar scripts
document.addEventListener('DOMContentLoaded', () => {
    
    // setTimeout simula el tiempo que tardaría un servidor/base de datos en devolver los proyectos.
    // 2000 milisegundos = 2 segundos de tiempo de carga simulada.
    setTimeout(() => {
        
        // PASO 1: Seleccionar todos los esqueletos y ocultarlos de la pantalla
        const esqueletos = document.querySelectorAll('.skeleton-card');
        esqueletos.forEach(esqueleto => {
            esqueleto.style.display = 'none';
        });

        // PASO 2: Seleccionar las tarjetas reales y hacerlas visibles
        const proyectosReales = document.querySelectorAll('.proyecto-real');
        proyectosReales.forEach(proyecto => {
            // Quitamos la clase 'hidden' de Tailwind que los mantenía invisibles
            proyecto.classList.remove('hidden');
            // Forzamos el display a flex para mantener la estructura de la tarjeta
            proyecto.style.display = 'flex';
            
            // Buena práctica: Como estas tarjetas acaban de "nacer" en la pantalla, 
            // le decimos al IntersectionObserver que empiece a vigilarlas para que les aplique su animación.
            observador.observe(proyecto);
        });
        
    }, 2000); // Puedes cambiar este número (ej. 1000 = 1 segundo) según tus preferencias
});


// ==========================================
// 3. LÓGICA DE NAVEGACIÓN SUAVE EN EL MENÚ
// ==========================================
// Esta función intercepta los clics en los enlaces del menú superior
document.querySelectorAll('a').forEach(enlace => {
    enlace.addEventListener('click', function (e) {
        const destino = this.getAttribute('href');
        
        // Si el enlace es interno (empieza con '#' como '#sobre-mi')
        if (destino.startsWith('#')) {
            e.preventDefault(); // Evitamos el salto brusco predeterminado del navegador
            
            const seccionDestino = document.querySelector(destino);
            if (seccionDestino) {
                // Hacemos scroll suave. El '- 80' es un offset importante para que 
                // el menú fijo (header) no tape el título de la sección al llegar.
                window.scrollTo({ top: seccionDestino.offsetTop - 80, behavior: 'smooth' });
            }
        }
    });
});