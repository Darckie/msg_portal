import React from 'react'
import { BsBug, BsFillFileEarmarkWordFill, BsFillWrenchAdjustableCircleFill } from 'react-icons/bs';

export default function PageNotFound() {
    return (
        <div style={{ textAlign: 'center' ,color:'#6d6d7f' ,fontFamily:"system-ui",fontSize:'31px',marginTop:'40px'}}>
            404 page not found <BsBug className='Hicons'/>
        </div>
    )
}
