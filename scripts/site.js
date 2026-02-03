(() => {
    const header = document.querySelector('.header');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    let lastScrollY = window.scrollY;
    let ticking = false;

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('is-open');
            navToggle.classList.toggle('is-open', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    }

    if (header) {
        const onScroll = () => {
            const currentY = window.scrollY;
            const isScrollingDown = currentY > lastScrollY;

            if (currentY > 80 && isScrollingDown) {
                header.classList.add('is-hidden');
            } else {
                header.classList.remove('is-hidden');
            }

            lastScrollY = currentY;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(onScroll);
                ticking = true;
            }
        }, { passive: true });
    }

    const chatbotButton = document.querySelector('.chatbot-button');
    const chatbotPanel = document.querySelector('.chatbot-panel');

    if (chatbotButton && chatbotPanel) {
        const chatbotClose = chatbotPanel.querySelector('.chatbot-close');
        const chatbotForm = chatbotPanel.querySelector('.chatbot-form');
        const chatbotInput = chatbotPanel.querySelector('.chatbot-input');
        const chatbotMessages = chatbotPanel.querySelector('.chatbot-messages');
        const faqButtons = chatbotPanel.querySelectorAll('[data-faq]');

        const responses = [
            {
                keywords: ['join', 'apply', 'signup', 'sign up'],
                text: 'You can join by contacting us via the Contact page or clicking “Join the program.” We’ll guide you through the next steps.'
            },
            {
                keywords: ['who can', 'eligible', 'eligibility', 'requirements'],
                text: 'We welcome health science students and early-career health professionals across Africa who want mentorship and growth.'
            },
            {
                keywords: ['fee', 'cost', 'price', 'pay'],
                text: 'MedXMentor is community-focused. Most cohorts are fully sponsored—reach out for the latest cohort details.'
            },
            {
                keywords: ['how long', 'duration', 'length'],
                text: 'Cohorts typically run for several months with structured check-ins and activities throughout.'
            },
            {
                keywords: ['mentor', 'matching', 'match'],
                text: 'Mentor matching is based on your goals, interests, and growth areas to ensure a supportive fit.'
            },
            {
                keywords: ['contact', 'email', 'phone'],
                text: 'You can reach us at info@medxmentor.org or +256 788 340086.'
            }
        ];

        const addMessage = (text, type) => {
            if (!chatbotMessages) return;
            const message = document.createElement('div');
            message.className = `chatbot-message ${type}`;
            message.textContent = text;
            chatbotMessages.appendChild(message);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        };

        const getResponse = (input) => {
            const normalized = input.toLowerCase();
            const match = responses.find(rule =>
                rule.keywords.some(keyword => normalized.includes(keyword))
            );
            return match ? match.text : 'Thanks for your question! Please share a bit more detail, or contact us directly for a precise answer.';
        };

        const handleQuestion = (question) => {
            addMessage(question, 'user');
            const reply = getResponse(question);
            setTimeout(() => addMessage(reply, 'bot'), 150);
        };

        chatbotButton.addEventListener('click', () => {
            chatbotPanel.classList.add('is-open');
            chatbotInput?.focus();
        });

        chatbotClose?.addEventListener('click', () => {
            chatbotPanel.classList.remove('is-open');
        });

        chatbotForm?.addEventListener('submit', (event) => {
            event.preventDefault();
            const value = chatbotInput?.value.trim();
            if (!value) return;
            handleQuestion(value);
            chatbotInput.value = '';
        });

        faqButtons.forEach(button => {
            button.addEventListener('click', () => {
                const question = button.getAttribute('data-faq');
                if (question) {
                    handleQuestion(question);
                }
            });
        });
    }
})();
