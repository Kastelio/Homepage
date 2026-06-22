document.addEventListener('DOMContentLoaded', async () => {
    await loadEtc();
    initScrollButtons();
});

async function loadEtc() {
    const grid = document.getElementById('etc-grid');
    try {
        const res = await fetch('./data/etc.json');
        const items = await res.json();

        const sorted = [...items].sort((a, b) => b.end.localeCompare(a.end));

        grid.innerHTML = sorted.map((item, i) => {
            const thumb = item.image
                ? `<img src="${item.image}" alt="${item.title}" class="etc-thumb" loading="lazy">`
                : `<div class="etc-thumb-placeholder"></div>`;
            const gallery = item.images && item.images.length > 1;
            const badge = gallery ? `<span class="etc-gallery-badge">${item.images.length}장</span>` : '';
            return `
                <div class="etc-card page-card-enter${gallery ? ' etc-card-gallery' : ''}"
                     style="animation-delay:${0.2 + i * 0.06}s"
                     ${gallery ? `data-images='${JSON.stringify(item.images)}'` : ''}>
                    <div class="etc-thumb-wrapper">${thumb}${badge}</div>
                    <div class="etc-info">
                        <div class="etc-dates">${item.dateLabel || item.end}</div>
                        <div class="etc-name">${item.title}</div>
                        ${item.desc ? `<div class="etc-desc">${item.desc}</div>` : ''}
                    </div>
                </div>
            `;
        }).join('');

        document.querySelectorAll('.etc-card').forEach((el, i) => {
            el.style.animationDelay = `${0.2 + i * 0.06}s`;
        });

        initEtcLightbox();

    } catch (e) {
        grid.innerHTML = '<p style="color:#888; text-align:center;">데이터를 불러오지 못했습니다.</p>';
        console.error(e);
    }
}

function initEtcLightbox() {
    const modal = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    if (!modal || !img) return;
    let imgs = [], idx = 0;

    const show = () => { img.src = imgs[idx]; };
    const open = (list) => { imgs = list; idx = 0; modal.style.display = 'flex'; show(); };
    const close = () => { modal.style.display = 'none'; };

    document.querySelectorAll('.etc-card-gallery').forEach(card => {
        card.addEventListener('click', () => {
            try { open(JSON.parse(card.dataset.images)); } catch (e) {}
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === img) { idx = (idx + 1) % imgs.length; show(); }
        else { close(); }
    });
    document.addEventListener('keydown', (e) => {
        if (modal.style.display !== 'flex') return;
        if (e.key === 'Escape') close();
        else if (e.key === 'ArrowRight') { idx = (idx + 1) % imgs.length; show(); }
        else if (e.key === 'ArrowLeft') { idx = (idx - 1 + imgs.length) % imgs.length; show(); }
    });
}

function initScrollButtons() {
    const btnTop = document.getElementById('btn-top');
    const btnBottom = document.getElementById('btn-bottom');
    if (!btnTop || !btnBottom) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 300;
        const atBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 100;
        btnTop.classList.toggle('visible', scrolled);
        btnBottom.classList.toggle('visible', !atBottom);
    });

    btnTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    btnBottom.addEventListener('click', () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }));
}
