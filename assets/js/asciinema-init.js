// Asciinema Player 初始化脚本
document.addEventListener('DOMContentLoaded', function() {

  function initAsciinemaPlayers() {
    if (typeof AsciinemaPlayer === 'undefined') {
      setTimeout(initAsciinemaPlayers, 100);
      return;
    }

    document.querySelectorAll('.asciinema-player').forEach(function(player) {
      const config = {
        theme: player.getAttribute('data-theme') || 'asciinema',
        speed: parseFloat(player.getAttribute('data-speed')) || 1,
        autoplay: player.getAttribute('data-autoplay') === 'true',
        loop: player.getAttribute('data-loop') === 'true',
        controls: true,
        idleTimeLimit: 2  // 限制终端不活动时间为2秒，让播放更流畅
      };

      const poster = player.getAttribute('data-poster');
      if (poster) config.poster = poster;

      const markersData = player.getAttribute('data-markers');
      if (markersData) {
        try {
          const markers = JSON.parse(markersData);
          if (Array.isArray(markers)) config.markers = markers;
        } catch (e) {
          console.error('Invalid markers data:', markersData, e);
        }
      }

      try {
        AsciinemaPlayer.create(player.getAttribute('data-cast-file'), player, config);
      } catch (error) {
        console.error('Failed to create asciinema player:', error);
      }
    });
  }

  initAsciinemaPlayers();
});
