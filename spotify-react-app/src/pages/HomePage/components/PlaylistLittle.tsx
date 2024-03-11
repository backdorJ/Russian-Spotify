import {FC} from "react";


export default function PlaylistLittle(props: any) {
    const {imageUrl, name, playlistId} = props

    return (
        <div className="homepage__playlist-little">
            <div className="homepage__playlist-little__image-div">
                <img src={imageUrl} alt={name} className="homepage__playlist-little__image"/>
            </div>
            <div className="homepage__playlist-little__name-div">
                <p>
                    {name}
                </p>
            </div>
        </div>
    )
}
