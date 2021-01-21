import React from 'react';
import {parse} from 'papaparse';

const useJSONOutput = (csvString) => {
    

    const [jsonOutput, setJsonOutput] = React.useState('');
    const [error, setError] = React.useState('');

    const onConvert = () => {
        if (!csvString) {
            setJsonOutput('')
            setError("Text area cannot be empty");
        } else {
            const json = parse(csvString, {
                error: (error) => {
                    console.log(error);
                },
                header: true
            });
            setError('')
            setJsonOutput(json.data);
        }
    }


    return {
        onConvert,
        error,
        jsonOutput
    }
}

export default useJSONOutput;