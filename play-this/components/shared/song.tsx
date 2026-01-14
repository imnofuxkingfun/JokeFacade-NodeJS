'use client'

const SongEmbedded = ({spotifyLink }: 
    { spotifyLink?: string | null }) => { 
        //make link embeddable
        if (!spotifyLink) {
            return <div>No Spotify Link Available</div>;
        }
        const embedLink = spotifyLink.split('?')[0].replace('open.spotify.com/track/', 'open.spotify.com/embed/track/');
        // delete anything else after ? if there
        const spotifyLinkClean = embedLink.includes('?') ? embedLink.split('?')[0] : embedLink;
        const spotifyLinkWithParams = spotifyLinkClean + '?utm_source=generator';

        
        return (
            <iframe data-testid="embed-iframe" style={{borderRadius:12}} 
            src={spotifyLinkWithParams} 
            width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; 
            encrypted-media; fullscreen; picture-in-picture" loading="lazy">

            </iframe>)
}

export default SongEmbedded;