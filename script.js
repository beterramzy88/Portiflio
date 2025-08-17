// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section');
const navLinksList = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinksList.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// Animated counters for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = parseInt(counter.innerText);
        const increment = target / 100;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounters(), 20);
        } else {
            counter.innerText = target;
        }
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Trigger counter animation for about section
            if (entry.target.id === 'about') {
                animateCounters();
            }
            
            // Trigger skill bar animations
            if (entry.target.id === 'skills') {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Skill bar animations
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.float-element');
    
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-float');
        const yPos = -(scrolled * speed * 0.1);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success-color)' : 'var(--error-color)'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Project card hover effects
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        // Set initial opacity to 0 for smooth loading effect
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-out';
    });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation on page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.name');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 1000);
    }
});

// Scroll reveal animations
const scrollRevealElements = document.querySelectorAll('.timeline-item, .project-card, .skill-item, .cert-item');
scrollRevealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'all 0.6s ease-out';
});

const scrollRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

scrollRevealElements.forEach(element => {
    scrollRevealObserver.observe(element);
});

// Add smooth hover transitions for all interactive elements
const interactiveElements = document.querySelectorAll('button, .btn, .social-link, .project-link, .nav-link');
interactiveElements.forEach(element => {
    element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
});

// Dynamic background particles (optional enhancement)
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(37, 99, 235, 0.1);
        border-radius: 50%;
        animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 2}s;
    `;
    
    container.appendChild(particle);
}

// Initialize particles on load (uncomment to enable)
// window.addEventListener('load', createParticles);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(updateActiveNavLink, 100));

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add focus styles for better accessibility
const style = document.createElement('style');
style.textContent = `
    .btn:focus,
    .nav-link:focus,
    .social-link:focus,
    input:focus,
    textarea:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);

console.log('Portfolio website loaded successfully! 🚀');





// Project Viewer Modal
(function () {
  const viewer    = document.getElementById('projectViewer');
  const vImg      = document.getElementById('viewerImg');
  const vTitle    = document.getElementById('viewerTitle');
  const vDesc     = document.getElementById('viewerDesc');
  const vTags     = document.getElementById('viewerTags');
  const btnMain   = document.getElementById('viewerPrimary');   // لو عندك زر أساسي
  const btnGit    = document.getElementById('viewerGithub');    // << مهم: نفس الـID بالضبط
  const btnClose  = document.getElementById('viewerClose');
  const grid      = document.getElementById('projectsGrid');
// Project Viewer Modal
document.addEventListener("DOMContentLoaded", () => {
  const viewer     = document.getElementById("projectViewer");
  const viewerImg  = document.getElementById("viewerImg");
  const viewerTitle= document.getElementById("viewerTitle");
  const viewerDesc = document.getElementById("viewerDesc");
  const viewerTags = document.getElementById("viewerTags");
  const btnGit     = document.getElementById("viewerGitHub");
  const btnClose   = document.getElementById("viewerClose");

  if (!viewer || !btnGit || !btnClose) return;

  function openModal(card) {
    const imgEl   = card.querySelector("img");
    const titleEl = card.querySelector("h3");
    const descEl  = card.querySelector("p");

    // تعبئة البيانات
    viewerImg.src = imgEl ? imgEl.src : "";
    viewerImg.alt = imgEl ? (imgEl.alt || "") : "";
    viewerTitle.textContent = titleEl ? titleEl.textContent.trim() : "";
    viewerDesc.textContent  = descEl ? descEl.textContent.trim() : "";

    // التاجز
    viewerTags.innerHTML = "";
    card.querySelectorAll(".project-tags .tag").forEach(tag => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = tag.textContent.trim();
      viewerTags.appendChild(span);
    });

    // لينك الجيتهاب (من data-github أو من أي لينك فيه github)
    let githubHref = (card.getAttribute("data-github") || "").trim();
    if (!githubHref) {
      const ghA = Array.from(card.querySelectorAll(".project-links a"))
        .find(a => (a.getAttribute("href") || "").toLowerCase().includes("github"));
      if (ghA) githubHref = ghA.getAttribute("href");
    }

    if (githubHref) {
      btnGit.setAttribute("href", githubHref);
      btnGit.setAttribute("target", "_blank");
      btnGit.setAttribute("rel", "noopener");
      btnGit.style.opacity = "1";
      btnGit.style.pointerEvents = "auto";
      btnGit.removeAttribute("aria-disabled");
    } else {
      btnGit.setAttribute("href", "#");
      btnGit.setAttribute("aria-disabled", "true");
      btnGit.style.opacity = ".55";
      btnGit.style.pointerEvents = "none";
    }

    // افتح المودال
    viewer.classList.add("active");
    document.body.classList.add("noscroll");
  }

  function closeModal() {
    viewer.classList.remove("active");
    document.body.classList.remove("noscroll");
    viewerImg.src = "";
  }

  // اربط الكروت بالمودال (واترك الروابط الداخلية تشتغل)
  document.querySelectorAll(".project-card").forEach(card => {
    card.style.cursor = "pointer";
    card.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      openModal(card);
    });
  });

  // إغلاق
  btnClose.addEventListener("click", closeModal);
  viewer.addEventListener("click", (e) => { if (e.target === viewer) closeModal(); });
  window.addEventListener("keydown", (e) => { if (e.key === "Escape" && viewer.classList.contains("active")) closeModal(); });
});



// Add loading animation for images  (fixed for cached images)
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    // ستايل البداية
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease-out';

    const reveal = () => { img.style.opacity = '1'; };

    // لو الصورة already loaded من الكاش
    if (img.complete && img.naturalWidth !== 0) {
      reveal();
    } else {
      // إظهرها أول ما تخلص تحميل أو حتى لو فشل التحميل
      img.addEventListener('load', reveal, { once: true });
      img.addEventListener('error', reveal, { once: true });
    }
  });
});




  function closeModal(){
    viewer.classList.remove('active');
    document.body.classList.remove('noscroll');
    vImg.src = '';
  }

  // افتح المودال عند الضغط على الكارت (مع السماح بالروابط الداخلية)
  grid.querySelectorAll('.project-card').forEach(card=>{
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e)=>{
      if (e.target.closest('a')) return; // سيب اللينكات تشتغل عادي
      openModal(card);
    });
  });

  // اغلاق
  btnClose.addEventListener('click', closeModal);
  viewer.addEventListener('click', (e)=>{ if (e.target === viewer) closeModal(); });
  window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && viewer.classList.contains('active')) closeModal(); });
})();

