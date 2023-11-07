import React from 'react';
import Image from 'next/image';
import logo from '@/utils/logo_template.jpg';

function Preview(props) {
    return (
        <div>
            <div>Preview</div>
            <Image
                className='mx-2'
                src={logo}
                alt="home"
                width={35}
                height={35}
            />


        </div>
    );
}

export default Preview;