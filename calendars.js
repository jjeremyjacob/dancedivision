(() => {
  "use strict";
  const status = document.getElementById("calendarDataStatus");
  const plotGrid = document.getElementById("plotGrid");
  const januaryGrid = document.getElementById("calendarGrid");
  if (!plotGrid || !januaryGrid) return;

  const plotOverlay = document.getElementById("plotDetailOverlay");
  const januaryOverlay = document.getElementById("calendarDetailOverlay");
  const formatDate = value => new Date(value + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric"
  });
  const pad = value => String(value).padStart(2, "0");

  function openOverlay(overlay) {
    overlay.classList.add(overlay === plotOverlay ? "plot-open" : "is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeOverlay(overlay) {
    overlay.classList.remove("plot-open", "is-open");
    overlay.setAttribute("aria-hidden", "true");
    if (![plotOverlay, januaryOverlay].some(item => item.classList.contains("plot-open") || item.classList.contains("is-open"))) {
      document.body.style.overflow = "";
    }
  }

  function renderPlot(events) {
    plotGrid.replaceChildren();
    const offset = new Date(2027, 1, 1).getDay();
    for (let i = 0; i < offset; i++) {
      const blank = document.createElement("div"); blank.className = "plot-day plot-empty"; blank.setAttribute("aria-hidden", "true"); plotGrid.appendChild(blank);
    }
    for (let day = 1; day <= 28; day++) {
      const date = `2027-02-${pad(day)}`;
      const cell = document.createElement("div"); cell.className = "plot-day";
      const top = document.createElement("div"); top.className = "plot-day-top";
      const number = document.createElement("span"); number.className = "plot-day-number"; number.textContent = pad(day); top.appendChild(number); cell.appendChild(top);
      const list = document.createElement("div"); list.className = "plot-events";
      events.filter(item => item.date === date).forEach(item => {
        const button = document.createElement("button"); button.type = "button"; button.className = "plot-event";
        const title = document.createElement("span"); title.className = "plot-event-title"; title.textContent = item.title || "Untitled plot item"; button.appendChild(title);
        const metaText = [item.episode, item.characters].filter(Boolean).join(" · ");
        if (metaText) { const meta = document.createElement("span"); meta.className = "plot-event-meta"; meta.textContent = metaText; button.appendChild(meta); }
        button.addEventListener("click", () => {
          document.getElementById("plotDetailDate").textContent = formatDate(item.date);
          document.getElementById("plotDetailTitle").textContent = item.title || "Untitled plot item";
          document.getElementById("plotDetailMeta").textContent = [item.episode && `EPISODE / SEQUENCE: ${item.episode}`, item.characters && `CHARACTERS: ${item.characters}`, item.time && `STORY ORDER: ${item.time}`, item.location && `LOCATION: ${item.location}`].filter(Boolean).join("\n");
          document.getElementById("plotDetailDescription").textContent = item.description || "No additional plot notes.";
          openOverlay(plotOverlay);
        });
        list.appendChild(button);
      });
      cell.appendChild(list); plotGrid.appendChild(cell);
    }
  }

  function renderJanuary(items) {
    januaryGrid.replaceChildren();
    const offset = new Date(2027, 0, 1).getDay();
    for (let i = 0; i < offset; i++) {
      const blank = document.createElement("div"); blank.className = "calendar-day is-empty"; blank.setAttribute("aria-hidden", "true"); januaryGrid.appendChild(blank);
    }
    for (let day = 1; day <= 31; day++) {
      const date = `2027-01-${pad(day)}`;
      const cell = document.createElement("div"); cell.className = "calendar-day";
      const top = document.createElement("div"); top.className = "calendar-day-top";
      const number = document.createElement("span"); number.className = "calendar-day-number"; number.textContent = pad(day); top.appendChild(number); cell.appendChild(top);
      const list = document.createElement("div"); list.className = "calendar-events";
      items.filter(item => item.date === date).forEach(item => {
        const button = document.createElement("button"); button.type = "button"; button.className = "calendar-event";
        const title = document.createElement("span"); title.className = "calendar-event-title"; title.textContent = item.title || "Untitled item"; button.appendChild(title);
        if (item.time) { const time = document.createElement("span"); time.className = "calendar-event-time"; time.textContent = item.time; button.appendChild(time); }
        button.addEventListener("click", () => {
          document.getElementById("calendarDetailDate").textContent = formatDate(item.date);
          document.getElementById("calendarDetailTitle").textContent = item.title || "Untitled item";
          document.getElementById("calendarDetailTime").textContent = item.time || "";
          document.getElementById("calendarDetailDescription").textContent = item.description || "No additional information.";
          document.getElementById("calendarDetailLocation").textContent = item.location ? "LOCATION / " + item.location : "";
          openOverlay(januaryOverlay);
        });
        list.appendChild(button);
      });
      cell.appendChild(list); januaryGrid.appendChild(cell);
    }
  }

  document.querySelectorAll("[data-plot-close]").forEach(button => button.addEventListener("click", () => closeOverlay(plotOverlay)));
  plotOverlay.addEventListener("click", event => { if (event.target === plotOverlay) closeOverlay(plotOverlay); });
  document.querySelectorAll("[data-calendar-close]").forEach(button => button.addEventListener("click", () => closeOverlay(januaryOverlay)));
  januaryOverlay.addEventListener("click", event => { if (event.target === januaryOverlay) closeOverlay(januaryOverlay); });
  document.addEventListener("keydown", event => { if (event.key === "Escape") { closeOverlay(plotOverlay); closeOverlay(januaryOverlay); } });

  const toggle = document.getElementById("calendarNavToggle");
  const nav = document.getElementById("calendarNavigation");
  if (toggle && nav) {
    const closeMenu = () => { toggle.setAttribute("aria-expanded", "false"); nav.classList.remove("is-dropdown-open"); };
    toggle.addEventListener("click", () => { const open = toggle.getAttribute("aria-expanded") !== "true"; toggle.setAttribute("aria-expanded", String(open)); nav.classList.toggle("is-dropdown-open", open); });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("click", event => { if (!event.target.closest(".calendar-site-header")) closeMenu(); });
    document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
  }

  fetch("./calendars.json", { cache: "no-store" })
    .then(response => { if (!response.ok) throw new Error(`HTTP ${response.status}`); return response.json(); })
    .then(data => {
      if (!data || !Array.isArray(data.plot) || !Array.isArray(data.january)) throw new Error("Expected plot and january arrays in calendars.json.");
      renderPlot(data.plot); renderJanuary(data.january);
      if (status) status.textContent = "READ-ONLY / Calendar information is loaded from calendars.json.";
    })
    .catch(error => {
      console.error("Could not load calendars.json", error);
      renderPlot([]); renderJanuary([]);
      if (status) status.textContent = "Could not load calendars.json. Make sure calendars.json is uploaded beside this page.";
    });
})();
