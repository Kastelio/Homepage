let allGames = [];
let currentSort = 'playtime';

document.addEventListener('DOMContentLoaded', async () => {
    await loadGames();
    initSortButtons();
    initScrollButtons();
});

async function loadGames() {
    const grid = document.getElementById('playing-grid');
    const countEl = document.getElementById('game-count');

    try {
        const res = await fetch('./data/playing.json');
        allGames = await res.json();

        countEl.textContent = `총 ${allGames.length}개`;
        renderGames('playtime');

    } catch (e) {
        grid.innerHTML = '<p style="color:#888; text-align:center;">데이터를 불러오지 못했습니다.</p>';
        console.error(e);
    }
}

function renderGames(sortKey) {
    const grid = document.getElementById('playing-grid');

    const sorted = [...allGames].sort((a, b) => {
        const aVal = sortKey === 'playtime' ? (a.playtime_num || 0) : (a.payment_num || 0);
        const bVal = sortKey === 'playtime' ? (b.playtime_num || 0) : (b.payment_num || 0);
        return bVal - aVal;
    });

    grid.innerHTML = sorted.map(g => {
        const thumb = g.thumbnail
            ? `<img src="${g.thumbnail}" alt="${g.name}" class="game-thumb" loading="lazy">`
            : `<div class="game-thumb-placeholder">🎮</div>`;

        const playtimeEl = g.playtime
            ? `<div class="game-stat"><span class="stat-label">플레이</span><span class="stat-value">${g.playtime}시간</span></div>`
            : '';

        const paymentEl = g.payment
            ? `<div class="game-stat"><span class="stat-label">과금</span><span class="stat-value">${Number(g.payment).toLocaleString()}원</span></div>`
            : '';

        return `
            <div class="game-card">
                <div class="game-thumb-wrapper">${thumb}</div>
                <div class="game-info">
                    <div class="game-name">${g.name}</div>
                    ${g.developer ? `<div class="game-developer">${g.developer}</div>` : ''}
                    ${(playtimeEl || paymentEl) ? `<div class="game-stats">${playtimeEl}${paymentEl}</div>` : ''}
                    ${g.comment ? `<div class="game-comment">${g.comment}</div>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function initSortButtons() {
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSort = btn.dataset.sort;
            renderGames(currentSort);
        });
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
