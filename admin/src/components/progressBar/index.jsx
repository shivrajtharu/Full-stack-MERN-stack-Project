import React from 'react'

const Progress = (props) => {
  return (
    <>
        <div className='w-[100px] h-auto rounded-md overflow-hidden bg-[#f1f1f1]'>
            <span
                className={`flex items-center h-[8px] ${props.status === 'success' && 'bg-green-600'} ${props.status === 'error' && 'bg-pink-600'} ${props.status === 'warning' && 'bg-orange-400'}`}
                style={{ width: `${props.value}%` }}
            ></span>
        </div>
    </>
  )
}

export default Progress
