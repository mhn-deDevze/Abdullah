/**
 * سباك و كهربائي صيانة الباكستانى | Pakistani Plumber & Electrician Maintenance Riyadh
 * Official Client Script — High Conversion & Fast Interaction Logic
 * Phone: 053 399 5879 (+966533995879)
 * WhatsApp: https://wa.me/966533995879
 * Location: 3394-3482 Al Benaa St Al Munisiyah District Riyadh 13255
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initFaqAccordion();
  initBookingForm();
  initLiveStatus();
  initAddressCopy();
  initScrollReveal();
  initFilterTabs();
});

/* -------------------------------------------------------------------------
   1. Header Scroll Effects & Active Navigation
   ------------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const handleScroll = () => {
    if (window.scrollY > 25) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    let current = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* -------------------------------------------------------------------------
   2. Mobile Drawer Navigation
   ------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backdrop = document.querySelector('.menu-backdrop');
  const siteHeader = document.querySelector('.site-header');

  if (!toggleBtn || !navMenu) return;

  function closeMenu() {
    navMenu.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function openMenu() {
    if (siteHeader) {
      const rect = siteHeader.getBoundingClientRect();
      navMenu.style.top = Math.round(rect.bottom) + 'px';
    }
    navMenu.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && navMenu.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* -------------------------------------------------------------------------
   3. Service & Pricing Tabs Filter
   ------------------------------------------------------------------------- */
function initFilterTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const serviceCards = document.querySelectorAll('.service-filter-card');

  if (!tabBtns.length || !serviceCards.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      serviceCards.forEach(card => {
        const cat = card.getAttribute('data-cat') || '';
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------
   4. FAQ Accordion Logic
   ------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Open first FAQ by default
  const firstItem = faqItems[0];
  if (firstItem) {
    firstItem.classList.add('active');
    const answer = firstItem.querySelector('.faq-answer');
    if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
  }
}

/* -------------------------------------------------------------------------
   5. WhatsApp Service Request Booking Form
   ------------------------------------------------------------------------- */
function initBookingForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const service = document.getElementById('book-service')?.value || 'صيانة كهرباء وسباكة عامة';
    const district = document.getElementById('book-district')?.value || 'حي المنسية والمناطق المجاورة بالرياض';
    const urgency = document.getElementById('book-urgency')?.value || 'خدمة عاجلة اليوم';
    const phone = document.getElementById('book-phone')?.value || '';
    const name = document.getElementById('book-name')?.value || 'عميل كريم';
    const notes = document.getElementById('book-notes')?.value || '';

    let msg = `السلام عليكم ورحمة الله وبركاته،\nأرغب في حجز فني من *سباك و كهربائي صيانة الباكستانى*:\n\n`;
    msg += `• *الاسم الكريم:* ${name}\n`;
    if (phone.trim()) {
      msg += `• *رقم التواصل:* ${phone}\n`;
    }
    msg += `• *نوع الخدمة:* ${service}\n`;
    msg += `• *الحي / الموقع:* ${district}\n`;
    msg += `• *موعد الزيارة المطلوبة:* ${urgency}\n`;
    if (notes.trim()) {
      msg += `• *تفاصيل العطل:* ${notes.trim()}\n`;
    }
    msg += `\nأرجو تأكيد موعد وصول الفني للكشف والمعاينة. شاكر ومقدّر.`;

    const waPhone = '966533995879';
    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(msg)}`;
    showToast('جاري تحويل طلبكم إلى واتساب سباك و كهربائي صيانة الباكستانى (0533995879)...');
    
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 700);
  });
}

/* -------------------------------------------------------------------------
   6. 24/7 Live Availability Status Checker
   ------------------------------------------------------------------------- */
function initLiveStatus() {
  const badgeContainers = document.querySelectorAll('.js-live-status');
  if (!badgeContainers.length) return;

  badgeContainers.forEach(container => {
    container.innerHTML = `
      <span class="pulse-dot"></span>
      <span class="status-text"><strong>متاح الآن على مدار 24 ساعة</strong> — طاقم الطوارئ والصيانة جاهز للوصول فورياً إلى حي المنسية والمناطق المجاورة وكافة أحياء الرياض</span>
    `;
  });
}

/* -------------------------------------------------------------------------
   7. Copy National Address to Clipboard
   ------------------------------------------------------------------------- */
function initAddressCopy() {
  const copyBtn = document.getElementById('btn-copy-address');
  if (!copyBtn) return;

  const fullAddress = 'سباك و كهربائي صيانة الباكستانى — 3394-3482 شارع البناء، حي المونسية، الرياض 13255، المملكة العربية السعودية (هاتف: 0533995879)';

  copyBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(fullAddress);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = fullAddress;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }

      const copyTextEl = copyBtn.querySelector('.copy-text');
      const originalText = copyTextEl ? copyTextEl.textContent : '';
      if (copyTextEl) copyTextEl.textContent = 'تم نسخ العنوان بنجاح! ✓';
      copyBtn.style.background = '#DCFCE7';
      copyBtn.style.color = '#166534';
      copyBtn.style.borderColor = '#86EFAC';

      showToast('تم نسخ عنوان سباك و كهربائي صيانة الباكستانى (حي المونسية، الرياض) بنجاح');

      setTimeout(() => {
        if (copyTextEl) copyTextEl.textContent = originalText;
        copyBtn.style.background = '';
        copyBtn.style.color = '';
        copyBtn.style.borderColor = '';
      }, 3000);
    } catch (err) {
      showToast('العنوان: ' + fullAddress);
    }
  });
}

/* -------------------------------------------------------------------------
   8. Scroll Reveal Animation
   ------------------------------------------------------------------------- */
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) return;

  const revealElements = document.querySelectorAll(
    '.service-card, .price-card, .why-card, .testimonial-card, .district-pill, .stat-card'
  );

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealElements.forEach(el => observer.observe(el));
}

/* -------------------------------------------------------------------------
   9. Toast Notification Helper
   ------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.querySelector('.toast-msg');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
