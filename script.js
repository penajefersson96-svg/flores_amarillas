/* ===== PARTE 1: CONFIGURACIÓN Y TEXTOS ===== */
const CLAVE_CORRECTA = { dia: '04', mes: '09', anio: '25' };
let valores = { dia: 0, mes: 0, anio: 0 };

const poemas = {
    1: {
        titulo: "Eres mi Girasol 🌻",
        texto: `Eres como un girasol en mi jardín,
iluminas mis días con tu risa sin fin.
Tu brillo dorado me guía al amanecer,
y en cada momento te vuelvo a querer.

Cuando el mundo es gris y frío,
tu presencia es mi más dulce abrigo.
Eres luz, calor, eres todo para mí,
gracias por existir y hacerme feliz. 💛`
    },
    2: {
        titulo: "Flores Amarillas 🌼",
        texto: `Hoy quiero regalarte flores amarillas,
símbolo de alegría que nunca se olvida.
Cada pétalo guarda un "te quiero" sincero,
cada aroma te recuerda cuánto te espero.

Que este 21 de septiembre brille,
porque tú mereces todo lo más dulce.
Que las flores amarillas te envuelvan,
con el cariño que mi corazón siempre entrega.`
    },
    3: {
        titulo: "Para Ti, con Amor 💖",
        texto: `En este día tan especial,
quiero decirte que eres mi hogar.
Tu risa es mi canción favorita,
tu abrazo, mi lugar de paz.

No importan las distancias,
ni el tiempo que pase,
porque tú siempre estás
en mi corazón y mi pensar.

Gracias por ser tú, simplemente tú. 🌻`
    },
    4: {
        titulo: "Promesas de Girasol 🌻",
        texto: `Te prometo ser tu girasol,
seguirte a donde vayas, como el sol.
Iluminarte en días oscuros,
y acompañarte en días maduros.

Te prometo amor sin condición,
respeto, cariño y comprensión.
Hoy y siempre, en cada estación,
tú tienes todo mi corazón. 💛

¡Feliz día de las flores amarillas!`
    }
};

const cartasFotos = {
    1: "Recuerdo de nuestro primer día juntos... ese momento que cambió mi vida para siempre. 💛",
    2: "Tu sonrisa iluminó ese día tanto como el sol a los girasoles. Cada vez que veo esta foto, sonrío igual que tú. 🌻",
    3: "Momentos simples que se vuelven extraordinarios cuando estoy contigo. Gracias por cada segundo. 💖",
    4: "La mejor versión de mí mismo surge cuando estoy a tu lado. Esta foto lo demuestra todo. 🌼",
    5: "Y seguiría coleccionando momentos contigo toda la vida. Te amo más de lo que las palabras pueden expresar. 💛🌻"
};
/* ===== PARTE 2: INICIO, CANDADO, MÚSICA Y LLUVIA ===== */
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('sin-scroll');
    inicializarCandado();
    inicializarModales();
    inicializarCarrusel();
});

function inicializarCandado() {
    document.querySelectorAll('.flecha').forEach(btn => {
        btn.addEventListener('click', () => {
            cambiarValor(btn.dataset.target, btn.classList.contains('arriba'));
        });
    });
    document.getElementById('btnDesbloquear').addEventListener('click', intentarDesbloquear);
    actualizarDisplays();
}

function cambiarValor(target, subir) {
    if (subir) {
        valores[target] = valores[target] >= 30 ? 0 : valores[target] + 1;
    } else {
        valores[target] = valores[target] <= 0 ? 30 : valores[target] - 1;
    }
    actualizarDisplays();
}

function actualizarDisplays() {
    document.getElementById('dia').textContent = String(valores.dia).padStart(2, '0');
    document.getElementById('mes').textContent = String(valores.mes).padStart(2, '0');
    document.getElementById('anio').textContent = String(valores.anio).padStart(2, '0');
}

function intentarDesbloquear() {
    const dia = String(valores.dia).padStart(2, '0');
    const mes = String(valores.mes).padStart(2, '0');
    const anio = String(valores.anio).padStart(2, '0');
    const mensajeError = document.getElementById('mensajeError');

    if (dia === CLAVE_CORRECTA.dia && mes === CLAVE_CORRECTA.mes && anio === CLAVE_CORRECTA.anio) {
        mensajeError.textContent = '';
        desbloquear();
    } else {
        mensajeError.textContent = '❌ Clave incorrecta… sigue la pista 💛';
        const candado = document.getElementById('candado');
        candado.style.animation = 'none';
        setTimeout(() => {
            candado.style.animation = 'vibrar 0.4s ease-in-out';
        }, 10);
    }
}

function desbloquear() {
    const candado = document.getElementById('candado');
    candado.textContent = '🔓';
    candado.classList.remove('cerrado');
    candado.classList.add('abierto');

    iniciarMusica();

    setTimeout(() => {
        document.querySelectorAll('.puerta').forEach(p => p.classList.add('abierta'));
        document.getElementById('tarjeta').classList.add('abierta');
        iniciarLluviaGirasoles();
    }, 500);

    setTimeout(() => {
        document.getElementById('pantallaBloqueo').style.display = 'none';
        document.body.classList.remove('sin-scroll');
    }, 2400);
}

function iniciarMusica() {
    const audio = document.getElementById('audio');
    audio.loop = true;
    audio.volume = 0.6;
    const promesa = audio.play();
    if (promesa !== undefined) {
        promesa.catch(() => {
            document.getElementById('btnMusica').textContent = '▶ Reproducir Música';
        });
    }

    document.getElementById('btnMusica').addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            document.getElementById('btnMusica').textContent = '🎵 Pausar Música';
        } else {
            audio.pause();
            document.getElementById('btnMusica').textContent = '▶ Reproducir Música';
        }
    });
}

function iniciarLluviaGirasoles() {
    const contenedor = document.getElementById('lluviaGirasoles');
    const emojis = ['🌻', '', '', '🌻', '🌼'];

    function crearGirasol() {
        const girasol = document.createElement('div');
        girasol.className = 'girasol-cayendo';
        girasol.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        girasol.style.left = Math.random() * 100 + 'vw';
        girasol.style.fontSize = (Math.random() * 20 + 20) + 'px';
        const duracion = Math.random() * 5 + 6;
        girasol.style.animationDuration = duracion + 's';
        girasol.style.opacity = Math.random() * 0.5 + 0.4;
        contenedor.appendChild(girasol);
        setTimeout(() => girasol.remove(), duracion * 1000);
    }

    for (let i = 0; i < 8; i++) {
        setTimeout(crearGirasol, i * 400);
    }
    setInterval(crearGirasol, 900);
}
/* ===== PARTE 3: SOBRES, MODALES Y CARRUSEL 3D ===== */
function inicializarModales() {
    const modalPoema = document.getElementById('modalPoema');
    const modalFoto = document.getElementById('modalFoto');

    document.querySelectorAll('.sobre').forEach(sobre => {
        sobre.addEventListener('click', () => {
            if (sobre.classList.contains('abriendo')) return;
            document.querySelectorAll('.sobre').forEach(o => o.classList.remove('abriendo'));
            sobre.classList.add('abriendo');

            setTimeout(() => {
                const poema = poemas[sobre.dataset.poema];
                document.getElementById('poemaTitulo').textContent = poema.titulo;
                document.getElementById('poemaTexto').textContent = poema.texto;
                modalPoema.classList.add('activo');
            }, 1300);
        });
    });

    document.querySelectorAll('.btn-cerrar').forEach(btn => {
        btn.addEventListener('click', () => cerrarModales());
    });

    [modalPoema, modalFoto].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) cerrarModales();
        });
    });
}

function cerrarModales() {
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('activo'));
    document.querySelectorAll('.sobre').forEach(o => o.classList.remove('abriendo'));
    document.querySelectorAll('.foto-3d').forEach(f => f.classList.remove('saliendo'));
}

function abrirModalFoto(num) {
    document.getElementById('modalFotoImg').src = 'foto' + num + '.jpg';
    document.getElementById('modalFotoCarta').textContent = cartasFotos[num];
    document.getElementById('modalFoto').classList.add('activo');
}

function inicializarCarrusel() {
    const escena = document.getElementById('escena');
    const paneles = Array.from(escena.children);
    const puntosCont = document.getElementById('puntos');
    const viewport = document.getElementById('carrusel');
    let ang = 0;

    puntosCont.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const d = document.createElement('div');
        d.className = 'punto';
        d.addEventListener('click', () => irA(i));
        puntosCont.appendChild(d);
    }

    function frenteI() {
        return ((Math.round(-ang / 72) % 5) + 5) % 5;
    }

    function pintar() {
        escena.style.transform = 'translateZ(-200px) rotateY(' + ang + 'deg)';
        const f = frenteI();
        Array.from(puntosCont.children).forEach((d, i) => {
            d.classList.toggle('activo', i === f);
        });
    }

    function irA(i) {
        const base = -i * 72;
        ang = base + 360 * Math.round((ang - base) / 360);
        pintar();
    }

    document.getElementById('btnAnterior').addEventListener('click', () => {
        ang += 72;
        pintar();
    });

    document.getElementById('btnSiguiente').addEventListener('click', () => {
        ang -= 72;
        pintar();
    });

    let x0 = 0;
    viewport.addEventListener('touchstart', (e) => {
        x0 = e.changedTouches[0].screenX;
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
        const dx = x0 - e.changedTouches[0].screenX;
        if (Math.abs(dx) > 45) {
            ang += (dx > 0 ? 72 : -72);
            pintar();
        }
    }, { passive: true });

    paneles.forEach(p => {
        p.addEventListener('click', () => {
            const pi = parseInt(p.style.getPropertyValue('--i'), 10);
            const num = parseInt(p.dataset.foto, 10);
            if (pi !== frenteI()) {
                irA(pi);
                return;
            }
            if (p.classList.contains('saliendo')) return;
            p.classList.add('saliendo');
            setTimeout(() => {
                abrirModalFoto(num);
            }, 900);
        });
    });

    pintar();
}