export default function PlaylistNormal(props: any) {
    const {imageUrl, title, description, playlistId} = props

    let descriptionFormatted = description.slice(0, 20)

    return (
        <div className="home-page__playlist-normal">
            <div className="home-page__playlist-normal__image-div">
                <img src={imageUrl} alt={title} className="home-page__playlist-normal__image"/>
            </div>
            <div className="home-page__playlist-normal__text">
                <div className="home-page__playlist-normal__text__title">
                    <p>
                        {title}
                    </p>
                </div>
                <div className="home-page__playlist-normal__text__description">
                    <p>
                        {descriptionFormatted}
                    </p>
                </div>
            </div>
        </div>
    )
}