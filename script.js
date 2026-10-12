/* ==========================================================================
   NATASHA BBQ
   File: script.js  (used by index.html, the landing page)

   PURPOSE:
   1. Show the current year in the footer.
   2. Fade sections in as they scroll into view.
   3. Respect the visitor's reduced-motion setting.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------------------------------------
     1. FOOTER COPYRIGHT YEAR
     Fills <span id="year"></span> with the current year.
     ------------------------------------------------------------------------ */

  var yearElement = document.getElementById('year');

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* ------------------------------------------------------------------------
     2. SECTIONS THAT FADE IN
     The table menu panel is left out so the main action is visible
     immediately. Featured food, about and the footer fade in.
     ------------------------------------------------------------------------ */

  var sectionsToReveal = document.querySelectorAll(
    '.featured, .about, .site-footer'
  );


  /* ------------------------------------------------------------------------
     3. REDUCED MOTION
     Visitors who prefer less motion see everything straight away.
     ------------------------------------------------------------------------ */

  var prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (!('IntersectionObserver' in window) || prefersReducedMotion) {
    return;
  }


  /* ------------------------------------------------------------------------
     4. FADE IN WHEN VISIBLE
     The .reveal class is only added when the observer is available,
     so content is never hidden if the script cannot run.
     ------------------------------------------------------------------------ */

  var revealObserver = new IntersectionObserver(
    function (entries) {

      entries.forEach(function (entry) {

        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }

      });

    },
    { threshold: 0.12 }
  );

  sectionsToReveal.forEach(function (section) {
    section.classList.add('reveal');
    revealObserver.observe(section);
  });

});
