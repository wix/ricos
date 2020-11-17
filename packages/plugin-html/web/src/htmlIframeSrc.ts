/* eslint-disable */
export default `
  <head>
    <style type="text/css">
      iframe[class|='instagram'],
      blockquote[class|='instagram'] {
        /* fallback script for ios below */
        min-width: 0 !important;
        width: calc(100vw - 2px);
      }

      body {
        margin: 0;
        max-width: calc(100vw);
        display: inline-block;
        float: left;
        width: 100%;
        box-sizing: border-box;
      }
      body > iframe {
        margin: 0 !important;
        width: 100% !important;
      }
      body::before,
      body::after {
        content: '.';
        height: 0;
        margin: 0;
        overflow: hidden;
        visibility: hidden;
        display: block;
        clear: both;
      }
    </style>
    <script>
      var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      (function fixInstagramWidth() {
        // This is a fallback for the styles above. Because inline styles can't be overridden in ios.
        var callback = function() {
          try {
            if (document.body.firstChild.className.indexOf('instagram') >= 0) {
              document.body.firstChild.style.minWidth = '0';
              document.body.firstChild.style.width = 'calc(100vw - 2px)';
            }
          } catch (e) {}
        };

        var observer = new MutationObserver(callback);

        observer.observe(document, {
          childList: true,
          subtree: true,
        });
      })();

      function initSendHeight(id) {
        /**
         * Handle image load by triggering a resize
         */
        function imageLoaded(event) {
          if (!event || event.type !== 'load') {
            return;
          }

          var img = event.srcElement;
          // Remove image from loading stack
          var imageIndex = images.indexOf(img);
          if (imageIndex !== -1) {
            images.splice(imageIndex, 1);
          }

          handleResize();
        }

        /**
         * Add 'load' event listener and store reference to image
         * @param {elm} img Image being loaded
         */
        var images = [];
        function addImage(img) {
          if (images.indexOf(img) === -1) {
            img.addEventListener('load', imageLoaded);
            images.push(img);
          }
        }

        /**
         * Filter out images in the DOM that haven't loaded yet and add listener
         */
        function addImageLoadListeners() {
          var imgs = document.querySelectorAll('img');
          for (var i = 0; i < imgs.length; i++) {
            var image = imgs[i];
            // Do nothing if image is already loaded
            if (
              image.nodeName === 'IMG' &&
              image.src &&
              image.complete === false &&
              image.readyState !== 4
            ) {
              addImage(image);
            }
          }
        }

        function getHeight() {
          var height = parseInt(document.body.offsetHeight, 10);
          var styles = document.defaultView.getComputedStyle(document.body);
          height += parseInt(styles.getPropertyValue('margin-bottom'), 10);
          height += parseInt(styles.getPropertyValue('margin-top'), 10);
          return height;
        }

        function handleResize() {
          multipleDelayedSendHeight();
        }

        function handleIframeAdded(iframe) {
          if (isIOS) {
            iframe.onload = function() {
              var src = iframe.src;              
              if (src.indexOf('reloadMe') > -1) {
                return;
              }
              iframe.src = src.replace('?', '?reloadMe=1&');
            };
          }
        }

        var timerId;
        function multipleDelayedSendHeight() {
          sendHeight();
          clearTimeout(timerId);
          let delay = 100;
          timerId = setTimeout(function request() {
            sendHeight();
            delay *= 2;
            if (delay < 20000) {
              timerId = setTimeout(request, delay);
            }
          }, delay);
        }

        function sendHeight() {
          var height = getHeight();
          parent.postMessage({ type: 'htmlPlugin:heightResize', id: id, height: height }, '*');
        }

        function setupMutationObserver() {
          var target = document.querySelector('body');
          var observer = new MutationObserver(function(mutations) {
            addImageLoadListeners();
            handleResize();
            mutations.forEach(function(mutation) {
              mutation.addedNodes.forEach(function(el) {
                if (el.nodeName === 'IFRAME') {
                  handleIframeAdded(el);
                }
              });
            });
          });

          var config = {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true,
          };

          observer.observe(target, config);
        }

        window.addEventListener('resize', handleResize); //this handles width change
        setupMutationObserver();
        handleResize();
      }

      window.addEventListener('message', function(event) {
        if (event.data.type !== 'htmlPlugin:updateContent') {
          return;
        }

        var content = [
          '<!DOCTYPE html>',
          '<html>',
          '<head>' + document.head.innerHTML + '</head>',
          '<body>' + event.data.content + '</body>',
          '</html>',
        ].join('');

        document.open('text/html', 'replace');
        document.write(content);
        document.close();
        initSendHeight(event.data.id);
      });
    </script>
  </head>

  <body></body>
`;
