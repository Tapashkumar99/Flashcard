import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Heading = () => {


    // active handler
    const [activeBtn, setActiveBtn] = useState('createBtn');

    return (
        <div
            className='py-5 mt-2'
            id="flash-creators-heading">
            <h2 
            className='text-3xl font-bold px-4 mb-6'
            >Create Flashcard
            </h2>
            <Link to='/'
                onClick={() => setActiveBtn('createBtn')}
                className='relative px-4 py-3 mr-3 cursor-pointer text-gray-600 pb-3 font-medium'>
                Create New
                <span id='createBtn' style={activeBtn === 'createBtn' ? { width: '100%' } : { width: '0%' }}></span>
            </Link>
            <Link to='/flashcardgroup'
                onClick={() => setActiveBtn('flashBtn')}
                className='relative px-4 py-3 cursor-pointer text-gray-600 pb-3 font-medium'>
                My Flashcard
                <span id='flashGroup' style={activeBtn === 'flashBtn' ? { width: '100%' } : { width: '0%' }}></span>
            </Link>
            <hr className='bg-gray-300' style={{ height: '2px', marginTop: '10px' }} />
        </div>
    )
}

export default Heading