
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  })
);

const yearElement = document.querySelector('#year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Entrada suave dos elementos conforme a rolagem.
const revealTargets = document.querySelectorAll(
  '.section-heading, .about-grid, .facts, .section-title-row, .stack-group, .achievement-card, .language-panel, .contact-content'
);

revealTargets.forEach(el => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => observer.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('visible'));
}

// GRÁFICO DE LINHAS
// Inicia a animação quando o gráfico aparece na tela.
(() => {
  const chart = document.querySelector('.language-line-chart');

  if (!chart) return;

  const lines = chart.querySelectorAll('.chart-line');
  const areas = chart.querySelectorAll('.chart-area');
  const points = chart.querySelectorAll('.chart-points');

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const showChart = () => {
    if (chart.classList.contains('chart-animated')) return;

    chart.classList.add('chart-animated');

    if (reduceMotion) {
      lines.forEach(line => {
        line.style.strokeDasharray = 'none';
        line.style.strokeDashoffset = '0';
      });

      areas.forEach(area => {
        area.style.opacity = '1';
      });

      points.forEach(group => {
        group.style.opacity = '1';
      });
    }
  };

  if ('IntersectionObserver' in window) {
    const chartObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        showChart();
        chartObserver.disconnect();
      }
    }, {
      threshold: 0.01,
      rootMargin: '0px 0px -8% 0px'
    });

    chartObserver.observe(chart);
  } else {
    showChart();
  }
})();

// Movimento sutil da composição abstrata.
const art = document.querySelector('.hero-art');
const orb = document.querySelector('.orb-core');

if (
  art &&
  orb &&
  matchMedia(
    '(hover: hover) and (prefers-reduced-motion: no-preference)'
  ).matches
) {
  art.addEventListener('pointermove', event => {
    const rect = art.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    orb.style.translate = `${x * 12}px ${y * 12}px`;
  });

  art.addEventListener('pointerleave', () => {
    orb.style.translate = '0 0';
  });
}

// Configuração de links externos centralizada em config.js.
const portfolioConfig = window.PORTFOLIO_CONFIG || {};

document.querySelectorAll('[data-social="linkedin"]').forEach(a => {
  a.href = portfolioConfig.linkedin || '#';
});

document.querySelectorAll('[data-social="whatsapp"]').forEach(a => {
  a.href = portfolioConfig.whatsapp || '#';
});

document.querySelectorAll('[data-project]').forEach(link => {
  const project =
    portfolioConfig.projects?.[link.dataset.project] || {};

  const url = project[link.dataset.kind];

  if (url) {
    link.href = url;
    link.classList.remove('is-unconfigured');
  } else {
    link.href = '#';
    link.classList.add('is-unconfigured');

    link.addEventListener('click', event => {
      event.preventDefault();

      alert(
        'Adicione o link deste projeto no arquivo config.js para ativar este atalho.'
      );
    });
  }
});

// Tilt 3D nos cartões com movimento suave do ponteiro.
const canTilt = matchMedia(
  '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
).matches;

if (canTilt) {
  document.querySelectorAll(
    '.project-card, .achievement-card, .cert-entry'
  ).forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();

      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;

      const ry = (px - 0.5) * 7;
      const rx = (0.5 - py) * 6;

      card.style.transform =
        `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
}

// Movimento parallax de camadas decorativas da hero.
const heroArt = document.querySelector('.hero-art');

if (heroArt && canTilt) {
  heroArt.addEventListener('pointermove', event => {
    const rect = heroArt.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    heroArt.querySelectorAll(
      '.glass-cube,.energy-ring,.float-card'
    ).forEach((el, i) => {
      const depth = (i + 1) * 7;

      el.style.translate =
        `${x * depth}px ${y * depth}px`;
    });
  });

  heroArt.addEventListener('pointerleave', () => {
    heroArt.querySelectorAll(
      '.glass-cube,.energy-ring,.float-card'
    ).forEach(el => {
      el.style.translate = '';
    });
  });
}

// Marca atalhos ainda sem URL.
document.querySelectorAll(
  '.project-action.is-unconfigured'
).forEach(a => {
  a.title = 'Configure o endereço em config.js';
});

// Efeito de digitação no destaque profissional do início.
const typingElement = document.querySelector(
  '[data-typing-phrases]'
);

if (
  typingElement &&
  !matchMedia('(prefers-reduced-motion: reduce)').matches
) {
  const phrases = typingElement.dataset.typingPhrases
    .split('|')
    .filter(Boolean);

  let phraseIndex = 0;
  let charIndex = phrases[0]?.length || 0;
  let deleting = false;

  const typeNext = () => {
    const phrase = phrases[phraseIndex];

    if (!phrase) return;

    if (!deleting) {
      charIndex = Math.min(charIndex + 1, phrase.length);

      typingElement.textContent = phrase.slice(0, charIndex);

      if (charIndex === phrase.length) {
        deleting = true;
        setTimeout(typeNext, 1900);
        return;
      }
    } else {
      charIndex = Math.max(0, charIndex - 1);

      typingElement.textContent = phrase.slice(0, charIndex);

      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(typeNext, deleting ? 38 : 78);
  };

  setTimeout(() => {
    deleting = true;
    typeNext();
  }, 1700);
}

// CARROSSEL 3D DE PROJETOS
// Exibe um projeto por vez, com transição animada.
(() => {
  const track = document.querySelector('#projectsTrack');

  if (!track) return;

  const cards = Array.from(
    track.querySelectorAll('.project-card')
  );

  const previous = document.querySelector('.project-prev');
  const next = document.querySelector('.project-next');

  const currentLabel = document.querySelector('#projectCurrent');
  const totalLabel = document.querySelector('#projectTotal');
  const progress = document.querySelector('#projectProgress');

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (!cards.length || !previous || !next) return;

  let activeIndex = Math.max(
    0,
    cards.findIndex(card =>
      card.classList.contains('is-active')
    )
  );

  let isAnimating = false;

  const duration = reducedMotion ? 0 : 620;

  if (totalLabel) {
    totalLabel.textContent = String(cards.length).padStart(2, '0');
  }

  const updateStatus = () => {
    if (currentLabel) {
      currentLabel.textContent =
        String(activeIndex + 1).padStart(2, '0');
    }

    if (progress) {
      progress.style.width =
        `${((activeIndex + 1) / cards.length) * 100}%`;
    }

    previous.disabled = cards.length < 2;
    next.disabled = cards.length < 2;
  };

  const showCard = (index, direction = 1) => {
    if (
      isAnimating ||
      index === activeIndex ||
      index < 0 ||
      index >= cards.length
    ) {
      return;
    }

    const outgoing = cards[activeIndex];
    const incoming = cards[index];

    isAnimating = true;

    outgoing.classList.remove('is-active');

    outgoing.classList.add(
      direction > 0
        ? 'is-exiting-left'
        : 'is-exiting-right'
    );

    outgoing.setAttribute('aria-hidden', 'true');

    incoming.classList.remove(
      'is-exiting-left',
      'is-exiting-right'
    );

    incoming.classList.add('is-entering');
    incoming.setAttribute('aria-hidden', 'false');

    void incoming.offsetWidth;

    incoming.classList.add('is-active');

    activeIndex = index;

    updateStatus();

    window.setTimeout(() => {
      outgoing.classList.remove(
        'is-exiting-left',
        'is-exiting-right'
      );

      incoming.classList.remove('is-entering');

      isAnimating = false;
    }, duration);
  };

  previous.addEventListener('click', () => {
    showCard(
      (activeIndex - 1 + cards.length) % cards.length,
      -1
    );
  });

  next.addEventListener('click', () => {
    showCard(
      (activeIndex + 1) % cards.length,
      1
    );
  });

  const carousel = document.querySelector('.projects-carousel');

  carousel?.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();

      showCard(
        (activeIndex + 1) % cards.length,
        1
      );
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();

      showCard(
        (activeIndex - 1 + cards.length) % cards.length,
        -1
      );
    }
  });

  updateStatus();
})();
