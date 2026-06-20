window.HELP_IMPROVE_VIDEOJS = false;

(function () {
  const interactiveSelector =
    'a[href], button, [role="button"], input[type="submit"], input[type="button"], input[type="reset"], label[for], summary, .back-home-button';

  function isInteractive(target) {
    const el = target.closest(interactiveSelector);
    if (!el) return false;
    const style = window.getComputedStyle(el);
    if (style.pointerEvents === "none") return false;
    if (el.matches("a[href='#']") && style.cursor === "not-allowed") return false;
    if (el.matches(":disabled, [aria-disabled='true']")) return false;
    return true;
  }

  function updateCursor(target) {
    document.documentElement.classList.toggle("gap-cursor--interactive", isInteractive(target));
  }

  document.addEventListener("mouseover", (e) => updateCursor(e.target));
  document.addEventListener("focusin", (e) => updateCursor(e.target));
  document.addEventListener("mouseout", (e) => {
    if (!e.relatedTarget || !isInteractive(e.relatedTarget)) {
      document.documentElement.classList.remove("gap-cursor--interactive");
    }
  });
  document.addEventListener("focusout", () => {
    document.documentElement.classList.remove("gap-cursor--interactive");
  });
})();

$(document).ready(function () {
  // Check for click events on the navbar burger icon

  var options = {
    slidesToScroll: 1,
    slidesToShow: 1,
    loop: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  // Initialize all div with carousel class
  var carousels = bulmaCarousel.attach(".carousel", options);

  bulmaSlider.attach();
});
