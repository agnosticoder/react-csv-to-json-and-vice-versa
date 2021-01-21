import React from 'react';
import CSVTOJSON from './CSVTOJSON';
import JSONTOCSV from './JSONTOCSV';

const App = () => {

    const [isCsvToJson, setIsCsvToJson] = React.useState(false);



    return (
        <div>
            <div className="header">
                <h1>
                    CSV to JSON Convertor
                </h1>
                <select value={isCsvToJson}
                onChange={e => setIsCsvToJson("true" === e.target.value)}>
                    <option value={true}>CSV to JSON</option>
                    <option value={false}>JSON to CSV</option>
                </select>
            </div>
            <div className="container">
                {isCsvToJson ? <CSVTOJSON /> : <JSONTOCSV />}
            </div>
        </div>
    )
}

export default App
