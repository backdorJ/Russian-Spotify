import React, {FC, useContext, useState} from "react";
import {addSongAuthor, removeSongAuthor} from "../../../../../http/songApi";
import './EditSongAuthorModal.css'
import AuthorLittle from "../../../../../models/AuthorLittle";
import {UserContext} from "../../../../../index";
import {IEditSongAuthors} from "../../../../../commonComponents/SongCard/interfaces/IEditSongAuthors";


const EditSongAuthorModal: FC<IEditSongAuthors> = ({song, show, onHide, reloadTrigger}) => {
    const userStore = useContext(UserContext)
    const [authors, setAuthors] = useState(song.authors)
    const [selectedAuthor, setSelectedAuthor] = useState('')
    const [authorToAdd, setAuthorToAdd] = useState('')
    const [isDefaultAuthorValueDisabled, setIsDefaultAuthorValueDisabled] = useState(false)
    const reset = () => {
        setAuthorToAdd('')
    }


    const handleAddAuthor = () => {
        if (authorToAdd.replace(' ', '') === '') {
            alert('Write author email')
            return
        }

        addSongAuthor(song.songId, authorToAdd)
            .then(response => {
                if (response.status === 200) {
                    reset()
                    setAuthors(prev =>
                        [...prev, new AuthorLittle(response.value.authorId, response.value.authorName)])
                } else {
                    if (response.status >= 500)
                        alert('Internal error happened. Please try later!')
                    else
                        alert(response.message)
                }
            })
    }

    const handleRemoveAuthor = () => {
        if (selectedAuthor === '') {
            alert("Please select author!")
            return
        }
        if (selectedAuthor !== '')
            if (selectedAuthor === userStore.user.id) {
                alert("You can't remove yourself!")
                return
            }

        removeSongAuthor(song.songId, selectedAuthor)
            .then(response => {
                if (response.status === 200) {
                    setAuthors(prev => prev.filter(i => i.authorId !== response.value.authorId))
                    setIsDefaultAuthorValueDisabled(false)
                    setSelectedAuthor('')
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
                onHide()
                if (reloadTrigger)
                    reloadTrigger()
            }}>
            </div>
            <div className="modal-content">
                <div className="modal-content__header">
                    <h2>Editing <span>{song?.songName}</span></h2>
                </div>
                <div className="modal-hr"></div>
                <div className="edit-song-author-form">
                    <h3>Current authors:</h3>
                    <div className="edit-song-author-form__row">
                        <select
                            onChange={e => {
                                setSelectedAuthor(e.target.value)
                                setIsDefaultAuthorValueDisabled(true)
                            }}
                            value={selectedAuthor}
                            name="Choose genre">
                            <option disabled={isDefaultAuthorValueDisabled} value="''">Not selected</option>
                            {
                                authors.map(author => (
                                    <option
                                        value={author.authorId}>
                                        {
                                            author.authorId === userStore.user.id
                                                ? `${author.authorName}*`
                                                : author.authorName
                                        }
                                    </option>
                                ))
                            }
                        </select>
                        <button
                            onClick={handleRemoveAuthor}
                            className="close-modal">Remove
                        </button>
                    </div>
                    <h3>New author:</h3>
                    <div className="edit-song-author-form__row">
                        <input
                            value={authorToAdd}
                            onChange={e => setAuthorToAdd(e.target.value)}
                            type="text"
                            required/>
                        <button
                            onClick={handleAddAuthor}
                            className="submit-modal">
                            Add
                        </button>
                    </div>
                </div>
                <div className="modal-buttons">
                    <button
                        className="close-modal"
                        onClick={() => {
                            reset()
                            onHide()
                            if (reloadTrigger)
                                reloadTrigger()
                        }}>
                        Close
                    </button>
                </div>
            </div>
        </>
    )
}

export default EditSongAuthorModal