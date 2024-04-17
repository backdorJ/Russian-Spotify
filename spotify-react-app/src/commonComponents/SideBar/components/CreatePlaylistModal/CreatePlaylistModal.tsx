import React, {useContext, useState} from "react";
import './CreatePlaylistModal.css'
import CreatePlaylistDto from "../../../../utils/dto/playlist/createPlaylistDto";
import createPlaylistWithFile from "../../../../functions/createPlaylistWithFile";
import {useNavigate} from "react-router-dom";
import routeNames from "../../../../utils/routeNames";


const CreatePlaylistModal = (props: any) => {
    const {show, onHide} = props
    const [name, setName] = useState('')
    const [files, setFiles] = useState(new Array<File>())
    const navigate = useNavigate()

    const reset = () => {
        setName('')
        setFiles([])
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value
        if (value.length > 30)
            alert('Too long Playlist Name')
        else
            setName(value)
    }

    const handlerCreatePlaylist = () => {
        if (name === '') {
            alert("Name required!")
            return
        }

        let createPlaylistDto = new CreatePlaylistDto(name, files[0])
        createPlaylistWithFile(createPlaylistDto)
            .then(response => {
                if (response.status === 200) {
                    alert(`Playlist '${response.value.playlistName}' was successfully created!`)
                    onHide()
                    reset()
                    navigate(routeNames.PLAYLIST_PAGE_NAV + response.value.playlistId)
                }
                else {
                    if (response.status >= 500)
                        alert('Internal error happened. Please try later!')
                    else
                        alert(response.message)
                }
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
                        onChange={handleInputChange}
                        type="text"
                        className="create-playlist-form__name"
                        required/>
                    <h3>Playlist image:</h3>
                    <input
                        onChange={e => {
                            if (e.target.files !== null) {
                                const file = e.target.files[0]
                                setFiles([file])
                            }
                        }}
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