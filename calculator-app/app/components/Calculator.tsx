'use client';

import { useState } from 'react';

export default function Calculator(){
    const symbols = ["Ac", "<x", "/", "*", "7", "8", "9", "-", "4", "5", "6", "+", "1", "2", "3", "0", ".", "="];

    const [history, setHistory] = useState('0');
    const [result, setResult] = useState('0');

    return(
        <div className="w-80 h-1/2 p-5 bg-gradient-to-b from-gray-100 to-gray-400 rounded-2xl shadow-2xl opacity-50">
            <Display result={result} history={history}/>

            {/* Buttons */}
            <div className="h-2/3 grid grid-cols-4 gap-0.5 justify-items-center">
                {symbols.map((symbol) => (
                    <Button key={symbol} symbol={symbol}/>
                ))}
            </div>
        </div>
    );
}

function Display({result, history}:{result:string, history:string}){
  return (
      <div className="w-full h-1/3 pb-5 rounded-3xl flex flex-col items-end justify-end">
        {/* histories */}
        <p className="text-gray-700 text-3xl">{history}</p>

        {/* output */}
        <p className="text-black font-bold text-4xl">{result}</p>
      </div>
  );
}

function Button({symbol}:{symbol:string}){
    return(
        <button className="w-11/12 rounded-2xl bg-amber-700">{symbol}</button>
    );
}