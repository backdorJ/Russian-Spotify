import {FC} from "react";
import {IAuthor} from "../../../commonComponents/interfaces/IAuthor";
import {getImage} from "../../../http/fileApi";
import {useNavigate} from "react-router-dom";
import handleImageNotLoaded from "../../../functions/handleImageNotLoaded";

const DiscoveryCard: FC<IAuthor> = ({author}) => {
    const role = 'Artist'
    const navigate = useNavigate()

    return (
        <div
            // onClick={() => navigate()}
            className="home-page__discovery-card">
            <div className="home-page__discovery-card__image-div">
                <img
                    src={getImage(author.imageId)}
                    alt={author.authorName}
                    onError={handleImageNotLoaded}
                    className="home-page__discovery-card__image"/>
            </div>
            <div className="home-page__discovery-card__text">
                <div className="home-page__discovery-card__text__name">
                    <p>
                        {author.authorName}
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

export default DiscoveryCard