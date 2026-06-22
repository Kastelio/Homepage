// archive.js — UI Reference Archive (index + detail 공용)
document.addEventListener('DOMContentLoaded', async () => {
    let data;
    try {
        const res = await fetch('./data/archive.json');
        data = await res.json();
    } catch (e) {
        console.error(e);
        const host = document.getElementById('archive-cat-grid') || document.getElementById('archive-detail');
        if (host) host.innerHTML = '<p class="archive-empty">아카이브를 불러오지 못했습니다.</p>';
        return;
    }

    if (document.getElementById('archive-cat-grid')) renderIndex(data);
    if (document.getElementById('archive-detail')) renderDetail(data);

    initLightbox();
    initScrollButtons();
});

function renderIndex(data) {
    // 통계
    setText('stat-cat', data.total_categories);
    setText('stat-game', data.total_games);
    setText('stat-img', data.total_images);

    const grid = document.getElementById('archive-cat-grid');
    const cards = data.categories.map(c => {
        const cover = c.games[0]?.images[0] || '';
        return `
        <a class="archive-cat-card" href="./archive_detail.html?cat=${encodeURIComponent(c.name)}" data-name="${c.name.toLowerCase()}">
            ${cover ? `<img class="archive-cat-thumb" src="${encPath(cover)}" alt="${c.name}" loading="lazy">` : '<div class="archive-cat-thumb"></div>'}
            <div class="archive-cat-info">
                <div class="archive-cat-name">${c.name}</div>
                <div class="archive-cat-meta">${c.game_count} games · ${c.image_count} shots</div>
            </div>
        </a>`;
    }).join('');
    grid.innerHTML = cards;

    // 검색 필터
    const search = document.getElementById('archive-search');
    if (search) {
        search.addEventListener('input', () => {
            const q = search.value.trim().toLowerCase();
            grid.querySelectorAll('.archive-cat-card').forEach(el => {
                el.style.display = el.dataset.name.includes(q) ? '' : 'none';
            });
        });
    }
}

function renderDetail(data) {
    const params = new URLSearchParams(location.search);
    const catName = params.get('cat');
    const cat = data.categories.find(c => c.name === catName);
    const host = document.getElementById('archive-detail');

    if (!cat) {
        host.innerHTML = '<p class="archive-empty">카테고리를 찾을 수 없습니다.</p>';
        return;
    }

    document.title = `${cat.name} | Archive`;
    setText('archive-detail-title', cat.name);
    setText('archive-detail-meta', `${cat.game_count} games · ${cat.image_count} shots`);

    host.innerHTML = cat.games.map(g => `
        <div class="archive-game-group">
            <span class="archive-game-label">${g.name}<span class="archive-game-count">${g.images.length}</span></span>
            <div class="archive-img-grid">
                ${g.images.map(src => `
                    <div class="archive-img-item" data-full="${encPath(src)}">
                        <img src="${encPath(src)}" alt="${g.name}" loading="lazy">
                    </div>`).join('')}
            </div>
        </div>
    `).join('');
}

function setText(id, v) {
    const el = document.getElementById(id);
    if (el) el.textContent = v;
}

// 경로의 각 세그먼트를 URL 인코딩 (한글·한자 게임명 대응)
function encPath(p) {
    return p.split('/').map(encodeURIComponent).join('/');
}

function initLightbox() {
    const modal = document.getElementById('lightbox');
    const modalImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    if (!modal) return;

    document.body.addEventListener('click', (e) => {
        const item = e.target.closest('.archive-img-item');
        if (item) {
            modal.style.display = 'flex';
            modalImg.src = item.dataset.full;
        }
    });
    if (closeBtn) closeBtn.addEventListener('click', () => modal.style.display = 'none');
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') modal.style.display = 'none'; });
}

function initScrollButtons() {
    const top = document.getElementById('btn-top');
    const bottom = document.getElementById('btn-bottom');
    if (top) top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    if (bottom) bottom.addEventListener('click', () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }));
}
