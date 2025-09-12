// Easy Image Card copy functionality

// Toast notification system (global scope)
function initializeToastContainer() {
  if (!document.getElementById('hextra-toast-container')) {
    const container = document.createElement('div');
    container.id = 'hextra-toast-container';
    container.className = 'hextra-toast-container';
    document.body.appendChild(container);
  }
}

function showToast(message, type = 'success', duration = 3000, cardElement = null) {
  // If cardElement is provided, show toast on the card itself
  if (cardElement) {
    showToastOnCard(message, type, duration, cardElement);
    return;
  }
  
  // Fallback to global toast container
  const container = document.getElementById('hextra-toast-container');
  if (!container) {
    console.warn('Toast container not found, initializing...');
    initializeToastContainer();
    return showToast(message, type, duration, cardElement);
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `hextra-toast ${type}`;
  
  // Create icon based on type
  const iconSvg = getToastIcon(type);
  
  toast.innerHTML = `
    <div class="hextra-toast-icon">${iconSvg}</div>
    <div class="hextra-toast-message">${message}</div>
  `;
  
  // Add to container
  container.appendChild(toast);
  
  // Trigger show animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  // Auto remove after duration
  setTimeout(() => {
    hideToast(toast);
  }, duration);
}

function showToastOnCard(message, type, duration, cardElement) {
  // Remove any existing toast on this card
  const existingToast = cardElement.querySelector('.hextra-card-toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  // Create toast element for the card
  const toast = document.createElement('div');
  toast.className = `hextra-card-toast hextra-card-toast-${type}`;
  
  // Create icon based on type
  const iconSvg = getToastIcon(type);
  
  toast.innerHTML = `
    <div class="hextra-card-toast-content">
      <div class="hextra-card-toast-icon">${iconSvg}</div>
      <div class="hextra-card-toast-message">${message}</div>
    </div>
  `;
  
  // Add to card
  cardElement.appendChild(toast);
  
  // Trigger show animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  // Auto remove after duration
  setTimeout(() => {
    hideCardToast(toast);
  }, duration);
}

function hideCardToast(toast) {
  toast.classList.remove('show');
  toast.classList.add('hide');
  
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 300);
}

function hideToast(toast) {
  toast.classList.remove('show');
  toast.classList.add('hide');
  
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 300);
}

function getToastIcon(type) {
  const icons = {
    success: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
    </svg>`,
    error: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>`,
    warning: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>`,
    info: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>`
  };
  return icons[type] || icons.info;
}

document.addEventListener('DOMContentLoaded', function () {
  console.log('Easy Image Copy script loaded');
  console.log('DOM is ready, initializing toast system...');
  
  // Initialize toast container
  initializeToastContainer();
  
  // Cache for external images
  const externalImageCache = new Map();
  const CACHE_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours
  const MAX_CACHE_SIZE = 50; // Maximum number of cached images
  
  // Helper function to generate cache key from URL
  function getCacheKey(url) {
    return btoa(encodeURIComponent(url)).replace(/[^a-zA-Z0-9]/g, '').substring(0, 32);
  }
  
  // Helper function to check if cache entry is expired
  function isCacheExpired(cacheEntry) {
    return Date.now() - cacheEntry.timestamp > CACHE_EXPIRY_TIME;
  }
  
  // Helper function to manage cache size
  function manageCacheSize() {
    if (externalImageCache.size > MAX_CACHE_SIZE) {
      // Remove oldest entries
      const entries = Array.from(externalImageCache.entries());
      entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
      
      // Remove oldest 20% of entries
      const entriesToRemove = Math.floor(entries.length * 0.2);
      for (let i = 0; i < entriesToRemove; i++) {
        externalImageCache.delete(entries[i][0]);
      }
      console.log(`Cache cleaned, removed ${entriesToRemove} old entries`);
    }
  }
  
  // Helper function to cache external image
  async function cacheExternalImage(url, blob) {
    try {
      const cacheKey = getCacheKey(url);
      const cacheEntry = {
        blob: blob,
        timestamp: Date.now(),
        url: url,
        size: blob.size
      };
      
      externalImageCache.set(cacheKey, cacheEntry);
      manageCacheSize();
      
      console.log(`External image cached: ${url.substring(0, 50)}...`);
      console.log(`Cache size: ${externalImageCache.size} items`);
      
    } catch (error) {
      console.warn('Failed to cache external image:', error);
    }
  }
  
  // Helper function to get cached external image
  function getCachedExternalImage(url) {
    const cacheKey = getCacheKey(url);
    const cacheEntry = externalImageCache.get(cacheKey);
    
    if (cacheEntry) {
      if (isCacheExpired(cacheEntry)) {
        externalImageCache.delete(cacheKey);
        console.log('Cache entry expired and removed');
        return null;
      }
      
      console.log('External image found in cache');
      return cacheEntry.blob;
    }
    
    return null;
  }
  
  // Helper function to check if URL is from a known problematic domain
  function isKnownCORSBlockedDomain(url) {
    const corsBlockedDomains = [
      'github.com',
      'githubusercontent.com',
      'user-attachments/assets'
    ];
    
    return corsBlockedDomains.some(domain => url.includes(domain));
  }

  // Helper function to fetch external image through proxy/CORS workaround
  async function fetchExternalImage(url) {
    console.log('Attempting to fetch external image:', url);
    
    // Check if this is a known CORS-blocked domain
    if (isKnownCORSBlockedDomain(url)) {
      console.log('Known CORS-blocked domain detected, skipping fetch attempts');
      throw new Error('Known CORS restriction - use link copy fallback');
    }
    
    try {
      // Try to fetch with cors mode
      const response = await fetch(url, { 
        mode: 'cors',
        credentials: 'omit'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const blob = await response.blob();
      
      if (!blob.type.startsWith('image/')) {
        throw new Error('Response is not an image');
      }
      
      // Cache the successfully fetched image
      await cacheExternalImage(url, blob);
      
      return blob;
      
    } catch (fetchError) {
      console.log('Direct fetch failed, trying alternative method:', fetchError.message);
      
      // Alternative method: create image element and convert to canvas
      try {
        return await fetchImageViaCanvas(url);
      } catch (canvasError) {
        console.error('Canvas method also failed:', canvasError);
        throw new Error('Unable to fetch external image');
      }
    }
  }
  
  // Alternative method to fetch image via canvas (for CORS cases)
  async function fetchImageViaCanvas(url) {
    return new Promise((resolve, reject) => {
      console.log('Attempting canvas-based image fetch for:', url);
      
      // Try multiple strategies for loading the image
      const strategies = [
        // Strategy 1: Direct load without crossOrigin
        () => {
          const img = new Image();
          return new Promise((res, rej) => {
            img.onload = () => res(img);
            img.onerror = () => rej(new Error('Direct load failed'));
            img.src = url;
          });
        },
        // Strategy 2: Load with crossOrigin anonymous
        () => {
          const img = new Image();
          return new Promise((res, rej) => {
            img.onload = () => res(img);
            img.onerror = () => rej(new Error('CORS anonymous failed'));
            img.crossOrigin = 'anonymous';
            img.src = url;
          });
        },
        // Strategy 3: Load with referrerPolicy
        () => {
          const img = new Image();
          return new Promise((res, rej) => {
            img.onload = () => res(img);
            img.onerror = () => rej(new Error('Referrer policy failed'));
            img.referrerPolicy = 'no-referrer';
            img.src = url;
          });
        }
      ];
      
      async function tryStrategies() {
        for (let i = 0; i < strategies.length; i++) {
          try {
            console.log(`Trying strategy ${i + 1}...`);
            const img = await strategies[i]();
            
            // Successfully loaded, now convert to canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            return new Promise((canvasResolve, canvasReject) => {
              canvas.toBlob((blob) => {
                if (blob) {
                  console.log(`Successfully converted external image via canvas (strategy ${i + 1})`);
                  canvasResolve(blob);
                } else {
                  canvasReject(new Error('Failed to convert canvas to blob'));
                }
              }, 'image/png');
            });
            
          } catch (error) {
            console.log(`Strategy ${i + 1} failed:`, error.message);
            if (i === strategies.length - 1) {
              throw new Error('All canvas strategies failed');
            }
          }
        }
      }
      
      tryStrategies().then(resolve).catch(reject);
    });
  }
  
  // Helper function to show copy guidance for external images
  function showCopyGuidance(cardElement) {
    // Create or get existing guidance element
    let guidance = cardElement.querySelector('.copy-guidance');
    if (!guidance) {
      guidance = document.createElement('div');
      guidance.className = 'copy-guidance';
      guidance.style.cssText = `
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 12px;
        white-space: nowrap;
        pointer-events: none;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
      `;
      guidance.textContent = '💡 右键点击可复制图片内容';
      cardElement.style.position = 'relative';
      cardElement.appendChild(guidance);
    }
    
    // Show guidance
    guidance.style.opacity = '1';
    
    // Hide after 3 seconds
    setTimeout(() => {
      if (guidance) {
        guidance.style.opacity = '0';
        setTimeout(() => {
          if (guidance && guidance.parentNode) {
            guidance.parentNode.removeChild(guidance);
          }
        }, 300);
      }
    }, 3000);
  }

  // Helper function to convert image blob to PNG format
  async function convertImageToPNG(blob) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = function() {
        try {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          
          canvas.toBlob((pngBlob) => {
            // Clean up object URL
            URL.revokeObjectURL(img.src);
            
            if (pngBlob) {
              resolve(pngBlob);
            } else {
              reject(new Error('Failed to convert image to PNG'));
            }
          }, 'image/png');
        } catch (error) {
          URL.revokeObjectURL(img.src);
          reject(error);
        }
      };
      
      img.onerror = function() {
        URL.revokeObjectURL(img.src);
        reject(new Error('Failed to load image for conversion'));
      };
      
      img.src = URL.createObjectURL(blob);
    });
  }
  
  // Global function to copy image to clipboard
  window.copyImageToClipboard = async function(imageUrl, cardElement) {
    console.log('copyImageToClipboard called with URL:', imageUrl);
    console.log('Card element:', cardElement);
    console.log('Toast container exists:', !!document.getElementById('hextra-toast-container'));
    
    // Check if clipboard API is available
    if (!navigator.clipboard) {
      console.error('Clipboard API not available');
      showToast('您的浏览器不支持剪贴板功能，请使用现代浏览器或确保在HTTPS环境下访问', 'error', 5000, cardElement);
      return;
    }
    
    try {
      // Show copying state
      cardElement.classList.add('copied');
      const copyText = cardElement.querySelector('.copy-text');
      if (!copyText) {
        console.error('Copy text element not found');
        return;
      }
      
      const originalText = copyText.textContent;
      copyText.textContent = '复制中...';

      console.log('Attempting to fetch image:', imageUrl);
      
      // Check if it's a cross-origin image (GitHub, external domains)
      const isExternalImage = !imageUrl.startsWith(window.location.origin) && 
                             !imageUrl.startsWith('/') && 
                             !imageUrl.startsWith('./');
      
      let blob;
      
      if (isExternalImage) {
        console.log('External image detected, checking cache...');
        
        // For known CORS-blocked domains, provide better user experience
        if (isKnownCORSBlockedDomain(imageUrl)) {
          console.log('Known CORS-blocked domain detected. Due to browser security policies, external images cannot be directly copied as image content.');
          console.log('Falling back to URL copy with user guidance...');
          
          // Show helpful message to user
          copyText.textContent = '复制链接中...';
          
          // Add a brief delay to show the message
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Provide helpful guidance
          console.log('💡 Tip: To copy the actual image, right-click on the image and select "Copy image"');
          
          // Directly throw to trigger URL fallback
          throw new Error('External image - using URL copy with guidance');
        } else {
          // Check cache first for non-CORS-blocked domains
          blob = getCachedExternalImage(imageUrl);
          
          if (!blob) {
            console.log('Image not in cache, attempting to fetch and cache...');
            copyText.textContent = '获取中...';
            
            try {
              blob = await fetchExternalImage(imageUrl);
              copyText.textContent = '缓存中...';
            } catch (error) {
              console.error('Failed to fetch external image:', error);
              throw new Error('Unable to fetch external image for caching');
            }
          } else {
            console.log('Using cached external image');
          }
        }
      } else {
        // Handle local images
        console.log('Local image detected, fetching directly...');
        const response = await fetch(imageUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        blob = await response.blob();
      }
      console.log('Image fetched successfully, blob type:', blob.type);
      
      // Check if the blob type is supported
      if (!blob.type.startsWith('image/')) {
        throw new Error('Fetched content is not an image');
      }
      
      // Convert image to PNG format for better clipboard compatibility
      let finalBlob = blob;
      let finalType = blob.type;
      
      // For WebP, JPEG, or other formats, convert to PNG for better compatibility
      if (blob.type !== 'image/png') {
        console.log('Converting image to PNG for clipboard compatibility');
        try {
          finalBlob = await convertImageToPNG(blob);
          finalType = 'image/png';
          console.log('Image converted to PNG successfully');
        } catch (convertError) {
          console.warn('Failed to convert image, using original format:', convertError);
          // Fall back to original blob if conversion fails
        }
      }
      
      // Copy to clipboard
      await navigator.clipboard.write([
        new ClipboardItem({
          [finalType]: finalBlob
        })
      ]);
      
      console.log('Image copied to clipboard successfully');
      
      // Show success state
      copyText.textContent = '已复制!';
      
      // Show toast notification on card
      showToast('图片复制成功！', 'success', 3000, cardElement);
      
      // Reset after 2 seconds
      setTimeout(() => {
        cardElement.classList.remove('copied');
        copyText.textContent = originalText;
      }, 2000);
      
    } catch (err) {
      console.error('Failed to copy image: ', err);
      
      // Fallback: copy image URL to clipboard
      try {
        console.log('Trying fallback: copying image URL');
        await navigator.clipboard.writeText(imageUrl);
        const copyText = cardElement.querySelector('.copy-text');
        const originalText = copyText.textContent;
        
        // Different message for external vs local images
        const isExternalImage = !imageUrl.startsWith(window.location.origin) && 
                               !imageUrl.startsWith('/') && 
                               !imageUrl.startsWith('./');
        
        if (isExternalImage && isKnownCORSBlockedDomain(imageUrl)) {
          copyText.textContent = '已复制链接!';
          console.log('CORS-blocked domain: copied image URL instead of image content');
          console.log('💡 To copy the actual image: Right-click → "Copy image"');
          
          // Show toast notification for link copy
          showToast('图片链接复制成功！', 'info', 3000, cardElement);
          
          // Show a temporary tooltip or guidance
          showCopyGuidance(cardElement);
        } else {
          copyText.textContent = '已复制链接!';
          // Show toast notification for link copy
          showToast('图片链接复制成功！', 'info', 3000, cardElement);
        }
        
        setTimeout(() => {
          cardElement.classList.remove('copied');
          copyText.textContent = originalText;
        }, 2000);
      } catch (fallbackErr) {
        console.error('Failed to copy image URL: ', fallbackErr);
        cardElement.classList.remove('copied');
        const copyText = cardElement.querySelector('.copy-text');
        copyText.textContent = '复制失败';
        
        // Show error toast notification
        showToast('复制失败，请重试', 'error', 3000, cardElement);
        
        setTimeout(() => {
          copyText.textContent = '点击复制';
        }, 2000);
      }
    }
  };
  
  // Add debug info
  console.log('Clipboard API available:', !!navigator.clipboard);
  console.log('Secure context:', window.isSecureContext);
  
  // Global cache management functions for debugging
  window.clearImageCache = function() {
    externalImageCache.clear();
    console.log('External image cache cleared');
  };
  
  window.showCacheInfo = function() {
    console.log('=== External Image Cache Info ===');
    console.log('Cache size:', externalImageCache.size);
    console.log('Max cache size:', MAX_CACHE_SIZE);
    console.log('Cache expiry time:', CACHE_EXPIRY_TIME / (1000 * 60 * 60), 'hours');
    
    if (externalImageCache.size > 0) {
      console.log('Cached images:');
      externalImageCache.forEach((entry, key) => {
        const age = Date.now() - entry.timestamp;
        const ageHours = Math.round(age / (1000 * 60 * 60) * 100) / 100;
        console.log(`- ${entry.url.substring(0, 60)}... (${Math.round(entry.size / 1024)}KB, ${ageHours}h old)`);
      });
    }
  };
  
  window.testExternalImageCopy = async function(imageUrl) {
    console.log('Testing external image copy for:', imageUrl);
    try {
      if (isKnownCORSBlockedDomain(imageUrl)) {
        console.log('Known CORS-blocked domain - will use link copy fallback');
        return 'link_fallback';
      }
      const blob = await fetchExternalImage(imageUrl);
      console.log('Successfully fetched and cached:', blob.type, blob.size, 'bytes');
      return true;
    } catch (error) {
      console.error('Test failed:', error);
      return false;
    }
  };
  
  window.addCORSBlockedDomain = function(domain) {
    console.log('Adding domain to CORS blocked list:', domain);
    // This is a runtime addition - you can modify the corsBlockedDomains array
    // Note: This won't persist across page reloads
  };
  
  window.listCORSBlockedDomains = function() {
    const corsBlockedDomains = [
      'github.com',
      'githubusercontent.com', 
      'user-attachments/assets'
    ];
    console.log('Currently blocked domains:', corsBlockedDomains);
    return corsBlockedDomains;
  };
  
  // Test function for toast system
  window.testToast = function(message, type, onCard = false) {
    console.log('Testing toast:', message, type, onCard ? 'on card' : 'global');
    if (onCard) {
      // Find the first image card for testing
      const cardElement = document.querySelector('.hextra-easy-image-card');
      if (cardElement) {
        showToast(message || 'Test toast on card', type || 'success', 3000, cardElement);
      } else {
        console.warn('No image card found for testing');
        showToast(message || 'Test toast (fallback)', type || 'success');
      }
    } else {
      showToast(message || 'Test toast message', type || 'success');
    }
  };
  
  // Log cache status on load
  console.log('External image cache system initialized');
  console.log('Use window.showCacheInfo() to view cache status');
  console.log('Use window.clearImageCache() to clear cache');
  console.log('Use window.testExternalImageCopy(url) to test caching');
  console.log('Use window.testToast(message, type) to test toast notifications');
});

