// archive.js — UI Reference Archive (사이드바 + 해시 라우팅 단일 페이지)

// 카테고리 한글명 매핑
const CAT_KO = {
    AIAssistant: 'AI 어시스턴트', Account: '계정', Achievement: '업적', AdventureBook: '모험일지',
    Affinity: '호감도', Alchemy: '연금술', Altar: '제단', Appearance: '외형', Arena: '투기장',
    Artifact: '유물', Astrology: '점성술', Attendance: '출석', BaseDefense: '거점 방어', Battle: '전투',
    BattleContentMenu: '전투 콘텐츠 메뉴', BattleGround: '전장', Benchmark: '벤치마크', Boss: '보스',
    BuffInfo: '버프 정보', Camp: '캠프', Card: '카드', CashShop: '캐시샵', Challenge: '도전',
    Channel: '채널', CharacterAscension: '캐릭터 승급', CharacterCreate: '캐릭터 생성',
    CharacterInfo: '캐릭터 정보', CharacterLevel: '캐릭터 레벨', CharacterSelect: '캐릭터 선택',
    CharacterSkill: '캐릭터 스킬', Chat: '채팅', Cinematic: '시네마틱', Class: '클래스',
    ClassChange: '전직', ClassTree: '클래스 트리', Collection: '수집/도감', Community: '커뮤니티',
    ConditionalOffer: '조건부 상품', Constellation: '별자리', Construction: '건설', ContentMenu: '콘텐츠 메뉴',
    Cooking: '요리', Council: '평의회', Courtiers: '신하', Crafting: '제작', Culture: '문화',
    Currency: '재화', Customizing: '커스터마이징', Cyberware: '사이버웨어', DailyTraining: '일일 훈련',
    Database: '데이터베이스', Death: '사망', Decision: '결정', Decompose: '분해', Dialogue: '대화',
    Dispatch: '파견', DropInfo: '획득처', Dungeon: '던전', EffectInfo: '효과 정보', Emote: '감정표현',
    Encyclopedia: '도감', Enhancement: '강화', Event: '이벤트', EventLobby: '이벤트 로비', Exchange: '거래소',
    Exploration: '탐험', Faction: '세력', Faith: '신앙', Family: '가문', Farm: '농장', Feudal: '영지',
    Field: '필드', FieldBoss: '필드 보스', FieldEvent: '필드 이벤트', FirstPurchase: '첫 구매', Friend: '친구',
    Gacha: '가챠', GachaProbability: '가챠 확률', Gallery: '갤러리', GameTips: '게임 팁', Gift: '선물',
    GrowthEvent: '성장 이벤트', GrowthGuide: '성장 가이드', Guardian: '수호자', GuardianPromotion: '수호자 승급',
    GuardianSummon: '수호자 소환', Guide: '가이드', Guild: '길드', GuildAuction: '길드 경매', HUD: 'HUD',
    HamburgerMenu: '햄버거 메뉴', Heritage: '유산', Hero: '영웅', HeroLevel: '영웅 레벨', HeroLibrary: '영웅 도서관',
    HeroRating: '영웅 평가', Home: '홈', Housing: '하우징', InGameComputer: '인게임 컴퓨터',
    InteractionBuff: '인터랙션 버프', Inventory: '인벤토리', ItemDetail: '아이템 상세', ItemEquip: '아이템 장착',
    Journal: '일지', KeyBinding: '키 설정', Launcher: '런처', Lifestyle: '생활', Loading: '로딩', Lobby: '로비',
    Log: '로그', Loot: '전리품', Lore: '세계관', Mail: '우편', MainMenu: '메인 메뉴', MainScreen: '메인 화면',
    Map: '지도', MatchResult: '매치 결과', Matchmaking: '매치메이킹', Media: '미디어', Memoir: '회고록',
    Menu: '메뉴', MilestoneOffer: '마일스톤 상품', Military: '군사', Minigame: '미니게임', Mission: '미션',
    MonsterSummon: '몬스터 소환', Mount: '탈것', Multiplayer: '멀티플레이', NPC: 'NPC', Navigation: '내비게이션',
    Note: '노트', Notice: '공지', Notification: '알림', NumericInput: '숫자 입력', OfflinePlay: '오프라인 플레이',
    Party: '파티', PatchProcess: '패치 프로세스', PerkPoint: '특성 포인트', Pet: '펫', PhotoMode: '포토 모드',
    Play: '플레이', PowerSaving: '절전 모드', PreRegistration: '사전 등록', Production: '생산', Profile: '프로필',
    Protocol: '프로토콜', Purchase: '구매', Push: '푸시', PvP: 'PvP', QualityUpgrade: '품질 강화', Quest: '퀘스트',
    Queue: '대기열', Raid: '레이드', Rally: '집결', Ranking: '랭킹', Refine: '재련', Replay: '리플레이',
    Reputation: '평판', ResourceCollection: '자원 수집', Reward: '보상', RoyalCourt: '왕궁', Rune: '룬',
    Scan: '스캔', Scheme: '책략', Search: '검색', SeasonPass: '시즌 패스', Settings: '설정', Shop: '상점',
    Shortcut: '바로가기', SiegeBattle: '공성전', Simulation: '시뮬레이션', Skill: '스킬', SoulCore: '소울 코어',
    SpecialOffer: '특별 상품', Stage: '스테이지', StaminaCharge: '스태미나 충전', StarterPack: '스타터 팩',
    Statistics: '통계', Stats: '스탯', Status: '상태', Steam: '스팀', StepUpOffer: '스텝업 상품',
    Storage: '창고', Story: '스토리', StrategicMeeting: '전략 회의', Subscription: '구독', Synthesis: '합성',
    SystemMenu: '시스템 메뉴', Tarot: '타로', TeamFormation: '편성', Timeline: '타임라인', Title: '타이틀',
    Title_Badge: '칭호', TradingPort: '교역항', Training: '훈련', Trait: '특성', TraitPoint: '특성 포인트',
    TravelLevel: '여행 레벨', Tutorial: '튜토리얼', VIP: 'VIP', WarArchive: '전쟁 기록', WeaponMastery: '무기 숙련',
    WebView: '웹뷰', _Modding: '모딩', _PCCafe: 'PC방', book: '책', equipment: '장비', item: '아이템',
    level_art: '레벨 아트', meme: '밈', monster: '몬스터',
};

function catKo(name) { return CAT_KO[name] || name; }
function catLabel(name) {
    const ko = CAT_KO[name];
    return ko && ko !== name ? `${ko} <span class="cat-en">(${name})</span>` : name;
}
function encPath(p) { return p.split('/').map(encodeURIComponent).join('/'); }

let ARCHIVE = null;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('./data/archive.json');
        ARCHIVE = await res.json();
    } catch (e) {
        console.error(e);
        document.getElementById('archive-content').innerHTML = '<p class="archive-empty">아카이브를 불러오지 못했습니다.</p>';
        return;
    }
    renderSidebar();
    initTabs();
    route();
    window.addEventListener('hashchange', route);
    initLightbox();
    initScrollButtons();
});

const TAB_INFO = {
    review: { ko: '게임 리뷰', en: 'Game Reviews' },
    docs: { ko: '기획서', en: 'Design Docs' },
};

function initTabs() {
    const tabs = document.querySelectorAll('.archive-tab');
    const catList = document.getElementById('archive-cat-list');
    const docsList = document.getElementById('archive-docs-list');
    const search = document.getElementById('archive-search');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const isUI = tab.dataset.tab === 'ui';
            catList.style.display = isUI ? '' : 'none';
            docsList.style.display = isUI ? 'none' : 'block';
            search.style.display = isUI ? '' : 'none';
            if (isUI) { route(); }
            else { renderConstruction(TAB_INFO[tab.dataset.tab]); }
        });
    });
}

function renderConstruction(info) {
    document.getElementById('archive-content').innerHTML = `
        <div class="archive-header">
            <h1 class="archive-title">${info.ko} <span class="cat-en-big">(${info.en})</span></h1>
        </div>
        <p class="archive-empty" style="font-size:1.3rem;">🚧 공사중</p>`;
}

function renderSidebar() {
    const list = document.getElementById('archive-cat-list');
    list.innerHTML = ARCHIVE.categories.map(c => `
        <li>
            <a class="archive-cat-link" href="#${encodeURIComponent(c.name)}"
               data-cat="${c.name}" data-search="${(catKo(c.name) + ' ' + c.name).toLowerCase()}">
                <span class="cat-link-label">${catLabel(c.name)}</span>
                <span class="cat-link-count">${c.image_count}</span>
            </a>
        </li>`).join('');

    const search = document.getElementById('archive-search');
    if (search) {
        search.addEventListener('input', () => {
            const q = search.value.trim().toLowerCase();
            list.querySelectorAll('.archive-cat-link').forEach(el => {
                el.parentElement.style.display = el.dataset.search.includes(q) ? '' : 'none';
            });
        });
    }
}

function route() {
    const raw = location.hash.replace(/^#/, '');
    const name = raw ? decodeURIComponent(raw) : '';
    // 사이드바 활성화
    document.querySelectorAll('.archive-cat-link').forEach(el => {
        el.classList.toggle('active', el.dataset.cat === name);
    });
    if (!name) { renderOverview(); return; }
    const cat = ARCHIVE.categories.find(c => c.name === name);
    if (!cat) { renderOverview(); return; }
    renderCategory(cat);
    window.scrollTo({ top: 0 });
}

function renderOverview() {
    const el = document.getElementById('archive-content');
    el.innerHTML = `
        <div class="archive-header">
            <h1 class="archive-title">Archive</h1>
            <p class="archive-subtitle">화면 유형별로 분류한 게임 UI 레퍼런스</p>
            <div class="archive-stats">
                <span class="archive-stat"><b>${ARCHIVE.total_categories}</b>화면 유형</span>
                <span class="archive-stat"><b>${ARCHIVE.total_games}</b>게임</span>
                <span class="archive-stat"><b>${ARCHIVE.total_images.toLocaleString()}</b>스크린샷</span>
            </div>
        </div>
        <div class="archive-cat-grid">
            ${ARCHIVE.categories.map(c => {
                const cover = c.games[0]?.images[0] || '';
                return `
                <a class="archive-cat-card" href="#${encodeURIComponent(c.name)}">
                    ${cover ? `<img class="archive-cat-thumb" src="${encPath(cover)}" alt="${c.name}" loading="lazy">` : '<div class="archive-cat-thumb"></div>'}
                    <div class="archive-cat-info">
                        <div class="archive-cat-name">${catLabel(c.name)}</div>
                        <div class="archive-cat-meta">${c.game_count} games · ${c.image_count} shots</div>
                    </div>
                </a>`;
            }).join('')}
        </div>`;
}

function renderCategory(cat) {
    const el = document.getElementById('archive-content');
    el.innerHTML = `
        <div class="archive-header" style="text-align:left;">
            <h1 class="archive-title">${catKo(cat.name)} <span class="cat-en-big">(${cat.name})</span></h1>
            <p class="archive-subtitle">${cat.game_count} games · ${cat.image_count} shots</p>
        </div>
        ${cat.games.map(g => `
            <div class="archive-game-group">
                <span class="archive-game-label">${g.name}<span class="archive-game-count">${g.images.length}</span></span>
                <div class="archive-img-grid">
                    ${g.images.map(src => `
                        <div class="archive-img-item" data-full="${encPath(src)}">
                            <img src="${encPath(src)}" alt="${g.name}" loading="lazy">
                        </div>`).join('')}
                </div>
            </div>`).join('')}`;
}

function initLightbox() {
    const modal = document.getElementById('lightbox');
    const modalImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    if (!modal) return;
    document.body.addEventListener('click', (e) => {
        const item = e.target.closest('.archive-img-item');
        if (item) { modal.style.display = 'flex'; modalImg.src = item.dataset.full; }
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
