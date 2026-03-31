// project.js — project.html?id=kingsroad 형태로 동작

document.addEventListener('DOMContentLoaded', async () => {
    const id = new URLSearchParams(window.location.search).get('id');
    if (!id) {
        showError('프로젝트 ID가 없습니다.');
        return;
    }

    try {
        const res = await fetch('./data/projects.json');
        const projects = await res.json();
        const project = projects.find(p => p.id === id);

        if (!project) {
            showError(`'${id}' 프로젝트를 찾을 수 없습니다.`);
            return;
        }

        document.title = `${project.title} | Game-Oriented`;
        renderHero(project);
        renderSystems(project.systems);
        renderMisc(project.misc);
        initScrollAnimations();
        initLightbox();

    } catch (e) {
        showError('데이터를 불러오지 못했습니다. build.py를 먼저 실행해주세요.');
        console.error(e);
    }
});

function renderHero(project) {
    const el = document.getElementById('detail-hero');

    const tagsHtml = project.tags
        .map(t => `<span class="detail-tag">${t}</span>`)
        .join('');

    el.innerHTML = `
        ${project.badge ? `<div class="detail-badge">${project.badge}</div>` : ''}
        <h1 class="detail-title">${project.title}</h1>
        <div class="detail-tags">${tagsHtml}</div>
        ${project.dev ? `<p class="detail-dev">${project.dev}</p>` : ''}
    `;
}

function renderSystems(systems) {
    const el = document.getElementById('detail-systems');
    if (!systems || systems.length === 0) {
        el.innerHTML = '<p class="system-placeholder">등록된 시스템이 없습니다.</p>';
        return;
    }

    const rolesHtml = (roles) => roles.length
        ? `<div class="role-tags">${roles.map(r => `<span class="role-tag">${r}</span>`).join('')}</div>`
        : '';

    const bulletsHtml = (bullets) => bullets.length
        ? `<ul class="system-sub-list">${bullets.map(b => `<li>${b}</li>`).join('')}</ul>`
        : '';

    const imagesHtml = (images) => {
        if (!images || images.length === 0) return '';
        const isDual = images.length >= 2;
        const imgs = images.map(img => `
            <div class="gallery-item" style="cursor:pointer;">
                <img src="${img.file}" alt="${img.caption || ''}" class="system-img gallery-img">
                ${img.caption ? `<p style="font-size:0.85rem; color:#888; margin-top:0.6rem; padding:0 0.5rem 0.5rem;">${img.caption}</p>` : ''}
            </div>
        `).join('');

        return `
            <div class="system-image-container ${isDual ? 'dual-image' : ''}"
                 style="${isDual ? 'display:grid; grid-template-columns:1fr 1fr; gap:1rem;' : ''}">
                ${imgs}
            </div>
        `;
    };

    const html = `
        <h2 class="detail-section-title">Designed</h2>
        <div class="system-list">
            ${systems.map(s => `
                <div class="system-item fade-in">
                    <div class="system-header">
                        <h3 class="system-name">${s.name}</h3>
                        ${rolesHtml(s.roles)}
                    </div>
                    ${s.desc ? `<p class="system-desc-main">${s.desc}</p>` : ''}
                    ${s.sub ? `<p class="system-desc-sub">${s.sub}</p>` : ''}
                    ${bulletsHtml(s.bullets)}
                    ${imagesHtml(s.images)}
                </div>
            `).join('')}
        </div>
    `;

    el.innerHTML = html;
}

function renderMisc(misc) {
    if (!misc || misc.length === 0) return;
    const section = document.getElementById('detail-misc');
    const grid = document.getElementById('misc-grid');

    grid.innerHTML = misc.map(img => `
        <div class="improvement-card gallery-item" style="cursor:pointer;">
            <img src="${img.file}" alt="${img.caption || ''}" class="gallery-img">
            ${img.caption ? `<div class="card-overlay"><span>${img.caption}</span></div>` : ''}
        </div>
    `).join('');

    section.style.display = 'block';
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.system-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function initLightbox() {
    const modal = document.getElementById('lightbox');
    const modalImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');

    document.body.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (item) {
            const img = item.querySelector('.gallery-img');
            if (img) {
                modal.style.display = 'flex';
                modalImg.src = img.src;
            }
        }
    });

    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') modal.style.display = 'none';
    });
}

function showError(msg) {
    document.getElementById('detail-systems').innerHTML =
        `<p class="system-placeholder">${msg}</p>`;
}
