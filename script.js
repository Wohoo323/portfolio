// Odotetaan, että sivun HTML on latautunut kokonaan ennen JavaScriptin suorittamista
document.addEventListener("DOMContentLoaded", function () {
        /* ========================================
       ABOUT ME -OSION ANIMAATIO
    ======================================== */
    const aboutCard = document.querySelector(
        ".about-section .about-card:first-child"
    );

    if (aboutCard) {
        const aboutParagraphs = aboutCard.querySelectorAll(
            ":scope > p:not(.open-to)"
        );
        const openTo = aboutCard.querySelector(".open-to");
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        const paragraphDuration = 900;
        const paragraphDelay = 750;

        // Kappaleiden sisältö ja tila säilyvät myös ennen animaatiota.
        aboutParagraphs.forEach(function (paragraph) {
            paragraph.classList.add("typing-paragraph");
            paragraph.style.opacity = reduceMotion ? "1" : "0";
        });
        let animationStarted = false;

        function revealParagraphs() {
            if (animationStarted) return;
            animationStarted = true;
            aboutCard.classList.add("about-started");

            aboutParagraphs.forEach(function (paragraph, index) {
                if (reduceMotion || typeof paragraph.animate !== "function") {
                    paragraph.style.opacity = "1";
                    return;
                }

                setTimeout(function () {
                    paragraph.style.opacity = "1";
                    paragraph.animate(
                        [
                            { opacity: 0, transform: "translateY(12px)" },
                            { opacity: 1, transform: "translateY(0)" }
                        ],
                        {
                            duration: paragraphDuration,
                            easing: "cubic-bezier(0.22, 1, 0.36, 1)"
                        }
                    );
                }, 350 + index * paragraphDelay);
            });

            if (openTo) {
                const delay = reduceMotion ? 0
                    : 350 + Math.max(0, aboutParagraphs.length - 1) * paragraphDelay
                        + paragraphDuration;
                setTimeout(function () {
                    openTo.classList.add("is-visible");
                }, delay);
            }
        }

        if (reduceMotion) {
            revealParagraphs();
        } else {
            let aboutInView = typeof IntersectionObserver !== "function";
            let aboutObserver = null;

            // Sama 250 px scrollausraja kuin Education-osiossa.
            function checkAboutScroll() {
                if (window.scrollY < 250 || !aboutInView) return;
                revealParagraphs();
                window.removeEventListener("scroll", checkAboutScroll);
                if (aboutObserver) aboutObserver.disconnect();
            }

            if (typeof IntersectionObserver === "function") {
                aboutObserver = new IntersectionObserver(
                    function (entries) {
                        entries.forEach(function (entry) {
                            aboutInView = entry.isIntersecting;
                        });
                        checkAboutScroll();
                    },
                    { threshold: 0.20 }
                );
                aboutObserver.observe(aboutCard);
            }

            window.addEventListener("scroll", checkAboutScroll, { passive: true });
            checkAboutScroll();
        }
    }
    /* ========================================
       EDUCATION-OSION ANIMAATIO
    ======================================== */
    // Haetaan About-osion toinen sarake, jossa Education sijaitsee
    const educationColumn = document.querySelector(
        ".about-section .about-card:nth-child(2)"
    );
    // Haetaan Education-osion otsikko
    const educationTitle = educationColumn
        ? educationColumn.querySelector(
            ":scope > .wp-block-group:first-child"
        )
        : null;
    // Haetaan varsinainen Education-kortti
    const educationCard = educationColumn
        ? educationColumn.querySelector(".edu-card")
        : null;
    // Jatketaan vain, jos Education-osio löytyy
    if (educationColumn && educationCard) {
        // Estää animaation näyttämisen useita kertoja
        let educationShown = false;
        // Tarkistetaan käyttäjän scrollauksen määrä
        function checkEducationScroll() {
            // Lopetetaan, jos Education on jo näytetty
            if (educationShown) {
                return;
            }
            // Education näytetään vasta, kun sivua on scrollattu vähintään 250 px
            if (window.scrollY >= 250) {
                educationShown = true;
                // Näytetään ensin Education-otsikko
                if (educationTitle) {
                    educationTitle.classList.add(
                        "is-visible"
                    );
                }
                // Näytetään Education-kortti 300 ms otsikon jälkeen
                setTimeout(function () {
                    educationCard.classList.add(
                        "is-visible"
                    );
                }, 300);
                // Poistetaan scroll-kuuntelija, koska animaatiota ei tarvitse suorittaa uudelleen
                window.removeEventListener(
                    "scroll",
                    checkEducationScroll
                );
            }
        }
        // Kuunnellaan käyttäjän scrollausta
        window.addEventListener(
            "scroll",
            checkEducationScroll,
            { passive: true }
        );
    }
    /* ========================================
       TECHNOLOGIES-OSION ANIMAATIO
    ======================================== */
    // Haetaan Technologies-osio
    const technologies = document.querySelector(
        ".about-section .skills-block"
    );
    // Jatketaan vain, jos Technologies-osio löytyy
    if (technologies) {
        // Tarkkaillaan, milloin Technologies tulee näkyviin ruudulle
        const technologyObserver =
            new IntersectionObserver(
                function (entries, observer) {
                    entries.forEach(function (entry) {
                        // Kun Technologies tulee näkyviin
                        if (entry.isIntersecting) {
                            // Lisätään CSS-luokka, joka näyttää osion animaatiolla
                            entry.target.classList.add(
                                "is-visible"
                            );
                            // Lopetetaan tarkkailu animaation jälkeen
                            observer.unobserve(
                                entry.target
                            );
                        }
                    });
                },
                {
                    // Kuinka paljon osiosta pitää olla näkyvissä
                    threshold: 0.20,
                    // Siirretään animaation käynnistymiskohtaa hieman
                    rootMargin: "0px 0px -80px 0px"
                }
            );
        // Aloitetaan Technologies-osion tarkkailu
        technologyObserver.observe(
            technologies
        );
    }
    /* ========================================
       PROJECT CARDS -ANIMAATIOT
    ======================================== */
    // Haetaan projektikorttien ympärillä oleva grid
    const projectGrid = document.querySelector(
        ".project-grid"
    );
    // Haetaan kaikki projektikortit
    const projectCards = document.querySelectorAll(
        ".project-card"
    );
    // Lisätään jokaiselle kortille CSS-luokka,
    // joka pitää kortin aluksi piilossa animaatiota varten
    projectCards.forEach(function (card) {
        card.classList.add(
            "project-reveal"
        );
    });
    // Jatketaan vain, jos projektialue ja vähintään yksi kortti löytyvät
    if (projectGrid && projectCards.length > 0) {
        // Tarkkaillaan koko projektialuetta yksittäisten korttien sijaan
        const projectObserver =
            new IntersectionObserver(
                function (entries, observer) {
                    entries.forEach(function (entry) {
                        // Kun projektialue tulee näkyviin
                        if (entry.isIntersecting) {
                            // Käydään projektikortit läpi yksi kerrallaan
                            projectCards.forEach(
                                function (card, index) {
                                    // Näytetään kortit 300 ms välein
                                    setTimeout(function () {
                                        card.classList.add(
                                            "is-visible"
                                        );
                                    }, index * 300);
                                }
                            );
                            // Lopetetaan tarkkailu, jotta animaatio tapahtuu vain kerran
                            observer.unobserve(
                                entry.target
                            );
                        }
                    });
                },
                {
                    // Animaatio alkaa, kun noin 15 % projektialueesta näkyy
                    threshold: 0.15,
                    // Hieman siirretty animaation käynnistymiskohta
                    rootMargin: "0px 0px -60px 0px"
                }
            );
        // Aloitetaan koko projektialueen tarkkailu
        projectObserver.observe(
            projectGrid
        );
    }
});