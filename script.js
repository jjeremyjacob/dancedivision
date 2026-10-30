/* ============================================================
   A DOLL'S HOUSE PICTURES
   SCRIPT.JS
   ============================================================ */


/* ============================================================
   PROJECT DATA
   ============================================================ */

const projects = [

    {
        title: "Stissing House",
        category: "Social Campaign",
        type: "vimeo",
          vimeo: "1226955261",
    hash: "c019cba0b1",
        format: "wide",
        description: "A series of short-form films created for Stissing House in Pine Plains, New York.",
        credits: [
            {
                role: "Creative Direction",
                names: [
                    "Jeremy Jacob",
                    "A Doll's House Pictures"
                ]
            }
        ]
    },

    {
        title: "Nike",
        category: "Social Campaign",
        type: "vimeo",
        vimeo: "1226664744",
        format: "wide",
        description: "",
        credits: []
    },

    {
        title: "Storm King - Girl Group",
        category: "Dance Film Highlights",
        type: "vimeo",
        vimeo: "1007644295",
        format: "wide",
        description: "Girl Group",
        credits: [
            {
                role: "Creative Direction",
                names: [
                    "Jeremy Jacob",
                    "A Doll's House Pictures"
                ]
            }
        ]
    },

    {
        title: "Trisha Brown Dance Company",
        category: "Photography",
        type: "carousel",
        images: [
            "images/TBDC_1.jpg",
            "images/TBDC_2.jpg",
            "images/TBDC_3.jpg",
            "images/TBDC_4.jpg",
            "images/TBDC_5.jpg",
            "images/TBDC_6.jpg",
            "images/TBDC_7.jpg"
        ],
        description: "",
        credits: [
            {
                role: "Photography",
                names: [
                    "Jeremy Jacob"
                ]
            },
            {
                role: "For",
                names: [
                    "Trisha Brown Dance Company"
                ]
            }
        ]
    },



    {
        title: "Talbott & Arding",
        category: "Social Film",
        type: "vimeo",
        vimeo: "1226060926",
        format: "wide",
        description: "A series of short-form films created for Talbott & Arding in Hudson, New York.",
        credits: [
            {
                role: "Creative Direction",
                names: [
                    "Jeremy Jacob",
                    "A Doll's House Pictures"
                ]
            }
        ]
    },
    
          {
        title: "MOPS",
        category: "Branding & Web Design",
        type: "carousel",
        images: [
            "images/MOPS1.jpg",
            "images/MOPS2.jpg",
            "images/MOPS3.jpg",
            "images/MOPS4.jpg",
            "images/MOPS5.jpg"
        ],
        description: "",
        credits: [
            {
                role: "Photography",
                names: [
                    "Jeremy Jacob"
                ]
            },
   
        ]
    },

    {
        title: "Cole Haan",
        category: "Social Campaign",
        type: "vimeo",
        vimeo: "1227036895",
        format: "vertical",
        description: "Cole Haan - Urban Jungle",
        credits: []
    },

    {
        title: "Stissing House",
        category: "Social Campaign",
        type: "vimeo",
        vimeo: "1135735488",
        hash: "f8b1225c5d",
        format: "vertical",
        description: "A series of short-form stories created for Stissing House in Pine Plains, New York.",
        credits: [
            {
                Featuring: "Sticky Toffee",
                names: [
                    "Sticky Toffee"
                ]
            }
        ]
    },

    {
        title: "Munner Farm",
        category: "Photography",
        type: "carousel",
        images: [
            "images/MF_1.jpg",
            "images/MF_2.jpg",
            "images/MF_3.jpg",
            "images/MF_4.jpg",
            "images/MF_5.jpg",
            "images/MF_6.jpg",
            "images/MF_7.jpg"
        ],
        description: "",
        credits: [
            {
                role: "Photography",
                names: [
                    "Jeremy Jacob"
                ]
            },

        ]
    },

    {
        title: "Storm King - Growth",
        category: "Performance Film Highlights",
        type: "vimeo",
        vimeo: "1122967020",
        format: "wide",
        description: "Growth: The Watch",
        credits: [
            {
                role: "Creative Direction",
                names: [
                    "Jeremy Jacob",
                    "A Doll's House Pictures"
                ]
            }
        ]
    },

    {
        title: "Romber Works",
        category: "Profile Film",
        type: "vimeo",
        vimeo: "1119062430",
        format: "wide",
        description: "Profile on Cabinet Maker Ross Brown of Romber Works in Hudson, New York.",
        credits: [           {
                role: "Creative Direction & Creator",
                names: [
                    "Jeremy Jacob",
                    "A Doll's House Pictures"
                ]
            }       ]
    },

        {
        title: "Bard College",
        category: "It's Different",
        type: "vimeo",
        vimeo: "1229121057",
            hash: "3f29c53761",
        format: "wide",
        description: "",
        credits: [
            {
                role: "Creative Director & Producer",
                names: [
                    "Jeremy Jacob"
                ]
            },
            {
                role: "Written by",
                names: [
                    "Savannah Lucas Sanchez"
                ]
            },  {
                role: "Photography, Editing, and Music by",
                names: [
                    "Jeremy Jacob"
                ]
            },
            {
                role: "Sound Recordist",
                names: [
                    "Joao De La Cruz"
                ]
            }
                      
        ]
    },

    {
        title: "Lucinda Childs",
        category: "Campaign",
        type: "vimeo",
        vimeo: "1180594270",
        format: "wide",
        description: "Fisher Center at Bard",
        credits: []
    },

    {
        title: "Suddenly Last Summer",
        category: "Promotional Campaign",
        type: "vimeo",
        vimeo: "1189497026",
        format: "wide",
        description: "Fisher Center at Bard",
        credits: []
    },

    /* ========================================================
       FISHER CENTER EDITORIAL PAGE
       ======================================================== 

    {
        title: "Fisher Center",
        category: "Client Profile",
        type: "page",
        page: "fishercenter.html",
        description: "",
        credits: []
    },*/

    {
        title: "David",
        category: "Dance Film",
        type: "vimeo",
        vimeo: "638919399",
        format: "wide",
        description: "American Ballet Theatre",
        credits: [
            {
                role: "Direction",
                names: [
                    "Jeremy Jacob"
                ]
            },
            {
                role: "Choreography",
                names: [
                    "Pam Tanowitz"
                ]
            },
            {
                role: "Photography",
                names: [
                    "Daniel Rampulla"
                ]
            },
            {
                role: "Starring",
                names: [
                    "David Hallberg"
                ]
            }
        ]
    },

    {
        title: "I was waiting for the echo of a better day",
        category: "Dance Film Trailer",
        type: "vimeo",
        vimeo: "657102461",
        format: "wide",
        description: "Fisher Center at Bard",
        credits: [
            {
                role: "Direction",
                names: [
                    "Jeremy Jacob"
                ]
            },
            {
                role: "Choreography",
                names: [
                    "Pam Tanowitz"
                ]
            },
            {
                role: "Photography",
                names: [
                    "Daniel Rampulla"
                ]
            }
        ]
    },

    {
        title: "J.Crew / Madewell",
        category: "Prop Styling",
        type: "carousel",
        images: [
            "images/MDWL_1.jpg",
            "images/MDWL_2.jpg",
            "images/MDWL_3.jpg",
            "images/MDWL_4.jpg",
            "images/MDWL_5.jpg",
            "images/MDWL_6.jpg",
            "images/MDWL_7.jpg",
            "images/MDWL_8.jpg",
            "images/MDWL_9.jpg",
            "images/MDWL_10.jpg",
            "images/MDWL_11.jpg",
            "images/MDWL_12.jpg",
            "images/MDWL_13.jpg",
            "images/MDWL_14.jpg",
            "images/MDWL_15.jpg",
            "images/MDWL_16.jpg",
            "images/MDWL_17.jpg",
            "images/MDWL_18.jpg",
            "images/MDWL_19.jpg",
            "images/MDWL_20.jpg",
            "images/MDWL_21.jpg",
            "images/MDWL_22.jpg",
            "images/MDWL_23.jpg",
            "images/MDWL_24.jpg",
            "images/MDWL_25.jpg",
            "images/MDWL_26.jpg",
            "images/MDWL_27.jpg",
            "images/MDWL_28.jpg",
            "images/MDWL_29.jpg",
            "images/MDWL_30.jpg",
            "images/MDWL_31.jpg",
            "images/MDWL_32.jpg",
            "images/MDWL_33.jpg",
            "images/MDWL_34.jpg"
        ],
        description: "",
        credits: [
            {
                role: "Prop Styling & Set Design",
                names: [
                    "Jeremy Jacob"
                ]
            }
        ]
    },

    {
        title: "Dear Merce",
        category: "Dance Film",
        type: "vimeo",
        vimeo: "1226947730",
        format: "wide",
        description: "",
        credits: [
            {
                role: "Direction",
                names: [
                    "Jeremy Jacob"
                ]
            },
            {
                role: "Choreography",
                names: [
                    "Netta Yerushalmy"
                ]
            },
            {
                role: "Photography",
                names: [
                    "Daniel Rampulla"
                ]
            }
        ]
    },

    {
        title: "Good Night",
        category: "Film",
        type: "vimeo",
        vimeo: "1226948282",
        format: "wide",
        description: "Works & Process at the Guggenheim",
        credits: [
            {
                role: "Film by",
                names: [
                    "Jeremy Jacob"
                ]
            },
            {
                role: "Text & Choreography",
                names: [
                    "Jack Ferver"
                ]
            }
        ]
    },

    {
        title: "Gary Graham",
        category: "Socail Campaign - Dressing",
        type: "vimeo",
        vimeo: "816869534",
        format: "vertical",
        description: "",
        credits: []
    },

    {
        title: "Stissing House",
        category: "Social Campaign",
        type: "vimeo",
        vimeo: "1110256553",
        format: "vertical",
        description: "A series of short-form stories created for Stissing House in Pine Plains, New York.",
        credits: [
            {
                Featuring: "Fish Pie",
                names: [
                    "Fish Pie"
                ]
            }
        ]
    },

    {
        title: "Radioactive Practice",
        category: "Film Trailer",
        type: "vimeo",
        vimeo: "1226957906",
        format: "wide",
        description: "Dance Film",
        credits: [
            {
                role: "Direction",
                names: [
                    "Jeremy Jacob"
                ]
            },
            {
                role: "Choreography",
                names: [
                    "Abby Zbikowski"
                ]
            },
            {
                role: "Photography",
                names: [
                    "Jeremy Jacob and Daniel Rampulla"
                ]
            }
        ]
    },

    {
        title: "Cole Haan",
        category: "Social Campaign",
        type: "vimeo",
        vimeo: "1227036896",
        format: "vertical",
        description: "Cole Haan - His & Hers",
        credits: []
    },

    {
        title: "Stissing House",
        category: "Social Campaign",
        type: "vimeo",
        vimeo: "1135779851",
        hash: "ce3e333307",
        format: "vertical",
        description: "A series of short-form stories created for Stissing House in Pine Plains, New York.",
        credits: [
            {
                Featuring: "Duck",
                names: [
                    "Duck"
                ]
            }
        ]
    },

    {
        title: "Rodelinda",
        category: "Promotional Campaign",
        type: "vimeo",
        vimeo: "875550517",
        format: "wide",
        description: "Hudson Hall",
        credits: []
    },

    {
        title: "Stissing House",
        category: "Social Campaign",
        type: "vimeo",
        vimeo: "1119623841",
        format: "vertical",
        description: "A series of short-form stories created for Stissing House in Pine Plains, New York.",
        credits: [
            {
                Featuring: "Cobbler",
                names: [
                    "Cobbler"
                ]
            }
        ]
    },

    {
        title: "Not The Child",
        category: "Music Video",
        type: "vimeo",
        vimeo: "1226960266",
        format: "wide",
        description: "Chris Garneau",
        credits: []
    },

    {
        title: "Little Lad: ANNA",
        category: "Short Film",
        type: "vimeo",
        vimeo: "1227003478",
        format: "wide",
        description: "",
        credits: [
            {
                role: "Direction",
                names: [
                    "Jeremy Jacob"
                ]
            },
            {
                role: "Text & Choreography",
                names: [
                    "Jack Ferver"
                ]
            },
            {
                role: "Photography",
                names: [
                    "Daniel Rampulla"
                ]
            }
        ]
    },

    {
        title: "Pastoral",
        category: "Promotional Campaign",
        type: "vimeo",
        vimeo: "1077279366",
        format: "wide",
        description: "Fisher Center at Bard",
        credits: []
    },

    {
        title: "Gary Graham",
        category: "Socail Campaign - Corsage",
        type: "vimeo",
        vimeo: "816869497",
        format: "vertical",
        description: "",
        credits: []
    },

    {
        title: "Cole Haan",
        category: "Social Campaign",
        type: "vimeo",
        vimeo: "1227036894",
        format: "vertical",
        description: "Cole Haan - Puppy Love",
        credits: []
    },

    {
        title: "Illinoise",
        category: "Promotional Campaign",
        type: "vimeo",
        vimeo: "939996147",
        format: "wide",
        description: "Chicago Shakespeare Theater, Park Avenue Armory & Fisher Center at Bard",
        credits: []
    },

    {
        title: "Stissing House",
        category: "Social Campaign",
        type: "vimeo",
        vimeo: "1226973263",
        hash: "ab87885cfa",
        format: "vertical",
        description: "A series of short-form stories created for Stissing House in Pine Plains, New York.",
        credits: [
            {
                Featuring: "Squash",
                names: [
                    "Squash"
                ]
            }
        ]
    },

    {
        title: "A Doll's House Pictures",
        category: "The Studio",
        type: "about",
        vimeo: "790783764",
hash: "88211bd923",
        description: `A Doll’s House Pictures is an independent creative studio founded by Jeremy Jacob, working across film, motion, photography, and design. The studio creates image-driven work shaped by storytelling, atmosphere, and a considered visual language.

Working with brands, artists, and cultural organizations, the studio develops commercial, editorial, and artist-driven projects across moving image and still photography. From campaigns and branded content to experimental films and visual projects, A Doll’s House Pictures brings together creative direction, production, design, and filmmaking with a strong point of view.

Based in the Hudson Valley and working in New York City and beyond, the studio moves between culture, fashion, performance, and commerce, exploring the space where commercial craft and artistic experimentation meet.`,
        credits: []
    }

];


/* ============================================================
   STATE
   ============================================================ */

let currentProjectIndex = 0;

let currentVimeoPlayer = null;
let currentVimeoEvents = [];
let controlTimeout = null;

let currentCarouselIndex = 0;
let carouselTouchStartX = 0;
let carouselTouchStartY = 0;

let fisherCleanup = null;

let renderRequestId = 0;


/* ============================================================
   ELEMENTS
   ============================================================ */

const archiveList =
    document.getElementById("archiveList");

const archiveTotal =
    document.getElementById("archiveTotal");

const projectElement =
    document.getElementById("project");


/* ============================================================
   HELPERS
   ============================================================ */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function formatNumber(number) {

    return String(number).padStart(2, "0");

}


function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {
        return "00:00";
    }

    const total =
        Math.max(0, Math.floor(seconds));

    const minutes =
        Math.floor(total / 60);

    const remaining =
        total % 60;

    return `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`;

}


/* ============================================================
   FISHER CENTER CLEANUP
   ============================================================ */

function destroyFisherCenter() {

    if (fisherCleanup) {

        try {
            fisherCleanup();
        } catch (error) {
            console.warn(
                "Could not clean up Fisher Center.",
                error
            );
        }

        fisherCleanup = null;

    }

}


/* ============================================================
   VIMEO CLEANUP
   ============================================================ */

function destroyCurrentVimeo() {

    destroyFisherCenter();

    if (controlTimeout) {

        clearTimeout(controlTimeout);
        controlTimeout = null;

    }

    if (!currentVimeoPlayer) {
        return;
    }

    currentVimeoEvents.forEach(event => {

        try {

            currentVimeoPlayer.off(
                event.name,
                event.handler
            );

        } catch (error) {

            /* Ignore cleanup errors */

        }

    });

    currentVimeoEvents = [];

    try {

        currentVimeoPlayer.destroy();

    } catch (error) {

        /* Ignore cleanup errors */

    }

    currentVimeoPlayer = null;

}


/* ============================================================
   ARCHIVE
   ============================================================ */

function buildArchive() {

    archiveList.innerHTML = "";

    const numberedProjects =
        projects.filter(
            project => project.type !== "about"
        );

    numberedProjects.forEach((project, index) => {

        const projectIndex =
            projects.indexOf(project);

        const item =
            document.createElement("button");

        item.type = "button";
        item.className = "archive-item";
        item.dataset.index = projectIndex;

        item.innerHTML = `
            <span class="archive-number">
                ${formatNumber(index + 1)}
            </span>

            <span class="archive-title">
                ${escapeHTML(project.title)}
            </span>

            <span class="archive-category">
                ${escapeHTML(project.category)}
            </span>
        `;

        item.addEventListener(
            "click",
            () => {
                selectProject(projectIndex);
            }
        );

        archiveList.appendChild(item);

    });


    /* --------------------------------------------------------
       ABOUT
       -------------------------------------------------------- */

    const aboutProject =
        projects.find(
            project => project.type === "about"
        );

    if (aboutProject) {

        const aboutIndex =
            projects.indexOf(aboutProject);

        const aboutItem =
            document.createElement("button");

        aboutItem.type = "button";
        aboutItem.className =
            "archive-item archive-about";

        aboutItem.dataset.index =
            aboutIndex;

        aboutItem.innerHTML = `
            <span class="archive-number archive-number-empty">
                &nbsp;
            </span>

            <span class="archive-title">
                ${escapeHTML(aboutProject.title)}
            </span>

            <span class="archive-category">
                ${escapeHTML(aboutProject.category)}
            </span>
        `;

        aboutItem.addEventListener(
            "click",
            () => {
                selectProject(aboutIndex);
            }
        );

        archiveList.appendChild(aboutItem);

    }


    /* --------------------------------------------------------
       TOTAL — ABOUT IS NOT COUNTED
       -------------------------------------------------------- */

    archiveTotal.textContent =
        formatNumber(numberedProjects.length);

}


/* ============================================================
   ARCHIVE STATE
   ============================================================ */

function updateArchiveState() {

    const items =
        archiveList.querySelectorAll(
            ".archive-item"
        );

    items.forEach(item => {

        item.classList.toggle(
            "active",
            Number(item.dataset.index) === currentProjectIndex
        );

    });

}


/* ============================================================
   PROJECT CREDITS
   ============================================================ */

function renderCredits(project) {

    if (
        !project.credits ||
        !project.credits.length
    ) {
        return "";
    }

    return `
        <div class="project-credits">

            ${project.credits.map(credit => {

                const role =
                    credit.role ||
                    Object.keys(credit)[0] ||
                    "";

                return `
                    <span class="project-credit">

                        <span class="credit-role">
                            ${escapeHTML(role)}
                        </span>

                        <span class="credit-names">
                            ${(credit.names || [])
                                .map(name => escapeHTML(name))
                                .join(" / ")}
                        </span>

                    </span>
                `;

            }).join("")}

        </div>
    `;

}


/* ============================================================
   PROJECT DESCRIPTION
   ============================================================ */

function renderDescription(project) {

    if (!project.description) {
        return "";
    }

    const description =
        escapeHTML(project.description)
            .replace(/\n/g, "<br>");

    return `
        <div class="project-description">
            ${description}
        </div>
    `;

}


/* ============================================================
   PROJECT INFORMATION
   ============================================================ */

function renderProjectInfo(project) {

    return `
        <div class="project-info">

            <h1 class="project-title">
                ${escapeHTML(project.title)}
            </h1>

            <div class="project-category">
                ${escapeHTML(project.category)}
            </div>

            ${renderDescription(project)}

            ${renderCredits(project)}

        </div>
    `;

}


/* ============================================================
   VIMEO MARKUP
   ============================================================ */

function renderVimeoMarkup(project) {

    return `
        <div class="vimeo-wrap ${project.format === "vertical" ? "vertical" : ""}">

            <div class="vimeo-frame">

<iframe
    class="project-vimeo"

src="https://player.vimeo.com/video/${encodeURIComponent(project.vimeo)}${project.hash ? `?h=${encodeURIComponent(project.hash)}&` : "?"}transparent=0&controls=0&title=0&byline=0&portrait=0&dnt=1&playsinline=1"
    allow="autoplay; fullscreen; picture-in-picture"
    allowfullscreen
    loading="eager"
    title="${escapeHTML(project.title)}"
></iframe>

                <div class="vimeo-controls">

                    <button
                        class="vimeo-control vimeo-play"
                        type="button"
                        aria-label="Play"
                    >
                        Play
                    </button>

                    <span class="vimeo-time">
                        00:00 / 00:00
                    </span>

                    <div class="vimeo-progress-wrap">

                        <input
                            class="vimeo-progress"
                            type="range"
                            min="0"
                            max="100"
                            value="0"
                            step="0.1"
                            aria-label="Video progress"
                        >

                    </div>

                    <button
                        class="vimeo-control vimeo-sound"
                        type="button"
                        aria-label="Toggle sound"
                    >
                        Sound On
                    </button>

                    <button
                        class="vimeo-control vimeo-fullscreen"
                        type="button"
                        aria-label="Fullscreen"
                    >
                        Full
                    </button>

                </div>

            </div>

        </div>
    `;

}


/* ============================================================
   VIMEO CONTROLS
   ============================================================ */

function showControls(wrapper) {

    if (!wrapper) {
        return;
    }

    wrapper.classList.add(
        "controls-visible"
    );

    if (controlTimeout) {

        clearTimeout(controlTimeout);

    }

    controlTimeout =
        setTimeout(() => {

            wrapper.classList.remove(
                "controls-visible"
            );

        }, 2200);

}


/* ============================================================
   INITIALIZE VIMEO
   ============================================================ */

async function initializeVimeo() {

    if (
        !window.Vimeo ||
        !projectElement
    ) {
        return;
    }

    const iframe =
        projectElement.querySelector(
            ".project-vimeo"
        );

    const wrapper =
        projectElement.querySelector(
            ".vimeo-wrap"
        );

    const frame =
        projectElement.querySelector(
            ".vimeo-frame"
        );

    if (
        !iframe ||
        !wrapper ||
        !frame
    ) {
        return;
    }

    const player =
        new Vimeo.Player(iframe);

    currentVimeoPlayer =
        player;

    const playButton =
        projectElement.querySelector(
            ".vimeo-play"
        );

    const soundButton =
        projectElement.querySelector(
            ".vimeo-sound"
        );

    const fullscreenButton =
        projectElement.querySelector(
            ".vimeo-fullscreen"
        );

    const progress =
        projectElement.querySelector(
            ".vimeo-progress"
        );

    const time =
        projectElement.querySelector(
            ".vimeo-time"
        );


    /* --------------------------------------------------------
       READY
       -------------------------------------------------------- */

    try {

        await player.ready();

    } catch (error) {

        console.warn(
            "Vimeo player could not initialize.",
            error
        );

        return;

    }


    /* --------------------------------------------------------
       ACTUAL VIDEO RATIO
       -------------------------------------------------------- */

    try {

        const dimensions =
            await Promise.all([
                player.getVideoWidth(),
                player.getVideoHeight()
            ]);

        const width =
            Number(dimensions[0]);

        const height =
            Number(dimensions[1]);

        if (
            Number.isFinite(width) &&
            Number.isFinite(height) &&
            width > 0 &&
            height > 0
        ) {

            frame.style.aspectRatio =
                `${width} / ${height}`;

            if (height > width) {

                wrapper.classList.add(
                    "vertical"
                );

            } else {

                wrapper.classList.remove(
                    "vertical"
                );

            }

        }

    } catch (error) {

        console.warn(
            "Could not determine Vimeo dimensions.",
            error
        );

    }


    /* --------------------------------------------------------
       PLAY / PAUSE
       -------------------------------------------------------- */

    const togglePlay =
        async () => {

            try {

                const paused =
                    await player.getPaused();

                if (paused) {

                    await player.play();

                } else {

                    await player.pause();

                }

                showControls(wrapper);

            } catch (error) {

                console.warn(
                    "Vimeo playback error.",
                    error
                );

            }

        };


    /* --------------------------------------------------------
       PLAY BUTTON
       -------------------------------------------------------- */

    if (playButton) {

        playButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                togglePlay();

            }
        );

    }


    /* --------------------------------------------------------
       CLICK ANYWHERE ON VIDEO
       -------------------------------------------------------- */

    frame.addEventListener(
        "click",
        event => {

            if (
                event.target.closest(
                    ".vimeo-controls"
                )
            ) {
                return;
            }

            togglePlay();

        }
    );


    /* --------------------------------------------------------
       HOVER CONTROLS
       -------------------------------------------------------- */

    frame.addEventListener(
        "mousemove",
        () => {

            showControls(wrapper);

        }
    );


    frame.addEventListener(
        "touchstart",
        () => {

            showControls(wrapper);

        },
        {
            passive: true
        }
    );


    /* --------------------------------------------------------
       PLAY EVENT
       -------------------------------------------------------- */

    const onPlay =
        () => {

            if (!playButton) {
                return;
            }

            playButton.textContent =
                "Pause";

            playButton.setAttribute(
                "aria-label",
                "Pause"
            );

        };

    player.on(
        "play",
        onPlay
    );

    currentVimeoEvents.push({
        name: "play",
        handler: onPlay
    });


    /* --------------------------------------------------------
       PAUSE EVENT
       -------------------------------------------------------- */

    const onPause =
        () => {

            if (!playButton) {
                return;
            }

            playButton.textContent =
                "Play";

            playButton.setAttribute(
                "aria-label",
                "Play"
            );

        };

    player.on(
        "pause",
        onPause
    );

    currentVimeoEvents.push({
        name: "pause",
        handler: onPause
    });


    /* --------------------------------------------------------
       TIME UPDATE
       -------------------------------------------------------- */

    const onTimeUpdate =
        data => {

            const duration =
                Number(data.duration) || 0;

            const seconds =
                Number(data.seconds) || 0;

            if (progress) {

                progress.value =
                    duration
                        ? (seconds / duration) * 100
                        : 0;

            }

            if (time) {

                time.textContent =
                    `${formatTime(seconds)} / ${formatTime(duration)}`;

            }

        };

    player.on(
        "timeupdate",
        onTimeUpdate
    );

    currentVimeoEvents.push({
        name: "timeupdate",
        handler: onTimeUpdate
    });


    /* --------------------------------------------------------
       LOADED
       -------------------------------------------------------- */

    const onLoaded =
        data => {

            if (!time) {
                return;
            }

            time.textContent =
                `00:00 / ${formatTime(data.duration)}`;

        };

    player.on(
        "loaded",
        onLoaded
    );

    currentVimeoEvents.push({
        name: "loaded",
        handler: onLoaded
    });


    /* --------------------------------------------------------
       VOLUME
       -------------------------------------------------------- */

    if (soundButton) {

        soundButton.addEventListener(
            "click",
            async event => {

                event.stopPropagation();

                try {

                    const volume =
                        await player.getVolume();

                    if (volume > 0) {

                        await player.setVolume(0);

                        soundButton.textContent =
                            "Sound Off";

                    } else {

                        await player.setVolume(1);

                        soundButton.textContent =
                            "Sound On";

                    }

                    showControls(wrapper);

                } catch (error) {

                    console.warn(
                        "Could not change Vimeo volume.",
                        error
                    );

                }

            }
        );

    }


    /* --------------------------------------------------------
       PROGRESS SEEK
       -------------------------------------------------------- */

    if (progress) {

        progress.addEventListener(
            "input",
            async event => {

                event.stopPropagation();

                try {

                    const duration =
                        await player.getDuration();

                    const percent =
                        Number(event.target.value) / 100;

                    await player.setCurrentTime(
                        duration * percent
                    );

                    showControls(wrapper);

                } catch (error) {

                    console.warn(
                        "Could not seek Vimeo video.",
                        error
                    );

                }

            }
        );


        progress.addEventListener(
            "click",
            event => {

                event.stopPropagation();

            }
        );

    }


    /* --------------------------------------------------------
       FULLSCREEN
       -------------------------------------------------------- */

    if (fullscreenButton) {

        fullscreenButton.addEventListener(
            "click",
            async event => {

                event.stopPropagation();

                try {

                    await player.requestFullscreen();

                } catch (error) {

                    console.warn(
                        "Could not enter fullscreen.",
                        error
                    );

                }

            }
        );

    }


    /* --------------------------------------------------------
       INITIAL STATE
       -------------------------------------------------------- */

    try {

        const volume =
            await player.getVolume();

        if (soundButton) {

            soundButton.textContent =
                volume > 0
                    ? "Sound On"
                    : "Sound Off";

        }

    } catch (error) {

        /* Ignore */

    }

       /* --------------------------------------------------------
       AUTOPLAY — MUTED, WITH DELAY
       -------------------------------------------------------- */

    try {

        await player.setVolume(0);

        if (soundButton) {
            soundButton.textContent = "Sound Off";
        }

        await new Promise(resolve => {
            setTimeout(resolve, 400);
        });

        await player.play();

    } catch (error) {

        console.warn(
            "Vimeo autoplay was blocked by the browser.",
            error
        );

    }

}


/* ============================================================
   IMAGE
   ============================================================ */

function renderImage(project) {

    return `
        <div class="image-project">

            <img
                src="${escapeHTML(project.image)}"
                alt="${escapeHTML(project.title)}"
                loading="eager"
            >

        </div>
    `;

}


/* ============================================================
   CAROUSEL
   ============================================================ */

function renderCarousel(project) {

    const images =
        Array.isArray(project.images)
            ? project.images
            : [];

    if (!images.length) {
        return "";
    }

    currentCarouselIndex = 0;

    return `
        <div
            class="image-carousel"
            data-carousel-count="${images.length}"
        >

            <div class="carousel-stage">

                <button
                    class="carousel-arrow carousel-prev"
                    type="button"
                    aria-label="Previous image"
                >
                    <span aria-hidden="true">←</span>
                </button>

                <div class="carousel-image-wrap">

                    ${images.map((image, index) => `

                        <img
                            class="carousel-image ${index === 0 ? "active" : ""}"
                            src="${escapeHTML(image)}"
                            alt="${escapeHTML(project.title)} — image ${index + 1} of ${images.length}"
                            data-carousel-index="${index}"
                            draggable="false"
                        >

                    `).join("")}

                </div>

                <button
                    class="carousel-arrow carousel-next"
                    type="button"
                    aria-label="Next image"
                >
                    <span aria-hidden="true">→</span>
                </button>

            </div>

            <div class="carousel-meta">

                <span class="carousel-counter">

                    <span class="carousel-current">
                        01
                    </span>

                    <span class="carousel-separator">
                        /
                    </span>

                    <span class="carousel-total">
                        ${formatNumber(images.length)}
                    </span>

                </span>

            </div>

        </div>
    `;

}


/* ============================================================
   UPDATE CAROUSEL
   ============================================================ */

function updateCarousel(
    carousel,
    index,
    direction = 0
) {

    if (!carousel) {
        return;
    }

    const images =
        carousel.querySelectorAll(
            ".carousel-image"
        );

    if (!images.length) {
        return;
    }

    if (index < 0) {
        index = images.length - 1;
    }

    if (index >= images.length) {
        index = 0;
    }

    currentCarouselIndex =
        index;

    images.forEach(
        (image, imageIndex) => {

            image.classList.toggle(
                "active",
                imageIndex === index
            );

            image.classList.remove(
                "slide-next",
                "slide-prev"
            );

            if (
                imageIndex === index &&
                direction !== 0
            ) {

                image.classList.add(
                    direction > 0
                        ? "slide-next"
                        : "slide-prev"
                );

            }

        }
    );

    const current =
        carousel.querySelector(
            ".carousel-current"
        );

    if (current) {

        current.textContent =
            formatNumber(index + 1);

    }

}


/* ============================================================
   INITIALIZE CAROUSEL
   ============================================================ */

function initializeCarousel() {

    const carousel =
        projectElement.querySelector(
            ".image-carousel"
        );

    if (!carousel) {
        return;
    }

    const images =
        carousel.querySelectorAll(
            ".carousel-image"
        );

    const previous =
        carousel.querySelector(
            ".carousel-prev"
        );

    const next =
        carousel.querySelector(
            ".carousel-next"
        );


    /* --------------------------------------------------------
       NAVIGATION
       -------------------------------------------------------- */

    const goTo =
        (index, direction = 0) => {

            updateCarousel(
                carousel,
                index,
                direction
            );

        };


    const nextImage =
        () => {

            goTo(
                currentCarouselIndex + 1,
                1
            );

        };


    const previousImage =
        () => {

            goTo(
                currentCarouselIndex - 1,
                -1
            );

        };


    /* --------------------------------------------------------
       ARROWS
       -------------------------------------------------------- */

    if (previous) {

        previous.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                previousImage();

            }
        );

    }


    if (next) {

        next.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                nextImage();

            }
        );

    }


    /* --------------------------------------------------------
       CLICK LEFT / RIGHT HALF OF IMAGE
       -------------------------------------------------------- */

    images.forEach(image => {

        image.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const rect =
                    image.getBoundingClientRect();

                const clickX =
                    event.clientX - rect.left;

                if (
                    clickX <
                    rect.width / 2
                ) {

                    previousImage();

                } else {

                    nextImage();

                }

            }
        );

    });


    /* --------------------------------------------------------
       TOUCH / SWIPE
       -------------------------------------------------------- */

    const imageWrap =
        carousel.querySelector(
            ".carousel-image-wrap"
        );

    if (imageWrap) {

        imageWrap.addEventListener(
            "touchstart",
            event => {

                if (!event.touches.length) {
                    return;
                }

                carouselTouchStartX =
                    event.touches[0].clientX;

                carouselTouchStartY =
                    event.touches[0].clientY;

            },
            {
                passive: true
            }
        );


        imageWrap.addEventListener(
            "touchend",
            event => {

                if (!event.changedTouches.length) {
                    return;
                }

                const endX =
                    event.changedTouches[0].clientX;

                const endY =
                    event.changedTouches[0].clientY;

                const deltaX =
                    endX - carouselTouchStartX;

                const deltaY =
                    endY - carouselTouchStartY;

                if (
                    Math.abs(deltaX) < 40 ||
                    Math.abs(deltaX) < Math.abs(deltaY)
                ) {
                    return;
                }

                if (deltaX < 0) {

                    nextImage();

                } else {

                    previousImage();

                }

            },
            {
                passive: true
            }
        );

    }


    /* --------------------------------------------------------
       INITIAL STATE
       -------------------------------------------------------- */

    updateCarousel(
        carousel,
        0,
        0
    );

}


/* ============================================================
   VIDEO
   ============================================================ */

function renderVideo(project) {

    return `
        <div class="project-media">

            ${renderVimeoMarkup(project)}

        </div>
    `;

}


/* ============================================================
   TEXT
   ============================================================ */

function renderText(project) {

    return `
        <div class="project-text ${escapeHTML(project.style || "editorial")}">

            ${escapeHTML(project.title)}

            ${project.description ? `
                <div class="text-project-description">
                    ${escapeHTML(project.description)}
                </div>
            ` : ""}

        </div>
    `;

}


/* ============================================================
   ABOUT
   ============================================================ */

function renderAbout(project) {

    projectElement.innerHTML = `
        <div class="about-content">

            <div class="about-image about-video">

                <div class="about-video-rotation">

                    <iframe
                        
src="https://player.vimeo.com/video/${encodeURIComponent(project.vimeo)}?h=${encodeURIComponent(project.hash)}&transparent=0&autoplay=1&muted=1&loop=1&background=1&controls=0&playsinline=1"
allow="autoplay; fullscreen; picture-in-picture"
                        allowfullscreen
                        title="A Doll's House Pictures"
                    ></iframe>

                </div>

            </div>

            <div class="about-copy">

                <div class="project-category">
                    ${escapeHTML(project.category)}
                </div>

                <h1 class="project-title">
                    ${escapeHTML(project.title)}
                </h1>

                <div class="about-description">
                    ${escapeHTML(project.description)}
                </div>

                <div class="about-contact">

                    <a
                        href="https://www.instagram.com/adollshousepictures/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        @adollshousepictures
                    </a>

                    <a href="mailto:adollshousepictures@gmail.com">
                        adollshousepictures@gmail.com
                    </a>

                </div>

            </div>

        </div>
    `;

}


/* ============================================================
   LOAD EXTERNAL PROJECT PAGE
   ============================================================ */

/*
   fishercenter.html is NOT navigated to.

   Instead, its body is fetched and inserted into the
   existing #project container in index.html.

   This allows Fisher Center to behave like another project
   in the archive while keeping its own HTML file.
*/

async function renderExternalPage(
    project,
    requestId
) {

    if (!project.page) {

        projectElement.innerHTML = `
            <div class="project-error">
                Page not specified.
            </div>
        `;

        return;

    }

    try {

        const response =
            await fetch(project.page, {
                cache: "no-cache"
            });

        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }

        const html =
            await response.text();


        /*
           If the user clicked another project while
           the Fisher page was loading, do nothing.
        */

        if (
            requestId !== renderRequestId
        ) {
            return;
        }


        const parser =
            new DOMParser();

        const parsedDocument =
            parser.parseFromString(
                html,
                "text/html"
            );

        const body =
            parsedDocument.body;

        if (!body) {

            throw new Error(
                "Could not find page body."
            );

        }


        /* ----------------------------------------------------
           INSERT PAGE CONTENT
           ---------------------------------------------------- */

        projectElement.innerHTML =
            body.innerHTML;


        /* ----------------------------------------------------
           COPY PAGE STYLES
           ---------------------------------------------------- */

        const styles =
            parsedDocument.querySelectorAll(
                "style"
            );

        styles.forEach(
            (sourceStyle, index) => {

                const styleId =
                    `external-style-${project.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")}-${index}`;

                let existingStyle =
                    document.getElementById(
                        styleId
                    );

                if (!existingStyle) {

                    existingStyle =
                        document.createElement(
                            "style"
                        );

                    existingStyle.id =
                        styleId;

                    document.head.appendChild(
                        existingStyle
                    );

                }

                existingStyle.textContent =
                    sourceStyle.textContent;

            }
        );


        /* ----------------------------------------------------
           INITIALIZE FISHER CENTER
           ---------------------------------------------------- */

        if (
            project.title === "Fisher Center"
        ) {

            initializeFisherCenter();

        }

    } catch (error) {

        console.error(
            "Could not load external project page.",
            error
        );

        projectElement.innerHTML = `
            <div class="project-error">
                <h1>${escapeHTML(project.title)}</h1>
                <p>
                    This project could not be loaded.
                </p>
            </div>
        `;

    }

}


/* ============================================================
   FISHER CENTER INITIALIZATION
   ============================================================ */

function initializeFisherCenter() {

    destroyFisherCenter();


    const page =
        projectElement.querySelector(
            ".fisher-page"
        );

    if (!page) {

        console.warn(
            "Fisher Center page root .fisher-page was not found."
        );

        return;

    }


    const gallery =
        page.querySelector(
            "#fisherGallery"
        );

    const galleryInner =
        page.querySelector(
            ".fisher-gallery-inner"
        );

    const galleryImages =
        page.querySelectorAll(
            ".fisher-gallery-image"
        );

    const galleryCounter =
        page.querySelector(
            ".fisher-gallery-counter"
        );


    if (
        gallery &&
        galleryInner &&
        galleryImages.length
    ) {

        let ticking = false;


        const updateGallery =
            () => {

                ticking = false;

                const rect =
                    gallery.getBoundingClientRect();

                const scrollDistance =
                    gallery.offsetHeight -
                    window.innerHeight;

                if (
                    scrollDistance <= 0
                ) {

                    galleryImages.forEach(
                        (image, index) => {

                            image.classList.toggle(
                                "active",
                                index === 0
                            );

                        }
                    );

                    if (galleryCounter) {

                        galleryCounter.textContent =
                            `01 / ${formatNumber(galleryImages.length)}`;

                    }

                    return;

                }


                /*
                   The gallery begins when its top reaches
                   the top of the viewport.

                   Progress then moves from 0 → 1 while the
                   sticky section remains in place.
                */

                const progress =
                    Math.max(
                        0,
                        Math.min(
                            1,
                            -rect.top /
                            scrollDistance
                        )
                    );


                const imageCount =
                    galleryImages.length;

                const imagePosition =
                    progress *
                    (imageCount - 1);

                const activeIndex =
                    Math.round(
                        imagePosition
                    );


                galleryImages.forEach(
                    (image, index) => {

                        image.classList.toggle(
                            "active",
                            index === activeIndex
                        );

                    }
                );


                if (galleryCounter) {

                    galleryCounter.textContent =
                        `${formatNumber(activeIndex + 1)} / ${formatNumber(imageCount)}`;

                }

            };


        const requestGalleryUpdate =
            () => {

                if (ticking) {
                    return;
                }

                ticking = true;

                requestAnimationFrame(
                    updateGallery
                );

            };


        window.addEventListener(
            "scroll",
            requestGalleryUpdate,
            {
                passive: true
            }
        );

        window.addEventListener(
            "resize",
            requestGalleryUpdate
        );


        requestGalleryUpdate();


        /*
           Store cleanup function so leaving Fisher Center
           removes these listeners.
        */

        fisherCleanup =
            () => {

                window.removeEventListener(
                    "scroll",
                    requestGalleryUpdate
                );

                window.removeEventListener(
                    "resize",
                    requestGalleryUpdate
                );

            };

    }


    /* --------------------------------------------------------
       FISHER CENTER VIDEOS
       -------------------------------------------------------- */

    /*
       Vimeo videos inside fishercenter.html use their own
       iframe embeds.

       They intentionally do not use the main archive's
       custom Vimeo controls.
    */

}


/* ============================================================
   RENDER PROJECT
   ============================================================ */

async function renderProject(
    project
) {

    const requestId =
        ++renderRequestId;

    destroyCurrentVimeo();

    projectElement.innerHTML = "";


    /* --------------------------------------------------------
       ABOUT
       -------------------------------------------------------- */

    if (project.type === "about") {

        renderAbout(project);

        return;

    }


    /* --------------------------------------------------------
       EXTERNAL PAGE
       -------------------------------------------------------- */

    if (project.type === "page") {

        await renderExternalPage(
            project,
            requestId
        );

        return;

    }


    /* --------------------------------------------------------
       VIMEO
       -------------------------------------------------------- */

    if (project.type === "vimeo") {

        projectElement.insertAdjacentHTML(
            "beforeend",
            renderVideo(project)
        );

        projectElement.insertAdjacentHTML(
            "beforeend",
            renderProjectInfo(project)
        );

    }


    /* --------------------------------------------------------
       IMAGE
       -------------------------------------------------------- */

    else if (project.type === "image") {

        projectElement.insertAdjacentHTML(
            "beforeend",
            `
                <div class="project-media">
                    ${renderImage(project)}
                </div>
            `
        );

        projectElement.insertAdjacentHTML(
            "beforeend",
            renderProjectInfo(project)
        );

    }


    /* --------------------------------------------------------
       CAROUSEL
       -------------------------------------------------------- */

    else if (project.type === "carousel") {

        projectElement.insertAdjacentHTML(
            "beforeend",
            `
                <div class="project-media">
                    ${renderCarousel(project)}
                </div>
            `
        );

        projectElement.insertAdjacentHTML(
            "beforeend",
            renderProjectInfo(project)
        );

        initializeCarousel();

    }


    /* --------------------------------------------------------
       TEXT
       -------------------------------------------------------- */

    else if (project.type === "text") {

        projectElement.insertAdjacentHTML(
            "beforeend",
            renderText(project)
        );

    }


    /* --------------------------------------------------------
       INITIALIZE VIMEO
       -------------------------------------------------------- */

    if (
        project.type === "vimeo" &&
        requestId === renderRequestId
    ) {

        initializeVimeo();

    }

}


/* ============================================================
   PROJECT KEY
   ============================================================ */

function getProjectKey(project) {

    if (
        project.type === "vimeo" &&
        project.vimeo
    ) {

        return `vimeo:${project.vimeo}`;

    }

    if (
        project.type === "carousel" &&
        project.images?.length
    ) {

        return `carousel:${project.images[0]}`;

    }

    if (
        project.type === "image" &&
        project.image
    ) {

        return `image:${project.image}`;

    }

    if (
        project.type === "page" &&
        project.page
    ) {

        return `page:${project.page}`;

    }

    return `${project.type}:${project.title}`;

}


/* ============================================================
   SELECT PROJECT
   ============================================================ */

function selectProject(index) {

    if (
        index < 0 ||
        index >= projects.length
    ) {
        return;
    }

    if (
        index === currentProjectIndex &&
        projectElement.innerHTML
    ) {
        return;
    }


    projectElement.classList.add(
        "is-changing"
    );


    setTimeout(
        async () => {

            currentProjectIndex =
                index;

            const project =
                projects[index];


            /* ------------------------------------------------
               REMEMBER PROJECT
               ------------------------------------------------ */

            try {

                localStorage.setItem(
                    "adhp-last-project",
                    getProjectKey(project)
                );

            } catch (error) {

                console.warn(
                    "Could not save last project.",
                    error
                );

            }


            /* ------------------------------------------------
               RENDER
               ------------------------------------------------ */

            await renderProject(
                project
            );


            updateArchiveState();


            /* ------------------------------------------------
               KEEP ACTIVE ARCHIVE ITEM VISIBLE
               ------------------------------------------------ */

            const activeItem =
                archiveList.querySelector(
                    `.archive-item[data-index="${index}"]`
                );

            if (activeItem) {

                activeItem.scrollIntoView({
                    block: "nearest",
                    behavior: "smooth"
                });

            }


            /* ------------------------------------------------
               END TRANSITION
               ------------------------------------------------ */

            requestAnimationFrame(
                () => {

                    projectElement.classList.remove(
                        "is-changing"
                    );

                }
            );

        },
        180
    );

}


/* ============================================================
   KEYBOARD NAVIGATION
   ============================================================ */

document.addEventListener(
    "keydown",
    event => {

        const tag =
            document.activeElement
                ?.tagName
                ?.toLowerCase();

        const isInput =
            tag === "input" ||
            tag === "textarea" ||
            tag === "select";

        if (isInput) {
            return;
        }


        /* ----------------------------------------------------
           CAROUSEL
           ---------------------------------------------------- */

        const carousel =
            projectElement.querySelector(
                ".image-carousel"
            );

        if (carousel) {

            if (event.key === "ArrowLeft") {

                event.preventDefault();

                updateCarousel(
                    carousel,
                    currentCarouselIndex - 1,
                    -1
                );

                return;

            }

            if (event.key === "ArrowRight") {

                event.preventDefault();

                updateCarousel(
                    carousel,
                    currentCarouselIndex + 1,
                    1
                );

                return;

            }

        }


        /* ----------------------------------------------------
           VIMEO
           ---------------------------------------------------- */

        if (
            currentVimeoPlayer &&
            (
                event.code === "Space" ||
                event.key === "ArrowLeft" ||
                event.key === "ArrowRight"
            )
        ) {

            if (event.code === "Space") {

                event.preventDefault();

                currentVimeoPlayer
                    .getPaused()
                    .then(paused => {

                        if (paused) {

                            currentVimeoPlayer.play();

                        } else {

                            currentVimeoPlayer.pause();

                        }

                    });

                return;

            }


            if (
                event.key === "ArrowLeft" ||
                event.key === "ArrowRight"
            ) {

                event.preventDefault();

                currentVimeoPlayer
                    .getCurrentTime()
                    .then(currentTime => {

                        const amount =
                            event.key === "ArrowLeft"
                                ? -5
                                : 5;

                        currentVimeoPlayer
                            .setCurrentTime(
                                Math.max(
                                    0,
                                    currentTime + amount
                                )
                            );

                    });

                return;

            }

        }


        /* ----------------------------------------------------
           ARCHIVE UP / DOWN
           ---------------------------------------------------- */

        if (event.key === "ArrowUp") {

            event.preventDefault();

            selectProject(
                currentProjectIndex - 1
            );

        }

        else if (event.key === "ArrowDown") {

            event.preventDefault();

            selectProject(
                currentProjectIndex + 1
            );

        }

    }
);


/* ============================================================
   INITIALIZE
   ============================================================ */

buildArchive();


const aboutLink = document.getElementById("aboutLink");

if (aboutLink) {
    aboutLink.addEventListener("click", event => {
        event.preventDefault();

        const aboutIndex = projects.findIndex(
            project => project.type === "about"
        );

        if (aboutIndex !== -1) {
            selectProject(aboutIndex);
        }
    });
}

/* ============================================================
   ALWAYS OPEN ON ABOUT
   ============================================================ */

const aboutProjectIndex =
    projects.findIndex(
        project => project.type === "about"
    );


if (aboutProjectIndex !== -1) {

    currentProjectIndex =
        aboutProjectIndex;

    renderProject(
        projects[currentProjectIndex]
    );

    updateArchiveState();

} else {

    console.warn(
        "About project could not be found."
    );

    currentProjectIndex = 0;

    renderProject(
        projects[currentProjectIndex]
    );

    updateArchiveState();

}