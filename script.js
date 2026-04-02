  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));

  // ── Scanner ──

  function toggleFaq(el) {
    const item = el.parentElement;
    item.classList.toggle('open');
  }

  function goToScan() {
    const raw = document.getElementById('urlInput').value.trim();
    if (!raw) { document.getElementById('urlInput').focus(); return; }
    const url = raw.startsWith('http') ? raw : 'https://' + raw;
    window.location.href = 'scan.html?url=' + encodeURIComponent(url);
  }
  document.getElementById('urlInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') goToScan();
  });

