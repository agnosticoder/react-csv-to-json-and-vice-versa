import React from 'react';
import {render} from 'react-dom';
import {parse, unparse} from 'papaparse';
import './styles.scss';


const csv2 = `Satinder Singh’s Summary (2019),,,
simpletax.ca,,,
,,,
,,2019,2018
10100,Employment income," $6,235.31 ", $308.00 
13700,Professional income," $2,354.00 ",
13900,Commission income," $3,257.89 ", $369.48 
15000,Total income," $11,847.20 ", $677.48 
21200,"Annual union, professional, or like dues", $-   ,
22200,CPP/QPP on self-employment income, $147.01 `;

console.log(parse(csv2).data);


const json = [
    {
      "2018": "$308.00",
      "2019": " $6,235.31",
      "field1": "10100",
      "field2": "Employment income"
    },
    {
      "2018": "",
      "2019": " $2,354.00",
      "field1": "13700",
      "field2": "Professional income"
    },
    {
      "2018": "$369.48",
      "2019": " $3,257.89",
      "field1": "13900",
      "field2": "Commission income"
    },
    {
      "2018": "$677.48",
      "2019": " $11,847.20",
      "field1": "15000",
      "field2": "Total income"
    }
  ]

const csv = unparse(json);

console.log(csv);










export const App = () => {
    return (
        <div className="container">
            <h2>Playground Module Sandbox</h2>
        </div>
    )
}

render(<App />, document.querySelector(".app"));