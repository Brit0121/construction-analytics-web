/**
 * Construction Analytics - Script Principal (Arquitectura Multipágina)
 * Funcionalidades Vanilla JS sin dependencias externas
 * Compatible con hosting compartido (GoDaddy / public_html)
 * Año: 2026
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- 1. Detección Progresiva de JS y Accesibilidad ---
  document.documentElement.classList.add('js-enabled');
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reduced-motion');
  }

  // --- 2. Elementos Clave del DOM ---
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const primaryNav = document.querySelector('.primary-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const programaSelect = document.getElementById('programa');

  // --- 3. Encabezado con efecto Scroll ---
  const handleScrollHeader = () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScrollHeader, { passive: true });
  handleScrollHeader(); // Ejecución inicial

  // --- 4. Menú Móvil Accesible con Bloqueo de Scroll y Restauración Exacta ---
  if (menuToggle && primaryNav) {
    let savedScrollY = 0;

    const getFocusableElements = () => {
      return primaryNav.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
    };

    const openMenu = () => {
      // Guardar posición exacta de scroll antes de congelar el fondo
      savedScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      
      document.body.style.position = 'fixed';
      document.body.style.top = `-${savedScrollY}px`;
      document.body.style.width = '100%';
      document.body.classList.add('menu-open');

      primaryNav.classList.add('is-open');
      menuToggle.setAttribute('aria-expanded', 'true');
      primaryNav.setAttribute('aria-hidden', 'false');

      // Foco inicial en el botón de cierre para accesibilidad
      const closeBtn = primaryNav.querySelector('.mobile-menu-close');
      if (closeBtn) {
        setTimeout(() => closeBtn.focus(), 60);
      }
    };

    const closeMenu = (returnFocus = true) => {
      if (!primaryNav.classList.contains('is-open')) return;

      primaryNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      primaryNav.setAttribute('aria-hidden', 'true');

      document.body.classList.remove('menu-open');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';

      // Restaurar posición exacta de scroll sin parpadeo ni saltos
      window.scrollTo(0, savedScrollY);

      if (returnFocus) {
        menuToggle.focus();
      }
    };

    const toggleMenu = () => {
      if (primaryNav.classList.contains('is-open')) {
        closeMenu(true);
      } else {
        openMenu();
      }
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Botón X de cierre interno
    const closeBtn = primaryNav.querySelector('.mobile-menu-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeMenu(true));
    }

    // Cerrar menú al hacer clic en cualquier enlace (interno o externo)
    const allNavLinks = primaryNav.querySelectorAll('a');
    allNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (primaryNav.classList.contains('is-open')) {
          closeMenu(false);
        }
      });
    });

    // Accesibilidad de teclado: tecla Escape y trampa de foco (focus trap)
    document.addEventListener('keydown', (e) => {
      if (!primaryNav.classList.contains('is-open')) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu(true);
        return;
      }

      if (e.key === 'Tab') {
        const focusable = getFocusableElements();
        if (focusable.length === 0) return;

        const firstElem = focusable[0];
        const lastElem = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElem) {
            e.preventDefault();
            lastElem.focus();
          }
        } else {
          if (document.activeElement === lastElem) {
            e.preventDefault();
            firstElem.focus();
          }
        }
      }
    });

    // Cerrar menú si la pantalla se redimensiona a escritorio
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && primaryNav.classList.contains('is-open')) {
        closeMenu(false);
      }
    }, { passive: true });
  }

  // --- 5. Manejo Seguro del Parámetro ?interes= en el Formulario ---
  // Whitelist de valores permitidos (ignora valores no autorizados o maliciosos)
  const ALLOWED_INTERESTS = {
    'analitica-power-bi': 'Analítica y Power BI aplicada a proyectos',
    'control-proyectos': 'Control de Proyectos y Seguimiento Operativo',
    'bim-transformacion': 'BIM & Transformación Digital',
    'costos-cronogramas': 'Costos, Presupuestos y Cronogramas',
    'tableros-control': 'Tableros de Control y Analítica Integral',
    'tableros-gestion': 'Tableros de Control y Analítica Integral',
    'seguimiento-operativo': 'Control de Proyectos y Seguimiento Operativo',
    'seguimiento-proyectos': 'Control de Proyectos y Seguimiento Operativo',
    'analisis-costos': 'Costos, Presupuestos y Cronogramas',
    'digitalizacion-obra': 'BIM & Transformación Digital',
    'asesoria-implementacion': 'Asesoría e Implementación en Proyectos',
    'capacitacion-corporativa': 'Capacitación corporativa a medida'
  };

  if (programaSelect) {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const interesParam = urlParams.get('interes');

      if (interesParam && Object.prototype.hasOwnProperty.call(ALLOWED_INTERESTS, interesParam)) {
        const optionValue = ALLOWED_INTERESTS[interesParam];
        programaSelect.value = optionValue;

        // Feedback visual accesible en el campo seleccionado
        programaSelect.style.borderColor = 'var(--color-cyan)';
        setTimeout(() => {
          programaSelect.style.borderColor = '';
        }, 1500);
      }
    } catch {
      // Ignorar errores de parsing de parámetros de forma silenciosa y segura
    }
  }

  // --- 6. Botones de Selección Directa en la Misma Página ---
  const programButtons = document.querySelectorAll('[data-program-select]');
  if (programButtons.length > 0 && programaSelect) {
    programButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const programKey = button.getAttribute('data-program-select');
        if (programKey && ALLOWED_INTERESTS[programKey]) {
          programaSelect.value = ALLOWED_INTERESTS[programKey];
        } else if (programKey) {
          programaSelect.value = programKey;
        }
      });
    });
  }

  // --- 7. Validación y Procesamiento de Formulario (Integración con WhatsApp) ---
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const programa = programaSelect ? programaSelect.value : '';
      const nombreInput = document.getElementById('nombre');
      const empresaInput = document.getElementById('empresa');
      const emailInput = document.getElementById('email');
      const telefonoInput = document.getElementById('telefono');
      const mensajeInput = document.getElementById('mensaje');
      const privacidadInput = document.getElementById('privacidad');

      const nombre = nombreInput ? nombreInput.value.trim() : '';
      const empresa = empresaInput ? empresaInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const telefono = telefonoInput ? telefonoInput.value.trim() : '';
      const mensaje = mensajeInput ? mensajeInput.value.trim() : '';
      const privacidadAceptada = privacidadInput ? privacidadInput.checked : false;

      // Validación de campos requeridos
      if (!nombre || !email || !telefono || !mensaje) {
        showStatus('Por favor completa todos los campos requeridos (*).', 'error');
        return;
      }

      // Validación de formato de correo
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showStatus('Por favor ingresa un correo electrónico válido.', 'error');
        if (emailInput) emailInput.focus();
        return;
      }

      // Validación de consentimiento de privacidad
      if (!privacidadAceptada) {
        showStatus('Debes aceptar la política de privacidad para continuar.', 'error');
        if (privacidadInput) privacidadInput.focus();
        return;
      }

      // Construcción del mensaje estructurado para WhatsApp
      const numeroDestino = '51993463118';
      const lineasMensaje = [
        '¡Hola Construction Analytics!',
        'Deseo solicitar información desde el sitio web institucional.',
        '',
        `*Interés:* ${programa || 'Consulta General'}`,
        `*Nombre:* ${nombre}`,
        `*Empresa:* ${empresa ? empresa : 'No especificada'}`,
        `*Correo:* ${email}`,
        `*Teléfono:* ${telefono}`,
        `*Mensaje:* ${mensaje}`
      ];

      const mensajeFinal = lineasMensaje.join('\n');
      const urlWhatsApp = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(mensajeFinal)}`;

      // Mensaje de estado informativo y transparente (sin afirmar guardado en base de datos)
      showStatus(
        'Abriendo WhatsApp con tu consulta estructurada para completar el envío directo a nuestro equipo (+51 993 463 118)...',
        'info'
      );

      // Abrir WhatsApp en nueva pestaña segura
      const ventana = window.open(urlWhatsApp, '_blank', 'noopener,noreferrer');
      if (!ventana) {
        // En caso de que el navegador bloquee popups, redirigir
        window.location.href = urlWhatsApp;
      }
    });
  }

  function showStatus(texto, tipo) {
    if (!formStatus) return;
    formStatus.textContent = texto; // Seguro contra ataques XSS (sin innerHTML)
    formStatus.className = `form-status ${tipo}`;
    formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // --- 8. Animación Progresiva Segura (IntersectionObserver y Web Animations API) ---
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && revealElements.length > 0 && !prefersReduced) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          if (!el.dataset.revealed) {
            el.dataset.revealed = 'true';
            el.classList.add('is-visible', 'is-revealed');
            if (typeof el.animate === 'function') {
              el.animate([
                { transform: 'translateY(8px)' },
                { transform: 'translateY(0)' }
              ], {
                duration: 450,
                easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                fill: 'forwards'
              });
            }
          }
          observer.unobserve(el);
        }
      });
    }, observerOptions);

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Si no hay soporte o movimiento reducido, todo permanece visible de inmediato
    revealElements.forEach((el) => {
      el.classList.add('is-visible');
    });
  }

  // --- 9. Botón Flotante "Volver Arriba" (Accesible y Seguro) ---
  let backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) {
    backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('type', 'button');
    backToTopBtn.setAttribute('aria-label', 'Volver al inicio');
    backToTopBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="20" height="20">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    `;
    document.body.appendChild(backToTopBtn);
  }

  const handleScrollTopBtn = () => {
    if (!backToTopBtn) return;
    if (window.scrollY > 600) {
      backToTopBtn.classList.add('is-visible');
    } else {
      backToTopBtn.classList.remove('is-visible');
    }
  };

  window.addEventListener('scroll', handleScrollTopBtn, { passive: true });
  handleScrollTopBtn();

  backToTopBtn.addEventListener('click', () => {
    const isReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: isReduced ? 'auto' : 'smooth'
    });
  });

  // --- 10. Actualización Dinámica del Año en Footer ---
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString();
  }

  // --- 11. Micro-interacción Parallax Sutil en Desktop para Headers Internos ---
  const heroVisual = document.querySelector('.page-hero-visual');
  const heroSection = document.querySelector('.page-hero');
  if (heroVisual && heroSection && !prefersReduced && window.matchMedia('(hover: hover) and (min-width: 992px)').matches) {
    let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0, rafId = null;

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 6; // Máximo 3px de desplazamiento sutil
      mouseY = y * 6;
      if (!rafId) {
        rafId = requestAnimationFrame(updateParallax);
      }
    }, { passive: true });

    heroSection.addEventListener('mouseleave', () => {
      mouseX = 0;
      mouseY = 0;
      if (!rafId) {
        rafId = requestAnimationFrame(updateParallax);
      }
    }, { passive: true });

    const updateParallax = () => {
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;
      const layers = heroVisual.querySelector('.hero-tech-layers');
      if (layers) {
        layers.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      }
      if (Math.abs(mouseX - currentX) > 0.05 || Math.abs(mouseY - currentY) > 0.05) {
        rafId = requestAnimationFrame(updateParallax);
      } else {
        rafId = null;
      }
    };
  }
});
