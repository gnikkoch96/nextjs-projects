import { useState } from 'react';

export default function Calculator(){
    const [result, setResult] = useState('');
    const [history, setHistory] = useState('');

    return(
        <div className="w-1/6 h-1/2 bg-gradient-to-b from-gray-100 to-gray-400 rounded shadow-2xl opacity-50 ">
        {/* Display */}
        <Display result={result} history={history}/>

        {/* Buttons */}
        </div>
    );
}

function Display({result, history}:{result:string, history:string}){
  return (
      <div>
        {/* histories */}
        <p>{history}</p>

        {/* output */}
        <p>{result}</p>
      </div>
  );
}