import React from 'react';
import { Icon } from 'react-fa'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faLeaf from '@fortawesome/fontawesome-free-solid/faLeaf';

const FontAwesomeTest = () => {
    return (
        <div>
            <FontAwesomeIcon icon={faLeaf} size="3x" />
            <Icon spin name="spinner" size="3x" />
        </div>
    )
}

export default FontAwesomeTest;