// Image Preview Functionality
(function() {
  'use strict';

  // Create overlay element
  function createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'image-preview-overlay';
    overlay.innerHTML = '<img class="image-preview-content" alt="Preview">';
    document.body.appendChild(overlay);
    return overlay;
  }

  // Initialize image preview
  function initImagePreview() {
    let overlay = document.querySelector('.image-preview-overlay');
    
    // Create overlay if it doesn't exist
    if (!overlay) {
      overlay = createOverlay();
    }

    const previewImg = overlay.querySelector('.image-preview-content');

    // Add click handlers to all images in main
    const mainImages = document.querySelectorAll('main img');
    
    mainImages.forEach(img => {
      img.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Set the preview image source
        previewImg.src = this.src;
        previewImg.alt = this.alt || 'Preview';
        
        // Show overlay
        overlay.classList.add('active');
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
      });
    });

    // Close preview when clicking on overlay (but not on image)
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        closePreview();
      }
    });

    // Close preview when clicking on the preview image
    previewImg.addEventListener('click', function(e) {
      e.stopPropagation();
      closePreview();
    });

    // Close preview with Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closePreview();
      }
    });

    function closePreview() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initImagePreview);
  } else {
    initImagePreview();
  }

  // Re-initialize when new content is loaded (for dynamic content)
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // Check if any new images were added
        const hasNewImages = Array.from(mutation.addedNodes).some(node => {
          return node.nodeType === 1 && (
            node.tagName === 'IMG' || 
            node.querySelector && node.querySelector('img')
          );
        });
        
        if (hasNewImages) {
          // Small delay to ensure images are fully rendered
          setTimeout(initImagePreview, 100);
        }
      }
    });
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})();
