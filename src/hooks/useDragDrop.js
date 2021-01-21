import React, { useState } from 'react'

const useDragDropJSON = (setJsonString, fileType) => {
    const [selectedFileTextDrop, setSelectedFileTextDrop] = React.useState('');
    const [highlight, setHighlight] = useState(false);
    const [uploadErrorDrop, setUploadErrorDrop] = React.useState('');
    const [isSmallDrop, setIsSmallDrop] = React.useState(false);

    let error = '';
    fileType === 'text/csv' ? error = 'Please upload CSV File!' : error = 'Please Upload JSON File!';

    const onDragOver = (e) => {
        e.preventDefault();
    }

    const onDrop = async (e) => {
        e.preventDefault();

        const file = e.dataTransfer.files[0]
        console.log(file);


        if (file.type !== fileType) {
            setUploadErrorDrop(error)
        } else if(file.size <= 5120) {
            setIsSmallDrop(true)
            const text = await file.text();
            setJsonString(text);
            setUploadErrorDrop('');
        } else if(file.size >= 5121) {
            setUploadErrorDrop('Big File Displaying not allowed');
            setIsSmallDrop(false)
            const text = await file.text();
            setSelectedFileTextDrop(text);
        }

        setHighlight(false);
    }

    const onDragEnter = (e) => {
        setHighlight(true);
    }

    const onDragLeave = () => {
        setHighlight(false);
    }

    return {
                DragDrop: {
                onDragOver,
                onDrop,
                onDragEnter, 
                onDragLeave,
                },
                highlight,
                uploadErrorDrop,
                isSmallDrop,
                selectedFileTextDrop
    }
}

export default useDragDropJSON;
