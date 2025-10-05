(function () {
  'use strict';

  function createOverlayFromTarget(targetImg) {
    const src = targetImg.currentSrc || targetImg.src;
    const alt = targetImg.alt || "";
    if (!src) return;

    const rect = targetImg.getBoundingClientRect();

    const overlay = document.createElement("div");
    overlay.className = "hextra-zoom-image-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", alt || "Zoomed image");

    const img = document.createElement("img");
    img.className = "hextra-zoom-image loading";
    img.src = src;
    if (alt) img.alt = alt;

    // Center-origin positioning for cleaner transforms
    const startCX = rect.left + rect.width / 2;
    const startCY = rect.top + rect.height / 2;
    img.style.position = "fixed";
    img.style.left = startCX + "px";
    img.style.top = startCY + "px";
    img.style.width = rect.width + "px";
    img.style.height = rect.height + "px";
    img.style.transformOrigin = "center center";
    img.style.transform = "translate3d(-50%, -50%, 0) scale(1)";

    // Ensure overlay scales from center when zooming the whole overlay
    overlay.style.transformOrigin = "center center";
    overlay.appendChild(img);

    // Image loaded handler
    img.addEventListener('load', function () {
      img.classList.remove('loading');
      img.classList.add('loaded');
    });

    // Gesture state management
    let isPinching = false;
    let isDragging = false;
    let isInteracting = false;
    let pinchEndTimer = null;

    const pointers = new Map(); // pointerId -> {x, y, startX, startY}
    const SCALE_MIN = 1;
    const SCALE_MAX = 5;

    let gestureState = {
      scale: 1,
      panX: 0,
      panY: 0,
      startScale: 1,
      startPanX: 0,
      startPanY: 0,
      initialDistance: 0,
      initialMidpointX: 0,
      initialMidpointY: 0,
      dragStartX: 0,
      dragStartY: 0,
      dragPanX: 0,
      dragPanY: 0
    };

    // Utility functions
    function getDistance(p1, p2) {
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      return Math.sqrt(dx * dx + dy * dy);
    }

    function getMidpoint(p1, p2) {
      return {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2
      };
    }

    function setInteracting(value) {
      isInteracting = value;
      if (value) {
        overlay.classList.add('interacting');
      } else {
        overlay.classList.remove('interacting');
      }
    }

    // Pointer event handlers
    let tapCandidate = false;
    let tapStartX = 0;
    let tapStartY = 0;
    let tapStartTime = 0;

    function onPointerDown(e) {
      e.preventDefault();

      if (typeof overlay.setPointerCapture === 'function') {
        try {
          overlay.setPointerCapture(e.pointerId);
        } catch (err) {
          // ignore pointer capture failures (e.g. Safari)
        }
      }

      const pointerData = {
        x: e.clientX,
        y: e.clientY,
        startX: e.clientX,
        startY: e.clientY
      };

      pointers.set(e.pointerId, pointerData);

      if (pointers.size === 1) {
        isDragging = false;
        if (gestureState.scale > SCALE_MIN) {
          setInteracting(true);
        }

        // Set drag baseline so a single finger can pan when zoomed
        gestureState.dragStartX = e.clientX;
        gestureState.dragStartY = e.clientY;
        gestureState.dragPanX = gestureState.panX;
        gestureState.dragPanY = gestureState.panY;

        tapCandidate = true;
        tapStartX = e.clientX;
        tapStartY = e.clientY;
        tapStartTime = (typeof performance !== 'undefined' ? performance.now() : Date.now());
      } else if (pointers.size === 2) {
        isPinching = true;
        isDragging = false;
        setInteracting(true);
        tapCandidate = false;

        const pts = Array.from(pointers.values());
        gestureState.initialDistance = getDistance(pts[0], pts[1]) || 1;
        gestureState.startScale = gestureState.scale;
        gestureState.startPanX = gestureState.panX;
        gestureState.startPanY = gestureState.panY;

        const midpoint = getMidpoint(pts[0], pts[1]);
        gestureState.initialMidpointX = midpoint.x;
        gestureState.initialMidpointY = midpoint.y;

        if (pinchEndTimer) {
          clearTimeout(pinchEndTimer);
          pinchEndTimer = null;
        }
      }
    }

    function onPointerMove(e) {
      const pointer = pointers.get(e.pointerId);
      if (!pointer) return;

      e.preventDefault();

      pointer.x = e.clientX;
      pointer.y = e.clientY;

      if (pointers.size === 2) {
        const pts = Array.from(pointers.values());
        const currentDistance = getDistance(pts[0], pts[1]);
        if (!currentDistance) return;

        const currentMidpoint = getMidpoint(pts[0], pts[1]);

        const distanceRatio = currentDistance / (gestureState.initialDistance || currentDistance);
        let nextScale = gestureState.startScale * distanceRatio;
        nextScale = Math.max(SCALE_MIN, Math.min(SCALE_MAX, nextScale));

        const totalStart = baseScale * gestureState.startScale;
        const totalNext = baseScale * nextScale;

        let nextPanX = gestureState.panX;
        let nextPanY = gestureState.panY;

        if (totalStart > 0) {
          const startOffsetX = gestureState.initialMidpointX - final.cx - gestureState.startPanX;
          const startOffsetY = gestureState.initialMidpointY - final.cy - gestureState.startPanY;
          const currentOffsetX = currentMidpoint.x - final.cx;
          const currentOffsetY = currentMidpoint.y - final.cy;
          const ratio = totalNext / totalStart;

          nextPanX = currentOffsetX - ratio * startOffsetX;
          nextPanY = currentOffsetY - ratio * startOffsetY;
        }

        gestureState.scale = nextScale;
        gestureState.panX = nextPanX;
        gestureState.panY = nextPanY;

        tapCandidate = false;
        applyTransform();
      } else if (pointers.size === 1) {
        const moveX = pointer.x - gestureState.dragStartX;
        const moveY = pointer.y - gestureState.dragStartY;
        const dragThreshold = 6;

        if (!isDragging) {
          const distanceSq = moveX * moveX + moveY * moveY;
          if (gestureState.scale > SCALE_MIN && distanceSq > dragThreshold * dragThreshold) {
            isDragging = true;
            tapCandidate = false;
            setInteracting(true);
            gestureState.dragPanX = gestureState.panX;
            gestureState.dragPanY = gestureState.panY;
          }
        }

        if (isDragging) {
          gestureState.panX = gestureState.dragPanX + moveX;
          gestureState.panY = gestureState.dragPanY + moveY;
          applyTransform();
        } else {
          const cancelTapThreshold = 10;
          if (
            Math.abs(pointer.x - tapStartX) > cancelTapThreshold ||
            Math.abs(pointer.y - tapStartY) > cancelTapThreshold
          ) {
            tapCandidate = false;
          }
        }
      }
    }

    function onPointerUp(e) {
      if (typeof overlay.releasePointerCapture === 'function') {
        try {
          overlay.releasePointerCapture(e.pointerId);
        } catch (err) {
          // ignore release failures
        }
      }

      pointers.delete(e.pointerId);

      if (pointers.size === 0) {
        const now = (typeof performance !== 'undefined' ? performance.now() : Date.now());
        const duration = now - tapStartTime;
        const shouldClose = tapCandidate && !isPinching && !isDragging && duration < 300;

        if (shouldClose) {
          close();
        }

        tapCandidate = false;
        isDragging = false;

        if (isPinching) {
          pinchEndTimer = setTimeout(() => {
            isPinching = false;
          }, 180);
        } else {
          isPinching = false;
        }

        gestureState.startScale = gestureState.scale;
        gestureState.startPanX = gestureState.panX;
        gestureState.startPanY = gestureState.panY;

        setTimeout(() => setInteracting(false), 120);
      } else if (pointers.size === 1) {
        isPinching = false;
        isDragging = false;

        const remaining = Array.from(pointers.values())[0];
        remaining.startX = remaining.x;
        remaining.startY = remaining.y;

        gestureState.dragStartX = remaining.x;
        gestureState.dragStartY = remaining.y;
        gestureState.dragPanX = gestureState.panX;
        gestureState.dragPanY = gestureState.panY;

        if (gestureState.scale <= SCALE_MIN) {
          setTimeout(() => setInteracting(false), 120);
        }
      }
    }

    function onPointerCancel(e) {
      onPointerUp(e);
    }

    // Mouse wheel zoom and scroll handling
    function onWheel(e) {
      e.preventDefault();

      // If it's a regular scroll (not pinch), dismiss the overlay
      if (!e.ctrlKey && !e.metaKey) {
        // Regular scroll - dismiss overlay gracefully
        close();
        return;
      }

      // Handle trackpad pinch (ctrl+wheel or cmd+wheel on Mac)
      const delta = e.deltaY;
      const scaleFactor = 0.01;
      const zoomSpeed = Math.exp(-delta * scaleFactor);

      const prevScale = gestureState.scale;
      const unclamped = prevScale * zoomSpeed;
      const nextScale = Math.max(SCALE_MIN, Math.min(SCALE_MAX, unclamped));

      if (Math.abs(nextScale - prevScale) > 0.0001) {
        const totalPrev = baseScale * prevScale;
        const totalNext = baseScale * nextScale;

        if (totalPrev > 0) {
          const anchorOffsetX = e.clientX - final.cx;
          const anchorOffsetY = e.clientY - final.cy;
          const ratio = totalNext / totalPrev;

          gestureState.panX = anchorOffsetX + (gestureState.panX - anchorOffsetX) * ratio;
          gestureState.panY = anchorOffsetY + (gestureState.panY - anchorOffsetY) * ratio;
        }
      }

      gestureState.scale = nextScale;
      gestureState.startScale = nextScale;
      gestureState.startPanX = gestureState.panX;
      gestureState.startPanY = gestureState.panY;

      setInteracting(true);
      applyTransform();
      setTimeout(() => setInteracting(false), 150);
    }

    // Keyboard navigation
    function onKeyDown(e) {
      if (e.key === "Escape") {
        close();
      } else if (e.key === "+" || e.key === "=") {
        gestureState.scale = Math.min(SCALE_MAX, gestureState.scale * 1.2);
        gestureState.startScale = gestureState.scale;
        gestureState.startPanX = gestureState.panX;
        gestureState.startPanY = gestureState.panY;
        applyTransform();
      } else if (e.key === "-") {
        gestureState.scale = Math.max(SCALE_MIN, gestureState.scale / 1.2);
        gestureState.startScale = gestureState.scale;
        gestureState.startPanX = gestureState.panX;
        gestureState.startPanY = gestureState.panY;
        applyTransform();
      } else if (e.key === "0") {
        gestureState.scale = 1;
        gestureState.panX = 0;
        gestureState.panY = 0;
        gestureState.startScale = gestureState.scale;
        gestureState.startPanX = 0;
        gestureState.startPanY = 0;
        applyTransform();
      }
    }

    // Apply transforms
    let final = computeFinal();
    let baseScale = final.scale;

    function computeFinal() {
      const vv = window.visualViewport;
      const vw = vv ? vv.width : window.innerWidth;
      const vh = vv ? vv.height : window.innerHeight;
      const vx = vv ? vv.offsetLeft : 0;
      const vy = vv ? vv.offsetTop : 0;

      const margin = 20;
      const maxW = Math.min(vw - margin * 2, 1200);
      const maxH = vh - margin * 2;

      const scale = Math.min(maxW / rect.width, maxH / rect.height, 2);
      const centerX = vx + vw / 2;
      const centerY = vy + vh / 2;

      return { cx: centerX, cy: centerY, scale };
    }

    function applyTransform() {
      img.style.left = final.cx + "px";
      img.style.top = final.cy + "px";

      overlay.style.transform = "none";

      const totalScale = baseScale * gestureState.scale;
      const transform = `translate3d(-50%, -50%, 0) translate3d(${gestureState.panX}px, ${gestureState.panY}px, 0) scale(${totalScale})`;
      img.style.transform = transform;
    }

    // Close function
    function close(immediate = false) {
      overlay.classList.add("closing");

      // Animate back to original position
      img.style.left = startCX + "px";
      img.style.top = startCY + "px";
      img.style.transform = `translate3d(-50%, -50%, 0) scale(1)`;

      // Cleanup event listeners
      cleanup();

      if (immediate) {
        overlay.remove();
        return;
      }

      // Remove after animation
      const done = () => overlay.remove();
      overlay.addEventListener("transitionend", done, { once: true });
      img.addEventListener("transitionend", done, { once: true });

      // Fallback removal
      setTimeout(() => {
        if (overlay.parentNode) {
          overlay.remove();
        }
      }, 400);
    }

    function cleanup() {
      window.removeEventListener("keydown", onKeyDown, true);
      overlay.removeEventListener("wheel", onWheel);
      overlay.removeEventListener("pointermove", onPointerMove);
      overlay.removeEventListener("pointerdown", onPointerDown);
      overlay.removeEventListener("pointerup", onPointerUp);
      overlay.removeEventListener("pointercancel", onPointerCancel);
      window.removeEventListener("resize", onResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", onResize);
        window.visualViewport.removeEventListener("scroll", onResize);
      }
      if (pinchEndTimer) {
        clearTimeout(pinchEndTimer);
      }
    }

    // Handle viewport changes
    function onResize() {
      final = computeFinal();
      baseScale = final.scale;
      gestureState.startScale = gestureState.scale;
      gestureState.startPanX = gestureState.panX;
      gestureState.startPanY = gestureState.panY;
      applyTransform();
    }

    // Setup event listeners
    overlay.addEventListener("wheel", onWheel, { passive: false });
    overlay.addEventListener("pointermove", onPointerMove);
    overlay.addEventListener("pointerdown", onPointerDown);
    overlay.addEventListener("pointerup", onPointerUp);
    overlay.addEventListener("pointercancel", onPointerCancel);
    window.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("resize", onResize, { passive: true });

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", onResize, { passive: true });
      window.visualViewport.addEventListener("scroll", onResize, { passive: true });
    }

    // Add to DOM
    document.body.appendChild(overlay);

    // Trigger opening animation
    requestAnimationFrame(() => {
      overlay.classList.add("show");
      applyTransform();
    });
  }

  // Initialize after DOM ready
  function init() {
    const container = document.querySelector(".content");
    if (!container) return;

    container.addEventListener("click", function (e) {
      const target = e.target;
      if (!(target instanceof HTMLImageElement)) return;
      // Only allow images inside `.content` that are NOT within a `.not-prose` block
      if (target.closest('.not-prose')) return;
      if (target.hasAttribute('data-no-zoom')) return;

      if (e.defaultPrevented) return;
      if (typeof e.button === 'number' && e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const interactiveParent = target.closest('a[href], button, [role="button"], summary, label');
      if (interactiveParent && interactiveParent !== target) {
        return;
      }

      e.preventDefault();

      createOverlayFromTarget(target);
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
