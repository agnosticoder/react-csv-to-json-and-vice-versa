import React from 'react';

const useFileInput = (fileType) => {

    const [selectedFileText, setSelectedFileText] = React.useState('');
    const [uploadError, setUploadError] = React.useState('');
    const [isSmall, setIsSmall] = React.useState(false);

    let error = '';
    fileType === 'text/csv' ? error = 'Please upload CSV File!' : error = 'Please Upload JSON File!';


    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        
        if( file.type !== fileType){
            setUploadError(error)
        }else if(file.size <= 5120){
            setIsSmall(true)
            const text = await file.text();
            setSelectedFileText(text);
            setUploadError('');
        }else if(file.size >= 5121){
            setUploadError('Big File Displaying not allwed');
            setIsSmall(false)
            const text = await file.text();
            setSelectedFileText(text);
        }
    }




    return {
        selectedFileText,
        handleFileSelect,
        uploadError,
        isSmall
    }
            
}

export default useFileInput;
