import React from 'react';
import useCSVFileInput from '../hooks/useFileInput';
import useCSVOutput from '../hooks/useCSVOutput';
import useDownloadtextFile from '../hooks/useDownloadtextFile';
import useDragDrop from '../hooks/useDragDrop';
import useCopyToClipBoard from '../hooks/useCopyToClipBoard';

const JSONTOCSV = () => {


    const [jsonString, setJsonString] = React.useState('');
    const [isRawCsv, setIsRawCsv] = React.useState(false);
    

    const {highlight, uploadErrorDrop, isSmallDrop, selectedFileTextDrop, DragDrop}  = useDragDrop(setJsonString, 'application/json');
    const {selectedFileText, handleFileSelect, uploadError, isSmall} = useCSVFileInput('application/json');
    const {csvOutput, onConvert, error} = useCSVOutput(jsonString || selectedFileText || selectedFileTextDrop);
    const {handleDownload, url} = useDownloadtextFile(csvOutput);
    const {handle} = useCopyToClipBoard(csvOutput);
    console.log(uploadErrorDrop, isSmallDrop)
    


    

    return (
        <div>
            <h1>JSON to CSV 📜 Display CSV as Table and raw both</h1>
            <textarea className="csv-input-area"
                value={(isSmall || isSmallDrop) ? (selectedFileText || jsonString) : ''}
                onChange={e => setJsonString(e.currentTarget.value)}
                {...DragDrop}
                style={highlight ? { backgroundColor: 'lightblue' } : {}}
                placeholder="Copy Paste JSON Here (OR) Drag JSON File"
            ></textarea>
            <button onClick={onConvert}>Convert To CSV</button>
            <input type='file' onChange={handleFileSelect}/>
            {error && <p>{error}</p>}
            {uploadError && <p>{uploadError}</p>}
            {uploadErrorDrop && <p>{uploadErrorDrop}</p>}
            
            <div>
                <label>
                    Raw
                    <input checked={isRawCsv} onChange={() => setIsRawCsv(!isRawCsv)} type='checkbox' />
                </label>
            </div>
            {csvOutput && (
                <>
                <a href={url} onClick={handleDownload} download="download.csv">Download</a>
                <button onClick={handle}>Copy to Clipboard</button>
                </>
                )}

            {(isSmallDrop || isSmall) && (
                <div className="output-container">
                    {isRawCsv ? <pre className="csv-output-container">{csvOutput}</pre> : (
                        <h4>
                            <li>Convert csv to data that can be consumed by React Tables</li>
                            <li>Then implement table after that</li>
                        </h4>
                    )}
                </div>
            )}

        </div>
    )
}

export default JSONTOCSV;