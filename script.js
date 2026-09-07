/* ============================================================
   DANCE DIVISION
   SCRIPT.JS
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* ========================================================
       LOADER
       ======================================================== */

    const loader = document.getElementById("loader");
    const loaderPercent = document.getElementById("loaderPercent");
    const loaderProgress = document.getElementById("loaderProgress");

    let loadValue = 0;

    function updateLoader() {

        if (!loader || !loaderPercent || !loaderProgress) {
            return;
        }

        loadValue += Math.floor(Math.random() * 7) + 4;

        if (loadValue > 100) {
            loadValue = 100;
        }

        loaderPercent.textContent =
            String(loadValue).padStart(2, "0");

        loaderProgress.style.width = `${loadValue}%`;

        if (loadValue < 100) {

            const delay =
                Math.floor(Math.random() * 100) + 45;

            setTimeout(updateLoader, delay);

        } else {

            setTimeout(() => {
                loader.classList.add("loaded");
            }, 450);
        }
    }

    updateLoader();


    /* ========================================================
       NAVIGATION
       ======================================================== */

    const navLinks =
        document.querySelectorAll(".nav-links a[data-target]");

    const headerTitle =
        document.querySelector(".header-title[data-target]");

    function scrollToChapter(id) {

        const target =
            document.getElementById(id);

        if (!target) {
            return;
        }

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const target =
                link.dataset.target;

            scrollToChapter(target);
        });
    });

    if (headerTitle) {

        headerTitle.addEventListener("click", event => {

            event.preventDefault();

            scrollToChapter("opening");
        });
    }


    /* ========================================================
       CHAPTER TRACKING
       ======================================================== */

    const chapters =
        document.querySelectorAll(".chapter[data-chapter]");

    const chapterCurrent =
        document.getElementById("chapterCurrent");

    const chapterProgress =
        document.getElementById("chapterProgress");

    function updateChapter(chapter) {

        const chapterNumber =
            chapter.dataset.chapter;

        if (chapterCurrent) {
            chapterCurrent.textContent =
                chapterNumber;
        }

        navLinks.forEach(link => {

            link.classList.toggle(
                "active",
                link.dataset.target === chapter.id
            );
        });

        if (chapterProgress) {

            const number =
                parseInt(chapterNumber, 10);

            const total =
                Math.max(chapters.length - 1, 1);

            const percentage =
                Math.min((number / total) * 100, 100);

            chapterProgress.style.width =
                `${percentage}%`;
        }
    }

    const chapterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {
                        updateChapter(entry.target);
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

    const PDF_URL = "script.pdf";

    const pdfViewer =
        document.getElementById("pdfViewer");

    const pdfStage =
        document.getElementById("pdfStage");

    const pdfCanvas =
        document.getElementById("pdfCanvas");

    const pdfLoading =
        document.getElementById("pdfLoading");

    const pdfLoadingProgress =
        document.getElementById("pdfLoadingProgress");

    const pdfPrev =
        document.getElementById("pdfPrev");

    const pdfNext =
        document.getElementById("pdfNext");

    const pdfFullscreen =
        document.getElementById("pdfFullscreen");

    const pdfCurrentPage =
        document.getElementById("pdfCurrentPage");

    const pdfTotalPages =
        document.getElementById("pdfTotalPages");

    const pdfHitLeft =
        document.getElementById("pdfHitLeft");

    const pdfHitRight =
        document.getElementById("pdfHitRight");

    let pdfDocument = null;
    let pdfPageNumber = 1;
    let pdfRendering = false;
    let pdfPendingPage = null;


    /* --------------------------------------------------------
       PDF HIT AREAS
       Position them exactly over the rendered page.
       -------------------------------------------------------- */

    function positionPDFHitAreas() {

        if (
            !pdfCanvas ||
            !pdfStage ||
            !pdfHitLeft ||
            !pdfHitRight
        ) {
            return;
        }

        const canvasRect =
            pdfCanvas.getBoundingClientRect();

        const stageRect =
            pdfStage.getBoundingClientRect();

        if (
            canvasRect.width === 0 ||
            canvasRect.height === 0
        ) {
            return;
        }

        const left =
            canvasRect.left - stageRect.left;

        const top =
            canvasRect.top - stageRect.top;

        const width =
            canvasRect.width;

        const height =
            canvasRect.height;

        const halfWidth =
            width / 2;

        pdfHitLeft.style.left =
            `${left}px`;

        pdfHitLeft.style.top =
            `${top}px`;

        pdfHitLeft.style.width =
            `${halfWidth}px`;

        pdfHitLeft.style.height =
            `${height}px`;

        pdfHitRight.style.left =
            `${left + halfWidth}px`;

        pdfHitRight.style.top =
            `${top}px`;

        pdfHitRight.style.width =
            `${halfWidth}px`;

        pdfHitRight.style.height =
            `${height}px`;
    }


    /* --------------------------------------------------------
       RENDER PDF PAGE
       -------------------------------------------------------- */

    async function renderPDFPage(pageNumber) {

        if (!pdfDocument || !pdfCanvas) {
            return;
        }

        pdfRendering = true;

        const page =
            await pdfDocument.getPage(pageNumber);

        const stageRect =
            pdfStage.getBoundingClientRect();

        const stageWidth =
            stageRect.width;

        const stageHeight =
            stageRect.height;

        const baseViewport =
            page.getViewport({
                scale: 1
            });

        const widthScale =
            (stageWidth * 0.90) /
            baseViewport.width;

        const heightScale =
            (stageHeight * 0.95) /
            baseViewport.height;

        let scale =
            Math.min(widthScale, heightScale);

        const devicePixelRatio =
            Math.min(window.devicePixelRatio || 1, 2);

        const viewport =
            page.getViewport({
                scale: scale
            });

        pdfCanvas.width =
            Math.floor(
                viewport.width * devicePixelRatio
            );

        pdfCanvas.height =
            Math.floor(
                viewport.height * devicePixelRatio
            );

        pdfCanvas.style.width =
            `${viewport.width}px`;

        pdfCanvas.style.height =
            `${viewport.height}px`;

        const context =
            pdfCanvas.getContext("2d", {
                alpha: false
            });

        context.setTransform(
            devicePixelRatio,
            0,
            0,
            devicePixelRatio,
            0,
            0
        );

        context.fillStyle = "#e5e0d7";

        context.fillRect(
            0,
            0,
            viewport.width,
            viewport.height
        );

        await page.render({
            canvasContext: context,
            viewport: viewport
        }).promise;

        pdfPageNumber = pageNumber;

        if (pdfCurrentPage) {
            pdfCurrentPage.textContent =
                String(pageNumber).padStart(2, "0");
        }

        if (pdfPrev) {
            pdfPrev.disabled =
                pageNumber <= 1;
        }

        if (pdfNext) {
            pdfNext.disabled =
                pageNumber >= pdfDocument.numPages;
        }

        pdfRendering = false;

        positionPDFHitAreas();

        if (pdfPendingPage !== null) {

            const nextPage =
                pdfPendingPage;

            pdfPendingPage = null;

            renderPDFPage(nextPage);
        }
    }


    /* --------------------------------------------------------
       QUEUE PDF PAGE
       -------------------------------------------------------- */

    function queuePDFPage(pageNumber) {

        if (!pdfDocument) {
            return;
        }

        const target =
            Math.max(
                1,
                Math.min(
                    pageNumber,
                    pdfDocument.numPages
                )
            );

        if (pdfRendering) {

            pdfPendingPage = target;

        } else {

            renderPDFPage(target);
        }
    }


    /* --------------------------------------------------------
       NEXT / PREVIOUS
       -------------------------------------------------------- */

    function nextPDFPage() {

        if (!pdfDocument) {
            return;
        }

        if (pdfPageNumber < pdfDocument.numPages) {
            queuePDFPage(pdfPageNumber + 1);
        }
    }

    function previousPDFPage() {

        if (!pdfDocument) {
            return;
        }

        if (pdfPageNumber > 1) {
            queuePDFPage(pdfPageNumber - 1);
        }
    }


    if (pdfPrev) {
        pdfPrev.addEventListener(
            "click",
            previousPDFPage
        );
    }

    if (pdfNext) {
        pdfNext.addEventListener(
            "click",
            nextPDFPage
        );
    }

    if (pdfHitLeft) {
        pdfHitLeft.addEventListener(
            "click",
            previousPDFPage
        );
    }

    if (pdfHitRight) {
        pdfHitRight.addEventListener(
            "click",
            nextPDFPage
        );
    }


    /* --------------------------------------------------------
       LOAD PDF
       -------------------------------------------------------- */

    async function loadPDF() {

        if (
            typeof pdfjsLib === "undefined" ||
            !pdfCanvas ||
            !pdfStage
        ) {
            console.error(
                "PDF.js is unavailable."
            );

            if (pdfLoading) {
                pdfLoading.style.display = "none";
            }

            return;
        }

        pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

        try {

            const loadingTask =
                pdfjsLib.getDocument(PDF_URL);

            loadingTask.onProgress = progressData => {

                if (
                    !pdfLoadingProgress ||
                    !progressData.total
                ) {
                    return;
                }

                const percentage =
                    (progressData.loaded /
                        progressData.total) *
                    100;

                pdfLoadingProgress.style.width =
                    `${percentage}%`;
            };

            pdfDocument =
                await loadingTask.promise;

            if (pdfTotalPages) {
                pdfTotalPages.textContent =
                    String(pdfDocument.numPages)
                        .padStart(2, "0");
            }

            await renderPDFPage(1);

            if (pdfLoading) {

                pdfLoading.style.opacity = "0";
                pdfLoading.style.pointerEvents = "none";

                setTimeout(() => {
                    pdfLoading.style.display = "none";
                }, 350);
            }

        } catch (error) {

            console.error(
                "Unable to load script.pdf:",
                error
            );

            /*
             * No visible error message.
             * The page simply removes the loading screen.
             */

            if (pdfLoading) {
                pdfLoading.style.display = "none";
            }
        }
    }

    loadPDF();


    /* --------------------------------------------------------
       PDF RESIZE
       -------------------------------------------------------- */

    let pdfResizeTimer = null;

    window.addEventListener("resize", () => {

        clearTimeout(pdfResizeTimer);

        pdfResizeTimer =
            setTimeout(() => {

                if (pdfDocument) {
                    renderPDFPage(pdfPageNumber);
                }

            }, 180);
    });


    /* --------------------------------------------------------
       PDF FULLSCREEN
       -------------------------------------------------------- */

    if (pdfFullscreen && pdfViewer) {

        pdfFullscreen.addEventListener(
            "click",
            async () => {

                try {

                    if (!document.fullscreenElement) {

                        await pdfViewer.requestFullscreen();

                        pdfFullscreen.textContent =
                            "EXIT FULL SCREEN ↙";

                    } else {

                        await document.exitFullscreen();

                        pdfFullscreen.textContent =
                            "FULL SCREEN ↗";
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

            if (!document.fullscreenElement) {

                if (pdfFullscreen) {
                    pdfFullscreen.textContent =
                        "FULL SCREEN ↗";
                }

            } else {

                if (pdfFullscreen) {
                    pdfFullscreen.textContent =
                        "EXIT FULL SCREEN ↙";
                }
            }

            setTimeout(() => {

                if (pdfDocument) {
                    renderPDFPage(pdfPageNumber);
                }

            }, 100);
        }
    );


    /* --------------------------------------------------------
       PDF TOUCH SWIPE
       -------------------------------------------------------- */

    let pdfTouchStartX = null;
    let pdfTouchStartY = null;

    if (pdfStage) {

        pdfStage.addEventListener(
            "touchstart",
            event => {

                const touch =
                    event.changedTouches[0];

                pdfTouchStartX =
                    touch.clientX;

                pdfTouchStartY =
                    touch.clientY;
            },
            {
                passive: true
            }
        );

        pdfStage.addEventListener(
            "touchend",
            event => {

                if (
                    pdfTouchStartX === null ||
                    pdfTouchStartY === null
                ) {
                    return;
                }

                const touch =
                    event.changedTouches[0];

                const dx =
                    touch.clientX -
                    pdfTouchStartX;

                const dy =
                    touch.clientY -
                    pdfTouchStartY;

                pdfTouchStartX = null;
                pdfTouchStartY = null;

                if (
                    Math.abs(dx) < 50 ||
                    Math.abs(dx) < Math.abs(dy)
                ) {
                    return;
                }

                if (dx < 0) {
                    nextPDFPage();
                } else {
                    previousPDFPage();
                }
            },
            {
                passive: true
            }
        );
    }


    /* ========================================================
       INSPIRATION CAROUSEL
       ======================================================== */

    /*
     * MANUALLY ADD IMAGES HERE.
     *
     * Add as many as you want.
     *
     * Example:
     *
     * {
     *     src: "images/inspiration-05.jpg",
     *     alt: "Dance Division reference image 05",
     *     label: "05 / REFERENCE"
     * },
     *
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
   /*
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


    const inspirationCarousel =
        document.getElementById(
            "inspirationCarousel"
        );

    const inspirationImage =
        document.getElementById(
            "inspirationImage"
        );

    const inspirationCaption =
        document.getElementById(
            "inspirationCaption"
        );

    const inspirationPrev =
        document.getElementById(
            "inspirationPrev"
        );

    const inspirationNext =
        document.getElementById(
            "inspirationNext"
        );

    const inspirationCurrent =
        document.getElementById(
            "inspirationCurrent"
        );

    const inspirationTotal =
        document.getElementById(
            "inspirationTotal"
        );


    let inspirationIndex = 0;
    let inspirationChanging = false;


    /* --------------------------------------------------------
       UPDATE CAROUSEL
       -------------------------------------------------------- */

    function updateInspiration(
        index,
        animate = true
    ) {

        if (
            !inspirationImages.length ||
            !inspirationImage
        ) {
            return;
        }

        inspirationIndex =
            (index + inspirationImages.length) %
            inspirationImages.length;

        const item =
            inspirationImages[inspirationIndex];

        if (animate) {

            inspirationChanging = true;

            inspirationImage.classList.add(
                "is-changing"
            );

            setTimeout(() => {

                inspirationImage.src =
                    item.src;

                inspirationImage.alt =
                    item.alt;

                if (inspirationCaption) {
                    inspirationCaption.textContent =
                        item.label || "";
                }

                inspirationImage.onload = () => {

                    inspirationImage.classList.remove(
                        "is-changing"
                    );

                    inspirationChanging = false;
                };

            }, 180);

        } else {

            inspirationImage.src =
                item.src;

            inspirationImage.alt =
                item.alt;

            if (inspirationCaption) {
                inspirationCaption.textContent =
                    item.label || "";
            }
        }

        if (inspirationCurrent) {

            inspirationCurrent.textContent =
                String(inspirationIndex + 1)
                    .padStart(2, "0");
        }

        if (inspirationTotal) {

            inspirationTotal.textContent =
                String(inspirationImages.length)
                    .padStart(2, "0");
        }
    }


    /* --------------------------------------------------------
       PRELOAD ADJACENT IMAGES
       -------------------------------------------------------- */

    function preloadInspiration(index) {

        if (!inspirationImages.length) {
            return;
        }

        const normalized =
            (index + inspirationImages.length) %
            inspirationImages.length;

        const image =
            new Image();

        image.src =
            inspirationImages[normalized].src;
    }


    function preloadNearbyImages() {

        preloadInspiration(
            inspirationIndex + 1
        );

        preloadInspiration(
            inspirationIndex - 1
        );
    }


    /* --------------------------------------------------------
       NEXT / PREVIOUS
       -------------------------------------------------------- */

    function nextInspiration() {

        if (
            inspirationChanging ||
            !inspirationImages.length
        ) {
            return;
        }

        updateInspiration(
            inspirationIndex + 1
        );

        setTimeout(
            preloadNearbyImages,
            250
        );
    }


    function previousInspiration() {

        if (
            inspirationChanging ||
            !inspirationImages.length
        ) {
            return;
        }

        updateInspiration(
            inspirationIndex - 1
        );

        setTimeout(
            preloadNearbyImages,
            250
        );
    }


    if (inspirationNext) {

        inspirationNext.addEventListener(
            "click",
            nextInspiration
        );
    }

    if (inspirationPrev) {

        inspirationPrev.addEventListener(
            "click",
            previousInspiration
        );
    }


    /* --------------------------------------------------------
       INITIALIZE
       -------------------------------------------------------- */

    if (
        inspirationImages.length &&
        inspirationImage
    ) {

        updateInspiration(
            0,
            false
        );

        preloadNearbyImages();
    }


    /* --------------------------------------------------------
       CAROUSEL KEYBOARD
       -------------------------------------------------------- */

    if (inspirationCarousel) {

        inspirationCarousel.setAttribute(
            "tabindex",
            "0"
        );

        inspirationCarousel.addEventListener(
            "keydown",
            event => {

                if (event.key === "ArrowLeft") {

                    event.preventDefault();

                    previousInspiration();

                } else if (
                    event.key === "ArrowRight"
                ) {

                    event.preventDefault();

                    nextInspiration();
                }
            }
        );
    }


    /* --------------------------------------------------------
       CAROUSEL TOUCH SWIPE
       -------------------------------------------------------- */

    let inspirationTouchStartX = null;
    let inspirationTouchStartY = null;

    if (inspirationCarousel) {

        inspirationCarousel.addEventListener(
            "touchstart",
            event => {

                const touch =
                    event.changedTouches[0];

                inspirationTouchStartX =
                    touch.clientX;

                inspirationTouchStartY =
                    touch.clientY;
            },
            {
                passive: true
            }
        );

        inspirationCarousel.addEventListener(
            "touchend",
            event => {

                if (
                    inspirationTouchStartX === null ||
                    inspirationTouchStartY === null
                ) {
                    return;
                }

                const touch =
                    event.changedTouches[0];

                const dx =
                    touch.clientX -
                    inspirationTouchStartX;

                const dy =
                    touch.clientY -
                    inspirationTouchStartY;

                inspirationTouchStartX = null;
                inspirationTouchStartY = null;

                if (
                    Math.abs(dx) < 45 ||
                    Math.abs(dx) < Math.abs(dy)
                ) {
                    return;
                }

                if (dx < 0) {
                    nextInspiration();
                } else {
                    previousInspiration();
                }
            },
            {
                passive: true
            }
        );
    }


    /* ========================================================
       AUDIO PLAYER
       ======================================================== */

    const audio =
        document.getElementById("audio");

    const playButton =
        document.getElementById("playButton");

    const audioTime =
        document.getElementById("audioTime");

    const audioDuration =
        document.getElementById("audioDuration");

    const audioProgress =
        document.querySelector(".audio-progress");

    const audioProgressFill =
        document.getElementById(
            "audioProgressFill"
        );

    const trackNumber =
        document.getElementById("trackNumber");

    const trackTitle =
        document.getElementById("trackTitle");

    const audioItems =
        document.querySelectorAll(".audio-item");


    function formatTime(seconds) {

        if (
            !Number.isFinite(seconds) ||
            seconds < 0
        ) {
            return "00:00";
        }

        const minutes =
            Math.floor(seconds / 60);

        const remainingSeconds =
            Math.floor(seconds % 60);

        return (
            String(minutes).padStart(2, "0") +
            ":" +
            String(remainingSeconds).padStart(2, "0")
        );
    }


    function updateAudioUI() {

        if (!audio) {
            return;
        }

        if (audioTime) {
            audioTime.textContent =
                formatTime(audio.currentTime);
        }

        if (audioDuration) {
            audioDuration.textContent =
                formatTime(audio.duration);
        }

        if (
            audioProgressFill &&
            Number.isFinite(audio.duration) &&
            audio.duration > 0
        ) {

            const percentage =
                (audio.currentTime /
                    audio.duration) *
                100;

            audioProgressFill.style.width =
                `${percentage}%`;
        }

        if (playButton) {

            playButton.textContent =
                audio.paused
                    ? "PLAY"
                    : "PAUSE";
        }
    }


    function loadAudioTrack(item) {

        if (!audio || !item) {
            return;
        }

        const src =
            item.dataset.src;

        const title =
            item.dataset.title;

        const number =
            item.dataset.track;


        audio.pause();

        audio.src = src;

        audio.load();

        if (trackTitle) {
            trackTitle.textContent =
                title || "";
        }

        if (trackNumber) {
            trackNumber.textContent =
                String(
                    Number(number) + 1
                ).padStart(2, "0");
        }

        audioItems.forEach(track => {

            track.classList.toggle(
                "active",
                track === item
            );
        });

        audio.play()
            .catch(() => {});

        if (playButton) {
            playButton.textContent =
                "PAUSE";
        }
    }


    if (playButton && audio) {

        playButton.addEventListener(
            "click",
            () => {

                if (audio.paused) {

                    audio.play()
                        .catch(() => {});

                } else {

                    audio.pause();
                }
            }
        );
    }


    audioItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                loadAudioTrack(item);
            }
        );
    });


    if (audio) {

        audio.addEventListener(
            "timeupdate",
            updateAudioUI
        );

        audio.addEventListener(
            "loadedmetadata",
            updateAudioUI
        );

        audio.addEventListener(
            "play",
            updateAudioUI
        );

        audio.addEventListener(
            "pause",
            updateAudioUI
        );

        audio.addEventListener(
            "ended",
            () => {

                const activeItem =
                    document.querySelector(
                        ".audio-item.active"
                    );

                if (!activeItem) {
                    return;
                }

                const currentIndex =
                    Number(
                        activeItem.dataset.track
                    );

                const nextIndex =
                    currentIndex + 1;

                if (
                    nextIndex <
                    audioItems.length
                ) {

                    loadAudioTrack(
                        audioItems[nextIndex]
                    );

                } else {

                    audio.currentTime = 0;

                    if (playButton) {
                        playButton.textContent =
                            "PLAY";
                    }
                }
            }
        );
    }


    /* --------------------------------------------------------
       AUDIO PROGRESS CLICK
       -------------------------------------------------------- */

    if (
        audioProgress &&
        audio
    ) {

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
                    audioProgress.getBoundingClientRect();

                const position =
                    (event.clientX - rect.left) /
                    rect.width;

                audio.currentTime =
                    Math.max(
                        0,
                        Math.min(
                            1,
                            position
                        )
                    ) *
                    audio.duration;
            }
        );
    }


    /* ========================================================
       VIMEO FILM SOUND
       ======================================================== */

    const mainFilm =
        document.getElementById("mainFilm");

    const filmSound =
        document.getElementById("filmSound");

    let vimeoPlayer = null;


    if (
        mainFilm &&
        window.Vimeo &&
        Vimeo.Player
    ) {

        vimeoPlayer =
            new Vimeo.Player(mainFilm);


        /* ----------------------------------------------------
           Initial state
           ---------------------------------------------------- */

        vimeoPlayer
            .getMuted()
            .then(muted => {

                if (filmSound) {

                    filmSound.textContent =
                        muted
                            ? "SOUND OFF"
                            : "SOUND ON";
                }

            })
            .catch(() => {});


        /* ----------------------------------------------------
           Toggle sound
           ---------------------------------------------------- */

        if (filmSound) {

            filmSound.addEventListener(
                "click",
                async () => {

                    try {

                        const muted =
                            await vimeoPlayer.getMuted();

                        await vimeoPlayer.setMuted(
                            !muted
                        );

                        filmSound.textContent =
                            !muted
                                ? "SOUND OFF"
                                : "SOUND ON";

                    } catch (error) {

                        console.error(
                            "Unable to toggle Vimeo sound:",
                            error
                        );
                    }
                }
            );
        }
    }


    /* ========================================================
       GLOBAL KEYBOARD CONTROLS
       ======================================================== */

    document.addEventListener(
        "keydown",
        event => {

            const activeElement =
                document.activeElement;

            /*
             * Don't hijack arrow keys when the
             * inspiration carousel has focus.
             */

            if (
                inspirationCarousel &&
                inspirationCarousel.contains(
                    activeElement
                )
            ) {
                return;
            }

            /*
             * Don't hijack arrow keys while
             * typing into a form/input.
             */

            const tagName =
                activeElement?.tagName;

            if (
                tagName === "INPUT" ||
                tagName === "TEXTAREA" ||
                tagName === "SELECT"
            ) {
                return;
            }

            if (event.key === "ArrowLeft") {

                if (
                    pdfViewer &&
                    pdfViewer.offsetParent !== null
                ) {
                    event.preventDefault();
                    previousPDFPage();
                }

            } else if (
                event.key === "ArrowRight"
            ) {

                if (
                    pdfViewer &&
                    pdfViewer.offsetParent !== null
                ) {
                    event.preventDefault();
                    nextPDFPage();
                }
            }
        }
    );


    /* ========================================================
       FINAL PDF POSITION CHECK
       ======================================================== */

    window.addEventListener(
        "load",
        () => {

            setTimeout(() => {

                if (pdfDocument) {
                    positionPDFHitAreas();
                }

            }, 250);
        }
    );

});