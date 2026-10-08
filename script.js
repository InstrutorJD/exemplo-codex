const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
  navigation.classList.toggle('open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
    navigation.classList.remove('open');
  });
});

// Artes oficiais do catálogo Steam usadas como fundos decorativos por seção.
const sceneBackdrop = document.querySelector('.scene-backdrop');
const scenes = {
  inicio: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1903340/library_hero.jpg',
  jogos: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1145350/library_hero.jpg',
  sobre: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2246340/library_hero.jpg',
  comunidade: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1903340/library_hero.jpg'
};

document.body.dataset.scene = 'inicio';

if (sceneBackdrop && 'IntersectionObserver' in window) {
  let activeScene = '';
  const sceneObserver = new IntersectionObserver((entries) => {
    const visibleSection = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visibleSection || activeScene === visibleSection.target.id) return;
    activeScene = visibleSection.target.id;
    document.body.dataset.scene = activeScene;
    sceneBackdrop.classList.add('is-changing');
    window.setTimeout(() => {
      sceneBackdrop.style.backgroundImage = `url("${scenes[activeScene]}")`;
      sceneBackdrop.classList.remove('is-changing');
    }, 220);
  }, { threshold: [0.2, 0.4, 0.65], rootMargin: '-18% 0px -30% 0px' });

  Object.keys(scenes).forEach((id) => {
    const section = document.getElementById(id);
    if (section) sceneObserver.observe(section);
  });
  sceneBackdrop.style.backgroundImage = `url("${scenes.inicio}")`;
}

const pointerGlow = document.querySelector('.pointer-glow');
if (pointerGlow && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  window.addEventListener('pointermove', (event) => {
    pointerGlow.style.left = `${event.clientX}px`;
    pointerGlow.style.top = `${event.clientY}px`;
    pointerGlow.classList.add('is-visible');
  }, { passive: true });

  document.querySelectorAll('a, button, .game-card').forEach((item) => {
    item.addEventListener('pointerenter', () => pointerGlow.classList.add('is-hovering'));
    item.addEventListener('pointerleave', () => pointerGlow.classList.remove('is-hovering'));
  });
}
