export interface IAboutCard {
    title: string,
    image: string,
    height: string | undefined,
    width: string | undefined,
}

const AboutCard = (props: IAboutCard) => {
    return (
        <div className="about-image-card">
            <div className="about-image">
                <img
                    className="about-us-photo-image"
                    src={props.image}
                    alt={props.title}
                    style={{
                    }}
                />
                <div className="about-image-title">
                    {props.title}
                </div>
            </div>
        </div>
    )
}

export default AboutCard;