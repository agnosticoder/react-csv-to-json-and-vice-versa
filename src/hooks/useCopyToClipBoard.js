import React from 'react';
import CSVTOJSON from '../components/CSVTOJSON';

const useCopyToClipBoard = (text) => {

    const handle = () => {
        let textarea = document.createElement('textarea');
        textarea.id = 'temp';
        textarea.style.height = 0;
        document.body.appendChild(textarea);
        textarea.value = text;
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }



    return {
        handle
    }
    
}

export default useCopyToClipBoard;
