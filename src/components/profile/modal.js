import React from 'react'
import './style.scss'

export default function Modal ({selectedImg, setSelectedImg}) {
    const unselect = (e) => {
        if (e.target.classList.contains('modal-backdrop'))
        setSelectedImg(null)
    }
    return (
        <div className="modal-backdrop" onClick={unselect}>
            <img src={selectedImg} alt="selectedImg" />
        </div>
    )
}