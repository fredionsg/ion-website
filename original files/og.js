/**********************************************************
 * SECTION 1: Main DOM Ready (scroll cards, smooth nav, active link)
 **********************************************************/
document.addEventListener('DOMContentLoaded', function() {
  /* ===============================
     Auto-scroll for .service-cards
     =============================== */
  const serviceCards = document.querySelector('.service-cards');

  // We'll define these in the outer scope so startScroll/stopScroll can see them
  let scrollInterval;
  let scrollDirection = 1;
  const scrollSpeed = 0.5;

  function startScroll() {
    if (!serviceCards) return;
    // avoid stacking multiple intervals
    stopScroll();
    scrollInterval = setInterval(function() {
      serviceCards.scrollLeft += scrollSpeed * scrollDirection;

      // bounce at the edges
      if (serviceCards.scrollLeft >= (serviceCards.scrollWidth - serviceCards.clientWidth)) {
        scrollDirection = -1;
      } else if (serviceCards.scrollLeft <= 0) {
        scrollDirection = 1;
      }
    }, 10);
  }

  function stopScroll() {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      scrollInterval = null;
    }
  }

  if (serviceCards) {
    serviceCards.addEventListener('mouseleave', startScroll);
    serviceCards.addEventListener('mouseenter', stopScroll);
    startScroll();
  }

  /* ===============================
     Smooth scroll for in-page nav
     =============================== */
  const navLinks = document.querySelectorAll('.nav-links a');

  function handleNavClick(e) {
    const targetId = this.getAttribute('href');

    // Only intercept anchor links like #about
    if (targetId && targetId.startsWith('#') && targetId.length > 1) {
      e.preventDefault();

      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerEl = document.querySelector('header');
        const headerHeight = headerEl ? headerEl.offsetHeight : 80;
        const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        history.pushState(null, '', targetId);
      }
    }
  }

  navLinks.forEach(function(link) {
    link.addEventListener('click', handleNavClick);
  });

  /* ===============================
     Active nav highlight on scroll
     =============================== */
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;

    document.querySelectorAll('section[id]').forEach(function(section) {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach(function(link) {
          link.classList.remove('active');
        });
        const activeLink = document.querySelector('.nav-links a[href="#' + sectionId + '"]');
        if (activeLink) activeLink.classList.add('active');
      }
    });
  });
});


/**********************************************************
 * SECTION 2: "Read More Text" preset
 **********************************************************/
(function () {
  $(function () {
    // Initialize existing .rmt-wrapper elements
    $(".rmt-wrapper").each(function () {
      initializeWrapper($(this));
    });

    // Observe DOM changes for dynamically added .rmt-wrapper elements
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        Array.from(mutation.addedNodes).forEach(function(node) {
          const $node = $(node);
          if ($node.is(".rmt-wrapper") || $node.find(".rmt-wrapper").length) {
            $(".rmt-wrapper").each(function () {
              if (!$(this).data("initialized")) {
                initializeWrapper($(this));
              }
            });
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });

  function initializeWrapper($wrapper) {
    if ($wrapper.data("initialized")) return;
    $wrapper.data("initialized", true);

    const $readMoreBtn = $(".readMoreButton", $wrapper);
    if (!$readMoreBtn.length) {
      console.warn("Read More Button not found in:", $wrapper);
      return;
    }

    if (document.body.classList.contains("edit-full")) {
      observeClassChange(document.body, function() {
        if (!document.body.classList.contains("edit")) {
          setupToggle($wrapper, $readMoreBtn, "truncate");
        }
      });
    } else {
      setupToggle($wrapper, $readMoreBtn, "truncate");
    }
  }

  function observeClassChange(element, callback) {
    new MutationObserver(callback).observe(element, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  function setupToggle($wrapper, $trigger, cssClass) {
    const $text = $(".text-content", $wrapper);

    // initial state
    $text.addClass(cssClass);
    $trigger.show();

    // expand text on click
    $wrapper.on("click", ".text-content, .readMoreButton", function () {
      $text.removeClass(cssClass);
      $trigger.hide();
    });
  }
})();
/* End JS for preset "Read More Text" */


/**********************************************************
 * SECTION 3: Mobile nav / hamburger menu
 **********************************************************/
document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.navbar') || document.querySelector('header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('primary-nav');
  const closeBtn = document.querySelector('.menu-close');

  if (!toggle || !nav || !header) {
    // If your HTML doesn't have mobile nav elements, just don't run this part
    return;
  }

  function setNavHeightVar() {
    const h = header.offsetHeight || 72;
    document.documentElement.style.setProperty('--nav-h', h + 'px');
  }

  setNavHeightVar();
  window.addEventListener('resize', setNavHeightVar);

  function openMenu() {
    document.body.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
    setNavHeightVar();
  }

  function closeMenu() {
    document.body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  // Toggle button (hamburger)
  toggle.addEventListener('click', function () {
    const isOpen = document.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (isOpen) setNavHeightVar();
  });

  // Optional close button inside menu
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  // Close menu when a link is clicked
  nav.addEventListener('click', function (e) {
    if (e.target.matches('a')) {
      closeMenu();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });
});

/**********************************************************
 * SECTION 4: Whitepaper form → Google Sheet → show download
 **********************************************************/
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('wp-form');
  const nameInput = document.getElementById('wp-name');
  const emailInput = document.getElementById('wp-email');
  const botInput = document.getElementById('wp-company'); // honeypot
  const statusEl = document.getElementById('wp-status');
  const downloadWrapper = document.getElementById('wp-download-wrapper');

  // If whitepaper form isn't on this page, safely exit
  if (!form || !nameInput || !emailInput || !botInput || !statusEl || !downloadWrapper) {
    return;
  }

  const PDF_URL = "https://cdn1.site-media.eu/images/document/20239481/IONNeuroDesignWhitepaper-Y0d9XE3Dsi-ytpJ5xV2poQ.pdf";

form.addEventListener('submit', function (e) {
  const nameVal = nameInput.value.trim();
  const emailVal = emailInput.value.trim();
  const botVal = botInput.value.trim();

  // Stop bots
  if (botVal) {
    e.preventDefault();
    statusEl.textContent = "Thank you.";
    statusEl.style.color = "#475569";
    form.style.display = 'none';
    downloadWrapper.style.display = 'block';
    return;
  }

  // Validate name
  if (!nameVal) {
    e.preventDefault();
    statusEl.textContent = "Please enter your name.";
    statusEl.style.color = "#b91c1c";
    return;
  }

  // Validate email
  if (!emailVal || !/^\S+@\S+\.\S+$/.test(emailVal)) {
    e.preventDefault();
    statusEl.textContent = "Please enter a valid email.";
    statusEl.style.color = "#b91c1c";
    return;
  }

  // ✅ Allow POST to Google (don’t preventDefault)
  statusEl.textContent = "Success! Your download is ready.";
  statusEl.style.color = "#166534";

  // Hide form, reveal download button
  form.style.display = 'none';
  downloadWrapper.style.display = 'block';

  // ❌ Removed auto-download
  // window.open(PDF_URL, '_blank');
});

});
/**********************************************************
 * Caregivers Circle form → Google Sheet → show event link
 **********************************************************/
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('cc-form');
  const nameInput = document.getElementById('cc-name');
  const emailInput = document.getElementById('cc-email');
  const botInput = document.getElementById('cc-company'); // honeypot
  const statusEl = document.getElementById('cc-status');
  const linkWrapper = document.getElementById('cc-link-wrapper');

  // If section isn't on this page, safely exit
  if (!form || !nameInput || !emailInput || !botInput || !statusEl || !linkWrapper) {
    return;
  }

  form.addEventListener('submit', function (e) {
    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const botVal = botInput.value.trim();

    // Stop bots
    if (botVal) {
      e.preventDefault();
      statusEl.textContent = "Thank you.";
      statusEl.style.color = "#475569";
      form.style.display = 'none';
      linkWrapper.style.display = 'block';
      return;
    }

    // Validate name
    if (!nameVal) {
      e.preventDefault();
      statusEl.textContent = "Please enter your name.";
      statusEl.style.color = "#b91c1c";
      return;
    }

    // Validate email
    if (!emailVal || !/^\S+@\S+\.\S+$/.test(emailVal)) {
      e.preventDefault();
      statusEl.textContent = "Please enter a valid email.";
      statusEl.style.color = "#b91c1c";
      return;
    }

    // ✅ Allow POST to Google (don’t preventDefault)
    statusEl.textContent = "Success! Your event link is unlocked below.";
    statusEl.style.color = "#166534";

    // Hide form, reveal event link
    form.style.display = 'none';
    linkWrapper.style.display = 'block';
  });
  

});

/*
COPY/PASTE TARGET:
- Include this file once near the end of <body> after your carousel HTML markup.
- Optional but recommended before this script for inertial feel:
  <script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/bundled/lenis.min.js"></script>
- Then include this script file:
  <script src="/path/to/instagram-carousel-test.js"></script>
*/

(function () {
  const DEFAULT_AUTO_MS = 4500;
  const SLIDE_MS = 420;
  const LOOP_FADE_MS = 180;
  const LOOP_GREY = "rgba(148, 163, 184, 0.45)";
  const TRACK_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
  const ION_BAR_COLORS = ["#4080C0", "#70C090", "#FFC010", "#F05050"];

  function setupLenisOnce() {
    if (!window.Lenis || window.__ionLenisReady) return;

    const lenis = new window.Lenis({
      duration: 1.1,
      easing: function (t) {
        return 1 - Math.pow(1 - t, 4);
      },
      smoothWheel: true,
      syncTouch: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.05
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    window.__ionLenisReady = true;
  }

  function initIonCarousel(carousel) {
    if (!carousel || carousel.dataset.ionCarouselReady === "true") return;

    const track = carousel.querySelector(".ion-carousel__track");
    const viewport = carousel.querySelector(".ion-carousel__viewport");
    const prev = carousel.querySelector("[data-carousel-prev]");
    const next = carousel.querySelector("[data-carousel-next]");
    const dotsWrap = carousel.querySelector("[data-carousel-dots]");
    const progress = carousel.querySelector(".ion-carousel__progress");
    const positionFill = carousel.querySelector(".ion-carousel__position-fill");

    if (!track || !viewport || !prev || !next || !dotsWrap || !progress || !positionFill) return;

    const slides = Array.from(track.querySelectorAll(":scope > .ion-carousel__slide"));
    const count = slides.length;
    if (count === 0) return;

    const autoMsAttr = Number(carousel.dataset.autoMs);
    const AUTO_MS = Number.isFinite(autoMsAttr) && autoMsAttr > 0 ? autoMsAttr : DEFAULT_AUTO_MS;

    carousel.style.setProperty("--ion-count", String(count));
    carousel.dataset.ionCarouselReady = "true";

    progress.innerHTML = "";
    dotsWrap.innerHTML = "";

    const dots = [];
    const barFills = [];

    for (let i = 0; i < count; i++) {
      const dot = document.createElement("button");
      dot.className = "ion-carousel__dot";
      dot.type = "button";
      dot.setAttribute("aria-label", "Go to slide " + (i + 1));
      dotsWrap.appendChild(dot);
      dots.push(dot);

      const bar = document.createElement("div");
      bar.className = "ion-carousel__bar";

      const fill = document.createElement("span");
      fill.className = "ion-carousel__bar-fill";
      fill.style.backgroundColor = ION_BAR_COLORS[i % ION_BAR_COLORS.length];
      fill.style.setProperty("display", "block", "important");
      fill.style.setProperty("height", "100%", "important");

      bar.appendChild(fill);
      progress.appendChild(bar);
      barFills.push(fill);
    }

    if (count === 1) {
      dots[0].classList.add("is-active");
      setFillWidth(barFills[0], 100);
      positionFill.style.width = "100%";
      prev.disabled = true;
      next.disabled = true;
      return;
    }

    let index = 0;
    let timer = null;
    let progressTicker = null;
    let loopResetTimer = null;
    let isLoopResetting = false;

    function setFillWidth(fill, pct) {
      fill.style.setProperty("width", pct + "%", "important");
      fill.style.setProperty("transform", "none", "important");
    }

    function slideWidth() {
      return viewport.clientWidth;
    }

    function render(animate) {
      track.style.transition = animate ? "transform " + SLIDE_MS + "ms " + TRACK_EASE : "none";
      track.style.transform = "translate3d(" + (-slideWidth() * index) + "px,0,0)";
    }

    function updateDots() {
      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === index);
      });
    }

    function updatePosition(animate) {
      positionFill.style.transition = animate ? "width 240ms linear" : "none";
      positionFill.style.width = ((index + 1) / count) * 100 + "%";
    }

    function clearProgressTicker() {
      if (!progressTicker) return;
      window.clearInterval(progressTicker);
      progressTicker = null;
    }

    function animateCurrentBar() {
      const current = barFills[index];
      if (!current) return;

      current.style.transition = "none";
      setFillWidth(current, 0);

      const startedAt = Date.now();
      function tick() {
        const elapsed = Date.now() - startedAt;
        const pct = Math.max(0, Math.min(1, elapsed / AUTO_MS));
        setFillWidth(current, pct * 100);
        if (pct >= 1) {
          clearProgressTicker();
          progressTicker = null;
          return;
        }
      }

      clearProgressTicker();
      tick();
      progressTicker = window.setInterval(tick, 40);
    }

    function updateBars() {
      barFills.forEach(function (fill, i) {
        fill.style.transition = "none";
        fill.style.backgroundColor = ION_BAR_COLORS[i % ION_BAR_COLORS.length];

        if (i < index) {
          setFillWidth(fill, 100);
        } else {
          setFillWidth(fill, 0);
        }
      });

      animateCurrentBar();
    }

    function updateUI(animatePosition) {
      updateDots();
      updatePosition(animatePosition);
      updateBars();
    }

    function startAuto() {
      if (timer) return;
      timer = window.setTimeout(nextSlide, AUTO_MS);
    }

    function stopAuto() {
      if (timer) {
        window.clearTimeout(timer);
        timer = null;
      }
      clearProgressTicker();
    }

    function restartAuto() {
      if (timer) {
        window.clearTimeout(timer);
        timer = null;
      }
      startAuto();
    }

    function clearLoopResetTimer() {
      if (!loopResetTimer) return;
      window.clearTimeout(loopResetTimer);
      loopResetTimer = null;
    }

    function runLoopReset() {
      isLoopResetting = true;
      stopAuto();

      barFills.forEach(function (fill) {
        fill.style.transition = "none";
        setFillWidth(fill, 100);
      });

      positionFill.style.transition = "none";
      positionFill.style.width = "100%";

      barFills.forEach(function (fill) {
        fill.style.transition = "background-color " + LOOP_FADE_MS + "ms linear";
        fill.style.backgroundColor = LOOP_GREY;
      });

      loopResetTimer = window.setTimeout(function () {
        index = 0;
        render(false);

        barFills.forEach(function (fill, i) {
          fill.style.transition = "none";
          setFillWidth(fill, 0);
          fill.style.backgroundColor = ION_BAR_COLORS[i % ION_BAR_COLORS.length];
        });

        positionFill.style.transition = "none";
        positionFill.style.width = "0%";

        updateUI(false);
        isLoopResetting = false;
        startAuto();
      }, LOOP_FADE_MS + 20);
    }

    function nextSlide() {
      if (isLoopResetting) return;

      if (index === count - 1) {
        runLoopReset();
        return;
      }

      index += 1;
      render(true);
      updateUI(true);
      restartAuto();
    }

    function prevSlide() {
      if (isLoopResetting) return;

      if (index === 0) {
        index = count - 1;
        render(false);
        updateUI(false);
        restartAuto();
        return;
      }

      index -= 1;
      render(true);
      updateUI(true);
      restartAuto();
    }

    next.addEventListener("click", nextSlide);
    prev.addEventListener("click", prevSlide);

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        if (isLoopResetting || i === index) return;
        index = i;
        render(true);
        updateUI(true);
        restartAuto();
      });
    });

    viewport.addEventListener("mouseenter", stopAuto);
    viewport.addEventListener("mouseleave", function () {
      updateBars();
      startAuto();
    });

    window.addEventListener("resize", function () {
      render(false);
    });

    render(false);
    updateUI(false);
    clearLoopResetTimer();
    startAuto();
  }

  function initIonCarousels() {
    setupLenisOnce();
    const carousels = document.querySelectorAll("[data-ion-carousel]");
    carousels.forEach(initIonCarousel);
  }

  window.initIonCarousels = initIonCarousels;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initIonCarousels);
  } else {
    initIonCarousels();
  }
})();