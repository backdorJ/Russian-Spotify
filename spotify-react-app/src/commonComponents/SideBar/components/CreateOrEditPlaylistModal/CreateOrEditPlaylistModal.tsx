import React, {FC, useContext, useEffect, useState} from "react";
import './CreatePlaylistModal.css'
import CreatePlaylistDto from "../../../../utils/dto/playlist/createPlaylistDto";
import createPlaylistWithFile from "../../../../functions/createPlaylistWithFile";
import {useNavigate} from "react-router-dom";
import routeNames from "../../../../utils/routeNames";
import {ICreateOrEditPlaylistModal} from "../../interfaces/ICreateOrEditPlaylistModal";
import EditPlaylistDto from "../../../../utils/dto/playlist/editPlaylistDto";
import editPlaylistWithFile from "../../../../functions/editPlaylistWithFile";
import {UserContext} from "../../../../index";
import roles from "../../../../utils/roles";
import {deletePlaylist} from "../../../../http/playlistApi";


const CreateOrEditPlaylistModal: FC<ICreateOrEditPlaylistModal> =
    ({show, onHide, playlist, songsIds, reloadTrigger}) => {
        const userStore = useContext(UserContext)
        const [name, setName] =
            useState(playlist ? playlist.playlistName : '')
        const [files, setFiles] = useState(new Array<File>())
        const [isAlbum, setIsAlbum] = useState(false)
        const navigate = useNavigate()
        const isCreating = playlist === undefined

        useEffect(() => {
            reset()
        }, [playlist]);

        const reset = () => {
            if (playlist) {
                setName(playlist.playlistName)
                setFiles([])
                setIsAlbum(playlist.isAlbum)
            } else
                clear()
        }

        const clear = () => {
            setName('')
            setFiles([])
            setIsAlbum(false)
        }

        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            let value = event.target.value
            if (value.length > 30)
                alert('Too long Playlist Name')
            else
                setName(value)
        }

        const handleCreatePlaylist = () => {
            if (isCreating)
                if (name === '') {
                    alert("Name required!")
                    return
                }

            let createPlaylistDto = new CreatePlaylistDto(name, files[0], isAlbum)
            createPlaylistWithFile(createPlaylistDto)
                .then(response => {
                    if (response.status === 200) {
                        alert(`Playlist '${response.value.playlistName}' was successfully created!`)
                        onHide()
                        reset()
                        navigate(routeNames.HOME_PAGE)
                        navigate(routeNames.PLAYLIST_PAGE_NAV + response.value.playlistId)
                    } else {
                        if (response.status >= 500)
                            alert('Internal error happened. Please try later!')
                        else
                            alert(response.message)
                    }
                })
        }

        const handleEditPlaylist = () => {
            if ((name === '' || name === playlist?.playlistName) && files.length === 0) {
                alert("You didn't change anything!")
                return
            }

            let editPlaylistDto = new EditPlaylistDto(name, files[0], songsIds, playlist!)
            editPlaylistWithFile(editPlaylistDto)
                .then(response => {
                    if (response.status === 200) {
                        alert(`Playlist ${response.value.playlistName} was successfully updated!`)
                        onHide()
                        reset()
                        navigate(routeNames.PLAYLIST_PAGE_NAV + response.value.playlistId)
                        reloadTrigger()
                    } else {
                        if (response.status >= 500)
                            alert('Internal error happened. Please try later!')
                        else
                            alert(response.message)
                    }
                })
        }

        const handleDeletePlaylist = () => {
            if (!confirm("Are you sure to delete this playlist?"))
                return

            deletePlaylist(playlist?.playlistId!)
                .then(response => {
                    if (response.status === 200) {
                        alert(`Playlist ${response.value.playlistName} was successfully deleted!`)
                        onHide()
                        reset()
                        navigate(routeNames.ACCOUNT_PAGE)
                    } else {
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
                <div className="overlay" onClick={() => {
                    reset()
                    onHide()
                }}>
                </div>
                <div className="modal-content">
                    <div className="modal-content__header">
                        {
                            isCreating
                                ? <h2>New Playlist</h2>
                                : <h2>Editing playlist <span>{playlist.playlistName}</span></h2>
                        }
                    </div>
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
                        {
                            userStore.user.roles.includes(roles.Author) &&
                            playlist === undefined &&
                            <div className="create-playlist-form__is-album">
                                <h3>Is album?</h3>
                                <input
                                    onChange={() => setIsAlbum(prev => !prev)}
                                    checked={isAlbum}
                                    type="checkbox"/>
                            </div>
                        }
                    </div>
                    <div className="modal-buttons">
                        <button
                            className="close-modal"
                            onClick={reset}>
                            Reset
                        </button>
                        {
                            !isCreating &&
                            <button
                                className="close-modal"
                                onClick={handleDeletePlaylist}>
                                Delete
                            </button>
                        }
                        <button
                            className="close-modal"
                            onClick={() => {
                                reset()
                                onHide()
                            }}>
                            Close
                        </button>
                        <button className="submit-modal"
                                onClick={() => {
                                    if (isCreating)
                                        handleCreatePlaylist()
                                    else
                                        handleEditPlaylist()
                                }}>
                            {isCreating ? 'Create' : 'Update'}
                        </button>
                    </div>
                </div>
            </>
        )
    }

export default CreateOrEditPlaylistModal