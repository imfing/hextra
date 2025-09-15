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
    let gestureState = {
      scale: 1,
      panX: 0,
      panY: 0,
      lastScale: 1,
      lastPanX: 0,
      lastPanY: 0,
      initialDistance: 0,
      midpointX: 0,
      midpointY: 0
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

      pointers.set(e.pointerId, {
        x: e.clientX,
        y: e.clientY,
        startX: e.clientX,
        startY: e.clientY
      });

      if (pointers.size === 1) {
        isDragging = false;
        setInteracting(true);
        gestureState.lastPanX = gestureState.panX;
        gestureState.lastPanY = gestureState.panY;

        // Tap detection setup
        tapCandidate = true;
        tapStartX = e.clientX;
        tapStartY = e.clientY;
        tapStartTime = (typeof performance !== 'undefined' ? performance.now() : Date.now());
      } else if (pointers.size === 2) {
        // Two touches - start pinch
        isDragging = false;
        isPinching = true;
        setInteracting(true);

        const pts = Array.from(pointers.values());
        gestureState.initialDistance = getDistance(pts[0], pts[1]);
        gestureState.lastScale = gestureState.scale;

        const midpoint = getMidpoint(pts[0], pts[1]);
        gestureState.midpointX = midpoint.x;
        gestureState.midpointY = midpoint.y;

        if (pinchEndTimer) {
          clearTimeout(pinchEndTimer);
          pinchEndTimer = null;
        }
      }
    }

    function onPointerMove(e) {
      if (!pointers.has(e.pointerId)) return;

      e.preventDefault();

      const pointer = pointers.get(e.pointerId);
      pointer.x = e.clientX;
      pointer.y = e.clientY;

      if (isPinching && pointers.size === 2) {
        // Handle pinch zoom
        const pts = Array.from(pointers.values());
        const currentDistance = getDistance(pts[0], pts[1]);
        const scaleDelta = currentDistance / gestureState.initialDistance;

        // Calculate new scale with limits - minimum is 1 (original zoom level)
        const newScale = Math.max(1, Math.min(5, gestureState.lastScale * scaleDelta));

        // Only update pan if scale is actually changing
        // This prevents drift when pinching at minimum scale
        if (Math.abs(newScale - gestureState.scale) > 0.001) {
          gestureState.scale = newScale;

          // Calculate pan based on pinch center movement
          const currentMidpoint = getMidpoint(pts[0], pts[1]);
          const panDeltaX = currentMidpoint.x - gestureState.midpointX;
          const panDeltaY = currentMidpoint.y - gestureState.midpointY;

          gestureState.panX = gestureState.lastPanX + panDeltaX;
          gestureState.panY = gestureState.lastPanY + panDeltaY;
        }

        // Any multi-touch movement cancels tap
        tapCandidate = false;
        applyTransform();
      } else if (pointers.size === 1) {
        // Single pointer: no drag; only cancel tap if large move
        const moveThreshold = 10;
        if (Math.abs(pointer.x - tapStartX) > moveThreshold || Math.abs(pointer.y - tapStartY) > moveThreshold) {
          tapCandidate = false;
        }
      }
    }

    function onPointerUp(e) {
      pointers.delete(e.pointerId);

      if (pointers.size === 0) {
        // All pointers released
        isDragging = false;
        setInteracting(false);
        // Tap-to-close when there was minimal movement and short duration
        const now = (typeof performance !== 'undefined' ? performance.now() : Date.now());
        const duration = now - tapStartTime;
        if (tapCandidate && !isPinching && duration < 300) {
          close();
        }
        tapCandidate = false;
        if (isPinching) {
          pinchEndTimer = setTimeout(() => {
            isPinching = false;
          }, 300);
        }
      } else if (pointers.size === 1) {
        // Going from pinch to single touch — keep dragging disabled
        isPinching = false;
        isDragging = false;
        const remaining = Array.from(pointers.values())[0];
        gestureState.lastPanX = gestureState.panX;
        gestureState.lastPanY = gestureState.panY;
        remaining.startX = remaining.x;
        remaining.startY = remaining.y;
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
      const nextScale = Math.max(1, Math.min(5, unclamped));

      // Effective scale ratio (applied), use it to anchor zoom around cursor
      const f = prevScale === 0 ? 1 : (nextScale / prevScale);
      if (f !== 1) {
        // Zoom towards mouse position
        const rect = img.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const offsetX = e.clientX - centerX;
        const offsetY = e.clientY - centerY;

        // Adjust pan to keep cursor's point stable
        gestureState.panX -= offsetX * (f - 1);
        gestureState.panY -= offsetY * (f - 1);
      }

      gestureState.scale = nextScale;

      setInteracting(true);
      applyTransform();
      setTimeout(() => setInteracting(false), 150);
    }

    // Keyboard navigation
    function onKeyDown(e) {
      if (e.key === "Escape") {
        close();
      } else if (e.key === "+" || e.key === "=") {
        gestureState.scale = Math.min(5, gestureState.scale * 1.2);
        applyTransform();
      } else if (e.key === "-") {
        gestureState.scale = Math.max(1, gestureState.scale / 1.2);
        applyTransform();
      } else if (e.key === "0") {
        gestureState.scale = 1;
        gestureState.panX = 0;
        gestureState.panY = 0;
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

      const overlayScale = Math.max(1, gestureState.scale);
      overlay.style.transform = overlayScale > 1 ? `scale(${overlayScale})` : "none";

      const totalScale = baseScale;
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
      if (target.dataset.noZoom === "" || target.dataset.noZoom === "true") return;

      e.preventDefault();
      e.stopPropagation();

      createOverlayFromTarget(target);
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
