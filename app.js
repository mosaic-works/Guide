// Đã loại bỏ toàn bộ icon mũi tên theo yêu cầu

const menuButton = document.querySelector('.menu-button');
const primaryNav = document.querySelector('.primary-nav');

if (menuButton && primaryNav) {
    const closeMenu = () => {
        menuButton.setAttribute('aria-expanded', 'false');
        primaryNav.classList.remove('is-open');
        document.body.classList.remove('menu-open');
    };

    menuButton.addEventListener('click', () => {
        const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
        menuButton.setAttribute('aria-expanded', String(willOpen));
        primaryNav.classList.toggle('is-open', willOpen);
        document.body.classList.toggle('menu-open', willOpen);
    });

    primaryNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => {
        if (window.innerWidth > 720) closeMenu();
    });
}

document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
});

const toast = document.querySelector('.toast');
let toastTimer;

function showToast(message) {
    if (!toast) return;
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('is-visible');
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2200);
}

document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(button.dataset.copy);
            showToast(`Đã sao chép: ${button.dataset.copy}`);
        } catch {
            showToast('Không thể sao chép. Hãy chọn và sao chép thủ công.');
        }
    });
});

const searchInput = document.querySelector('[data-qr-search]');
const qrItems = [...document.querySelectorAll('.qr-list li')];
const qrSections = [...document.querySelectorAll('.qr-section')];
const resultCount = document.querySelector('[data-result-count]');
const emptyState = document.querySelector('.empty-state');
const filterTabs = [...document.querySelectorAll('.filter-tab')];
const resetBtn = document.getElementById('reset-qr-search');

let currentFilter = 'all';

function updateQrGallery() {
    const query = searchInput ? searchInput.value.trim().toLocaleLowerCase('vi') : '';
    let visibleCount = 0;

    qrItems.forEach((item) => {
        const itemSection = item.dataset.section || item.closest('.qr-section')?.dataset.section;
        const matchesCategory = currentFilter === 'all' || itemSection === currentFilter;
        const card = item.querySelector('.qr-card') || item;
        const name = card.dataset.name || item.textContent;
        const matchesSearch = !query || name.toLocaleLowerCase('vi').includes(query);

        const isVisible = matchesCategory && matchesSearch;
        item.classList.toggle('is-hidden', !isVisible);
        if (isVisible) visibleCount += 1;
    });

    qrSections.forEach((section) => {
        const sectionMatchesCategory = currentFilter === 'all' || section.dataset.section === currentFilter;
        const hasVisibleItem = [...section.querySelectorAll('.qr-list li')].some((item) => !item.classList.contains('is-hidden'));
        section.classList.toggle('is-hidden', !sectionMatchesCategory || !hasVisibleItem);
    });

    if (resultCount) {
        resultCount.textContent = `${visibleCount} mã QR`;
    }
    emptyState?.classList.toggle('is-visible', visibleCount === 0);
}

if (filterTabs.length) {
    filterTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            filterTabs.forEach((t) => t.classList.remove('is-active'));
            tab.classList.add('is-active');
            currentFilter = tab.dataset.filter || 'all';
            updateQrGallery();
        });
    });
}

if (searchInput && qrItems.length) {
    searchInput.addEventListener('input', updateQrGallery);
}

if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        currentFilter = 'all';
        filterTabs.forEach((t) => t.classList.toggle('is-active', t.dataset.filter === 'all'));
        updateQrGallery();
        searchInput?.focus();
    });
}

const previewDialog = document.querySelector('.preview-dialog');

if (previewDialog) {
    const previewTitle = previewDialog.querySelector('[data-preview-title]');
    const previewSection = previewDialog.querySelector('[data-preview-section]');
    const previewImage = previewDialog.querySelector('.preview-image');
    const originalLink = previewDialog.querySelector('.original-link');
    const downloadBtn = previewDialog.querySelector('#preview-download');
    const closeButton = previewDialog.querySelector('.close-button');

    document.querySelectorAll('.qr-list a').forEach((link) => {
        link.addEventListener('click', (event) => {
            if (typeof previewDialog.showModal !== 'function') return;
            event.preventDefault();
            const name = link.dataset.name || link.querySelector('.qr-name')?.textContent.trim() || link.textContent.trim();
            const sectionTitle = link.dataset.sectionTitle || 'Mã QR';

            if (previewTitle) previewTitle.textContent = name;
            if (previewSection) previewSection.textContent = sectionTitle;
            if (previewImage) {
                previewImage.src = link.href;
                previewImage.alt = `Hình QR: ${name}`;
            }
            if (originalLink) originalLink.href = link.href;
            if (downloadBtn) {
                downloadBtn.href = link.href;
                const fileName = link.href.split('/').pop() || 'qr-code.png';
                downloadBtn.setAttribute('download', fileName);
            }

            previewDialog.classList.toggle('poster', link.href.endsWith('/qr.png'));
            previewDialog.showModal();
        });
    });

    closeButton?.addEventListener('click', () => previewDialog.close());
    previewDialog.addEventListener('click', (event) => {
        const bounds = previewDialog.getBoundingClientRect();
        const isOutside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
        if (isOutside) previewDialog.close();
    });
}

const noticeDialog = document.getElementById('notice-dialog');
if (noticeDialog && typeof noticeDialog.showModal === 'function') {
    const dismissedUntil = localStorage.getItem('notice_dismissed_until');
    const now = Date.now();
    if (!dismissedUntil || now > Number(dismissedUntil)) {
        setTimeout(() => {
            try {
                noticeDialog.showModal();
            } catch {
                // Không lỗi nếu dialog đã hiển thị
            }
        }, 120);
    }

    const close24hBtn = document.getElementById('notice-close-24h');
    const closeNowBtn = document.getElementById('notice-close-now');

    close24hBtn?.addEventListener('click', () => {
        localStorage.setItem('notice_dismissed_until', String(Date.now() + 24 * 60 * 60 * 1000));
        noticeDialog.close();
    });

    closeNowBtn?.addEventListener('click', () => {
        noticeDialog.close();
    });

    const noticeLinks = noticeDialog.querySelectorAll('a[href^="#"]');
    noticeLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            noticeDialog.close();
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    noticeDialog.addEventListener('click', (event) => {
        const bounds = noticeDialog.getBoundingClientRect();
        const isOutside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
        if (isOutside) noticeDialog.close();
    });
}

