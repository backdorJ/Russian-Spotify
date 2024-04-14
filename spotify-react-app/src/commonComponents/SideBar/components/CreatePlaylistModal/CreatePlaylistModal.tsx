import React, {useContext, useState} from "react";
import {UserContext} from "../../../../index";
import MakeSubscriptionDto from "../../../../utils/dto/subscription/makeSubscriptionDto";
import {subscribe} from "../../../../http/subApi";
import './CreatePlaylistModal.css'
import CreatePlaylistDto from "../../../../utils/dto/playlist/createPlaylistDto";
import createPlaylistWithFile from "../../../../functions/createPlaylistWithFile";
import {useNavigate} from "react-router-dom";
import routeNames from "../../../../utils/routeNames";


const CreatePlaylistModal = (props: any) => {
    const {show, onHide} = props
    const [name, setName] = useState('')
    const [file, setFile] = useState('')
    const navigate = useNavigate()

    const reset = () => {
        setName('')
        setFile('')
    }

    const handlerCreatePlaylist = () => {
        if (name === '') {
            alert("Name required!")
            return
        }

        let createPlaylistDto = new CreatePlaylistDto(name, file)
        createPlaylistWithFile(createPlaylistDto)
            .then(_ => {
                alert(`Playlist ${createPlaylistDto.name} was successfully created!`)
                onHide()
                reset()
                navigate(routeNames.PLAYLIST_PAGE_ROUTE)
            })
    }

    return (
        show &&
        <>
            <div className="overlay" onClick={() => onHide()}>
            </div>
            <div className="modal-content">
                <h2>New Playlist</h2>
                <div className="modal-hr"></div>
                <div className="create-playlist-form">
                    <h3>Playlist name:<span className="required-red">*</span></h3>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        type="text"
                        className="create-playlist-form__name"
                        required/>
                    <h3>Playlist image:</h3>
                    <input
                        value={file}
                        onChange={e => setFile(e.target.value)}
                        type="file"
                        className="create-playlist-form__image"/>
                </div>
                <div className="modal-buttons">
                    <button
                        className="close-modal"
                        onClick={() => onHide()}>
                        Close
                    </button>
                    <button className="submit-modal"
                        onClick={() => handlerCreatePlaylist()}>
                        Create
                    </button>
                </div>
            </div>
        </>
    )
}

export default CreatePlaylistModal