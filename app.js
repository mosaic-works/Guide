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

document.querySelectorAll('[data-live-clock]').forEach((clock) => {
    const dateOutput = clock.querySelector('[data-clock-date]');
    const timeOutput = clock.querySelector('[data-clock-time]');
    const dateFormatter = new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const timeFormatter = new Intl.DateTimeFormat('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23'
    });

    const updateClock = () => {
        const now = new Date();
        if (dateOutput) dateOutput.textContent = dateFormatter.format(now);
        if (timeOutput) timeOutput.textContent = timeFormatter.format(now);
        clock.dateTime = now.toISOString();
    };

    updateClock();
    window.setInterval(updateClock, 1000);
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

const feedbackEndpoint = 'https://script.google.com/macros/s/AKfycby-reALynElbYg4QpU4P6PVcD8qj3qObR3SPil7rOLZkjJv7w0jXzxbv03IgAKyGAu6HA/exec';
const feedbackTrigger = document.querySelector('.footer-feedback-trigger');
const feedbackDialog = document.getElementById('feedback-dialog');
const feedbackForm = document.getElementById('feedback-form');
const feedbackInput = document.getElementById('feedback-content');
const feedbackSubmit = document.getElementById('feedback-submit');
const feedbackStatus = document.getElementById('feedback-status');
const pendingFeedbackBeacons = new Set();
let feedbackSending = false;

if (feedbackTrigger && feedbackDialog) {
    feedbackTrigger.addEventListener('click', () => {
        if (typeof feedbackDialog.showModal !== 'function') return;
        feedbackDialog.showModal();
        window.requestAnimationFrame(() => feedbackInput?.focus());
    });

    feedbackDialog.querySelectorAll('[data-close-feedback]').forEach((button) => {
        button.addEventListener('click', () => feedbackDialog.close());
    });

    feedbackDialog.addEventListener('click', (event) => {
        if (event.target === feedbackDialog) feedbackDialog.close();
    });
}

if (feedbackForm && feedbackInput && feedbackSubmit && feedbackStatus) {
    feedbackForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (feedbackSending) return;

        const content = feedbackInput.value.trim();
        if (!content) {
            feedbackStatus.textContent = 'Vui lòng nhập nội dung trước khi gửi.';
            feedbackStatus.className = 'feedback-status is-error';
            feedbackInput.focus();
            return;
        }

        const params = new URLSearchParams({
            content,
            createdAt: new Date().toISOString(),
            type: 'feedback'
        });
        const beacon = new Image();
        const releaseBeacon = () => pendingFeedbackBeacons.delete(beacon);
        pendingFeedbackBeacons.add(beacon);
        beacon.addEventListener('load', releaseBeacon, { once: true });
        beacon.addEventListener('error', releaseBeacon, { once: true });

        feedbackSending = true;
        feedbackSubmit.disabled = true;
        feedbackForm.setAttribute('aria-busy', 'true');
        feedbackStatus.textContent = 'Đang gửi góp ý…';
        feedbackStatus.className = 'feedback-status';

        try {
            beacon.src = `${feedbackEndpoint}?${params.toString()}`;
        } catch {
            releaseBeacon();
            feedbackSending = false;
            feedbackSubmit.disabled = false;
            feedbackForm.removeAttribute('aria-busy');
            feedbackStatus.textContent = 'Không thể khởi chạy yêu cầu gửi. Vui lòng thử lại.';
            feedbackStatus.className = 'feedback-status is-error';
            return;
        }

        feedbackForm.reset();
        feedbackStatus.textContent = 'Gửi thành công';
        feedbackStatus.className = 'feedback-status is-success';
        showToast('Đã gửi góp ý.');

        window.setTimeout(() => {
            feedbackSending = false;
            feedbackSubmit.disabled = false;
            feedbackForm.removeAttribute('aria-busy');
        }, 1200);
    });
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

// Bấm vào tiêu đề để mở hoặc thu gọn nội dung của từng mục.
const collapsibleSections = document.querySelectorAll('.section-collapsible');
const sectionAnimations = new WeakMap();
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function setSectionState(section, shouldCollapse) {
    const titleToggle = section.querySelector('.section-title-toggle');
    if (!titleToggle) return;
    const content = document.getElementById(titleToggle.getAttribute('aria-controls'));
    if (!content) return;

    const startHeight = content.hidden ? 0 : content.getBoundingClientRect().height;
    const startOpacity = content.hidden ? 0 : Number.parseFloat(getComputedStyle(content).opacity) || 1;
    sectionAnimations.get(section)?.cancel();
    section.classList.toggle('is-collapsed', shouldCollapse);
    titleToggle.setAttribute('aria-expanded', String(!shouldCollapse));

    if (prefersReducedMotion.matches || typeof content.animate !== 'function') {
        content.hidden = shouldCollapse;
        return;
    }

    if (!shouldCollapse) content.hidden = false;

    const expandedHeight = content.scrollHeight;
    const animation = content.animate(
        shouldCollapse
            ? [
                { height: `${startHeight}px`, opacity: startOpacity, transform: 'translateY(0)' },
                { height: '0px', opacity: 0, transform: 'translateY(-10px)' }
            ]
            : [
                { height: `${startHeight}px`, opacity: startOpacity, transform: 'translateY(-10px)' },
                { height: `${expandedHeight}px`, opacity: 1, transform: 'translateY(0)' }
            ],
        {
            duration: shouldCollapse ? 280 : 420,
            easing: 'cubic-bezier(.16, 1, .3, 1)',
            fill: 'both'
        }
    );

    sectionAnimations.set(section, animation);
    content.classList.add('is-animating');

    const finishAnimation = () => {
        if (sectionAnimations.get(section) !== animation) return;
        content.hidden = shouldCollapse;
        content.classList.remove('is-animating');
        sectionAnimations.delete(section);
    };

    animation.addEventListener('finish', finishAnimation, { once: true });
    animation.addEventListener('cancel', () => content.classList.remove('is-animating'), { once: true });
}

collapsibleSections.forEach((section) => {
    const titleToggle = section.querySelector('.section-title-toggle');
    if (!titleToggle) return;

    titleToggle.addEventListener('click', () => {
        setSectionState(section, !section.classList.contains('is-collapsed'));
    });
});

// Khi bấm vào menu điều hướng trên cùng, tự động mở rộng mục đó nếu đang bị thu gọn
document.querySelectorAll('.primary-nav a[href^="#"], .hero-actions a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
        const targetId = link.getAttribute('href').slice(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
            if (targetEl.classList.contains('section-collapsible') && targetEl.classList.contains('is-collapsed')) {
                setSectionState(targetEl, false);
            }
            const parentCollapsible = targetEl.closest('.section-collapsible');
            if (parentCollapsible && parentCollapsible.classList.contains('is-collapsed')) {
                setSectionState(parentCollapsible, false);
            }
        }
    });
});

