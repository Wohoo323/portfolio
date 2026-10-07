// Odotetaan, että sivun HTML on latautunut kokonaan ennen JavaScriptin suorittamista
document.addEventListener("DOMContentLoaded", function () {

    /* ========================================
       ABOUT ME -OSION ANIMAATIO
    ======================================== */

    // Haetaan sivulta ensimmäinen about-card eli About Me -osio
    const aboutCard = document.querySelector(
        ".about-section .about-card:first-child"
    );

    // Jatketaan vain, jos About Me -osio löytyy sivulta
    if (aboutCard) {

        // Haetaan About Me -osion tekstikappaleet.
        // open-to-teksti jätetään tämän ulkopuolelle.
        const aboutParagraphs = aboutCard.querySelectorAll(
            ":scope > p:not(.open-to)"
        );

        // Haetaan "Open to internships..." -teksti
        const openTo = aboutCard.querySelector(".open-to");

        // Tänne tallennetaan tekstien alkuperäinen sisältö
        const originalTexts = [];

        // Käydään kaikki About Me -tekstikappaleet läpi
        aboutParagraphs.forEach(function (paragraph) {

            // Tallennetaan alkuperäinen teksti myöhempää kirjoitusanimaatiota varten
            originalTexts.push(
                paragraph.textContent.trim()
            );

            // Tyhjennetään teksti aluksi näkyvistä
            paragraph.innerHTML = "&nbsp;";

            // Lisätään CSS-luokka kirjoitusanimaatiota varten
            paragraph.classList.add("typing-paragraph");
        });

        // Estää animaation käynnistymisen useita kertoja
        let animationStarted = false;


        // Funktio käynnistää tekstin kirjoittamisen sana kerrallaan
        function typeWords() {

            // Lopetetaan, jos animaatio on jo käynnistetty
            if (animationStarted) return;

            animationStarted = true;

            // Aloitetaan ensimmäisestä tekstikappaleesta
            let paragraphIndex = 0;


            // Kirjoittaa yhden tekstikappaleen kerrallaan
            function typeParagraph() {

                // Kun kaikki kappaleet on kirjoitettu
                if (paragraphIndex >= aboutParagraphs.length) {

                    // Näytetään lopuksi Open to internships -teksti
                    if (openTo) {

                        setTimeout(function () {
                            openTo.classList.add("is-visible");
                        }, 350);

                    }

                    return;
                }


                // Haetaan tällä hetkellä kirjoitettava kappale
                const paragraph =
                    aboutParagraphs[paragraphIndex];

                // Jaetaan kappale yksittäisiksi sanoiksi
                const words =
                    originalTexts[paragraphIndex].split(" ");

                // Tyhjennetään kappale ennen kirjoittamisen aloittamista
                paragraph.textContent = "";

                // Aloitetaan ensimmäisestä sanasta
                let wordIndex = 0;


                // Lisätään uusi sana 110 millisekunnin välein
                const typingInterval = setInterval(function () {

                    if (wordIndex < words.length) {

                        // Lisätään seuraava sana näkyviin
                        paragraph.textContent +=
                            (wordIndex === 0 ? "" : " ") +
                            words[wordIndex];

                        wordIndex++;

                    } else {

                        // Lopetetaan tämän kappaleen kirjoittaminen
                        clearInterval(typingInterval);

                        // Siirrytään seuraavaan kappaleeseen
                        paragraphIndex++;

                        // Pieni tauko ennen seuraavaa kappaletta
                        setTimeout(
                            typeParagraph,
                            400
                        );
                    }

                }, 110);
            }


            // Käynnistetään ensimmäisen kappaleen kirjoittaminen
            typeParagraph();
        }


        // Tarkkaillaan, milloin About Me -osio tulee näkyviin ruudulle
        const aboutObserver = new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(function (entry) {

                    // Kun About Me tulee tarpeeksi näkyviin
                    if (entry.isIntersecting) {

                        // Käynnistetään otsikon CSS-animaatio
                        aboutCard.classList.add(
                            "about-started"
                        );

                        // Aloitetaan tekstin kirjoittaminen pienen viiveen jälkeen
                        setTimeout(function () {
                            typeWords();
                        }, 500);

                        // Lopetetaan tarkkailu, koska animaatio suoritetaan vain kerran
                        observer.unobserve(
                            entry.target
                        );
                    }

                });

            },

            {
                // Animaatio käynnistyy, kun noin 45 % osiosta on näkyvissä
                threshold: 0.45
            }
        );


        // Aloitetaan About Me -osion tarkkailu
        aboutObserver.observe(aboutCard);
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