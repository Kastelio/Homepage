// Main Interactivity for Portfolio
document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initScrollAnimations();
    loadSectionData();
});

/**
 * Navigation interaction (changing opacity on scroll)
 */
function initNav() {
    const nav = document.querySelector('.nav-glass');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
            nav.style.padding = '0.5rem 0';
        } else {
            nav.style.backgroundColor = 'rgba(15, 23, 42, 0.7)';
            nav.style.padding = '0';
        }
    });
}

/**
 * Scroll reveal animations using Intersection Observer
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card-glass, .section-title, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

/**
 * Logic for loading dynamic data (if any) or enhanced interactions
 */
function loadSectionData() {
    console.log('Portfolio initialized successfully.');

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // subtract nav height
                    behavior: 'smooth'
                });
            }
        });
    });

    const urlParams = new URLSearchParams(window.location.search);
    const categoryQuery = urlParams.get('category');
    const categoryTitleEl = document.getElementById('category-main-title');
    const gridEl = document.getElementById('reference-grid');

    if (categoryTitleEl && gridEl && categoryQuery) {
        // Mock data mapping
        const archiveData = {
            'title': {
                name: '타이틀',
                items: [
                    { game: '원신', type: '타이틀', img: './assets/kingsroad.jpg' },
                    { game: '프라시아 전기', type: '타이틀', img: './assets/zenonia.jpg' }
                ]
            },
            'creation': {
                name: '캐릭터 생성 및 선택',
                items: [
                    { game: '로스트아크', type: '캐릭터 선택', img: './assets/zenonia.jpg' },
                    { game: '검은사막', type: '캐릭터 생성', img: './assets/kingsroad.jpg' }
                ]
            },
            'customizing': {
                name: '커스터마이징',
                items: [
                    { game: '검은사막', type: '커스터마이징', img: './assets/profile.png' }
                ]
            }
        };

        const data = archiveData[categoryQuery];
        if (data) {
            categoryTitleEl.textContent = data.name;
            let html = '';

            data.items.forEach(item => {
                html += `
                    <div class="reference-item fade-in">
                        <h4 class="reference-title">[${item.game}] ${item.type}</h4>
                        <div class="reference-img-wrapper gallery-item">
                            <img src="${item.img}" alt="${item.game} UI" class="gallery-img">
                            <div class="reference-overlay"><span class="zoom-icon">🔍 확대보기</span></div>
                        </div>
                    </div>
                `;
            });
            gridEl.innerHTML = html;
        } else {
            categoryTitleEl.textContent = "Category Not Found";
        }
    }

    // Lightbox Functionality
    const modal = document.getElementById('lightbox');
    const modalImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');

    if (modal && modalImg && closeBtn) {
        // Need to use event delegation or attach after dynamic injection
        document.body.addEventListener('click', function (e) {
            // Check if clicking inside a gallery item
            const galleryItem = e.target.closest('.gallery-item');
            if (galleryItem) {
                const img = galleryItem.querySelector('.gallery-img');
                if (img) {
                    modal.style.display = 'flex';
                    modalImg.src = img.src;
                }
            }
        });

        // Close when clicking X
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Close when clicking outside image
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
            }
        });
    }
}
