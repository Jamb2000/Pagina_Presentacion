// =======================================================
// ANIMACIONES AL HACER SCROLL
// =======================================================

// Configuramos un observador para detectar cuándo los elementos entran en pantalla.
// Esto ahorra memoria porque la animación solo ocurre cuando el usuario baja hasta ahí.
const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('mostrar');
        } else {
            // Opcional: quitamos la clase para que se vuelva a animar si subimos y bajamos
            entrada.target.classList.remove('mostrar');
        }
    });
}, { threshold: 0.15 }); // 0.15 = Se activa cuando vemos el 15% del elemento

// Le decimos al observador que vigile a todos los que tengan la clase .oculto
document.querySelectorAll('.oculto').forEach((elemento) => observador.observe(elemento));


// =======================================================
// RENDERIZADO DINÁMICO DE PROYECTOS (SKELETON -> REAL)
// =======================================================

// Esperamos a que la página cargue para empezar a inyectar cosas
document.addEventListener('DOMContentLoaded', () => {
    const contenedorProyectos = document.getElementById('contenedor-proyectos');

    // 1. Plantilla del estado "Cargando" (Esqueleto adaptado a tu diseño y centrado)
    const esqueletoHTML = `
        <div class="bg-slate-800 rounded-[15px] overflow-hidden shadow-[0_6px_15px_rgba(0,0,0,0.3)] text-left flex flex-col">
            <div class="w-full h-[200px] bg-slate-700 animate-pulse border-b-[3px] border-slate-700/50"></div>
            <div class="h-6 bg-slate-700 animate-pulse rounded mx-5 mt-5 mb-[10px] w-2/3"></div>
            <div class="h-4 bg-slate-700 animate-pulse rounded mx-5 mb-2 w-1/2"></div>
            <div class="h-4 bg-slate-700 animate-pulse rounded mx-5 mb-5 w-full grow"></div>
            <div class="h-10 bg-slate-700 animate-pulse rounded mx-auto mb-5 w-1/3 self-center"></div>
        </div>
    `;

    // Metemos 4 esqueletos de golpe para que se vea bien la grilla mientras carga
    contenedorProyectos.innerHTML = esqueletoHTML.repeat(4);

    // 2. Función para simular una consulta a una base de datos o API
    function pedirDatosProyectos() {
        return new Promise((resolver) => {
            // Simulamos que el internet tarda 3 segundos (3000 ms) en traernos la info
            setTimeout(() => {
                const misProyectos = [
                    {
                        titulo: "Sistema de Tienda online de iPhone",
                        herramienta: "Desarrollo en ASP.NET Core",
                        desc: "Una solución integral para la venta de iPhones en línea.",
                        link: "https://jamb2000.github.io/Proyecto-iPhone-Cliente/",
                        img: "img/proyecto1.jpg",
                        retraso: "delay-100" // Para que aparezcan en cascada
                    },
                    {
                        titulo: "Interfaz Interactiva",
                        herramienta: "Diseño front-end con React",
                        desc: "Desarrollo de interfaces dinámicas y modernas.",
                        link: "proyecto2.html",
                        img: "img/proyecto2.jpg",
                        retraso: "delay-200"
                    },
                    {
                        titulo: "Identidad de Marca 1",
                        herramienta: "Branding y diseño visual",
                        desc: "Creación de logotipo, manual de marca y assets.",
                        link: "proyecto3.html",
                        img: "img/proyecto3.jpg",
                        retraso: "delay-300"
                    },
                    {
                        titulo: "Identidad de Marca 2",
                        herramienta: "Branding y diseño visual",
                        desc: "Diseño de identidad corporativa completa.",
                        link: "proyecto4.html",
                        img: "img/proyecto4.jpg",
                        retraso: "delay-400"
                    }
                ];
                resolver(misProyectos);
            }, 3000); 
        });
    }

    // 3. Pedimos los datos y reemplazamos los esqueletos cuando lleguen
    pedirDatosProyectos().then((proyectos) => {
        
        // Limpiamos el contenedor (adiós esqueletos)
        contenedorProyectos.innerHTML = '';

        // Recorremos la lista de proyectos para armar el HTML de cada tarjeta real
        proyectos.forEach(proyecto => {
            const tarjetaReal = `
                <div class="bg-slate-800 rounded-[15px] overflow-hidden shadow-[0_6px_15px_rgba(0,0,0,0.3)] text-left flex flex-col oculto ${proyecto.retraso} transition-all duration-300 hover:-translate-y-[10px] hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
                    <div class="w-full h-[200px] bg-slate-700 animate-pulse border-b-[3px] border-sky-400 relative">
                        
                    <img src="${proyecto.img}" 
                             alt="${proyecto.titulo}" 
                             class="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-500"
                             onload="this.classList.remove('opacity-0'); this.parentElement.classList.remove('animate-pulse');"
                             onerror="this.style.display='none'">
                    </div>
                    <h3 class="text-slate-50 mx-5 mt-5 mb-[10px] text-[1.4rem] font-bold">${proyecto.titulo}</h3>
                    <p class="text-slate-400 mx-5 mb-2">${proyecto.herramienta}</p>
                    <p class="text-slate-400 mx-5 mb-5 grow">${proyecto.desc}</p>
                    <a href="${proyecto.link}" class="mx-5 mb-5 self-center inline-block bg-transparent text-sky-400 border-2 border-sky-400 px-5 py-2 rounded-md no-underline font-semibold text-[0.9rem] transition-all duration-300 hover:bg-sky-400 hover:text-slate-900 hover:-translate-y-[2px] hover:shadow-[0_4px_10px_rgba(56,189,248,0.3)]">
                        Ver Proyecto
                    </a>
                </div>
            `;
            // Inyectamos la tarjeta en el HTML
            contenedorProyectos.insertAdjacentHTML('beforeend', tarjetaReal);
        });

        // IMPORTANTE: Le avisamos al observador que hay elementos nuevos en el DOM 
        // para que les aplique el efecto de scroll (fade up)
        const nuevasTarjetas = contenedorProyectos.querySelectorAll('.oculto');
        nuevasTarjetas.forEach(tarjeta => observador.observe(tarjeta));
    });
});


// =======================================================
// SCROLL SUAVE PARA LOS LINKS DEL MENÚ
// =======================================================

// Agarramos todos los links <a> de la web
document.querySelectorAll('a').forEach(enlace => {
    enlace.addEventListener('click', function (e) {
        const destino = this.getAttribute('href');
        
        // Si el link es un ancla (empieza con #) hacemos el scroll suave
        if (destino && destino.startsWith('#')) {
            e.preventDefault(); 
            
            const seccionDestino = document.querySelector(destino);
            if (seccionDestino) {
                // Hacemos scroll pero le restamos 80px (offset) para que el header fijo
                // no nos tape el título de la sección al llegar.
                window.scrollTo({ top: seccionDestino.offsetTop - 80, behavior: 'smooth' });
            }
        }
    });
});