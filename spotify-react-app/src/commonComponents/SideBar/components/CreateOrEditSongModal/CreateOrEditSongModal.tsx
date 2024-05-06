import React, {FC, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ICreateOrEditSongModal} from "../../interfaces/ICreateOrEditSongModal";
import EditSongDto from "../../../../utils/dto/song/editSongDto";
import './CreateOrEditPlaylistModal.css'
import createSongWithFiles from "../../../../functions/createSongWithFiles";
import CreateSongDto from "../../../../utils/dto/song/createSongDto";
import {Category} from "../../../../models/Category";
import {getCategories} from "../../../../http/songApi";


const CreateOrEditSongModal: FC<ICreateOrEditSongModal> =
    ({show, onHide, song, reloadTrigger}) => {
        const [name, setName] =
            useState(song === undefined ? '' : song.songName)
        const [duration, setDuration] =
            useState(song === undefined ? 0 : song.duration)
        const [category, setCategory] =
            useState(0)
        const [categories, setCategories] = useState(new Array<Category>())
        const [imageFiles, setImageFiles] = useState(new Array<File>())
        const [audioFiles, setAudioFiles] = useState(new Array<File>())
        const navigate = useNavigate()
        const isCreating = song === undefined

        const reset = () => {
            setName('')
            setAudioFiles([])
        }

        const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            let value = event.target.value
            if (value.length > 30)
                alert('Too long Song Name')
            else
                setName(value)
        }

        const handleCreatePlaylist = () => {
            if (isCreating) {
                if (name === '') {
                    alert("Name required!")
                    return
                }
                if (duration <= 0) {
                    alert("Duration must be more than 0!")
                    return
                }
                if (category <= 0) {
                    alert("Wrong category!")
                    return
                }
                if (audioFiles.length === 0) {
                    alert("Select audio file!")
                    return
                }
            }
            console.log(1)
            let createSongDto = new CreateSongDto(name, duration, category, audioFiles[0], imageFiles[0])
            createSongWithFiles(createSongDto)
                .then(response => {
                    if (response.status === 200) {
                        alert(`Song '${response.value.songName}' was successfully uploaded!`)
                        onHide()
                        reset()
                    } else {
                        if (response.status >= 500)
                            alert('Internal error happened. Please try later!')
                        else
                            alert(response.message)
                    }
                })
        }

        const handleEditPlaylist = () => {
            if ((name === '' || name === song?.songName) && audioFiles.length === 0) {
                alert("You didn't change anything!")
                return
            }

            let editSongDto = new EditSongDto(name, 1, 1, audioFiles[0], audioFiles[1])
            // editPlaylistWithFile(editPlaylistDto)
            //     .then(response => {
            //         if (response.status === 200) {
            //             alert(`Playlist ${response.value.playlistName} was successfully updated!`)
            //             onHide()
            //             reset()
            //             navigate(routeNames.PLAYLIST_PAGE_NAV + response.value.playlistId)
            //             reloadTrigger()
            //         } else {
            //             if (response.status >= 500)
            //                 alert('Internal error happened. Please try later!')
            //             else
            //                 alert(response.message)
            //         }
            //     })
        }

        useEffect(() => {
            getCategories()
                .then(response => {
                    if (response.status === 200) {
                        let categoriesMapped = new Array<Category>()
                        let entities = [...response.value.entities]
                        console.log(entities)
                        entities.forEach(entity => (
                            categoriesMapped.push(new Category(entity.categoryNumber, entity.categoryName))
                        ))
                        setCategories(categoriesMapped)
                        setCategory(categoriesMapped[0].categoryNumber)
                    }
                    else if (response.status >= 500)
                        alert('Internal error happened. Please try later!')
                    else
                        alert(response.message)
                })
        }, []);

        return (
            show &&
            <>
                <div className="overlay" onClick={() => onHide()}>
                </div>
                <div className="modal-content">
                    <div className="modal-content__header">
                        {
                            isCreating
                                ? <h2>New Song</h2>
                                : <h2>Editing song<span>{song?.songName}</span></h2>
                        }
                    </div>
                    <div className="modal-hr"></div>
                    <div className="create-song-form">
                        <h3>Song name:<span className="required-red">*</span></h3>
                        <input
                            value={name}
                            onChange={handleNameChange}
                            type="text"
                            className="create-song-form__name"
                            required/>
                        <div className="create-song-form__additional">
                            <div className="create-song-form__additional__duration">
                                <h3>Song duration:<span className="required-red">*</span></h3>
                                <input
                                    value={duration}
                                    onChange={e => setDuration(parseInt(e.target.value))}
                                    type="number"
                                    className="create-song-form__name"
                                    required/>
                            </div>
                            <div className="create-song-form__additional__category">
                                <h3>Song category:<span className="required-red">*</span></h3>
                                <select
                                    onChange={e => setCategory(parseInt(e.target.value))}
                                    name="Choose genre">
                                    {
                                        categories.map(category => (
                                            <option
                                                value={category.categoryNumber}>
                                                {category.categoryName}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <h3>Song audio:<span className="required-red">*</span></h3>
                        <input
                            onChange={e => {
                                if (e.target.files !== null) {
                                    const file = e.target.files[0]
                                    setAudioFiles([file])
                                }
                            }}
                            type="file"
                            className="create-playlist-form__image"/>
                        <h3>Song image:</h3>
                        <input
                            onChange={e => {
                                if (e.target.files !== null) {
                                    const file = e.target.files[0]
                                    setImageFiles([file])
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

export default CreateOrEditSongModal