
/* ============================================================
   DANCE DIVISION
   SHARED NAVIGATION SYSTEM
   HTML + CSS + JSON CONFIGURATION
============================================================ */

(() => {
    "use strict";

    /* ========================================================
       01 — NAVIGATION CONFIGURATION
       Edit this section to update navigation across all pages.
    ======================================================== */

    const navigationConfig = {

        title: "DANCE DIVISION",
        status: "STATUS: IN DEVELOPMENT",

        pages: [
            { number: "01", label: "HOME", href: "index.html" },
            { number: "02", label: "CALENDARS", href: "calendars.html" },
            { number: "03", label: "CHOREOGRAPHY", href: "choreography.html" },
            { number: "04", label: "COSTUMES", href: "costumes.html" },
            { number: "05", label: "DESIGN", href: "design.html" },
            { number: "06", label: "JOURNAL", href: "journal.html" },
            { number: "07", label: "LOCATIONS", href: "locations.html" },
            { number: "08", label: "SHOT BOOK", href: "shotbook.html" },
            { number: "09", label: "EPISODES", href: "videos.html" }
        ],

        sections: [
            { number: "00", label: "INFORMATION", href: "#opening", target: "opening" },
            { number: "01", label: "DESIGN", href: "#design", target: "design" },
            { number: "02", label: "SCRIPT", href: "#script", target: "script" },
            { number: "03", label: "SOUND", href: "#sound", target: "sound" },
            { number: "04", label: "CHARACTERS", href: "#characters", target: "characters" },
            { number: "06", label: "INSPIRATION", href: "#inspiration", target: "inspiration" },
            { number: "09", label: "END NOTES", href: "#closing", target: "closing" }
        ]

    };


    /* ========================================================
       02 — STYLES
    ======================================================== */

    const styles = `

        header.site-header {
            position: sticky !important;
            top: 0;
            z-index: 1100;
            flex-shrink: 0;
            transform: translateY(0);
            transition: transform 220ms ease;
            will-change: transform;
        }

        .section-subheader {
            position: sticky !important;
            top: var(--site-header-height, 64px);
            z-index: 1090;
            transform: translateY(0);
            transition: transform 220ms ease;
            will-change: transform;
        }

        body.headers-hidden header.site-header {
            transform: translateY(-105%);
        }

        body.headers-hidden .section-subheader {
            transform: translateY(calc(
                -1 * (
                    var(--site-header-height, 64px) +
                    var(--section-subheader-height, 44px) + 2px
                )
            ));
        }

        header.site-header > .header-status {
            display: flex;
            align-items: center;
            white-space: nowrap;
        }

        @media (max-width: 700px) {

            header.site-header {
                grid-template-columns: minmax(0, 1fr) auto;
                grid-template-rows: auto auto;
                column-gap: 12px;
                row-gap: 5px;
                min-height: 64px;
                padding: 10px 16px 8px;
            }

            header.site-header > .header-title {
                grid-column: 1;
                grid-row: 1;
            }

            header.site-header > .page-nav-toggle {
                grid-column: 2;
                grid-row: 1;
                justify-self: end;
            }

            header.site-header > .header-status {
                display: flex;
                grid-column: 1 / -1;
                grid-row: 2;
                font-size: 8px;
                line-height: 1.4;
            }

            .section-subheader {
                min-height: 40px;
            }

        }

        @media (prefers-reduced-motion: reduce) {

            header.site-header,
            .section-subheader {
                transition: none;
            }

        }

    `;


    /* ========================================================
       03 — HTML GENERATION
    ======================================================== */

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    const header = document.createElement("header");
    header.className = "site-header";

    header.innerHTML = `

        <button class="header-title" type="button">
            ${navigationConfig.title}
        </button>

        <div class="header-status">
            <span class="status-dot"></span>
            ${navigationConfig.status}
        </div>

        <button
            class="nav-dropdown-toggle page-nav-toggle"
            id="pageDropdownToggle"
            type="button"
            aria-expanded="false"
            aria-controls="pageNavigation"
        >
            <span>PAGES</span>
            <span class="nav-dropdown-indicator" aria-hidden="true">+</span>
        </button>

        <nav
            class="nav-links page-nav-links"
            id="pageNavigation"
            aria-label="Project pages"
        >

            ${navigationConfig.pages.map(page => `
                <a
                    href="${page.href}"
                    class="${page.href === currentPage ? "active" : ""}"
                    ${page.href === currentPage ? 'aria-current="page"' : ""}
                >
                    <span>${page.number}</span>
                    ${page.label}
                </a>
            `).join("")}

        </nav>

    `;


    const subheader = document.createElement("div");
    subheader.className = "section-subheader";
    subheader.id = "sectionSubheader";

    subheader.innerHTML = `

        <span class="section-subheader-label" aria-hidden="true">
            SECTIONS
        </span>

        <button
            class="nav-dropdown-toggle section-nav-toggle"
            id="navDropdownToggle"
            type="button"
            aria-expanded="false"
            aria-controls="siteNavigation"
        >
            <span>SECTIONS</span>
            <span class="nav-dropdown-indicator" aria-hidden="true">+</span>
        </button>

        <nav
            class="nav-links section-nav-links"
            id="siteNavigation"
            aria-label="Site sections"
        >

            ${navigationConfig.sections.map(section => `
                <a
                    href="${section.href}"
                    data-target="${section.target}"
                >
                    <span>${section.number}</span>
                    ${section.label}
                </a>
            `).join("")}

        </nav>

    `;


    /* ========================================================
       04 — INSERT NAVIGATION
    ======================================================== */

    const main = document.querySelector("main");

    if (main) {
        document.body.insertBefore(header, main);
        document.body.insertBefore(subheader, main);
    }


    /* ========================================================
       05 — INJECT CSS
    ======================================================== */

    const styleElement = document.createElement("style");
    styleElement.id = "dance-division-navigation-styles";
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);


    /* ========================================================
       06 — DROPDOWN FUNCTIONALITY
    ======================================================== */

    function setupDropdown(toggleId, navId, boundarySelector) {

        const toggle = document.getElementById(toggleId);
        const nav = document.getElementById(navId);
        const boundary = document.querySelector(boundarySelector);

        if (!toggle || !nav || !boundary) return;

        const closeMenu = () => {
            toggle.setAttribute("aria-expanded", "false");
            nav.classList.remove("is-dropdown-open");
        };

        toggle.addEventListener("click", () => {

            const open =
                toggle.getAttribute("aria-expanded") !== "true";

            toggle.setAttribute("aria-expanded", String(open));
            nav.classList.toggle("is-dropdown-open", open);

        });

        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", event => {
            if (!boundary.contains(event.target)) closeMenu();
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                closeMenu();
                toggle.focus();
            }
        });

        const desktopQuery = window.matchMedia("(min-width: 1251px)");

        const resetForViewport = () => {
            if (desktopQuery.matches) closeMenu();
        };

        if (desktopQuery.addEventListener) {
            desktopQuery.addEventListener("change", resetForViewport);
        } else {
            desktopQuery.addListener(resetForViewport);
        }

    }

    setupDropdown(
        "navDropdownToggle",
        "siteNavigation",
        ".section-subheader"
    );

    setupDropdown(
        "pageDropdownToggle",
        "pageNavigation",
        ".site-header"
    );


    /* ========================================================
       07 — ACTIVE SECTION
    ======================================================== */

    const sectionLinks = Array.from(
        document.querySelectorAll(".section-nav-links a")
    );

    const sections = sectionLinks
        .map(link => document.getElementById(link.dataset.target))
        .filter(Boolean);

    if ("IntersectionObserver" in window && sections.length) {

        const observer = new IntersectionObserver(entries => {

            const visible = entries
                .filter(entry => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            if (!visible.length) return;

            const activeId = visible[0].target.id;

            sectionLinks.forEach(link => {

                const active = link.dataset.target === activeId;

                link.classList.toggle("active", active);

                if (active) {
                    link.setAttribute("aria-current", "location");
                } else {
                    link.removeAttribute("aria-current");
                }

            });

        }, {
            rootMargin: "-20% 0px -60% 0px",
            threshold: [0, 0.1, 0.25, 0.5]
        });

        sections.forEach(section => observer.observe(section));

    }


    /* ========================================================
       08 — SCROLL HIDE / REVEAL
    ======================================================== */

    let previousY = window.scrollY || 0;
    let scheduled = false;

    const measure = () => {

        document.documentElement.style.setProperty(
            "--site-header-height",
            `${header.getBoundingClientRect().height}px`
        );

        document.documentElement.style.setProperty(
            "--section-subheader-height",
            `${subheader.getBoundingClientRect().height}px`
        );

    };

    const updateScroll = () => {

        const currentY = Math.max(0, window.scrollY || 0);
        const delta = currentY - previousY;

        const menuOpen = !!document.querySelector(".is-dropdown-open");

        if (currentY < 80 || menuOpen) {

            document.body.classList.remove("headers-hidden");

        } else if (delta > 4 && currentY > 120) {

            document.body.classList.add("headers-hidden");

        } else if (delta < -4) {

            document.body.classList.remove("headers-hidden");

        }

        previousY = currentY;
        scheduled = false;

    };

    window.addEventListener("scroll", () => {

        if (!scheduled) {
            scheduled = true;
            window.requestAnimationFrame(updateScroll);
        }

    }, { passive: true });

    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("load", measure, { once: true });

    measure();

})();
