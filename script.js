// DOM要素の取得
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');
const contactForm = document.querySelector('.contact-form');

// モバイルメニューのトグル
// モバイルメニューのトグル
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    navbar.classList.toggle('mobile-open'); // Added for transparent navbar handling

    // ハンバーガーメニューのアニメーション
    const bars = hamburger.querySelectorAll('.bar');
    if (hamburger.classList.contains('active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';

        // If transparent, force dark bars when menu is open (if background is white)
        // Note: effectively handled by .navbar.mobile-open styles if needed
        // For now, let's ensure the menu text is visible
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});

// ヒーローセクションのパララックス効果
const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const elements = document.querySelectorAll('.element');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        elements.forEach((el, index) => {
            const speed = (index + 1) * 20;
            const xOffset = (window.innerWidth / 2 - e.clientX) / speed;
            const yOffset = (window.innerHeight / 2 - e.clientY) / speed;

            el.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
}

// ナビゲーションリンククリック時の処理
// ナビゲーションリンククリック時の処理
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // ページ内リンク（ハッシュで始まる）かつ、現在のページでの遷移の場合のみスムーズスクロール
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href;
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // スムーズスクロール
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // モバイルメニューを閉じる
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                const bars = hamburger.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        }
        // それ以外のリンク（別ページへの遷移など）はデフォルトの動作（ページ遷移）を行う
    });
});

// スクロール時のナビゲーションバー効果
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// フォーム送信処理
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // フォームデータの取得
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // 簡単なバリデーション
    if (!name || !email || !subject || !message) {
        showNotification('すべての項目を入力してください。', 'error');
        return;
    }

    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('正しいメールアドレスを入力してください。', 'error');
        return;
    }

    // 送信成功のシミュレーション
    showNotification('お問い合わせありがとうございます。後日ご連絡いたします。', 'success');
    contactForm.reset();
});

// 通知表示機能
function showNotification(message, type = 'info') {
    // 既存の通知を削除
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // 通知要素の作成
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // スタイルの適用
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        word-wrap: break-word;
    `;

    // DOMに追加
    document.body.appendChild(notification);

    // アニメーション表示
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // 閉じるボタンのイベント
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });

    // 自動で閉じる
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// スクロールアニメーション（Intersection Observer）
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// アニメーション対象要素の設定
const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .stat, .about-text, .contact-info');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// パフォーマンス向上のための遅延読み込み
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ページ読み込み完了時の処理
document.addEventListener('DOMContentLoaded', () => {
    // 遅延読み込みの初期化
    lazyLoadImages();

    // 初期アニメーション
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // パフォーマンス監視
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        });
    }
});

// キーボードナビゲーション対応
document.addEventListener('keydown', (e) => {
    // ESCキーでモバイルメニューを閉じる
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.click();
    }
});

// タッチデバイス対応
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && navMenu.classList.contains('active')) {
            // 左スワイプでメニューを閉じる
            hamburger.click();
        }
    }
}

// リサイズ時の処理
window.addEventListener('resize', () => {
    // デスクトップサイズになったらモバイルメニューを閉じる
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        hamburger.click();
    }
});

// サービスカードのホバー効果強化
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// フォームのアニメーション
const inputs = document.querySelectorAll('.form-control input, .form-control textarea');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Portfolio Filtering Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.style.display = 'block';
                    // Optional: Add a fade-in animation here if desired
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}
// ポートフォリオアイテムのクリック効果
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
        // クリック時の視覚的フィードバック
        item.style.transform = 'scale(0.98)';
        setTimeout(() => {
            item.style.transform = 'scale(1)';
        }, 150);

        // 実際のプロジェクトでは、ここでモーダルを開くなどの処理を行う
        showNotification('ポートフォリオの詳細ページを準備中です。', 'info');
    });
});

// 統計数値のカウントアップアニメーション
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = counter.textContent.replace(/\d+/, target);
                clearInterval(timer);
            } else {
                counter.textContent = counter.textContent.replace(/\d+/, Math.floor(current));
            }
        }, 16);
    });
}

// 統計セクションが表示されたときにカウンターを開始
const statsSection = document.querySelector('.about-stats');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Numbers Count Up (Keep existing logic if preferred, or just rely on bars)
            // animateCounters(); 

            // Animate Bars
            const bars = document.querySelectorAll('.stat-bar-fill');
            bars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            });

            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Vision/Mission Wipe Animation Observer
const visionImages = document.querySelectorAll('.about-image');
const visionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            visionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

visionImages.forEach(img => {
    visionObserver.observe(img);
});

// エラーハンドリング
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // 本番環境では、エラーをログサービスに送信する
});

// パフォーマンス最適化
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// スクロールイベントの最適化
const optimizedScrollHandler = debounce(() => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

