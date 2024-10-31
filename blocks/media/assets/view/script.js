import videojs from 'video.js/dist/video.min.js';

document.addEventListener('DOMContentLoaded', function () {
    var playerElClass = document.getElementsByClassName('video-js');

    for (let i = 0; i < playerElClass.length; i++) {
        
        var autoplay = playerElClass[i]?.getAttribute('data-autoplay');
        var fluid = playerElClass[i]?.getAttribute('data-fluid');
        var muted = playerElClass[i]?.getAttribute('data-muted');
        var loop = playerElClass[i]?.getAttribute('data-loop');
        var icon = playerElClass[i]?.getAttribute('data-icon');
        var iconSize = playerElClass[i]?.getAttribute('data-icon-size');
        var iconColor = playerElClass[i]?.getAttribute('data-icon-color');
        var iconOpacity = playerElClass[i]?.getAttribute('data-icon-opacity');
        var iconRotation = playerElClass[i]?.getAttribute('data-icon-rotation');
        var icosvackgroundColor = playerElClass[i]?.getAttribute('data-icon-background-color');
        var icosvackgroundRadius = playerElClass[i]?.getAttribute('data-icon-background-radius');
        var icosvackgroundPadding = playerElClass[i]?.getAttribute('data-icon-background-padding');
        var icosvackgroundOutlineWidth = playerElClass[i]?.getAttribute('data-icon-background-outlineWidth');
        var icosvackgroundOutlineHoverWidth = playerElClass[i]?.getAttribute('data-icon-background-outlineHoverWidth');
        var icosvackgroundOutlineStyle = playerElClass[i]?.getAttribute('data-icon-background-outlineStyle');
        var icosvackgroundOutlineColor = playerElClass[i]?.getAttribute('data-icon-background-outlineColor');
        var modal = playerElClass[i]?.getAttribute('data-modal');
        var width = playerElClass[i]?.getAttribute('width') || '100%';
        var height = playerElClass[i]?.getAttribute('height') || '250px';
        var overlayClass = playerElClass[i]?.getAttribute('data-overlay-class');
        var overlayStyle = playerElClass[i]?.getAttribute('data-overlay-style');
        var idSelector = playerElClass[i]?.getAttribute('data-idSelector');

        // Function to check if attribute exists and add control to controlBar children
        function addControlIfExists(controlName, attributeName) {
            if (playerElClass[i]?.hasAttribute(attributeName) && playerElClass[i]?.getAttribute(attributeName) === 'true') {
                return controlName;
            }
            return null;
        }

        var playerOptions = {
            controls: true,
            loop: loop === 'true',
            height: height || '',
            width: width || '',
            fluid: fluid === 'true',
            muted: muted === 'true',
            autoplay: autoplay === 'true',
            preload: 'auto',
            // children: [
            //     'bigPlayButton',
            //     'controlBar'
            // ],
            enableSmoothSeeking: true,
            controlBar: {
                children: [
                    // Add controls conditionally
                    addControlIfExists('playToggle', 'data-play'),
                    addControlIfExists('volumePanel', 'data-volume'),
                    addControlIfExists('progressControl', 'data-progress'),
                    addControlIfExists('remainingTimeDisplay', 'data-remainingTime'),
                    addControlIfExists('fullscreenToggle', 'data-fullScreen'),
                ].filter(Boolean) // Removes null entries
            },
        };
        const player = videojs(playerElClass[i], playerOptions);

        const playIcon = player.getChild('BigPlayButton').addChild(
            'button',
            {
                controlText: 'Play',
                className: `savvy-media-icons`,
            }
        );

        // Create a div containing an icon
        const iconSpanParent = document.createElement("div");
        iconSpanParent.setAttribute("class", `savvy-icon-parent ${ icosvackgroundPadding } ${ icosvackgroundColor ? 'bg-' + icosvackgroundColor : '' } ${ icosvackgroundOutlineWidth ? 'savvy-responsive-border-width' : '' } ${ icosvackgroundRadius ? 'savvy-responsive-border-radius' : '' } ${ icosvackgroundOutlineStyle ? 'savvy-responsive-border-style' : '' } ${ icosvackgroundOutlineColor }`);
        iconSpanParent.setAttribute("style", `${ icosvackgroundOutlineWidth + ';' } ${ icosvackgroundOutlineHoverWidth + ';' } ${ icosvackgroundRadius + ';' } ${ icosvackgroundOutlineStyle + ';' }` );
    
        // Append the icon span to the button
        if (icon) {
            playIcon.el().appendChild(iconSpanParent);
        }

        // Create a span containing an icon
        const iconSpanChild = document.createElement("span");
        iconSpanChild.setAttribute("class", `savvy-icon ${ iconColor ? 'text-' + iconColor : '' }`);
        const innerIconSpanChild = document.createElement("img");
        innerIconSpanChild.setAttribute("src", `${ icon }`);
        innerIconSpanChild.setAttribute("class", `d-inline-block ${ iconSize ? 'savvy-responsive-width' : '' }`);
        innerIconSpanChild.setAttribute("style", `${ iconOpacity ? 'opacity:' + iconOpacity/100 + ';' : '' } ${ iconRotation ? 'transform: rotate(' + iconRotation + 'deg);' : '' } ${ iconSize }`);
        
        iconSpanChild.appendChild(innerIconSpanChild);
    
        // Append the icon span to the button
        iconSpanParent.appendChild(iconSpanChild);

        if (!modal || modal == 'false') {
            var spanElement = document.createElement('span');
            spanElement.setAttribute("class", `${ overlayClass }`);
            spanElement.setAttribute("style", `background-image: ${ overlayStyle };`);
            // Append the Overlay span
            player.el().appendChild(spanElement);
        }
        
        if (spanElement) {
            spanElement.addEventListener('click', function(){
                player.play();
                this.style.display = 'none';
            });

            let bigButton = document.querySelector('.vjs-big-play-button');
            bigButton.addEventListener('click', function(){
                spanElement.style.display = 'none';
            });
        }

        // console.log(iconSpanParent);
    
        var modal = document.getElementById(idSelector);
        modal?.addEventListener('show.bs.modal', event => {
            player.play();
        });
        modal?.addEventListener('hidden.bs.modal', event => {
            player.pause();
        });
    }

    // Vimeo API
    var tag = document.createElement("script");
    tag.src = "https://player.vimeo.com/api/player.js";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var vimeoElClass = document.getElementsByClassName('vimeo-player');
    for (let i = 0; i < vimeoElClass.length; i++) {
        let posterElParent = vimeoElClass[i]?.getAttribute('data-id');
        let elPoster = document.getElementById(posterElParent);
        let iconEl = vimeoElClass[i]?.getAttribute('data-icon-id');
        let elIcon = document.getElementById(iconEl);
        let videoId = vimeoElClass[i].getAttribute('data-video-id');
        let width = vimeoElClass[i].getAttribute('width');
        let height = vimeoElClass[i].getAttribute('height');
        let idSelector = vimeoElClass[i]?.getAttribute('data-idSelector');
        let overlayEl = vimeoElClass[i]?.getAttribute('data-overlay');

        elPoster?.addEventListener('click', function() {
            vimeoHandleVideoClick();
        });

        elIcon?.addEventListener('click', function() {
            vimeoHandleVideoClick();
        });

        function vimeoHandleVideoClick() {
            let vimeoPlayer;
            if (!vimeoPlayer) {
                var options = {
                    id: videoId,
                    // muted: true,
                    width: width,
                    height: height,
                };
                vimeoPlayer = new Vimeo.Player(vimeoElClass[i], options);
            }
            vimeoPlayer.play();
            elPoster.classList.add('d-none');
            elIcon.classList.add('d-none');
        }

        var modal = document.getElementById(idSelector);
        modal?.addEventListener('show.bs.modal', event => {
            let vimeoPlayer;
            if (!vimeoPlayer) {
                var options = {
                    id: videoId,
                    // muted: true,
                    width: width,
                    height: height,
                };
                vimeoPlayer = new Vimeo.Player(vimeoElClass[i], options);
            }
            vimeoPlayer.play();
        });
        modal?.addEventListener('hidden.bs.modal', event => {
            let vimeoPlayer;
            if (!vimeoPlayer) {
                var options = {
                    id: videoId,
                    // muted: true,
                    width: width,
                    height: height,
                };
                vimeoPlayer = new Vimeo.Player(vimeoElClass[i], options);
            }
            vimeoPlayer.pause();
        });
    }
});

// Youtube API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    const posters = document.getElementsByClassName('savvy-media-poster');

    for (let i = 0; i < posters.length; i++) {
        const poster = posters[i];
        const videoId = poster.getAttribute('data-video-id');
        const width = poster.getAttribute('width') || '100%';
        const height = poster.getAttribute('height') || '250px';
        const idSelector = poster.getAttribute('data-idSelector');

        poster.addEventListener('click', handleVideoClick);

        const modal = document.getElementById(idSelector);
        let player;

        if (modal) {
            modal.addEventListener('show.bs.modal', handleModalShow);
            modal.addEventListener('hidden.bs.modal', handleModalHidden);
        }

        function handleVideoClick() {
            if (!player) {
                player = new YT.Player(poster, {
                    height: height,
                    width: width,
                    videoId: videoId,
                    events: { 'onReady': onPlayerReady }
                });
            } else {
                player.playVideo();
            }

            poster.style.display = 'none';
        }

        function handleModalShow() {
            if (!player) {
                player = new YT.Player(poster, {
                    height: height,
                    width: width,
                    videoId: videoId,
                    events: { 'onReady': onPlayerReady }
                });
            } else {
                player.playVideo();
            }
        }

        function handleModalHidden() {
            if (player) {
                player.pauseVideo();
            }
        }

        function onPlayerReady(e) {
            e.target.playVideo();
        }
    }
}
onYouTubeIframeAPIReady();