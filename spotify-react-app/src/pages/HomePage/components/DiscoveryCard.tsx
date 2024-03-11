

export default function DiscoveryCard(props: any) {
    const {imageUrl, name, artistId} = props
    const role = 'Artist'

    return (
        <div className="home-page__discovery-card">
            <div className="home-page__discovery-card__image-div">
                <img src={imageUrl} alt={name} className="home-page__discovery-card__image"/>
            </div>
            <div className="home-page__discovery-card__text">
                <div className="home-page__discovery-card__text__name">
                    <p>
                        {name}
                    </p>
                </div>
                <div className="home-page__discovery-card__text__role">
                    <p>
                        {role}
                    </p>
                </div>
            </div>
        </div>
    )
}