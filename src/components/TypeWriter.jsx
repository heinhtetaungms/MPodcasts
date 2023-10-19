import React from 'react'
import { Typewriter } from 'react-simple-typewriter'

const TypeWriter = () => {
  return (
    <>
        <span className='text-secondary bold'>
            <Typewriter
                words={['Welcome', 'Start Your Journey', 'Get Started']}
                loop={5}
                cursor
                cursorStyle='_'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
            />
        </span>
    </>
  )
}

export default TypeWriter