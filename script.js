/* ============================================================
   DANCE DIVISION
   SCRIPT.JS
   ============================================================ */


/* ============================================================
   LOADER
   ============================================================ */

(function initLoader() {

    const loader = document.getElementById("loader");
    const percent = document.getElementById("loaderPercent");
    const progress = document.getElementById("loaderProgress");

    if (!loader) return;

    let value = 0;

    const interval = setInterval(() => {

        value += Math.floor(Math.random() * 8) + 3;

        if (value >= 100) {
            value = 100;
            clearInterval(interval);

            setTimeout(() => {
                loader.classList.add("loaded");
            }, 250);
        }

        percent.textContent =
            String(value).padStart(2, "0");

        progress.style.width = `${value}%`;

    }, 45);

})();


/* ============================================================
   NAVIGATION
   ============================================================ */

(function initNavigation() {

    const links =
        document.querySelectorAll(".nav-links a");

    const headerTitle =
        document.querySelector(".header-title");

    function scrollToTarget(target) {

        const element =
            document.getElementById(target);

        if (!element) return;

        element.scrollIntoView({
            behavior: "smooth"
        });

    }


    links.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const target =
                link.dataset.target;

            scrollToTarget(target);

        });

    });


    if (headerTitle) {

        headerTitle.addEventListener("click", event => {

            event.preventDefault();

            scrollToTarget("opening");

        });

    }

})();


/* ============================================================
   CHAPTER OBSERVER
   ============================================================ */

(function initChapterObserver() {

    const chapters =
        document.querySelectorAll(".chapter");

    const links =
        document.querySelectorAll(".nav-links a");

    const current =
        document.getElementById("chapterCurrent");

    const progress =
        document.getElementById("chapterProgress");


    if (!chapters.length) return;


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const chapter =
                        entry.target;

                    const number =
                        chapter.dataset.chapter;

                    if (current) {
                        current.textContent =
                            number;
                    }


                    const target =
                        chapter.id;

                    links.forEach(link => {

                        link.classList.toggle(
                            "active",
                            link.dataset.target === target
                        );

                    });


                    if (progress) {

                        const percentage =
                            (parseInt(number, 10) / 5) * 100;

                        progress.style.width =
                            `${percentage}%`;

                    }

                });

            },
            {
                threshold: 0.35
            }
        );


    chapters.forEach(chapter => {
        observer.observe(chapter);
    });

})();


/* ============================================================
   PDF VIEWER
   ============================================================ */

(function initPDFViewer() {

    const canvas =
        document.getElementById("pdfCanvas");

    const stage =
        document.getElementById("pdfStage");

    const loading =
        document.getElementById("pdfLoading");

    const loadingProgress =
        document.getElementById("pdfLoadingProgress");

    const currentPage =
        document.getElementById("pdfCurrentPage");

    const totalPages =
        document.getElementById("pdfTotalPages");

    const prevButton =
        document.getElementById("pdfPrev");

    const nextButton =
        document.getElementById("pdfNext");

    const hitLeft =
        document.getElementById("pdfHitLeft");

    const hitRight =
        document.getElementById("pdfHitRight");

    const fullscreenButton =
        document.getElementById("pdfFullscreen");


    if (
        !canvas ||
        !stage ||
        typeof pdfjsLib === "undefined"
    ) {
        return;
    }


    pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";


    const ctx =
        canvas.getContext("2d");

    let pdf = null;
    let pageNumber = 1;
    let rendering = false;
    let pendingPage = null;

    let touchStartX = 0;
    let touchStartY = 0;


    function updateHitAreas() {

        const rect =
            canvas.getBoundingClientRect();

        const stageRect =
            stage.getBoundingClientRect();


        const left =
            rect.left - stageRect.left;

        const top =
            rect.top - stageRect.top;

        const width =
            rect.width;

        const height =
            rect.height;


        hitLeft.style.left =
            `${left}px`;

        hitLeft.style.top =
            `${top}px`;

        hitLeft.style.width =
            `${width / 2}px`;

        hitLeft.style.height =
            `${height}px`;


        hitRight.style.left =
            `${left + width / 2}px`;

        hitRight.style.top =
            `${top}px`;

        hitRight.style.width =
            `${width / 2}px`;

        hitRight.style.height =
            `${height}px`;

    }


    async function renderPage(number) {

        if (!pdf) return;

        rendering = true;

        const page =
            await pdf.getPage(number);


        const unscaledViewport =
            page.getViewport({
                scale: 1
            });


        const availableWidth =
            Math.min(
                stage.clientWidth,
                900
            );


        const availableHeight =
            Math.min(
                window.innerHeight * 0.72,
                900
            );


        const scaleByWidth =
            availableWidth /
            unscaledViewport.width;

        const scaleByHeight =
            availableHeight /
            unscaledViewport.height;


        const scale =
            Math.min(
                scaleByWidth,
                scaleByHeight
            );


        const viewport =
            page.getViewport({
                scale
            });


        canvas.width =
            viewport.width;

        canvas.height =
            viewport.height;


        canvas.style.width =
            `${viewport.width}px`;

        canvas.style.height =
            `${viewport.height}px`;


        await page.render({
            canvasContext: ctx,
            viewport
        }).promise;


        currentPage.textContent =
            String(number).padStart(2, "0");


        updateHitAreas();


        rendering = false;


        if (pendingPage !== null) {

            const nextPage =
                pendingPage;

            pendingPage = null;

            renderPage(nextPage);

        }

    }


    function queueRenderPage(number) {

        if (rendering) {

            pendingPage = number;

        } else {

            renderPage(number);

        }

    }


    function goToPage(number) {

        if (!pdf) return;

        if (number < 1) {
            number = pdf.numPages;
        }

        if (number > pdf.numPages) {
            number = 1;
        }

        pageNumber = number;

        queueRenderPage(pageNumber);

    }


    function previousPage() {
        goToPage(pageNumber - 1);
    }


    function nextPage() {
        goToPage(pageNumber + 1);
    }


    prevButton.addEventListener(
        "click",
        previousPage
    );

    nextButton.addEventListener(
        "click",
        nextPage
    );

    hitLeft.addEventListener(
        "click",
        previousPage
    );

    hitRight.addEventListener(
        "click",
        nextPage
    );


    /* KEYBOARD */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.target.tagName === "INPUT" ||
                event.target.tagName === "TEXTAREA"
            ) {
                return;
            }

            if (event.key === "ArrowLeft") {
                previousPage();
            }

            if (event.key === "ArrowRight") {
                nextPage();
            }

        }
    );


    /* TOUCH */

    stage.addEventListener(
        "touchstart",
        event => {

            const touch =
                event.changedTouches[0];

            touchStartX =
                touch.clientX;

            touchStartY =
                touch.clientY;

        },
        {
            passive: true
        }
    );


    stage.addEventListener(
        "touchend",
        event => {

            const touch =
                event.changedTouches[0];

            const deltaX =
                touch.clientX - touchStartX;

            const deltaY =
                touch.clientY - touchStartY;


            if (
                Math.abs(deltaX) > 50 &&
                Math.abs(deltaX) > Math.abs(deltaY)
            ) {

                if (deltaX > 0) {
                    previousPage();
                } else {
                    nextPage();
                }

            }

        },
        {
            passive: true
        }
    );


    /* FULLSCREEN */

    if (fullscreenButton) {

        fullscreenButton.addEventListener(
            "click",
            async () => {

                try {

                    if (!document.fullscreenElement) {

                        await stage.requestFullscreen();

                    } else {

                        await document.exitFullscreen();

                    }

                } catch (error) {

                    console.warn(
                        "Fullscreen unavailable:",
                        error
                    );

                }

            }
        );

    }


    /* RESIZE */

    window.addEventListener(
        "resize",
        () => {

            if (pdf) {
                queueRenderPage(pageNumber);
            }

        }
    );


    /* LOAD PDF */

    pdfjsLib
        .getDocument("script.pdf")
        .promise
        .then(loadedPDF => {

            pdf = loadedPDF;

            totalPages.textContent =
                String(pdf.numPages).padStart(2, "0");

            if (loadingProgress) {
                loadingProgress.style.width = "100%";
            }

            return renderPage(pageNumber);

        })
        .then(() => {

            if (loading) {
                loading.style.display = "none";
            }

        })
        .catch(error => {

            console.error(
                "Unable to load PDF:",
                error
            );

            /*
             * No visible error message is displayed.
             * This keeps the page clean if the PDF is unavailable.
             */

            if (loading) {
                loading.style.display = "none";
            }

        });

})();


/* ============================================================
   INSPIRATION CAROUSEL
   MANUAL IMAGE LIST
   ============================================================ */

(function initInspirationCarousel() {

    const image =
        document.getElementById("inspirationImage");

    const caption =
        document.getElementById("inspirationCaption");

    const current =
        document.getElementById("inspirationCurrent");

    const total =
        document.getElementById("inspirationTotal");

    const previous =
        document.getElementById("inspirationPrev");

    const next =
        document.getElementById("inspirationNext");


    if (
        !image ||
        !caption ||
        !current ||
        !total
    ) {
        return;
    }


    /*
     * =========================================================
     * ADD YOUR INSPIRATION IMAGES HERE
     *
     * The images are intentionally MANUAL.
     *
     * Put the image in /images/
     * then add an object here.
     * =========================================================
     */

    const inspirationImages = [

 {
            src: "images/inspiration-01.jpg",
            alt: "Dance Division reference image 01",
            label: "01 / REFERENCE"
        },

        {
            src: "images/inspiration-02.jpg",
            alt: "Dance Division reference image 02",
            label: "02 / REFERENCE"
        },

        {
            src: "images/inspiration-03.jpg",
            alt: "Dance Division reference image 03",
            label: "03 / REFERENCE"
        },

        {
            src: "images/inspiration-04.jpg",
            alt: "Dance Division reference image 04",
            label: "04 / REFERENCE"
        },

  
        {
            src: "images/inspiration-05.jpg",
            alt: "Dance Division reference image 05",
            label: "05 / REFERENCE"
        },

        {
            src: "images/inspiration-06.jpg",
            alt: "Dance Division reference image 06",
            label: "06 / REFERENCE"
        },

        {
            src: "images/inspiration-07.jpg",
            alt: "Dance Division reference image 07",
            label: "07 / REFERENCE"
        },

        {
            src: "images/inspiration-08.jpg",
            alt: "Dance Division reference image 08",
            label: "08 / REFERENCE"
        },

        {
            src: "images/inspiration-09.jpg",
            alt: "Dance Division reference image 09",
            label: "09 / REFERENCE"
        },

        {
            src: "images/inspiration-10.jpg",
            alt: "Dance Division reference image 10",
            label: "10 / REFERENCE"
        },

        {
            src: "images/inspiration-11.jpg",
            alt: "Dance Division reference image 11",
            label: "11 / REFERENCE"
        },

        {
            src: "images/inspiration-12.jpg",
            alt: "Dance Division reference image 12",
            label: "12 / REFERENCE"
        },

        {
            src: "images/inspiration-13.jpg",
            alt: "Dance Division reference image 13",
            label: "13 / REFERENCE"
        },

        {
            src: "images/inspiration-14.jpg",
            alt: "Dance Division reference image 14",
            label: "14 / REFERENCE"
        },

        {
            src: "images/inspiration-15.jpg",
            alt: "Dance Division reference image 15",
            label: "15 / REFERENCE"
        },
   
        {
            src: "images/inspiration-16.jpg",
            alt: "Dance Division reference image 16",
            label: "16 / REFERENCE"
        },

        {
            src: "images/inspiration-17.jpg",
            alt: "Dance Division reference image 17",
            label: "17 / REFERENCE"
        },

        {
            src: "images/inspiration-18.jpg",
            alt: "Dance Division reference image 18",
            label: "18 / REFERENCE"
        },

        {
            src: "images/inspiration-19.jpg",
            alt: "Dance Division reference image 19",
            label: "19 / REFERENCE"
        },

        {
            src: "images/inspiration-20.jpg",
            alt: "Dance Division reference image 20",
            label: "20 / REFERENCE"
        },
   /*
        {
            src: "images/inspiration-21.jpg",
            alt: "Dance Division reference image 21",
            label: "21 / REFERENCE"
        },

        {
            src: "images/inspiration-22.jpg",
            alt: "Dance Division reference image 22",
            label: "22 / REFERENCE"
        },

        {
            src: "images/inspiration-23.jpg",
            alt: "Dance Division reference image 23",
            label: "23 / REFERENCE"
        },

        {
            src: "images/inspiration-24.jpg",
            alt: "Dance Division reference image 24",
            label: "24 / REFERENCE"
        },

        {
            src: "images/inspiration-25.jpg",
            alt: "Dance Division reference image 25",
            label: "25 / REFERENCE"
        }
        */


    ];


    let index = 0;


    total.textContent =
        String(inspirationImages.length)
            .padStart(2, "0");


    function showImage(newIndex) {

        if (!inspirationImages.length) return;


        if (newIndex < 0) {
            newIndex =
                inspirationImages.length - 1;
        }

        if (
            newIndex >=
            inspirationImages.length
        ) {
            newIndex = 0;
        }


        index = newIndex;


        const item =
            inspirationImages[index];


        image.classList.remove("loaded");


        image.onload = () => {

            image.classList.add("loaded");

        };


        image.src =
            item.src;

        image.alt =
            item.alt;


        caption.textContent =
            item.label;


        current.textContent =
            String(index + 1)
                .padStart(2, "0");


        preloadAdjacentImages();

    }


    function preloadAdjacentImages() {

        if (!inspirationImages.length) {
            return;
        }


        const nextIndex =
            (index + 1) %
            inspirationImages.length;

        const previousIndex =
            (index - 1 +
                inspirationImages.length) %
            inspirationImages.length;


        [
            inspirationImages[nextIndex],
            inspirationImages[previousIndex]
        ].forEach(item => {

            const preload =
                new Image();

            preload.src =
                item.src;

        });

    }


    function previousImage() {
        showImage(index - 1);
    }


    function nextImage() {
        showImage(index + 1);
    }


    previous.addEventListener(
        "click",
        previousImage
    );

    next.addEventListener(
        "click",
        nextImage
    );


    /* KEYBOARD */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.target.tagName === "INPUT" ||
                event.target.tagName === "TEXTAREA"
            ) {
                return;
            }


            const carousel =
                document.getElementById(
                    "inspirationCarousel"
                );


            if (!carousel) return;


            const rect =
                carousel.getBoundingClientRect();


            const visible =
                rect.top <
                window.innerHeight &&
                rect.bottom > 0;


            if (!visible) return;


            if (event.key === "ArrowLeft") {
                previousImage();
            }

            if (event.key === "ArrowRight") {
                nextImage();
            }

        }
    );


    /* TOUCH */

    let touchStartX = 0;
    let touchStartY = 0;


    image.addEventListener(
        "touchstart",
        event => {

            const touch =
                event.changedTouches[0];

            touchStartX =
                touch.clientX;

            touchStartY =
                touch.clientY;

        },
        {
            passive: true
        }
    );


    image.addEventListener(
        "touchend",
        event => {

            const touch =
                event.changedTouches[0];

            const deltaX =
                touch.clientX - touchStartX;

            const deltaY =
                touch.clientY - touchStartY;


            if (
                Math.abs(deltaX) > 50 &&
                Math.abs(deltaX) > Math.abs(deltaY)
            ) {

                if (deltaX > 0) {
                    previousImage();
                } else {
                    nextImage();
                }

            }

        },
        {
            passive: true
        }
    );


    showImage(0);

})();


/* ============================================================
   CHARACTERS
   MANUAL CHARACTER DATA
   ============================================================ */

(function initCharacters() {

    const image =
        document.getElementById("characterImage");

    const number =
        document.getElementById("characterNumber");

    const role =
        document.getElementById("characterRole");

    const name =
        document.getElementById("characterName");

    const bio =
        document.getElementById("characterBio");

    const casting =
        document.getElementById("characterCasting");

    const footerName =
        document.getElementById("characterFooterName");

    const current =
        document.getElementById("characterCurrent");

    const total =
        document.getElementById("characterTotal");

    const previous =
        document.getElementById("characterPrev");

    const next =
        document.getElementById("characterNext");


    if (
        !image ||
        !number ||
        !role ||
        !name ||
        !bio ||
        !casting
    ) {
        return;
    }


    /*
     * =========================================================
     * CHARACTER DATA
     *
     * Replace the placeholder information below.
     *
     * Images should live in:
     *
     * images/
     *     character-01-headshot.jpg
     *     character-02-headshot.jpg
     *     etc.
     *
     * =========================================================
     */

    const characters = [

        {
            image: "images/character-01-headshot.jpg",

            name: "LUCY D'ANGELO",

            role: "CHARACTER 01",

            bio:
                "A short description of the character. Introduce who they are, where they come from, and the emotional or narrative space they occupy within Dance Division.",

            casting:
                "Potential casting: Emily DeForest (Actor)."
        },


        {
            image: "images/character-02-headshot.jpg",

            name: "FRANKIE FLINT",

            role: "CHARACTER 02",

            bio:
                "A short description of the character. Introduce who they are, where they come from, and the emotional or narrative space they occupy within Dance Division.",

            casting:
                "Potential casting: Isaac Powell (Actor)."
        },


        {
            image: "images/character-03-headshot.jpg",

            name: "JONAH LENTZ",

            role: "CHARACTER 03",

            bio:
                "A short description of the character. Introduce who they are, where they come from, and the emotional or narrative space they occupy within Dance Division.",

            casting:
                "Potential casting: Yonatan Gebeyahu (Actor)."
        },


        {
            image: "images/character-04-headshot.jpg",

            name: "JUDE HARRISON",

            role: "CHARACTER 04",

            bio:
                "A short description of the character. Introduce who they are, where they come from, and the emotional or narrative space they occupy within Dance Division.",

            casting:
                "Potential casting: Tate Justus (Dancer / Actor / Choreographer)."
        },


        {
            image: "images/character-05-headshot.jpg",

            name: "JACK ZANE",

            role: "CHARACTER 05",

            bio:
                "A short description of the character. Introduce who they are, where they come from, and the emotional or narrative space they occupy within Dance Division.",

            casting:
                "Potential casting: Jack Ferver (Actor / Choreographer / Dancer)."
        },


        {
            image: "images/character-06-headshot.jpg",

            name: "BODHI D'ANGELO",

            role: "CHARACTER 06",

            bio:
                "A short description of the character. Introduce who they are, where they come from, and the emotional or narrative space they occupy within Dance Division.",

            casting:
                "Potential casting: Peter Smith (Actor)."
        },


        {
            image: "images/character-07-headshot.jpg",

            name: "",

            role: "CHARACTER 07",

            bio:
                "A short description of the character. Introduce who they are, where they come from, and the emotional or narrative space they occupy within Dance Division.",

            casting:
                "Potential casting: Becky Abrams (Actor)."
        },


        {
            image: "images/character-08-headshot.jpg",

            name: "LOUISE FLINT",

            role: "CHARACTER 08",

            bio:
                "A short description of the character. Introduce who they are, where they come from, and the emotional or narrative space they occupy within Dance Division.",

            casting:
                "Potential casting: April Mathis (Actor)."
        },


        {
            image: "images/character-09-headshot.jpg",

            name: "SANDRANA BELL",

            role: "CHARACTER 09",

            bio:
                "A short description of the character. Introduce who they are, where they come from, and the emotional or narrative space they occupy within Dance Division.",

            casting:
                "Potential casting: Bobbi Jean Smith (Choreographer/Dancer)."
        }

    ];


    let index = 0;


    /* UPDATE TOTAL */

    total.textContent =
        String(characters.length)
            .padStart(2, "0");


    /* SHOW CHARACTER */

    function showCharacter(newIndex) {

        if (!characters.length) {
            return;
        }


        if (newIndex < 0) {

            newIndex =
                characters.length - 1;

        }


        if (
            newIndex >=
            characters.length
        ) {

            newIndex = 0;

        }


        index = newIndex;


        const character =
            characters[index];


        /*
         * Fade image out before changing source.
         */

        image.classList.remove("loaded");


        image.onload = () => {

            image.classList.add("loaded");

        };


        image.src =
            character.image;

        image.alt =
            `${character.name} — Dance Division`;


        number.textContent =
            String(index + 1)
                .padStart(2, "0");


        role.textContent =
            character.role;


        name.textContent =
            character.name;


        bio.textContent =
            character.bio;


        casting.textContent =
            character.casting;


        footerName.textContent =
            character.name;


        current.textContent =
            String(index + 1)
                .padStart(2, "0");


        preloadCharacterImages();

    }


    /* PRELOAD ADJACENT CHARACTERS */

    function preloadCharacterImages() {

        if (!characters.length) {
            return;
        }


        const nextIndex =
            (index + 1) %
            characters.length;


        const previousIndex =
            (index - 1 +
                characters.length) %
            characters.length;


        [
            characters[nextIndex],
            characters[previousIndex]
        ].forEach(character => {

            const preload =
                new Image();

            preload.src =
                character.image;

        });

    }


    function previousCharacter() {

        showCharacter(index - 1);

    }


    function nextCharacter() {

        showCharacter(index + 1);

    }


    previous.addEventListener(
        "click",
        previousCharacter
    );


    next.addEventListener(
        "click",
        nextCharacter
    );


    /* =========================================================
       KEYBOARD
       ========================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.target.tagName === "INPUT" ||
                event.target.tagName === "TEXTAREA"
            ) {
                return;
            }


            const browser =
                document.getElementById(
                    "characterBrowser"
                );


            if (!browser) return;


            const rect =
                browser.getBoundingClientRect();


            const visible =
                rect.top <
                window.innerHeight &&
                rect.bottom > 0;


            if (!visible) return;


            if (event.key === "ArrowLeft") {

                previousCharacter();

            }


            if (event.key === "ArrowRight") {

                nextCharacter();

            }

        }
    );


    /* =========================================================
       TOUCH SWIPE
       ========================================================= */

    let touchStartX = 0;
    let touchStartY = 0;


    image.addEventListener(
        "touchstart",
        event => {

            const touch =
                event.changedTouches[0];

            touchStartX =
                touch.clientX;

            touchStartY =
                touch.clientY;

        },
        {
            passive: true
        }
    );


    image.addEventListener(
        "touchend",
        event => {

            const touch =
                event.changedTouches[0];

            const deltaX =
                touch.clientX -
                touchStartX;

            const deltaY =
                touch.clientY -
                touchStartY;


            if (
                Math.abs(deltaX) > 50 &&
                Math.abs(deltaX) >
                    Math.abs(deltaY)
            ) {

                if (deltaX > 0) {

                    previousCharacter();

                } else {

                    nextCharacter();

                }

            }

        },
        {
            passive: true
        }
    );


    /* INITIAL CHARACTER */

    showCharacter(0);

})();


/* ============================================================
   AUDIO PLAYER
   ============================================================ */

(function initAudioPlayer() {

    const audio =
        document.getElementById("audio");

    const playButton =
        document.getElementById("playButton");

    const progressFill =
        document.getElementById(
            "audioProgressFill"
        );

    const time =
        document.getElementById("audioTime");

    const duration =
        document.getElementById(
            "audioDuration"
        );

    const trackNumber =
        document.getElementById(
            "trackNumber"
        );

    const trackTitle =
        document.getElementById(
            "trackTitle"
        );

    const items =
        document.querySelectorAll(
            ".audio-item"
        );


    if (
        !audio ||
        !playButton
    ) {
        return;
    }


    function formatTime(seconds) {

        if (!Number.isFinite(seconds)) {
            return "00:00";
        }


        const minutes =
            Math.floor(seconds / 60);

        const secs =
            Math.floor(seconds % 60);


        return (
            String(minutes).padStart(2, "0") +
            ":" +
            String(secs).padStart(2, "0")
        );

    }


    playButton.addEventListener(
        "click",
        () => {

            if (audio.paused) {

                audio.play();

            } else {

                audio.pause();

            }

        }
    );


    audio.addEventListener(
        "play",
        () => {

            playButton.textContent =
                "PAUSE";

        }
    );


    audio.addEventListener(
        "pause",
        () => {

            playButton.textContent =
                "PLAY";

        }
    );


    audio.addEventListener(
        "loadedmetadata",
        () => {

            duration.textContent =
                formatTime(audio.duration);

        }
    );


    audio.addEventListener(
        "timeupdate",
        () => {

            if (!audio.duration) return;


            const percentage =
                (audio.currentTime /
                    audio.duration) *
                100;


            progressFill.style.width =
                `${percentage}%`;


            time.textContent =
                formatTime(audio.currentTime);

        }
    );


    document
        .querySelector(".audio-progress")
        .addEventListener(
            "click",
            event => {

                if (!audio.duration) {
                    return;
                }


                const rect =
                    event.currentTarget
                        .getBoundingClientRect();


                const percentage =
                    (event.clientX -
                        rect.left) /
                    rect.width;


                audio.currentTime =
                    percentage *
                    audio.duration;

            }
        );


    items.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const src =
                    item.dataset.src;

                const title =
                    item.dataset.title;

                const track =
                    parseInt(
                        item.dataset.track,
                        10
                    );


                audio.pause();

                audio.src = src;

                audio.load();


                trackNumber.textContent =
                    String(track + 1)
                        .padStart(2, "0");


                trackTitle.textContent =
                    title;


                items.forEach(
                    other => {
                        other.classList.remove(
                            "active"
                        );
                    }
                );


                item.classList.add("active");


                audio.play();

            }
        );

    });

})();


/* ============================================================
   GLOBAL VIMEO SOUND CONTROL
   ============================================================ */

(function initVimeo() {

    const iframe =
        document.getElementById("mainFilm");

    /*
     * The old Film section has been replaced by Characters.
     * Kept intentionally disabled rather than removing the
     * dependency logic elsewhere in the project.
     */

    if (!iframe) {
        return;
    }


    if (
        typeof Vimeo === "undefined" ||
        !Vimeo.Player
    ) {
        return;
    }


    const player =
        new Vimeo.Player(iframe);


    player.ready()
        .catch(error => {

            console.warn(
                "Vimeo player unavailable:",
                error
            );

        });

})();