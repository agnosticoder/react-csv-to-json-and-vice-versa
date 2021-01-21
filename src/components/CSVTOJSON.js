import React from 'react';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';
import useDragDrop from '../hooks/useDragDrop';
import useJSONOutput from '../hooks/useJSONOutput';
import useDownloadtextFile from '../hooks/useDownloadtextFile';
import useCopyToClipBoard from '../hooks/useCopyToClipBoard';
import useFileInput from '../hooks/useFileInput';



const CSVTOJSON = () => {

    const [csvString, setCsvString] = React.useState('');
    const [isRawJSON, setIsRawJSON] = React.useState(false);

    // const {highlight, ...DragDrop}  = useDragDropCSV(setCsvString);
    const {highlight, uploadErrorDrop, isSmallDrop, selectedFileTextDrop, DragDrop}  = useDragDrop(setCsvString, 'text/csv');
    const {selectedFileText, handleFileSelect, uploadError, isSmall} = useFileInput('text/csv');
    const {jsonOutput, onConvert, error} = useJSONOutput(csvString || selectedFileText || selectedFileTextDrop);
    const {handleDownload, url} = useDownloadtextFile(JSON.stringify(jsonOutput, null, 2));
    const {handle} = useCopyToClipBoard(JSON.stringify(jsonOutput, null, 2));
    console.log(isSmall, isSmallDrop);

    return (
        <div>
            <h1>CSV to JSON 📜</h1>
            <ul>
                <li>Add a switch which will help toggle between raw csv and tabular csv</li>
                <li>Add toggle which will tell to include header in csv generated</li>
                <li>Add option to upload JSON file and display it if it is less than 5kb</li>
                <li>Don't display JSON if it is more than 5kb</li>
                <li>Don't display csv more than 5kb</li>
                <li>Add option to copy to clipboard</li>
                <li>Add button to download csv</li>
            </ul>



            <h1>JSON to CSV 📜 Display CSV as Table and raw both</h1>
            <textarea className="csv-input-area"
                value={(isSmall || isSmallDrop) ? (selectedFileText || csvString) : ''}
                onChange={e => setCsvString(e.currentTarget.value)}
                {...DragDrop}
                style={highlight ? { backgroundColor: 'lightblue' } : {}}
                placeholder="Copy Paste CSV Here (OR) Drag CSV File"
            ></textarea>
            <input type='file' onChange={handleFileSelect} />
            {error && <p>{error}</p>}
            {uploadError && <p>{uploadError}</p>}
            {uploadErrorDrop && <p>{uploadErrorDrop}</p>}

            {(csvString || selectedFileTextDrop || selectedFileText) && (
                    <button onClick={onConvert}>Convert to JSON</button>
            )}

            {jsonOutput && (
                <>
                    <div>
                        <label>
                            Raw
                    <input checked={isRawJSON} onChange={() => setIsRawJSON(!isRawJSON)} type='checkbox' />
                        </label>
                    </div>
                    <a href={url} onClick={handleDownload} download="download.json">Download</a>
                    <button onClick={handle}>Copy to Clipboard</button>
                </>
            )}



            {(jsonOutput || isSmallDrop || isSmall) && (
                <div className="output-container">
                    {isRawJSON ? (
                        jsonOutput && <JSONPretty className="json-output-area csv-output-conatainer" onJSONPrettyError={e => console.error(e)} id='json-pretty' data={jsonOutput}></JSONPretty>

                    ) : (
                        <div className='csv-output-container'>
                            <pre>
                                {JSON.stringify(jsonOutput, null, 2)}
                            </pre>
                        </div>
                        )}
                </div>
            )}
        </div>
    )
}

export default CSVTOJSON
