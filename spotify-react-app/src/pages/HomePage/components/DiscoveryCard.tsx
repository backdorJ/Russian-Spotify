import {FC} from "react";
import Author from "../../../models/Author";
import {IAuthor} from "../../../commonComponents/interfaces/IAuthor";
import {getImage} from "../../../http/fileApi";
import {useNavigate} from "react-router-dom";

const DiscoveryCard: FC<IAuthor> = ({author}) => {
    const role = 'Artist'
    const navigate = useNavigate()

    return (
        <div
            // onClick={() => navigate()}
            className="home-page__discovery-card">
            <div className="home-page__discovery-card__image-div">
                <img src={getImage(author.imageId)} alt={author.authorName} className="home-page__discovery-card__image"/>
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