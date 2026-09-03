/* =========================================================
   IBRAHIM MOHAMED - PROFESSIONAL PORTFOLIO JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= HEADER ================= */

    const header = document.getElementById("header");

    const handleHeader = () => {
        if (window.scrollY > 60) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", handleHeader, { passive: true });
    handleHeader();


    /* ================= SCROLL REVEAL ================= */

    const revealElements = document.querySelectorAll(
        ".card, .project-card, .title, .main > div"
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);

                }

            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* ================= ACTIVE NAVIGATION ================= */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav a");

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    navLinks.forEach((link) => {
                        link.classList.remove("active");
                    });

                    const activeLink = document.querySelector(
                        `.nav a[href="#${entry.target.id}"]`
                    );

                    if (activeLink) {
                        activeLink.classList.add("active");
                    }

                }

            });

        },
        {
            threshold: 0.35
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });


    /* ================= SMOOTH NAVIGATION ================= */

    navLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight = header.offsetHeight;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* ================= TYPING EFFECT ================= */

    const profession = document.querySelector(".main h2 span");

    if (profession) {

        const text = profession.textContent.trim();

        profession.textContent = "";

        let index = 0;

        const typingSpeed = 70;

        function typeText() {

            if (index < text.length) {

                profession.textContent += text.charAt(index);

                index++;

                setTimeout(typeText, typingSpeed);

            }

        }

        setTimeout(typeText, 500);
    }


    /* ================= PROJECT CARD HOVER GLOW ================= */

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);

        });

    });


    /* ================= 3D CARD EFFECT ================= */

    projectCards.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            if (window.innerWidth <= 768) return;

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -3;
            const rotateY = ((x - centerX) / centerX) * 3;

            card.style.transform = `
                translateY(-8px)
                scale(1.02)
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
            `;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /* ================= BACK TO TOP BUTTON ================= */

    const backToTop = document.createElement("button");

    backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';

    backToTop.setAttribute("aria-label", "Back to top");

    backToTop.id = "backToTop";

    document.body.appendChild(backToTop);


    const updateBackToTop = () => {

        if (window.scrollY > 500) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    };

    window.addEventListener("scroll", updateBackToTop, {
        passive: true
    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* ================= EXTERNAL LINKS SECURITY ================= */

    document.querySelectorAll('a[target="_blank"]').forEach((link) => {

        link.setAttribute("rel", "noopener noreferrer");

    });


    /* ================= IMAGE LAZY LOADING ================= */

    document.querySelectorAll("img").forEach((image) => {

        if (!image.hasAttribute("loading")) {
            image.setAttribute("loading", "lazy");
        }

    });


    /* ================= HERO PARALLAX ================= */

    const hero = document.querySelector(".main");

    if (hero && window.innerWidth > 768) {

        window.addEventListener(
            "scroll",
            () => {

                const scrollPosition = window.scrollY;

                if (scrollPosition < window.innerHeight) {

                    hero.style.backgroundPositionY =
                        `${scrollPosition * 0.25}px`;

                }

            },
            { passive: true }
        );

    }


    /* ================= CURRENT YEAR ================= */

    const footerTitle = document.querySelector(".footer-titel");

    if (footerTitle) {

        const currentYear = new Date().getFullYear();

        footerTitle.innerHTML =
            `Copyright © ${currentYear} <span>Ibrahim Mohamed</span>`;

    }


    /* ================= PAGE LOADED ================= */

    document.body.classList.add("page-loaded");

});
