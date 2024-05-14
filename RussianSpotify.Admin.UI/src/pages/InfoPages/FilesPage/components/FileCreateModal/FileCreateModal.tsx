import React, {FC, useState} from 'react';
import '../../../styles/Modal/Modal.css'
import {createFile} from "../../../../../http/fileApi";

interface IFileCreateModal {
    onClose: () => void;
}

const FileCreateModal: FC<IFileCreateModal> = ({onClose}) => {
    const [file, setFile] = useState<File>()
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (file)
            createFile(file).then(response => {
                alert(response.message)
                onClose()
        })
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Создание файла</h2>
                <form>
                    <label>
                        Файл:
                        <input
                            type="file"
                            onChange={e => {
                                if (e.target.files !== null) {
                                    const file = e.target.files[0]
                                    setFile(file)
                                }
                            }}
                            required/>
                    </label>
                    <div className="modal-buttons">
                        <button type="submit" onClick={handleSubmit}>Сохранить</button>
                        <button type="button" onClick={onClose}>Закрыть</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FileCreateModal;
