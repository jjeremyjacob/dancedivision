/* ============================================================
   DANCE DIVISION
   SCRIPT.JS
   ============================================================ */

(() => {

    "use strict";


    /* ========================================================
       LOADER
       ======================================================== */

    const loader = document.getElementById("loader");
    const loaderPercent = document.getElementById("loaderPercent");
    const loaderProgress = document.getElementById("loaderProgress");

    let loaderValue = 0;

    function updateLoader(value) {

        loaderValue = Math.min(100, value);

        if (loaderPercent) {
            loaderPercent.textContent =
                String(Math.round(loaderValue)).padStart(2, "0");
        }

        if (loaderProgress) {
            loaderProgress.style.width = `${loaderValue}%`;
        }
    }

    function finishLoader() {

        updateLoader(100);

        setTimeout(() => {

            if (loader) {
                loader.classList.add("is-hidden");
            }

        }, 350);
    }

    let loaderInterval = setInterval(() => {

        if (loaderValue < 90) {
            updateLoader(loaderValue + Math.random() * 8);
        }

    }, 120);

    window.addEventListener("load", () => {

        clearInterval(loaderInterval);

        updateLoader(100);

        finishLoader();

    });


    /* ========================================================
       NAVIGATION
       ======================================================== */

    const navLinks = document.querySelectorAll(".nav-links a");
    const headerTitle = document.querySelector(".header-title");

    function scrollToSection(id) {

        const section = document.getElementById(id);

        if (!section) return;

        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }


    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const target = link.dataset.target;

            if (target) {
                scrollToSection(target);
            }

        });

    });


    if (headerTitle) {

        headerTitle.addEventListener("click", () => {
            scrollToSection("opening");
        });

    }


    /* ========================================================
       CHAPTER INDICATOR
       ======================================================== */

    const chapters = document.querySelectorAll(".chapter");
    const chapterCurrent = document.getElementById("chapterCurrent");
    const chapterProgress = document.getElementById("chapterProgress");

    const chapterObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const number =
                    entry.target.dataset.chapter || "00";

                if (chapterCurrent) {
                    chapterCurrent.textContent = number;
                }

                navLinks.forEach(link => {

                    link.classList.toggle(
                        "active",
                        link.dataset.target === entry.target.id
                    );

                });

                const index =
                    Array.from(chapters).indexOf(entry.target);

                const progress =
                    chapters.length > 1
                        ? (index / (chapters.length - 1)) * 100
                        : 0;

                if (chapterProgress) {
                    chapterProgress.style.width =
                        `${progress}%`;
                }

            });

        },
        {
            threshold: 0.35
        }
    );


    chapters.forEach(chapter => {
        chapterObserver.observe(chapter);
    });


    /* ========================================================
       PDF VIEWER
       ======================================================== */

    const pdfCanvas =
        document.getElementById("pdfCanvas");

    const pdfStage =
        document.getElementById("pdfStage");

    const pdfLoading =
        document.getElementById("pdfLoading");

    const pdfLoadingProgress =
        document.getElementById("pdfLoadingProgress");

    const pdfCurrentPage =
        document.getElementById("pdfCurrentPage");

    const pdfTotalPages =
        document.getElementById("pdfTotalPages");

    const pdfPrev =
        document.getElementById("pdfPrev");

    const pdfNext =
        document.getElementById("pdfNext");

    const pdfFullscreen =
        document.getElementById("pdfFullscreen");

    const pdfHitLeft =
        document.getElementById("pdfHitLeft");

    const pdfHitRight =
        document.getElementById("pdfHitRight");

    let pdfDocument = null;
    let pdfPageNumber = 1;
    let pdfRendering = false;
    let pdfPendingPage = null;


    if (window.pdfjsLib && pdfCanvas && pdfStage) {

        pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";


        function getPDFScale(page) {

            const viewport =
                page.getViewport({
                    scale: 1
                });

            const stageWidth =
                pdfStage.clientWidth;

            const stageHeight =
                pdfStage.clientHeight;

            const padding = 20;

            const availableWidth =
                Math.max(
                    100,
                    stageWidth - padding
                );

            const availableHeight =
                Math.max(
                    100,
                    stageHeight - padding
                );

            const widthScale =
                availableWidth / viewport.width;

            const heightScale =
                availableHeight / viewport.height;

            return Math.min(
                widthScale,
                heightScale
            );
        }


        async function renderPDFPage(pageNumber) {

            if (!pdfDocument) return;

            if (pdfRendering) {

                pdfPendingPage = pageNumber;

                return;
            }

            pdfRendering = true;

            try {

                const page =
                    await pdfDocument.getPage(pageNumber);

                const scale =
                    getPDFScale(page);

                const viewport =
                    page.getViewport({
                        scale
                    });

                const outputScale =
                    window.devicePixelRatio || 1;

                pdfCanvas.width =
                    Math.floor(
                        viewport.width * outputScale
                    );

                pdfCanvas.height =
                    Math.floor(
                        viewport.height * outputScale
                    );

                pdfCanvas.style.width =
                    `${viewport.width}px`;

                pdfCanvas.style.height =
                    `${viewport.height}px`;

                const context =
                    pdfCanvas.getContext("2d");

                context.setTransform(
                    outputScale,
                    0,
                    0,
                    outputScale,
                    0,
                    0
                );

                await page.render({
                    canvasContext: context,
                    viewport
                }).promise;

                if (pdfCurrentPage) {

                    pdfCurrentPage.textContent =
                        String(pageNumber).padStart(2, "0");

                }

                if (pdfTotalPages) {

                    pdfTotalPages.textContent =
                        String(pdfDocument.numPages)
                            .padStart(2, "0");

                }

            } catch (error) {

                console.error(
                    "PDF render error:",
                    error
                );

            } finally {

                pdfRendering = false;

                if (pdfPendingPage !== null) {

                    const nextPage =
                        pdfPendingPage;

                    pdfPendingPage = null;

                    renderPDFPage(nextPage);
                }

            }

        }


        async function loadPDF() {

            try {

                const loadingTask =
                    pdfjsLib.getDocument("script.pdf");

                loadingTask.onProgress =
                    progressData => {

                        if (
                            progressData.total &&
                            pdfLoadingProgress
                        ) {

                            const percent =
                                (
                                    progressData.loaded /
                                    progressData.total
                                ) * 100;

                            pdfLoadingProgress.style.width =
                                `${percent}%`;
                        }

                    };

                pdfDocument =
                    await loadingTask.promise;

                if (pdfTotalPages) {

                    pdfTotalPages.textContent =
                        String(pdfDocument.numPages)
                            .padStart(2, "0");
                }

                await renderPDFPage(pdfPageNumber);

                if (pdfLoading) {
                    pdfLoading.classList.add("is-hidden");
                }

            } catch (error) {

                console.error(
                    "Unable to load PDF:",
                    error
                );

                if (pdfLoading) {

                    pdfLoading.innerHTML = `
                        <div class="pdf-loading-label">
                            UNABLE TO LOAD SCRIPT
                        </div>
                    `;

                }

            }

        }


        function goToPDFPage(pageNumber) {

            if (!pdfDocument) return;

            if (pageNumber < 1) {
                pageNumber = 1;
            }

            if (pageNumber > pdfDocument.numPages) {
                pageNumber = pdfDocument.numPages;
            }

            pdfPageNumber = pageNumber;

            renderPDFPage(pdfPageNumber);
        }


        if (pdfPrev) {

            pdfPrev.addEventListener(
                "click",
                () => {
                    goToPDFPage(pdfPageNumber - 1);
                }
            );

        }


        if (pdfNext) {

            pdfNext.addEventListener(
                "click",
                () => {
                    goToPDFPage(pdfPageNumber + 1);
                }
            );

        }


        if (pdfHitLeft) {

            pdfHitLeft.addEventListener(
                "click",
                () => {
                    goToPDFPage(pdfPageNumber - 1);
                }
            );

        }


        if (pdfHitRight) {

            pdfHitRight.addEventListener(
                "click",
                () => {
                    goToPDFPage(pdfPageNumber + 1);
                }
            );

        }


        if (pdfFullscreen) {

            pdfFullscreen.addEventListener(
                "click",
                async () => {

                    const viewer =
                        document.getElementById("pdfViewer");

                    if (!viewer) return;

                    try {

                        if (!document.fullscreenElement) {

                            await viewer.requestFullscreen();

                        } else {

                            await document.exitFullscreen();

                        }

                    } catch (error) {

                        console.error(
                            "Fullscreen error:",
                            error
                        );

                    }

                }
            );

        }


        document.addEventListener(
            "fullscreenchange",
            () => {

                if (pdfDocument) {

                    setTimeout(() => {
                        renderPDFPage(pdfPageNumber);
                    }, 100);

                }

            }
        );


        window.addEventListener(
            "resize",
            () => {

                if (pdfDocument) {
                    renderPDFPage(pdfPageNumber);
                }

            }
        );


        loadPDF();

    }


    /* ========================================================
       INSPIRATION CAROUSEL
       ======================================================== */

    const inspirationTrack =
        document.getElementById("inspirationTrack");

    const inspirationCaption =
        document.getElementById("inspirationCaption");

    const inspirationCurrent =
        document.getElementById("inspirationCurrent");

    const inspirationTotal =
        document.getElementById("inspirationTotal");

    const inspirationPrev =
        document.getElementById("inspirationPrev");

    const inspirationNext =
        document.getElementById("inspirationNext");

    const inspirationStage =
        document.querySelector(".inspiration-stage");


    /*
       EXACTLY 30 IMAGES.
       NO INSTAGRAM SLIDE.
    */

    const inspirationImages =
        Array.from(
            { length: 30 },
            (_, index) => {

                const number =
                    String(index + 1).padStart(2, "0");

                return {

                    src:
                        `images/inspiration-${number}.jpg`,

                    alt:
                        `Dance Division inspiration reference ${number}`,

                    label:
                        `${number} / REFERENCE`

                };

            }
        );


    /*
       Carousel state.

       We use 5 copies:

       COPY 0 = 01–30
       COPY 1 = 01–30
       COPY 2 = 01–30  ← visible starting copy
       COPY 3 = 01–30
       COPY 4 = 01–30

       The important part is that we NEVER let the user
       see the actual edge of the carousel.
    */

    const INSPIRATION_COPIES = 5;
    const INSPIRATION_MIDDLE_COPY = 2;
    const INSPIRATION_TOTAL =
        inspirationImages.length;

    let inspirationIndex = 0;

    /*
       Physical position is separate from the visible
       image number.

       This is what makes the looping seamless.
    */

    let inspirationPhysicalIndex =
        INSPIRATION_MIDDLE_COPY *
        INSPIRATION_TOTAL;

    let inspirationSlides = [];

    let inspirationAnimating = false;

    let inspirationTouchStartX = 0;
    let inspirationTouchStartY = 0;


    if (inspirationTotal) {

        inspirationTotal.textContent =
            String(INSPIRATION_TOTAL)
                .padStart(2, "0");

    }


    /* --------------------------------------------------------
       CREATE SLIDES
       -------------------------------------------------------- */

    function createInspirationSlides() {

        if (!inspirationTrack) return;

        inspirationTrack.innerHTML = "";

        inspirationSlides = [];


        for (
            let copy = 0;
            copy < INSPIRATION_COPIES;
            copy++
        ) {

            inspirationImages.forEach(
                (image, imageIndex) => {

                    const slide =
                        document.createElement("div");

                    slide.className =
                        "inspiration-slide";

                    slide.dataset.index =
                        String(imageIndex);

                    slide.dataset.copy =
                        String(copy);


                    const img =
                        document.createElement("img");

                    img.src =
                        image.src;

                    img.alt =
                        image.alt;

                    img.draggable =
                        false;

                    /*
                       Only the middle copy is eager-loaded.
                       This avoids creating a huge loading
                       bottleneck on the initial page load.
                    */

                    img.loading =
                        copy === INSPIRATION_MIDDLE_COPY
                            ? "eager"
                            : "lazy";


                    slide.appendChild(img);

                    inspirationTrack.appendChild(
                        slide
                    );

                    inspirationSlides.push(
                        slide
                    );

                }
            );

        }

    }


    /* --------------------------------------------------------
       GET STEP
       -------------------------------------------------------- */

    function getInspirationStep() {

        if (!inspirationSlides.length) {
            return 0;
        }

        const slide =
            inspirationSlides[0];

        const rect =
            slide.getBoundingClientRect();

        const trackStyle =
            window.getComputedStyle(
                inspirationTrack
            );

        const gap =
            parseFloat(
                trackStyle.columnGap ||
                trackStyle.gap ||
                "0"
            ) || 0;

        return rect.width + gap;
    }


    /* --------------------------------------------------------
       POSITION TRACK
       -------------------------------------------------------- */

    function positionInspiration(
        animate = true
    ) {

        if (!inspirationTrack) return;

        if (!inspirationStage) return;

        if (!inspirationSlides.length) return;


        const step =
            getInspirationStep();

        if (!step) return;


        const slideWidth =
            inspirationSlides[0]
                .getBoundingClientRect()
                .width;


        if (!slideWidth) return;


        const stageWidth =
            inspirationStage.clientWidth;


        /*
           Exact center of the carousel.
        */

        const centerOffset =
            (
                stageWidth -
                slideWidth
            ) / 2;


        const translateX =
            centerOffset -
            (
                inspirationPhysicalIndex *
                step
            );


        /*
           IMPORTANT:
           Transition is controlled ONLY by JS.

           No permanent transition should be applied
           to .inspiration-track in CSS.
        */

        if (animate) {

            inspirationTrack.style.transition =
                "transform 650ms cubic-bezier(.22,.61,.36,1)";

        } else {

            inspirationTrack.style.transition =
                "none";

        }


        inspirationTrack.style.transform =
            `translate3d(${translateX}px, -50%, 0)`;


        updateInspirationClasses();


        if (inspirationCurrent) {

            inspirationCurrent.textContent =
                String(inspirationIndex + 1)
                    .padStart(2, "0");

        }


        if (inspirationCaption) {

            inspirationCaption.textContent =
                inspirationImages[
                    inspirationIndex
                ].label;

        }

    }


    /* --------------------------------------------------------
       UPDATE OPACITY CLASSES
       -------------------------------------------------------- */

    function updateInspirationClasses() {

        if (!inspirationSlides.length) return;


        inspirationSlides.forEach(
            (slide, physicalIndex) => {

                const distance =
                    Math.abs(
                        physicalIndex -
                        inspirationPhysicalIndex
                    );


                slide.classList.remove(
                    "is-center",
                    "distance-1",
                    "distance-2",
                    "distance-3",
                    "distance-far"
                );


                if (distance === 0) {

                    slide.classList.add(
                        "is-center"
                    );

                } else if (distance === 1) {

                    slide.classList.add(
                        "distance-1"
                    );

                } else if (distance === 2) {

                    slide.classList.add(
                        "distance-2"
                    );

                } else if (distance === 3) {

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

    }


    /* --------------------------------------------------------
       SILENTLY RECENTER
       -------------------------------------------------------- */

    function recenterInspiration() {

        if (!inspirationTrack) return;


        const total =
            INSPIRATION_TOTAL;


        /*
           Current physical index.

           Example:

           01 at position 60
           30 at position 89

           If we move forward from 30:

           position 90

           That is COPY 3 / IMAGE 01.

           We silently move to:

           position 60

           Same image.
        */


        const currentImage =
            inspirationIndex;


        const idealPosition =
            (
                INSPIRATION_MIDDLE_COPY *
                total
            ) +
            currentImage;


        if (
            inspirationPhysicalIndex ===
            idealPosition
        ) {
            return;
        }


        /*
           Disable transition BEFORE changing
           the transform.
        */

        inspirationTrack.style.transition =
            "none";


        inspirationPhysicalIndex =
            idealPosition;


        positionInspiration(false);


        /*
           Force the browser to commit the new
           position while transitions are disabled.
        */

        void inspirationTrack.offsetWidth;

    }


    /* --------------------------------------------------------
       MOVE TO IMAGE
       -------------------------------------------------------- */

    function goToInspiration(
        targetIndex
    ) {

        if (!inspirationTrack) return;

        if (inspirationAnimating) return;


        const total =
            INSPIRATION_TOTAL;


        /*
           Normalize target image number.
        */

        let normalizedTarget =
            targetIndex % total;


        if (normalizedTarget < 0) {
            normalizedTarget += total;
        }


        /*
           Determine shortest circular direction.

           This means:

           30 → 01 = +1

           01 → 30 = -1
        */

        let delta =
            normalizedTarget -
            inspirationIndex;


        if (delta > total / 2) {
            delta -= total;
        }


        if (delta < -total / 2) {
            delta += total;
        }


        /*
           If no movement is necessary, don't animate.
        */

        if (delta === 0) {
            return;
        }


        inspirationAnimating = true;


        /*
           Update logical image.
        */

        inspirationIndex =
            (
                inspirationIndex +
                delta +
                total
            ) % total;


        /*
           Update physical position.

           THIS is the important part.

           We do not reset the position here.

           We allow the carousel to actually travel
           from image 30 to the next copy's image 01.
        */

        inspirationPhysicalIndex +=
            delta;


        positionInspiration(true);

    }


    /* --------------------------------------------------------
       TRANSITION END
       -------------------------------------------------------- */

    if (inspirationTrack) {

        inspirationTrack.addEventListener(
            "transitionend",
            event => {

                if (
                    event.propertyName !==
                    "transform"
                ) {
                    return;
                }


                /*
                   Animation has finished.

                   Now silently put the carousel back
                   into the middle copy.

                   Because the current image is identical,
                   the user sees absolutely no jump.
                */

                recenterInspiration();


                /*
                   Recalculate opacity states.
                */

                updateInspirationClasses();


                /*
                   Unlock controls after the browser
                   has committed the silent reposition.
                */

                requestAnimationFrame(() => {

                    inspirationAnimating =
                        false;

                });

            }
        );

    }


    /* --------------------------------------------------------
       INITIALIZE
       -------------------------------------------------------- */

    if (inspirationTrack) {

        createInspirationSlides();


        /*
           Wait until the browser has calculated image
           dimensions before positioning the carousel.

           This is important for avoiding the initial
           loading/position glitch.
        */

        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                positionInspiration(false);

            });

        });

    }


    /* --------------------------------------------------------
       PREVIOUS
       -------------------------------------------------------- */

    if (inspirationPrev) {

        inspirationPrev.addEventListener(
            "click",
            () => {

                goToInspiration(
                    inspirationIndex - 1
                );

            }
        );

    }


    /* --------------------------------------------------------
       NEXT
       -------------------------------------------------------- */

    if (inspirationNext) {

        inspirationNext.addEventListener(
            "click",
            () => {

                goToInspiration(
                    inspirationIndex + 1
                );

            }
        );

    }


    /* --------------------------------------------------------
       CLICK ON IMAGE
       -------------------------------------------------------- */

    if (inspirationTrack) {

        inspirationTrack.addEventListener(
            "click",
            event => {

                const slide =
                    event.target.closest(
                        ".inspiration-slide"
                    );

                if (!slide) return;


                const clickedIndex =
                    Number(
                        slide.dataset.index
                    );


                if (
                    Number.isNaN(
                        clickedIndex
                    )
                ) {
                    return;
                }


                /*
                   Find the shortest circular route
                   to the clicked image.
                */

                let delta =
                    clickedIndex -
                    inspirationIndex;


                if (
                    delta >
                    INSPIRATION_TOTAL / 2
                ) {

                    delta -=
                        INSPIRATION_TOTAL;

                }


                if (
                    delta <
                    -INSPIRATION_TOTAL / 2
                ) {

                    delta +=
                        INSPIRATION_TOTAL;

                }


                goToInspiration(
                    inspirationIndex + delta
                );

            }
        );

    }


    /* --------------------------------------------------------
       KEYBOARD
       -------------------------------------------------------- */

    document.addEventListener(
        "keydown",
        event => {

            const active =
                document.activeElement;


            if (
                active &&
                (
                    active.tagName === "INPUT" ||
                    active.tagName === "TEXTAREA" ||
                    active.tagName === "SELECT"
                )
            ) {
                return;
            }


            /*
               Only use the arrow keys for the inspiration
               carousel when the inspiration section is
               actually visible.
            */

            const inspirationSection =
                document.getElementById(
                    "inspiration"
                );


            if (!inspirationSection) {
                return;
            }


            const rect =
                inspirationSection
                    .getBoundingClientRect();


            const visible =
                rect.top <
                    window.innerHeight &&
                rect.bottom >
                    0;


            if (!visible) {
                return;
            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                event.preventDefault();

                goToInspiration(
                    inspirationIndex - 1
                );

            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                event.preventDefault();

                goToInspiration(
                    inspirationIndex + 1
                );

            }

        }
    );


    /* --------------------------------------------------------
       TOUCH
       -------------------------------------------------------- */

    if (inspirationStage) {

        inspirationStage.addEventListener(
            "touchstart",
            event => {

                if (!event.touches.length) {
                    return;
                }


                inspirationTouchStartX =
                    event.touches[0].clientX;

                inspirationTouchStartY =
                    event.touches[0].clientY;

            },
            {
                passive: true
            }
        );


        inspirationStage.addEventListener(
            "touchend",
            event => {

                if (
                    !event.changedTouches.length
                ) {
                    return;
                }


                const endX =
                    event.changedTouches[0]
                        .clientX;

                const endY =
                    event.changedTouches[0]
                        .clientY;


                const deltaX =
                    endX -
                    inspirationTouchStartX;

                const deltaY =
                    endY -
                    inspirationTouchStartY;


                /*
                   Ignore vertical scrolling.
                */

                if (
                    Math.abs(deltaX) <
                    45
                ) {
                    return;
                }


                if (
                    Math.abs(deltaX) <
                    Math.abs(deltaY)
                ) {
                    return;
                }


                if (deltaX < 0) {

                    goToInspiration(
                        inspirationIndex + 1
                    );

                } else {

                    goToInspiration(
                        inspirationIndex - 1
                    );

                }

            },
            {
                passive: true
            }
        );

    }


    /* --------------------------------------------------------
       RESIZE
       -------------------------------------------------------- */

    let inspirationResizeTimer = null;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                inspirationResizeTimer
            );


            inspirationResizeTimer =
                setTimeout(() => {

                    if (
                        inspirationTrack &&
                        inspirationSlides.length
                    ) {

                        /*
                           Never animate on resize.
                        */

                        inspirationTrack.style.transition =
                            "none";


                        /*
                           Keep the current image
                           centered.
                        */

                        inspirationPhysicalIndex =
                            (
                                INSPIRATION_MIDDLE_COPY *
                                INSPIRATION_TOTAL
                            ) +
                            inspirationIndex;


                        positionInspiration(
                            false
                        );

                    }

                }, 100);

        }
    );


    /* ========================================================
       CONTENT REFERENCES
       ======================================================== */

    const inspirationContent = [

    {
        type:
            "INSTAGRAM REEL",

        description:
            "EMILY DEFOREST SUNGLASSES.",

        link:
            "https://www.instagram.com/p/DaWM3k8HdkH/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA=="
    },

    {
        type:
            "INSTAGRAM REEL",

        description:
            "ISAAC POWELL CRUISING.",

        link:
            "https://www.instagram.com/reel/Dap7SnjxNoi/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA=="
    },

    {
        type:
            "INSTAGRAM REEL",

        description:
            "TATE JUSTUS DANCING.",

        link:
            "https://www.instagram.com/tv/CY5Vkm5lN6d/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA=="
    },

    {
        type:
            "INSTAGRAM REEL",

        description:
            "JACK FERVER DRAMATUB.",

        link:
            "https://www.instagram.com/reel/CpWSn_-j2P4/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA=="
    },

    {
        type:
            "INSTAGRAM REEL",

        description:
            "YONATAN GEBEYAHU MOLIERING.",

        link:
            "https://www.instagram.com/reel/DCE791xvB4l/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA=="
    },

    {
        type:
            "YOUTUBE",

        description:
            "SMERZ \"DREAMS\" DANCE VIDEO REFERENCE.",

        link:
            "https://www.youtube.com/watch?v=Tkyn9CyxIIM"
    }

];


    const inspirationReferences =
        document.getElementById(
            "inspirationReferences"
        );

    const inspirationReferencesToggle =
        document.getElementById(
            "inspirationReferencesToggle"
        );

    const inspirationReferencesCount =
        document.getElementById(
            "inspirationReferencesCount"
        );

    const inspirationReferencesIcon =
        document.getElementById(
            "inspirationReferencesIcon"
        );

    const inspirationReferenceList =
        document.getElementById(
            "inspirationReferenceList"
        );


    function buildContentReferences() {

        if (!inspirationReferenceList) {
            return;
        }


        inspirationReferenceList.innerHTML = "";


        inspirationContent.forEach(
            (item, index) => {

                const link =
                    document.createElement("a");


                link.className =
                    "inspiration-reference";


                link.href =
                    item.link;


                link.target =
                    "_blank";


                link.rel =
                    "noopener noreferrer";


                const number =
                    document.createElement("span");


                number.className =
                    "reference-number";


                number.textContent =
                    String(index + 1)
                        .padStart(2, "0");


                const type =
                    document.createElement("span");


                type.className =
                    "reference-type";


                type.textContent =
                    item.type;


                const description =
                    document.createElement("span");


                description.className =
                    "reference-description";


                description.textContent =
                    item.description;


                const arrow =
                    document.createElement("span");


                arrow.className =
                    "reference-arrow";


                arrow.textContent =
                    "↗";


                link.appendChild(number);
                link.appendChild(type);
                link.appendChild(description);
                link.appendChild(arrow);


                inspirationReferenceList.appendChild(
                    link
                );

            }
        );


        if (inspirationReferencesCount) {

            inspirationReferencesCount.textContent =
                String(inspirationContent.length)
                    .padStart(2, "0");

        }

    }


    buildContentReferences();


    if (
        inspirationReferencesToggle &&
        inspirationReferences
    ) {

        inspirationReferencesToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    inspirationReferences
                        .classList
                        .toggle("open");


                inspirationReferencesToggle
                    .setAttribute(
                        "aria-expanded",
                        String(isOpen)
                    );


                if (inspirationReferencesIcon) {

                    inspirationReferencesIcon
                        .textContent =
                        isOpen
                            ? "−"
                            : "+";

                }

            }
        );

    }


    /* ========================================================
       CHARACTERS
       ======================================================== */

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
                "FILM DIVISION STUDENT - SENIOR",

            image:
                "images/character-03-headshot.jpg",

            bio:
                "Jonah is observant and introverted but overcomes these qualities as they discovery their true place in the world as a filmmaker as this project takes over their life. He understands people through the smallest gestures and often notices what everyone else misses. They are desperate to make a name for themselves before graduating with any prospects.",

            casting:
                "Yonatan Gebeyahu — Actor"
        },


        {
            name:
                "JUDE HARRISON",

            role:
                "DANCE DIVISION STUDENT - JUNIOR",

            image:
                "images/character-04-headshot.jpg",

            bio:
                "Jude moves between worlds — a beauty, a talent, and (internallly) a poet. Their physicality carries both control and vulnerability and leads people to take them for granted by only appreciating them superficially. They begin the season dating Lucy but evolve beyond the smallness of that relationship and being to explore other possibilities (they kiss Frankie, bisexual)",

            casting:
                "Tate Justus — Dancer / Actor / Choreographer"
        },


        {
            name:
                "HENRY ZANE",

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
                "COMPUTER SCIENCE DIVISION STUDENT - FRESHMAN / LUCY'S BROTHER",

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
                "DUAL DEGREE FILM DIVISION & DANCE DIVISION STUDENT - JUNIOR",

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
        },


        {
            name:
                "REID & HARRIET",

            role:
                "FAMOUS CONTEMPORARY DANCE COSTUME DESIGNERS",

            image:
                "images/character-10-headshot.jpg",

            bio:
                "Successful costume designers currently in residence at Bardonia.",

            casting:
                "Reid Bartelme & Harriet Jung"
        }


    ];


    const characterImage =
        document.getElementById(
            "characterImage"
        );

    const characterNumber =
        document.getElementById(
            "characterNumber"
        );

    const characterRole =
        document.getElementById(
            "characterRole"
        );

    const characterName =
        document.getElementById(
            "characterName"
        );

    const characterBio =
        document.getElementById(
            "characterBio"
        );

    const characterCasting =
        document.getElementById(
            "characterCasting"
        );

    const characterFooterName =
        document.getElementById(
            "characterFooterName"
        );

    const characterPrev =
        document.getElementById(
            "characterPrev"
        );

    const characterNext =
        document.getElementById(
            "characterNext"
        );

    const characterCurrent =
        document.getElementById(
            "characterCurrent"
        );

    const characterTotal =
        document.getElementById(
            "characterTotal"
        );


    let characterIndex = 0;


    if (characterTotal) {

        characterTotal.textContent =
            String(characters.length)
                .padStart(2, "0");

    }


    function updateCharacter(
        index
    ) {

        if (!characters.length) {
            return;
        }


        characterIndex =
            (
                index %
                characters.length +
                characters.length
            ) %
            characters.length;


        const character =
            characters[characterIndex];


        if (characterImage) {

            characterImage.classList.remove(
                "loaded"
            );


            characterImage.classList.add(
                "is-changing"
            );


            const preload =
                new Image();


            preload.onload = () => {

                characterImage.src =
                    character.image;

                characterImage.alt =
                    character.name;


                requestAnimationFrame(() => {

                    characterImage.classList
                        .remove(
                            "is-changing"
                        );

                    characterImage.classList
                        .add(
                            "loaded"
                        );

                });

            };


            preload.onerror = () => {

                console.error(
                    "Unable to load character image:",
                    character.image
                );


                characterImage.src =
                    character.image;

                characterImage.alt =
                    character.name;


                characterImage.classList
                    .remove(
                        "is-changing"
                    );

            };


            preload.src =
                character.image;

        }


        if (characterNumber) {

            characterNumber.textContent =
                String(characterIndex + 1)
                    .padStart(2, "0");

        }


        if (characterCurrent) {

            characterCurrent.textContent =
                String(characterIndex + 1)
                    .padStart(2, "0");

        }


        if (characterRole) {

            characterRole.textContent =
                character.role;

        }


        if (characterName) {

            characterName.textContent =
                character.name;

        }


        if (characterBio) {

            characterBio.textContent =
                character.bio;

        }


        if (characterCasting) {

            characterCasting.textContent =
                character.casting;

        }


        if (characterFooterName) {

            characterFooterName.textContent =
                character.name;

        }

    }


    if (characterPrev) {

        characterPrev.addEventListener(
            "click",
            () => {

                updateCharacter(
                    characterIndex - 1
                );

            }
        );

    }


    if (characterNext) {

        characterNext.addEventListener(
            "click",
            () => {

                updateCharacter(
                    characterIndex + 1
                );

            }
        );

    }


    if (characterImage) {

        characterImage.addEventListener(
            "load",
            () => {

                characterImage.classList.add(
                    "loaded"
                );

                characterImage.classList.remove(
                    "is-changing"
                );

            }
        );

    }


    updateCharacter(0);


    /* ========================================================
       AUDIO
       ======================================================== */

    const audio =
        document.getElementById("audio");

    const playButton =
        document.getElementById("playButton");

    const audioProgress =
        document.querySelector(".audio-progress");

    const audioProgressFill =
        document.getElementById(
            "audioProgressFill"
        );

    const audioTime =
        document.getElementById("audioTime");

    const audioDuration =
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

    const audioItems =
        document.querySelectorAll(
            ".audio-item"
        );


    const tracks = [

        {
            src:
                "audio/dns dvsn.mp3",

            title:
                "DNS DVSN",

            lyrics: [

                "DNS DVSN",
                "DNS DNS DVSN",
                "DNS DVSN",
                "DNS DNS DVSN",

                "",

                "HERE WE ARE",
                "WE ARE",
                "FOR YOU",
                "TO DO WITH US",
                "WE’LL DO FOR YOU",
                "ALL DAY FOR YOU",
                "ALL NIGHT FOR YOU",
                "WE’LL DO FOR YOU",
                "DNS D",

                "",

                "DNS DVSN",
                "DNS DNS DVSN",
                "DNS DVSN",
                "DNS DNS DVSN",

                "",

                "HERE WE ARE",
                "HERE WE ARE",
                "HERE WE ARE",
                "FOR YOU",
                "TO DO",
                "WITH US",
                "WE’LL DO",
                "FOR YOU",

                "",

                "WE’VE BEEN TRAINING",
                "WE’VE BEEN SPINNING",
                "WE’RE NOT PLAYIN",
                "WE’VE BEEN STRAININ",
                "BUT NOW",
                "ITS TIME",
                "FOR YOU",
                "TO DO",
                "WITH US",
                "WE’LL DO",
                "FOR YOU",
                "ALL DAY",
                "FOR YOU",
                "FOR YOU",
                "ITS TRUE",

                "",

                "DNS DVSN",
                "DNS DNS DVSN",
                "DNS DVSN",
                "DNS DNS DVSN",
                "DNS DVSN",
                "DNS DNS DVSN",
                "DNS DVSN",
                "DNS DNS DVSN"

            ]

        },


        {
            src:
                "audio/fun.mp3",

            title:
                "F U N",

            lyrics: [

                "Hey you",
                "Get over here",
                "I wanta",
                "I needa",
                "I gotta",
                "Oh pleasa gotta",
                "ef you en",

                "",

                "At the party",
                "At the disco",
                "At the deli",
                "At the bistro",

                "",

                "I wanta",
                "I needa",
                "I gotta",
                "ef you en",
                "I needa",
                "I musta",
                "I lusta",
                "ef you en",

                "",

                "Take meeeeee",
                "Away from heeeeerrrah",
                "Let’s go as far away as we can",
                "Take meeeeee",
                "Away from heeeerraaah",
                "Let’s go as far away as we can",

                "",

                "To the city",
                "To the country",
                "To the walmart",
                "To the water park",

                "",

                "I wanta",
                "I needa",
                "I gotta",
                "I really do I lusta afta",
                "ef you en",
                "I needa",
                "I musta",
                "I lusta",
                "ef you en"

            ]

        },


        {
            src:
                "audio/star star star.mp3",

            title:
                "STAR STAR STAR",

            lyrics: []

        }

    ];


    let currentTrackIndex = 0;
    let pendingAutoplay = false;


    function formatTime(seconds) {

        if (
            !Number.isFinite(seconds) ||
            seconds < 0
        ) {
            return "00:00";
        }


        const minutes =
            Math.floor(seconds / 60);

        const remaining =
            Math.floor(seconds % 60);


        return (
            String(minutes).padStart(2, "0") +
            ":" +
            String(remaining).padStart(2, "0")
        );

    }


    function updateAudioDisplay() {

        const track =
            tracks[currentTrackIndex];


        if (trackNumber) {

            trackNumber.textContent =
                String(currentTrackIndex + 1)
                    .padStart(2, "0");

        }


        if (trackTitle) {

            trackTitle.textContent =
                track.title;

        }


        if (audioTime) {

            audioTime.textContent =
                formatTime(
                    audio
                        ? audio.currentTime
                        : 0
                );

        }


        if (audioDuration) {

            audioDuration.textContent =
                formatTime(
                    audio
                        ? audio.duration
                        : 0
                );

        }


        if (audioProgressFill) {

            const percent =
                audio &&
                Number.isFinite(audio.duration) &&
                audio.duration > 0

                    ? (
                        audio.currentTime /
                        audio.duration
                    ) * 100

                    : 0;


            audioProgressFill.style.width =
                `${percent}%`;

        }


        audioItems.forEach(
            (item, index) => {

                item.classList.toggle(
                    "active",
                    index === currentTrackIndex
                );

            }
        );

    }


    function updatePlayButton() {

        if (!playButton || !audio) {
            return;
        }


        playButton.textContent =
            audio.paused
                ? "PLAY"
                : "PAUSE";

    }


    function loadTrack(
        index,
        autoplay = false
    ) {

        if (!audio) return;


        if (
            index < 0 ||
            index >= tracks.length
        ) {
            return;
        }


        currentTrackIndex =
            index;

        pendingAutoplay =
            autoplay;


        audio.pause();


        audio.removeAttribute("src");

        audio.load();


        audio.src =
            tracks[index].src;

        audio.preload =
            "metadata";


        updateAudioDisplay();

        updateLyrics();


        audio.load();


        updatePlayButton();

    }


    if (audio) {

        audio.addEventListener(
            "loadedmetadata",
            () => {

                updateAudioDisplay();

            }
        );


        audio.addEventListener(
            "durationchange",
            () => {

                updateAudioDisplay();

            }
        );


        audio.addEventListener(
            "timeupdate",
            () => {

                updateAudioDisplay();

            }
        );


        audio.addEventListener(
            "play",
            () => {

                updatePlayButton();

            }
        );


        audio.addEventListener(
            "pause",
            () => {

                updatePlayButton();

            }
        );


        audio.addEventListener(
            "canplay",
            () => {

                if (!pendingAutoplay) {
                    return;
                }


                pendingAutoplay =
                    false;


                audio.play()
                    .catch(error => {

                        console.warn(
                            "Audio playback was blocked:",
                            error
                        );

                    });

            }
        );


        audio.addEventListener(
            "ended",
            () => {

                if (
                    currentTrackIndex <
                    tracks.length - 1
                ) {

                    loadTrack(
                        currentTrackIndex + 1,
                        true
                    );

                } else {

                    updatePlayButton();

                }

            }
        );


        audio.addEventListener(
            "error",
            () => {

                console.error(
                    "Audio error:",
                    audio.error
                );

            }
        );

    }


    if (playButton && audio) {

        playButton.addEventListener(
            "click",
            () => {

                if (audio.paused) {

                    audio.play()
                        .catch(error => {

                            console.warn(
                                "Playback failed:",
                                error
                            );

                        });

                } else {

                    audio.pause();

                }

            }
        );

    }


    audioItems.forEach(
        (item, index) => {

            item.addEventListener(
                "click",
                () => {

                    const dataTrack =
                        Number(
                            item.dataset.track
                        );


                    const targetTrack =
                        Number.isInteger(dataTrack)
                            ? dataTrack
                            : index;


                    loadTrack(
                        targetTrack,
                        true
                    );

                }
            );

        }
    );


    if (audioProgress && audio) {

        audioProgress.addEventListener(
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
                    audioProgress
                        .getBoundingClientRect();


                const ratio =
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
                            ratio
                        )
                    ) *
                    audio.duration;

            }
        );

    }


    if (audio && tracks.length) {

        loadTrack(
            0,
            false
        );

    }


    /* ========================================================
       LYRICS
       ======================================================== */

    const lyricsPanel =
        document.getElementById(
            "lyricsPanel"
        );

    const lyricsToggle =
        document.getElementById(
            "lyricsToggle"
        );

    const lyricsTrackNumber =
        document.getElementById(
            "lyricsTrackNumber"
        );

    const lyricsToggleIcon =
        document.getElementById(
            "lyricsToggleIcon"
        );

    const lyricsInner =
        document.getElementById(
            "lyricsInner"
        );


    function updateLyrics() {

        if (!lyricsInner) {
            return;
        }


        const track =
            tracks[currentTrackIndex];


        lyricsInner.innerHTML = "";


        if (
            !track ||
            !track.lyrics ||
            track.lyrics.length === 0
        ) {

            const placeholder =
                document.createElement(
                    "div"
                );

            placeholder.className =
                "lyrics-placeholder";

            placeholder.textContent =
                "NO LYRICS AVAILABLE.";

            lyricsInner.appendChild(
                placeholder
            );

        } else {

            track.lyrics.forEach(
                line => {

                    if (line === "") {

                        const spacer =
                            document.createElement(
                                "div"
                            );

                        spacer.className =
                            "lyrics-spacer";

                        lyricsInner.appendChild(
                            spacer
                        );

                    } else {

                        const lyricLine =
                            document.createElement(
                                "div"
                            );

                        lyricLine.className =
                            "lyrics-line";

                        lyricLine.textContent =
                            line;

                        lyricsInner.appendChild(
                            lyricLine
                        );

                    }

                }
            );

        }


        if (lyricsTrackNumber) {

            lyricsTrackNumber.textContent =
                String(currentTrackIndex + 1)
                    .padStart(2, "0");

        }

    }


    if (
        lyricsToggle &&
        lyricsPanel
    ) {

        lyricsToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    lyricsPanel.classList
                        .toggle("open");


                lyricsToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );


                if (lyricsToggleIcon) {

                    lyricsToggleIcon.textContent =
                        isOpen
                            ? "−"
                            : "+";

                }

            }
        );

    }


    updateLyrics();


    /* ========================================================
       REDUCED MOTION
       ======================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (reducedMotion.matches) {

        document.documentElement
            .classList
            .add("reduced-motion");

    }


    /* ========================================================
       FINAL RESIZE POSITION
       ======================================================== */

    window.addEventListener(
        "load",
        () => {

            setTimeout(() => {

                if (
                    inspirationTrack &&
                    inspirationSlides.length
                ) {

                    /*
                       At page load, always establish the
                       center position without animation.
                    */

                    inspirationPhysicalIndex =
                        (
                            INSPIRATION_MIDDLE_COPY *
                            INSPIRATION_TOTAL
                        ) +
                        inspirationIndex;


                    positionInspiration(
                        false
                    );

                }

            }, 100);

        }
    );


})();