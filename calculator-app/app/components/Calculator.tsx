'use client';

import { useState } from 'react';

export default function Calculator(){
    const [history, setHistory] = useState('0');
    const [result, setResult] = useState('0');

    return(
        <div className="w-80 h-1/2 bg-gradient-to-b from-gray-100 to-gray-400 rounded-2xl shadow-2xl opacity-50">
            <Display result={result} history={history}/>

            {/* Buttons */}
            <div>
                <Button symbol="Ac"></Button>
                <Button symbol="0"></Button>
                <Button symbol="0"></Button>
                <Button symbol="0"></Button>
                <Button symbol="0"></Button>
                <Button symbol="0"></Button>
                <Button symbol="0"></Button>
                <Button symbol="0"></Button>
                <Button symbol="0"></Button>
                <Button symbol="0"></Button>
                <Button symbol="0"></Button>
                <Button symbol="0"></Button>
                <Button symbol="0"></Button>
                <Button symbol="0"></Button>
                <Button symbol="0"></Button>
                <Button symbol="0"></Button>
            </div>
        </div>
    );
}

function Display({result, history}:{result:string, history:string}){
  return (
      <div className="w-full h-1/3 p-5 rounded-3xl flex flex-col items-end justify-end">
        {/* histories */}
        <p className="text-gray-700 text-3xl">{history}</p>

        {/* output */}
        <p className="text-black font-bold text-4xl">{result}</p>
      </div>
  );
}

function Button({symbol}:{symbol:string}){
    return(
        <button>{symbol}</button>
    );
}