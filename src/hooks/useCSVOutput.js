import React from 'react';
import {unparse} from 'papaparse';
import {Parser} from 'json2csv';

const useCSVOutput = (jsonString) => {

    const [csvOutput, setCsvOutput] = React.useState('');
    const [error, setError] = React.useState('');


    const onConvert = () => {
        if (!jsonString) {
            setCsvOutput('')
            setError("Text area cannot be empty");
        } else {
            try {
                setError("");
                const json = JSON.parse(jsonString);

                const parser = new Parser();
                const csv = parser.parse(json);
                setCsvOutput(csv);

                // const csv = unparse(obj)
                // const csvString = JSON.stringify(csv);
                // console.log(csv);
                // console.log(csvString);
                // setError('')
                // setCsvOutput(csvString);
            }
            catch (e) {
                setCsvOutput('');
                setError('Please Enter the valid JSON');
            }
        }
    }


    return {
        onConvert,
        error,
        csvOutput
    }
}

export default useCSVOutput;