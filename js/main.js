// AvePOS - JavaScript Moderne pour Plateforme Fintech
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');

    // Menu hamburger moderne
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Fermer le menu en cliquant sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // Header scrolled effect avec parallax
    if (header) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            if (scrolled > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Active nav link avec animation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // FAQ Accordion moderne
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Fermer tous les autres items avec animation
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle l'item actuel
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Smooth scroll pour les liens internes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation des cartes au scroll avec Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    document.querySelectorAll('.card, .stat-item, .contact-item, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Validation du formulaire de contact moderne
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des données du formulaire
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Validation basique avec feedback visuel
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    isValid = false;
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValidEmail(email) && email) {
                contactForm.querySelector('#email').classList.add('error');
                isValid = false;
            }
            
            if (!isValid) {
                showNotification('Veuillez remplir tous les champs obligatoires correctement.', 'error');
                return;
            }
            
            // Simulation d'envoi avec loading
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            // Simuler un délai d'envoi
            setTimeout(() => {
                // Création du lien mailto
                const mailtoLink = `mailto:contact@avepos.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
                    `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
                )}`;
                
                // Ouvrir le client email
                window.location.href = mailtoLink;
                
                // Afficher un message de confirmation
                showNotification('Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.', 'success');
                
                // Réinitialiser le formulaire
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Fonction de validation email améliorée
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Système de notification moderne
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <svg class="notification-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    ${type === 'success' ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/>' : 
                      type === 'error' ? '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>' :
                      '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>'}
                </svg>
                <span>${message}</span>
            </div>
        `;
        
        // Styles de base pour la notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            max-width: 400px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            backdrop-filter: blur(10px);
        `;
        
        // Couleurs selon le type
        if (type === 'success') {
            notification.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
        } else if (type === 'error') {
            notification.style.background = 'linear-gradient(135deg, #ef4444, #f87171)';
        } else {
            notification.style.background = 'linear-gradient(135deg, #3b82f6, #60a5fa)';
        }
        
        document.body.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Suppression automatique
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    // Compteur animé pour les statistiques (uniquement si valeur purement numérique)
    const statNumbers = document.querySelectorAll('.stat-item h3');
    statNumbers.forEach(stat => {
        const originalText = stat.textContent.trim();
        const numericOnly = /^\d+$/.test(originalText);
        if (numericOnly) {
            const targetValue = parseInt(originalText, 10);
            if (targetValue > 0) {
                animateCounter(stat, targetValue);
            }
        }
        // Laisser tel quel les valeurs non purement numériques (ex: "10M+", "24/7")
    });

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50; // 50 étapes d'animation
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = formatNumber(target);
                clearInterval(timer);
            } else {
                element.textContent = formatNumber(Math.floor(current));
            }
        }, 50);
    }

    function formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K+';
        }
        return num.toString();
    }

    // Effet de parallax subtil pour le hero
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Animation des cartes au hover
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Lazy loading pour les images (si ajoutées plus tard)
    if ('IntersectionObserver' in window) {
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

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Fonctions utilitaires globales pour AvePOS
window.AvePOS = {
    // Ouvrir WhatsApp avec message pré-rempli
    openWhatsApp: function(number, message = '') {
        const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    },
    
    // Appeler un numéro
    callNumber: function(number) {
        window.location.href = `tel:${number}`;
    },
    
    // Envoyer un email
    sendEmail: function(email, subject = '', body = '') {
        const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoUrl;
    },
    
    // Partager sur les réseaux sociaux
    shareOnSocial: function(platform, url = window.location.href, text = '') {
        let shareUrl = '';
        
        switch(platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                break;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    },

    // Scroll smooth vers une section
    scrollToSection: function(sectionId) {
        const section = document.querySelector(sectionId);
        if (section) {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
            const targetPosition = section.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    },

    // Toggle FAQ item
    toggleFAQ: function(itemId) {
        const item = document.querySelector(itemId);
        if (item) {
            const isActive = item.classList.contains('active');
            
            // Fermer tous les autres
            document.querySelectorAll('.faq-item').forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Ouvrir l'item sélectionné
            if (!isActive) {
                item.classList.add('active');
            }
        }
    }
};