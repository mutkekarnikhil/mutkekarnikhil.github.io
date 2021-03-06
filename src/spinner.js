import React from 'react'

// Functional Component to display Loading animation
const Spinner = () => {
    return (
        <div className="spinner">
            <svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path fill="#d3d3d3" d="M4,16c2.2,0,4,1.8,4,4s-1.8,4-4,4s-4-1.8-4-4S1.8,16,4,16L4,16z M11.5,5.9c1.6,1.6,1.6,4.1,0,5.6s-4.1,1.6-5.6,0c-1.6-1.6-1.6-4.1,0-5.6C7.4,4.3,10,4.3,11.5,5.9L11.5,5.9z M24,4c0,2.2-1.8,4-4,4s-4-1.8-4-4s1.8-4,4-4S24,1.8,24,4L24,4z M34.1,11.5c-1.6,1.6-4.1,1.6-5.6,0s-1.6-4.1,0-5.6c1.6-1.6,4.1-1.6,5.6,0C35.7,7.4,35.7,10,34.1,11.5L34.1,11.5z M36,24c-2.2,0-4-1.8-4-4s1.8-4,4-4s4,1.8,4,4S38.2,24,36,24L36,24z M28.5,34.1c-1.6-1.6-1.6-4.1,0-5.6c1.6-1.6,4.1-1.6,5.6,0c1.6,1.6,1.6,4.1,0,5.6C32.6,35.7,30,35.7,28.5,34.1L28.5,34.1z M16,36c0-2.2,1.8-4,4-4s4,1.8,4,4s-1.8,4-4,4S16,38.2,16,36L16,36z M5.9,28.5c1.6-1.6,4.1-1.6,5.6,0c1.6,1.6,1.6,4.1,0,5.6c-1.6,1.6-4.1,1.6-5.6,0C4.3,32.6,4.3,30,5.9,28.5L5.9,28.5z" />
            </svg>
        </div>
    )
}

export default Spinner
