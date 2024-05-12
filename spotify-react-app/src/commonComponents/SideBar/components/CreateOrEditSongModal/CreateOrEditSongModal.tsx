import React, {FC, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ICreateOrEditSongModal} from "../../interfaces/ICreateOrEditSongModal";
import EditSongDto from "../../../../utils/dto/song/editSongDto";
import './CreateOrEditPlaylistModal.css'
import createSongWithFiles from "../../../../functions/createSongWithFiles";
import CreateSongDto from "../../../../utils/dto/song/createSongDto";
import {Category} from "../../../../models/Category";
import {deleteSong, getCategories} from "../../../../http/songApi";
import editSongWithFile from "../../../../functions/editSongWithFile";


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
            if (song) {
                setName(song.songName)
                setDuration(song.duration)
                setCategory(categories.filter(i =>
                    i.categoryName === song?.category)[0].categoryNumber)
                setImageFiles([])
                setAudioFiles([])
            }
            else
                clear()
        }

        const clear = () => {
            setName('')
            setDuration(0)
            setCategory(1)
            setImageFiles([])
            setAudioFiles([])
        }

        const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            let value = event.target.value
            if (value.length > 30)
                alert('Too long Song Name')
            else
                setName(value)
        }

        const handleCreateSong = () => {
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
                        reset()
                        onHide()
                    } else {
                        if (response.status >= 500)
                            alert('Internal error happened. Please try later!')
                        else
                            alert(response.message)
                    }
                })
        }

        const handleEditSong = () => {
            if ((name === '' || name === song?.songName)
                && (duration === song?.duration)
                && (song.category === categories.filter(i => i.categoryNumber === category)[0].categoryName)
                && (imageFiles.length === 0)) {
                alert("You didn't change anything!")
                return
            }

            let editSongDto = new EditSongDto(song!, name, duration, category, imageFiles[0])
            editSongWithFile(editSongDto)
                .then(response => {
                    if (response.status === 200) {
                        alert(`Song '${response.value.songName}' was successfully updated!`)
                        onHide()
                        reloadTrigger()
                    } else
                        if (response.status >= 500)
                            alert('Internal error happened. Please try later!')
                })
        }

        const handleDeleteSong = () => {
            if (!window.confirm("Are you sure to delete this song?"))
                return

            deleteSong(song?.songId!)
                .then(response => {
                    if (response.status === 200) {
                        alert(`Song '${response.value.songName}' was successfully deleted!`)
                        onHide()
                        reset()
                        reloadTrigger()
                    } else {
                        if (response.status >= 500)
                            alert('Internal error happened. Please try later!')
                        else
                            alert(response.message)
                    }
                })
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
                        if (song)
                            setCategory(categoriesMapped.filter(i =>
                                i.categoryName === song.category)[0].categoryNumber)
                        else
                            setCategory(categories[0].categoryNumber)
                    } else if (response.status >= 500)
                        alert('Internal error happened. Please try later!')
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
                                : <h2>Editing song <span>{song?.songName}</span></h2>
                        }
                    </div>
                    <div className="modal-hr"></div>
                    <div className="create-song-form">
                        <h3>Song name:</h3>
                        <input
                            value={name}
                            onChange={handleNameChange}
                            type="text"
                            className="create-song-form__name"
                            required/>
                        <div className="create-song-form__additional">
                            <div className="create-song-form__additional__duration">
                                <h3>Song duration: <span>(in seconds)</span></h3>
                                <input
                                    value={duration}
                                    onChange={e => setDuration(parseInt(e.target.value))}
                                    type="number"
                                    className="create-song-form__name"
                                    required/>
                            </div>
                            <div className="create-song-form__additional__category">
                                <h3>Song category:</h3>
                                <select
                                    onChange={e => setCategory(parseInt(e.target.value))}
                                    value={category}
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
                        {
                            isCreating &&
                            <div>
                                <h3>Song audio:</h3>
                                <input
                                    onChange={e => {
                                        if (e.target.files !== null) {
                                            const file = e.target.files[0]
                                            setAudioFiles([file])
                                        }
                                    }}
                                    type="file"
                                    className="create-playlist-form__image"/>
                            </div>
                        }
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
                            onClick={reset}>
                            Reset
                        </button>
                        <button
                            className="close-modal"
                            onClick={handleDeleteSong}>
                            Delete
                        </button>
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
                                        handleCreateSong()
                                    else
                                        handleEditSong()
                                }}>
                            {isCreating ? 'Create' : 'Update'}
                        </button>
                    </div>
                </div>
            </>
        )
    }

export default CreateOrEditSongModal