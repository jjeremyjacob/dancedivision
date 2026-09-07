/* ============================================================
   DANCE DIVISION
   SCRIPT.JS
   ============================================================ */


/* ============================================================
   LOADER
   ============================================================ */

(function initLoader() {

    const loader =
        document.getElementById("loader");

    const percent =
        document.getElementById("loaderPercent");

    const progress =
        document.getElementById("loaderProgress");

    if (!loader) {
        return;
    }

    let value = 0;


    function updateLoader(number) {

        value =
            Math.min(
                100,
                Math.max(0, number)
            );


        if (percent) {

            percent.textContent =
                String(
                    Math.round(value)
                ).padStart(2, "0");

        }


        if (progress) {

            progress.style.width =
                `${value}%`;

        }

    }


    updateLoader(0);


    const interval =
        setInterval(() => {

            value +=
                Math.random() * 10 + 4;


            if (value >= 90) {

                value = 90;

                clearInterval(interval);

            }


            updateLoader(value);

        }, 70);


    function finishLoader() {

        clearInterval(interval);

        updateLoader(100);


        setTimeout(() => {

            loader.classList.add(
                "is-hidden"
            );

        }, 300);

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            () => {

                setTimeout(
                    finishLoader,
                    500
                );

            },
            {
                once: true
            }
        );

    } else {

        setTimeout(
            finishLoader,
            500
        );

    }

})();


/* ============================================================
   NAVIGATION
   ============================================================ */

(function initNavigation() {

    const links =
        document.querySelectorAll(
            ".nav-links a"
        );

    const headerTitle =
        document.querySelector(
            ".header-title"
        );


    function scrollToTarget(
        targetID
    ) {

        const target =
            document.getElementById(
                targetID
            );


        if (!target) {
            return;
        }


        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();


                const target =
                    link.dataset.target;


                if (!target) {
                    return;
                }


                scrollToTarget(
                    target
                );

            }
        );

    });


    if (headerTitle) {

        headerTitle.addEventListener(
            "click",
            event => {

                event.preventDefault();


                scrollToTarget(
                    "opening"
                );

            }
        );

    }

})();


/* ============================================================
   CHAPTER OBSERVER
   ============================================================ */

(function initChapterObserver() {

    const chapters =
        document.querySelectorAll(
            ".chapter"
        );

    const links =
        document.querySelectorAll(
            ".nav-links a"
        );

    const current =
        document.getElementById(
            "chapterCurrent"
        );

    const progress =
        document.getElementById(
            "chapterProgress"
        );


    if (!chapters.length) {
        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const chapter =
                            entry.target;


                        const number =
                            chapter.dataset.chapter ||
                            "00";


                        const target =
                            chapter.id;


                        if (current) {

                            current.textContent =
                                number;

                        }


                        links.forEach(
                            link => {

                                link.classList.toggle(
                                    "active",
                                    link.dataset.target ===
                                        target
                                );

                            }
                        );


                        if (progress) {

                            const numeric =
                                parseInt(
                                    number,
                                    10
                                );


                            const percentage =
                                (
                                    numeric /
                                    5
                                ) * 100;


                            progress.style.width =
                                `${percentage}%`;

                        }

                    }
                );

            },
            {
                threshold: 0.35
            }
        );


    chapters.forEach(
        chapter => {

            observer.observe(
                chapter
            );

        }
    );

})();


/* ============================================================
   PDF VIEWER
   ============================================================ */

(function initPDFViewer() {

    const viewer =
        document.getElementById(
            "pdfViewer"
        );

    const stage =
        document.getElementById(
            "pdfStage"
        );

    const canvas =
        document.getElementById(
            "pdfCanvas"
        );

    const loading =
        document.getElementById(
            "pdfLoading"
        );

    const loadingProgress =
        document.getElementById(
            "pdfLoadingProgress"
        );

    const currentPage =
        document.getElementById(
            "pdfCurrentPage"
        );

    const totalPages =
        document.getElementById(
            "pdfTotalPages"
        );

    const previousButton =
        document.getElementById(
            "pdfPrev"
        );

    const nextButton =
        document.getElementById(
            "pdfNext"
        );

    const hitLeft =
        document.getElementById(
            "pdfHitLeft"
        );

    const hitRight =
        document.getElementById(
            "pdfHitRight"
        );

    const fullscreenButton =
        document.getElementById(
            "pdfFullscreen"
        );


    if (
        !viewer ||
        !stage ||
        !canvas
    ) {

        return;

    }


    if (
        typeof pdfjsLib ===
        "undefined"
    ) {

        console.error(
            "PDF.js is not loaded."
        );

        return;

    }


    pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";


    const context =
        canvas.getContext(
            "2d"
        );


    let pdf = null;

    let pageNumber = 1;

    let rendering = false;

    let pendingPage = null;


    /* ------------------------------------------------------------
       HIT AREAS
       ------------------------------------------------------------ */

    function updateHitAreas() {

        if (
            !hitLeft ||
            !hitRight
        ) {

            return;

        }


        const canvasRect =
            canvas.getBoundingClientRect();

        const stageRect =
            stage.getBoundingClientRect();


        const left =
            canvasRect.left -
            stageRect.left;


        const top =
            canvasRect.top -
            stageRect.top;


        const width =
            canvasRect.width;


        const height =
            canvasRect.height;


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


    /* ------------------------------------------------------------
       PDF SCALE
       ------------------------------------------------------------ */

    function getScale(page) {

        const baseViewport =
            page.getViewport({
                scale: 1
            });


        const stageWidth =
            stage.clientWidth ||
            window.innerWidth;


        const stageHeight =
            stage.clientHeight ||
            window.innerHeight * 0.78;


        /*
         * Keep only a small amount of space around
         * the document. The previous version used
         * a much smaller effective area.
         */

        const horizontalPadding =
            window.innerWidth <= 700
                ? 10
                : 30;


        const verticalPadding =
            window.innerWidth <= 700
                ? 10
                : 20;


        const availableWidth =
            Math.max(
                200,
                stageWidth -
                horizontalPadding
            );


        const availableHeight =
            Math.max(
                300,
                stageHeight -
                verticalPadding
            );


        const widthScale =
            availableWidth /
            baseViewport.width;


        const heightScale =
            availableHeight /
            baseViewport.height;


        return Math.min(
            widthScale,
            heightScale
        );

    }


    /* ------------------------------------------------------------
       RENDER PAGE
       ------------------------------------------------------------ */

    async function renderPage(
        number
    ) {

        if (!pdf) {
            return;
        }


        if (rendering) {

            pendingPage =
                number;

            return;

        }


        rendering = true;


        try {

            const page =
                await pdf.getPage(
                    number
                );


            const scale =
                getScale(page);


            const viewport =
                page.getViewport({
                    scale
                });


            const outputScale =
                Math.max(
                    1,
                    Math.min(
                        window.devicePixelRatio ||
                        1,
                        2
                    )
                );


            /*
             * Actual backing canvas size.
             */

            canvas.width =
                Math.floor(
                    viewport.width *
                    outputScale
                );


            canvas.height =
                Math.floor(
                    viewport.height *
                    outputScale
                );


            /*
             * CSS display size.
             */

            canvas.style.width =
                `${viewport.width}px`;


            canvas.style.height =
                `${viewport.height}px`;


            const renderContext = {

                canvasContext:
                    context,

                viewport:
                    viewport,

                transform:
                    outputScale !== 1
                        ? [
                            outputScale,
                            0,
                            0,
                            outputScale,
                            0,
                            0
                        ]
                        : null

            };


            context.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );


            await page.render(
                renderContext
            ).promise;


            if (currentPage) {

                currentPage.textContent =
                    String(
                        number
                    ).padStart(
                        2,
                        "0"
                    );

            }


            updateHitAreas();


        } catch (error) {

            console.error(
                "PDF render error:",
                error
            );

        } finally {

            rendering = false;


            if (
                pendingPage !== null
            ) {

                const next =
                    pendingPage;


                pendingPage =
                    null;


                renderPage(
                    next
                );

            }

        }

    }


    /* ------------------------------------------------------------
       PAGE NAVIGATION
       ------------------------------------------------------------ */

    function goToPage(
        number
    ) {

        if (!pdf) {
            return;
        }


        number =
            Math.max(
                1,
                Math.min(
                    pdf.numPages,
                    number
                )
            );


        pageNumber =
            number;


        if (currentPage) {

            currentPage.textContent =
                String(
                    pageNumber
                ).padStart(
                    2,
                    "0"
                );

        }


        if (rendering) {

            pendingPage =
                pageNumber;

        } else {

            renderPage(
                pageNumber
            );

        }

    }


    function previousPage() {

        if (!pdf) {
            return;
        }


        if (pageNumber > 1) {

            goToPage(
                pageNumber - 1
            );

        }

    }


    function nextPage() {

        if (!pdf) {
            return;
        }


        if (
            pageNumber <
            pdf.numPages
        ) {

            goToPage(
                pageNumber + 1
            );

        }

    }


    /* ------------------------------------------------------------
       BUTTONS
       ------------------------------------------------------------ */

    if (previousButton) {

        previousButton.addEventListener(
            "click",
            previousPage
        );

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            nextPage
        );

    }


    if (hitLeft) {

        hitLeft.addEventListener(
            "click",
            previousPage
        );

    }


    if (hitRight) {

        hitRight.addEventListener(
            "click",
            nextPage
        );

    }


    /* ------------------------------------------------------------
       KEYBOARD
       ------------------------------------------------------------ */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.target.tagName ===
                    "INPUT" ||
                event.target.tagName ===
                    "TEXTAREA" ||
                event.target.tagName ===
                    "SELECT"
            ) {

                return;

            }


            const rect =
                viewer.getBoundingClientRect();


            const visible =
                rect.top <
                    window.innerHeight &&
                rect.bottom > 0;


            if (!visible) {
                return;
            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                event.preventDefault();

                previousPage();

            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                event.preventDefault();

                nextPage();

            }

        }
    );


    /* ------------------------------------------------------------
       TOUCH / SWIPE
       ------------------------------------------------------------ */

    let touchStartX = 0;

    let touchStartY = 0;


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

                if (
                    deltaX > 0
                ) {

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


    /* ------------------------------------------------------------
       FULLSCREEN
       ------------------------------------------------------------ */

    if (fullscreenButton) {

        fullscreenButton.addEventListener(
            "click",
            async () => {

                try {

                    if (
                        !document.fullscreenElement
                    ) {

                        await viewer.requestFullscreen();

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


    document.addEventListener(
        "fullscreenchange",
        () => {

            setTimeout(
                () => {

                    if (
                        pdf &&
                        !rendering
                    ) {

                        renderPage(
                            pageNumber
                        );

                    }

                },
                100
            );

        }
    );


    /* ------------------------------------------------------------
       RESIZE
       ------------------------------------------------------------ */

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    () => {

                        if (
                            pdf &&
                            !rendering
                        ) {

                            renderPage(
                                pageNumber
                            );

                        }

                    },
                    150
                );

        }
    );


    /* ------------------------------------------------------------
       LOAD PDF
       ------------------------------------------------------------ */

    async function loadPDF() {

        try {

            if (loadingProgress) {

                loadingProgress.style.width =
                    "10%";

            }


            const loadingTask =
                pdfjsLib.getDocument(
                    "script.pdf"
                );


            loadingTask.onProgress =
                progressData => {

                    if (
                        !loadingProgress ||
                        !progressData.total
                    ) {

                        return;

                    }


                    const percentage =
                        (
                            progressData.loaded /
                            progressData.total
                        ) * 100;


                    loadingProgress.style.width =
                        `${Math.min(
                            100,
                            percentage
                        )}%`;

                };


            pdf =
                await loadingTask.promise;


            if (totalPages) {

                totalPages.textContent =
                    String(
                        pdf.numPages
                    ).padStart(
                        2,
                        "0"
                    );

            }


            pageNumber = 1;


            await renderPage(
                pageNumber
            );


            if (loading) {

                loading.classList.add(
                    "is-hidden"
                );

            }


        } catch (error) {

            console.error(
                "Unable to load script.pdf:",
                error
            );


            if (loading) {

                loading.classList.add(
                    "is-hidden"
                );

            }

        }

    }


    loadPDF();

})();


/* ============================================================
   INSPIRATION CAROUSEL
   ============================================================ */

(function initInspirationCarousel() {

    const track =
        document.getElementById(
            "inspirationTrack"
        );

    const caption =
        document.getElementById(
            "inspirationCaption"
        );

    const current =
        document.getElementById(
            "inspirationCurrent"
        );

    const total =
        document.getElementById(
            "inspirationTotal"
        );

    const previous =
        document.getElementById(
            "inspirationPrev"
        );

    const next =
        document.getElementById(
            "inspirationNext"
        );

    const stage =
        document.querySelector(
            ".inspiration-stage"
        );


    if (
        !track ||
        !caption ||
        !current ||
        !total ||
        !stage
    ) {

        return;

    }


    /* ------------------------------------------------------------
       IMAGE LIST
       ------------------------------------------------------------ */

    const inspirationImages = [

        {
            src:
                "images/inspiration-01.jpg",

            alt:
                "Dance Division reference image 01",

            label:
                "01 / REFERENCE"
        },

        {
            src:
                "images/inspiration-02.jpg",

            alt:
                "Dance Division reference image 02",

            label:
                "02 / REFERENCE"
        },

        {
            src:
                "images/inspiration-03.jpg",

            alt:
                "Dance Division reference image 03",

            label:
                "03 / REFERENCE"
        },

        {
            src:
                "images/inspiration-04.jpg",

            alt:
                "Dance Division reference image 04",

            label:
                "04 / REFERENCE"
        },

        {
            src:
                "images/inspiration-05.jpg",

            alt:
                "Dance Division reference image 05",

            label:
                "05 / REFERENCE"
        },

        {
            src:
                "images/inspiration-06.jpg",

            alt:
                "Dance Division reference image 06",

            label:
                "06 / REFERENCE"
        },

        {
            src:
                "images/inspiration-07.jpg",

            alt:
                "Dance Division reference image 07",

            label:
                "07 / REFERENCE"
        },

        {
            src:
                "images/inspiration-08.jpg",

            alt:
                "Dance Division reference image 08",

            label:
                "08 / REFERENCE"
        },

        {
            src:
                "images/inspiration-09.jpg",

            alt:
                "Dance Division reference image 09",

            label:
                "09 / REFERENCE"
        },

        {
            src:
                "images/inspiration-10.jpg",

            alt:
                "Dance Division reference image 10",

            label:
                "10 / REFERENCE"
        },

        {
            src:
                "images/inspiration-11.jpg",

            alt:
                "Dance Division reference image 11",

            label:
                "11 / REFERENCE"
        },

        {
            src:
                "images/inspiration-12.jpg",

            alt:
                "Dance Division reference image 12",

            label:
                "12 / REFERENCE"
        },

        {
            src:
                "images/inspiration-13.jpg",

            alt:
                "Dance Division reference image 13",

            label:
                "13 / REFERENCE"
        },

        {
            src:
                "images/inspiration-14.jpg",

            alt:
                "Dance Division reference image 14",

            label:
                "14 / REFERENCE"
        },

        {
            src:
                "images/inspiration-15.jpg",

            alt:
                "Dance Division reference image 15",

            label:
                "15 / REFERENCE"
        },

        {
            src:
                "images/inspiration-16.jpg",

            alt:
                "Dance Division reference image 16",

            label:
                "16 / REFERENCE"
        },

        {
            src:
                "images/inspiration-17.jpg",

            alt:
                "Dance Division reference image 17",

            label:
                "17 / REFERENCE"
        },

        {
            src:
                "images/inspiration-18.jpg",

            alt:
                "Dance Division reference image 18",

            label:
                "18 / REFERENCE"
        },

        {
            src:
                "images/inspiration-19.jpg",

            alt:
                "Dance Division reference image 19",

            label:
                "19 / REFERENCE"
        },

        {
    src:
        "images/inspiration-20.jpg",

    alt:
        "Dance Division reference image 20",

    label:
        "20 / REFERENCE"
},

{ src: "images/inspiration-21.jpg", title: "INSPIRATION 21" },
{ src: "images/inspiration-22.jpg", title: "INSPIRATION 22" },
{ src: "images/inspiration-23.jpg", title: "INSPIRATION 23" },
{ src: "images/inspiration-24.jpg", title: "INSPIRATION 24" },
{ src: "images/inspiration-25.jpg", title: "INSPIRATION 25" },
{ src: "images/inspiration-26.jpg", title: "INSPIRATION 26" },
{ src: "images/inspiration-27.jpg", title: "INSPIRATION 27" },
{ src: "images/inspiration-28.jpg", title: "INSPIRATION 28" },
{ src: "images/inspiration-29.jpg", title: "INSPIRATION 29" },
{ src: "images/inspiration-30.jpg", title: "INSPIRATION 30" },

    ];


    let index = 0;


    /*
     * More copies make the looping carousel
     * stable in both directions.
     */

    const COPIES = 3;


    /* ------------------------------------------------------------
       BUILD
       ------------------------------------------------------------ */

    function buildCarousel() {

        track.innerHTML = "";


        const count =
            inspirationImages.length;


        if (!count) {
            return;
        }


        for (
            let copy = 0;
            copy < COPIES * 2 + 1;
            copy++
        ) {

            inspirationImages.forEach(
                (item, itemIndex) => {

                    const slide =
                        document.createElement(
                            "div"
                        );


                    slide.className =
                        "inspiration-slide";


                    slide.dataset.index =
                        itemIndex;


                    const img =
                        document.createElement(
                            "img"
                        );


                    img.src =
                        item.src;


                    img.alt =
                        item.alt;


                    img.draggable =
                        false;


                    slide.appendChild(
                        img
                    );


                    track.appendChild(
                        slide
                    );

                }
            );

        }


        total.textContent =
            String(
                count
            ).padStart(
                2,
                "0"
            );

    }


    /* ------------------------------------------------------------
       UPDATE
       ------------------------------------------------------------ */

    function updateCarousel(
        animate = true
    ) {

        const slides =
            Array.from(
                track.children
            );


        const count =
            inspirationImages.length;


        if (
            !slides.length ||
            !count
        ) {

            return;

        }


        const centerIndex =
            COPIES * count +
            index;


        const centerSlide =
            slides[centerIndex];


        if (!centerSlide) {
            return;
        }


        /*
         * The slide's center position is measured
         * against the center of the viewport.
         */

        const stageCenter =
            stage.clientWidth / 2;


        const slideCenter =
            centerSlide.offsetLeft +
            centerSlide.offsetWidth / 2;


        const offset =
            stageCenter -
            slideCenter;


        track.style.transition =
            animate
                ? "transform 0.8s cubic-bezier(.22,.61,.36,1)"
                : "none";


        track.style.transform =
            `translate3d(${offset}px, 0, 0)`;


        /* --------------------------------------------------------
           DISTANCE CLASSES
           -------------------------------------------------------- */

        slides.forEach(
            (slide, slideIndex) => {

                slide.classList.remove(
                    "is-center",
                    "distance-1",
                    "distance-2",
                    "distance-3",
                    "distance-far"
                );


                const distance =
                    Math.abs(
                        slideIndex -
                        centerIndex
                    );


                if (
                    distance === 0
                ) {

                    slide.classList.add(
                        "is-center"
                    );

                } else if (
                    distance === 1
                ) {

                    slide.classList.add(
                        "distance-1"
                    );

                } else if (
                    distance === 2
                ) {

                    slide.classList.add(
                        "distance-2"
                    );

                } else if (
                    distance === 3
                ) {

                    slide.classList.add(
                        "distance-3"
                    );

                } else {

                    slide.classList.add(
                        "distance-far"
                    );

                }

            }
        );


        /* --------------------------------------------------------
           TEXT
           -------------------------------------------------------- */

        const item =
            inspirationImages[index];


        caption.textContent =
            item.label;


        current.textContent =
            String(
                index + 1
            ).padStart(
                2,
                "0"
            );

    }


    /* ------------------------------------------------------------
       NEXT
       ------------------------------------------------------------ */

    function nextImage() {

        index++;


        if (
            index >=
            inspirationImages.length
        ) {

            index = 0;

        }


        updateCarousel(
            true
        );

    }


    /* ------------------------------------------------------------
       PREVIOUS
       ------------------------------------------------------------ */

    function previousImage() {

        index--;


        if (index < 0) {

            index =
                inspirationImages.length -
                1;

        }


        updateCarousel(
            true
        );

    }


    /* ------------------------------------------------------------
       BUTTONS
       ------------------------------------------------------------ */

    if (previous) {

        previous.addEventListener(
            "click",
            previousImage
        );

    }


    if (next) {

        next.addEventListener(
            "click",
            nextImage
        );

    }


    /* ------------------------------------------------------------
       KEYBOARD
       ------------------------------------------------------------ */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.target.tagName ===
                    "INPUT" ||
                event.target.tagName ===
                    "TEXTAREA" ||
                event.target.tagName ===
                    "SELECT"
            ) {

                return;

            }


            const carousel =
                document.getElementById(
                    "inspirationCarousel"
                );


            if (!carousel) {
                return;
            }


            const rect =
                carousel.getBoundingClientRect();


            const visible =
                rect.top <
                    window.innerHeight &&
                rect.bottom > 0;


            if (!visible) {
                return;
            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                event.preventDefault();

                previousImage();

            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                event.preventDefault();

                nextImage();

            }

        }
    );


    /* ------------------------------------------------------------
       TOUCH
       ------------------------------------------------------------ */

    let touchStartX = 0;

    let touchStartY = 0;


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
                touch.clientX -
                touchStartX;


            const deltaY =
                touch.clientY -
                touchStartY;


            if (
                Math.abs(deltaX) > 40 &&
                Math.abs(deltaX) >
                    Math.abs(deltaY)
            ) {

                if (
                    deltaX < 0
                ) {

                    nextImage();

                } else {

                    previousImage();

                }

            }

        },
        {
            passive: true
        }
    );


    /* ------------------------------------------------------------
       RESIZE
       ------------------------------------------------------------ */

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    () => {

                        updateCarousel(
                            false
                        );

                    },
                    100
                );

        }
    );


    /* ------------------------------------------------------------
       INITIALIZE
       ------------------------------------------------------------ */

    buildCarousel();


    requestAnimationFrame(
        () => {

            updateCarousel(
                false
            );

        }
    );

})();


/* ============================================================
   CHARACTERS
   ============================================================ */

(function initCharacters() {

    const image =
        document.getElementById(
            "characterImage"
        );

    const number =
        document.getElementById(
            "characterNumber"
        );

    const role =
        document.getElementById(
            "characterRole"
        );

    const name =
        document.getElementById(
            "characterName"
        );

    const bio =
        document.getElementById(
            "characterBio"
        );

    const casting =
        document.getElementById(
            "characterCasting"
        );

    const footerName =
        document.getElementById(
            "characterFooterName"
        );

    const current =
        document.getElementById(
            "characterCurrent"
        );

    const total =
        document.getElementById(
            "characterTotal"
        );

    const previous =
        document.getElementById(
            "characterPrev"
        );

    const next =
        document.getElementById(
            "characterNext"
        );


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


    /* ------------------------------------------------------------
       CHARACTER DATA
       ------------------------------------------------------------ */

    const characters = [

        {
            name:
                "LUCY D'ANGELO",

            role:
                "DANCE DIVISION STUDENT - JUNIOR",

            image:
                "images/character-01-headshot.jpg",

            bio:
                "Lucy D'Angelo is at the center of the story — intelligent and determined.",

            casting:
                "Emily DeForest — Actor"
        },


        {
            name:
                "FRANKIE FLINT",

            role:
                "DANCE DIVISION STUDENT - JUNIOR",

            image:
                "images/character-02-headshot.jpg",

            bio:
                "Frankie is the kind of magnetic performer one dreams of being. They are effortless. Frankie is returning to school after disappearing at the end of the sophomore spring semester and missing the fall semester. No one know why... Frankie discovered that her mother (other mother) is the famous Sandrana Bell",

            casting:
                "Isaac Powell — Actor"
        },


        {
            name:
                "JONAH LENTZ",

            role:
                "FILM STUDENT - SENIOR",

            image:
                "images/character-03-headshot.jpg",

            bio:
                "Jonah is observant and introverted but overcomes these qualities as the discovery their true place in the world as a filmmaker as this project takes over their life. He understands people through the smallest gestures and often notices what everyone else misses. They are desperate to make a name for themselves before graduating with any prospects.",

            casting:
                "Yonatan Gebeyahu — Actor"
        },


        {
            name:
                "JUDE HARRISON",

            role:
                "CHARACTER",

            image:
                "images/character-04-headshot.jpg",

            bio:
                "Jude moves between worlds — a beauty, a talent, and internallly a poet. Their physicality carries both control and vulnerability and leads people to take them for granted by only appreciating them superficially. They begin the season dating Lucy but evolve beyond the smallness of that relationship and being to explore other possibilities (they kiss Frankie, bisexual)",

            casting:
                "Tate Justus — Dancer / Actor / Choreographer"
        },


        {
            name:
                "JACK ZANE",

            role:
                "DANCE DIVISION PROGRAM DIRECTOR / GRAHAM & DOG OBSESSED / FRANKIE'S FATHER",

            image:
                "images/character-05-headshot.jpg",

            bio:
                "Jack is theatrical, complicated and deeply physical. He understands performance as both protection and revelation. A photo of Martha Graham with her dogs hangs on the way behind their desk.",

            casting:
                "Jack Ferver — Actor / Choreographer / Dancer"
        },


        {
            name:
                "BODHI D'ANGELO",

            role:
                "COMPUTER SCIENCE DIVISION - FRESHMAN / LUCY'S BROTHER",

            image:
                "images/character-06-headshot.jpg",

            bio:
                "Bodhi is the spiritually enlightenend character who doesn't know everything.",

            casting:
                "Peter Smith — Actor"
        },


        {
            name:
                "KIM CONRAD",

            role:
                "DUAL DEGREE FILM DIVISION & DANCE DIVISION - JUNIOR",

            image:
                "images/character-07-headshot.jpg",

            bio:
                "Kim is the most explicitly funny character, she is untethered and it keeps her on the outside. She says things like “You’re half black?” (to Frankie) and “I thought you were gay.” (to moser)",

            casting:
                "Becky Abrams — Actor"
        },


        {
            name:
                "LOUISE FLINT",

            role:
                "COMPUTER SCIENCE PROFESSOR / FRANKIE'S MOTHER",

            image:
                "images/character-08-headshot.jpg",

            bio:
                "Louise carries the accumulated history of the people around her. She is perceptive, grounded and emotionally precise.",

            casting:
                "April Mathis — Actor"
        },


        {
            name:
                "SANDRANA BELL",

            role:
                "FAMOUS CONTEMPORARY CHOREOGRAPHER",

            image:
                "images/character-09-headshot.jpg",

            bio:
                "Sandrana is selfish.",

            casting:
                "Bobbi Jean Smith — Choreographer / Dancer"
        }

        ,


        {
            name:
                "REID & HARRIET",

            role:
                "DANCE DIVISION RESIDENT COSTUME DESIGNERS",

            image:
                "images/character-10-headshot.jpg",

            bio:
                "Successful Costume Designers working in the Dance Division.",

            casting:
                "Reid Bartelme and Harriet Jung"
        }

    ];


    let index = 0;


    if (total) {

        total.textContent =
            String(
                characters.length
            ).padStart(
                2,
                "0"
            );

    }


    /* ------------------------------------------------------------
       PRELOAD
       ------------------------------------------------------------ */

    function preloadCharacter(
        characterIndex
    ) {

        if (
            characterIndex < 0 ||
            characterIndex >=
                characters.length
        ) {

            return;

        }


        const preload =
            new Image();


        preload.src =
            characters[
                characterIndex
            ].image;

    }


    function preloadAdjacent() {

        preloadCharacter(
            index + 1
        );

        preloadCharacter(
            index - 1
        );

    }


    /* ------------------------------------------------------------
       IMAGE ERROR HANDLER
       ------------------------------------------------------------ */

    image.addEventListener(
        "error",
        () => {

            console.error(
                "Character image failed to load:",
                image.src
            );


            image.classList.remove(
                "loaded"
            );

            image.classList.remove(
                "is-changing"
            );

        }
    );


    /* ------------------------------------------------------------
       IMAGE LOAD HANDLER
       ------------------------------------------------------------ */

    image.addEventListener(
        "load",
        () => {

            image.classList.remove(
                "is-changing"
            );

            image.classList.add(
                "loaded"
            );

        }
    );


    /* ------------------------------------------------------------
       SHOW CHARACTER
       ------------------------------------------------------------ */

    function showCharacter(
        newIndex,
        animate = true
    ) {

        if (!characters.length) {
            return;
        }


        if (
            newIndex < 0
        ) {

            newIndex =
                characters.length - 1;

        }


        if (
            newIndex >=
            characters.length
        ) {

            newIndex = 0;

        }


        index =
            newIndex;


        const character =
            characters[index];


        if (animate) {

            image.classList.add(
                "is-changing"
            );

        } else {

            image.classList.remove(
                "is-changing"
            );

        }


        /*
         * Remove loaded state before changing
         * the source so the new image fades in
         * only after it actually exists.
         */

        image.classList.remove(
            "loaded"
        );


        image.src =
            character.image;


        image.alt =
            character.name ||
            "Dance Division character";


        number.textContent =
            String(
                index + 1
            ).padStart(
                2,
                "0"
            );


        role.textContent =
            character.role;


        name.textContent =
            character.name ||
            "CHARACTER";


        bio.textContent =
            character.bio;


        casting.textContent =
            character.casting;


        if (footerName) {

            footerName.textContent =
                character.name ||
                "CHARACTER";

        }


        if (current) {

            current.textContent =
                String(
                    index + 1
                ).padStart(
                    2,
                    "0"
                );

        }


        preloadAdjacent();

    }


    /* ------------------------------------------------------------
       BUTTONS
       ------------------------------------------------------------ */

    if (previous) {

        previous.addEventListener(
            "click",
            () => {

                showCharacter(
                    index - 1
                );

            }
        );

    }


    if (next) {

        next.addEventListener(
            "click",
            () => {

                showCharacter(
                    index + 1
                );

            }
        );

    }


    /* ------------------------------------------------------------
       KEYBOARD
       ------------------------------------------------------------ */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.target.tagName ===
                    "INPUT" ||
                event.target.tagName ===
                    "TEXTAREA" ||
                event.target.tagName ===
                    "SELECT"
            ) {

                return;

            }


            const browser =
                document.getElementById(
                    "characterBrowser"
                );


            if (!browser) {
                return;
            }


            const rect =
                browser.getBoundingClientRect();


            const visible =
                rect.top <
                    window.innerHeight &&
                rect.bottom > 0;


            if (!visible) {
                return;
            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                event.preventDefault();

                showCharacter(
                    index - 1
                );

            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                event.preventDefault();

                showCharacter(
                    index + 1
                );

            }

        }
    );


    /* ------------------------------------------------------------
       TOUCH / SWIPE
       ------------------------------------------------------------ */

    let touchStartX = 0;

    let touchStartY = 0;


    const characterStage =
        document.querySelector(
            ".character-stage"
        );


    if (characterStage) {

        characterStage.addEventListener(
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


        characterStage.addEventListener(
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
                    Math.abs(deltaX) > 40 &&
                    Math.abs(deltaX) >
                        Math.abs(deltaY)
                ) {

                    if (
                        deltaX < 0
                    ) {

                        showCharacter(
                            index + 1
                        );

                    } else {

                        showCharacter(
                            index - 1
                        );

                    }

                }

            },
            {
                passive: true
            }
        );

    }


    /* ------------------------------------------------------------
       INITIAL CHARACTER
       ------------------------------------------------------------ */

    showCharacter(
        0,
        false
    );

})();


/* ============================================================
   AUDIO PLAYER
   ============================================================ */

(function initAudioPlayer() {

    const audio =
        document.getElementById(
            "audio"
        );

    const playButton =
        document.getElementById(
            "playButton"
        );

    const progressFill =
        document.getElementById(
            "audioProgressFill"
        );

    const time =
        document.getElementById(
            "audioTime"
        );

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
        Array.from(
            document.querySelectorAll(
                ".audio-item"
            )
        );

    const progressBar =
        document.querySelector(
            ".audio-progress"
        );


    if (!audio) {
        return;
    }


    /* ------------------------------------------------------------
       TIME FORMAT
       ------------------------------------------------------------ */

    function formatTime(
        seconds
    ) {

        if (
            !Number.isFinite(
                seconds
            )
        ) {

            return "00:00";

        }


        const minutes =
            Math.floor(
                seconds / 60
            );


        const secondsRemaining =
            Math.floor(
                seconds % 60
            );


        return (
            String(minutes)
                .padStart(2, "0") +
            ":" +
            String(
                secondsRemaining
            ).padStart(2, "0")
        );

    }


    /* ------------------------------------------------------------
       DISPLAY
       ------------------------------------------------------------ */

    function updateDisplay() {

        if (time) {

            time.textContent =
                formatTime(
                    audio.currentTime
                );

        }


        if (duration) {

            duration.textContent =
                formatTime(
                    audio.duration
                );

        }


        if (
            progressFill &&
            Number.isFinite(
                audio.duration
            ) &&
            audio.duration > 0
        ) {

            const percentage =
                (
                    audio.currentTime /
                    audio.duration
                ) * 100;


            progressFill.style.width =
                `${percentage}%`;

        }

    }


    /* ------------------------------------------------------------
       PLAY BUTTON
       ------------------------------------------------------------ */

    function updatePlayButton() {

        if (!playButton) {
            return;
        }


        playButton.textContent =
            audio.paused
                ? "PLAY"
                : "PAUSE";

    }


    if (playButton) {

        playButton.addEventListener(
            "click",
            () => {

                if (
                    audio.paused
                ) {

                    audio.play()
                        .catch(
                            error => {

                                console.error(
                                    "Audio playback error:",
                                    error
                                );

                            }
                        );

                } else {

                    audio.pause();

                }

            }
        );

    }


    /* ------------------------------------------------------------
       TRACKS
       ------------------------------------------------------------ */

    items.forEach(
        item => {

            item.addEventListener(
                "click",
                () => {

                    const source =
                        item.dataset.src;


                    const title =
                        item.dataset.title ||
                        "";


                    const track =
                        Number(
                            item.dataset.track
                        );


                    if (!source) {
                        return;
                    }


                    audio.pause();


                    audio.src =
                        source;


                    audio.load();


                    if (trackNumber) {

                        trackNumber.textContent =
                            String(
                                track + 1
                            ).padStart(
                                2,
                                "0"
                            );

                    }


                    if (trackTitle) {

                        trackTitle.textContent =
                            title;

                    }


                    items.forEach(
                        other => {

                            other.classList.remove(
                                "active"
                            );

                        }
                    );


                    item.classList.add(
                        "active"
                    );


                    audio.play()
                        .catch(
                            error => {

                                console.error(
                                    "Audio playback error:",
                                    error
                                );

                            }
                        );

                }
            );

        }
    );


    /* ------------------------------------------------------------
       PROGRESS BAR
       ------------------------------------------------------------ */

    if (progressBar) {

        progressBar.addEventListener(
            "click",
            event => {

                if (
                    !Number.isFinite(
                        audio.duration
                    ) ||
                    audio.duration <= 0
                ) {

                    return;

                }


                const rect =
                    progressBar.getBoundingClientRect();


                const percentage =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width;


                audio.currentTime =
                    Math.max(
                        0,
                        Math.min(
                            1,
                            percentage
                        )
                    ) *
                    audio.duration;

            }
        );

    }


    /* ------------------------------------------------------------
       EVENTS
       ------------------------------------------------------------ */

    audio.addEventListener(
        "loadedmetadata",
        updateDisplay
    );


    audio.addEventListener(
        "timeupdate",
        updateDisplay
    );


    audio.addEventListener(
        "play",
        updatePlayButton
    );


    audio.addEventListener(
        "pause",
        updatePlayButton
    );


    audio.addEventListener(
        "ended",
        () => {

            updatePlayButton();


            if (progressFill) {

                progressFill.style.width =
                    "0%";

            }

        }
    );


    updateDisplay();

    updatePlayButton();

})();


/* ============================================================
   REDUCED MOTION
   ============================================================ */

(function initReducedMotion() {

    const mediaQuery =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (
        mediaQuery.matches
    ) {

        document.documentElement.classList.add(
            "reduced-motion"
        );

    }

})();