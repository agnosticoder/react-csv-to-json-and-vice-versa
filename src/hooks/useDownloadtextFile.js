import React from 'react';

const useDownloadtextFile = (csvOutput) => {

    const [url, setUrl] = React.useState('');

    const handleDownload = () => {
       if(csvOutput){
            const file = new File([csvOutput], 'fileName');
            const url = URL.createObjectURL(file);
            setUrl(url)
       } 
    }


    return {
        handleDownload,
        url
    }
}

export default useDownloadtextFile;
