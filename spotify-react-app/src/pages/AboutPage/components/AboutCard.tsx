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
                        width: props.width !== undefined ? props.width : '',
                        height: props.height !== undefined ? props.height : 'auto'
                    }}
                />
            </div>
            <div className="about-image-title">
                <p>{props.title}</p>
            </div>
        </div>
    )
}

export default AboutCard;