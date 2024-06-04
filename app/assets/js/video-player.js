/**
 * Handles the video player.
 *
 * Requires jQuery and the YouTube API.
 */

/**
 * Triggers when the YouTube API is ready.
 */
function onYouTubeIframeAPIReady() {

    // Assign jQuery listener after the YouTube API is ready.
    $(document).ready(function () {
        
        /**
        * Create a player object from an element based on the video ID.
        * 
        * @param {HTMLElement} element
        *
        * @returns {Object} player
        */
        function createPlayer( element, events = {} ) {

            // Get the video ID.
            const
                videoId = $( element ).data( 'video-id' ),
                elWidth = $( element ).width(),
                elHeight = $( element ).height()
            ;

            // Create the player.
            const player = new YT.Player( element, {
                width: elWidth,
                height: elHeight,
                videoId: videoId,
                events: events,
            } );

            return player;
        }
    
        // For each video player.
        $( '.video-player' ).each( function ( e, el ) {

            // On click, play the video
            $( el ).on( 'click', function ( e ) {
        
                e.preventDefault();
        
                // Create the player.
                const player = createPlayer( el, {
                    'onReady': function ( e ) {
                        e.target.playVideo();
                    }
                } );
            } );
        } );
    });
}
