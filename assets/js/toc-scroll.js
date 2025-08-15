/**
 * TOC Scroll - Highlights active TOC links based on visible headings
 * 
 * Uses Intersection Observer to track heading visibility and applies
 * 'hextra-toc-active' class to corresponding TOC links. Selects the
 * topmost heading when multiple are visible.
 * 
 * Requires: .hextra-toc element, matching heading IDs, toc.css styles
 */
document.addEventListener("DOMContentLoaded", function () {
  const toc = document.querySelector(".hextra-toc");
  if (!toc) return;

  const tocLinks = toc.querySelectorAll('a[href^="#"]');
  if (tocLinks.length === 0) return;

  const headingIds = Array.from(tocLinks).map((link) => link.getAttribute("href").substring(1));

  const headings = headingIds.map((id) => document.getElementById(decodeURIComponent(id))).filter(Boolean);
  if (headings.length === 0) return;

  let currentActiveLink = null;
  let isHashNavigation = false;

  // Create intersection observer
  const observer = new IntersectionObserver(
    (entries) => {
      // Skip observer updates during hash navigation
      if (isHashNavigation) return;

      const visibleHeadings = entries.filter((entry) => entry.isIntersecting).map((entry) => entry.target);

      if (visibleHeadings.length === 0) return;

      // Find the heading closest to the top of the viewport
      const topMostHeading = visibleHeadings.reduce((closest, heading) => {
        const headingTop = heading.getBoundingClientRect().top;
        const closestTop = closest.getBoundingClientRect().top;
        return Math.abs(headingTop) < Math.abs(closestTop) ? heading : closest;
      });

      // Encode the id and make it lowercase to match the TOC link
      const targetId = encodeURIComponent(topMostHeading.id).toLowerCase();
      const targetLink = toc.querySelector(`a[href="#${targetId}"]`);

      if (targetLink && targetLink !== currentActiveLink) {
        // Remove active class from previous link
        if (currentActiveLink) {
          currentActiveLink.classList.remove("hextra-toc-active");
        }

        // Add active class to current link
        targetLink.classList.add("hextra-toc-active");
        currentActiveLink = targetLink;
      }
    },
    {
      rootMargin: "-20px 0px -60% 0px", // Adjust sensitivity
      threshold: [0, 0.1, 0.5, 1],
    }
  );

  // Observe all headings
  headings.forEach((heading) => observer.observe(heading));

  // Handle direct navigation to page with hash
  function handleHashNavigation() {
    const hash = window.location.hash; // already url encoded
    if (hash) {
      const targetLink = toc.querySelector(`a[href="${hash}"]`);
      if (targetLink) {
        // Disable observer temporarily during hash navigation
        isHashNavigation = true;

        if (currentActiveLink) {
          currentActiveLink.classList.remove("hextra-toc-active");
        }
        targetLink.classList.add("hextra-toc-active");
        currentActiveLink = targetLink;

        // Re-enable observer after scroll settles
        setTimeout(() => { isHashNavigation = false; }, 500);
        return;
      }
    }
  }

  // Handle hash changes navigation
  window.addEventListener("hashchange", handleHashNavigation);

  // Handle initial load
  setTimeout(handleHashNavigation, 100);
});
