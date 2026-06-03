const elementosOcultos = document.querySelectorAll('.oculto');
const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('mostrar');
        } else {
            entrada.target.classList.remove('mostrar');
        }
    });
}, { threshold: 0.15 });

elementosOcultos.forEach((elemento) => observador.observe(elemento));

document.querySelectorAll('a').forEach(enlace => {
    enlace.addEventListener('click', function (e) {
        const destino = this.getAttribute('href');
        if (destino.startsWith('#')) {
            e.preventDefault();
            const seccionDestino = document.querySelector(destino);
            if (seccionDestino) {
                window.scrollTo({ top: seccionDestino.offsetTop - 80, behavior: 'smooth' });
            }
            return;
        }
        e.preventDefault(); 
        document.body.classList.add('desaparecerPagina'); 
        setTimeout(() => { window.location.href = destino; }, 500);
    });
});