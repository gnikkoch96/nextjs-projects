'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { BackspaceIcon } from '@heroicons/react/24/solid';

export default function Calculator(){
    const symbols = ["Ac", "<x", "/", "*", "7", "8", "9", "-", "4", "5", "6", "+", "1", "2", "3", "=", "0", "."];

    const [history, setHistory] = useState('0');
    const [result, setResult] = useState('0');

    return(
        <div className="w-[360px] h-[640px] p-5 bg-gradient-to-br from-blue-50 to-blue-300 rounded-2xl shadow-2xl">
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
        <p className="text-gray-400 text-3xl">{history}</p>

        {/* output */}
        <p className="text-black font-bold text-4xl">{result}</p>
      </div>
  );
}

function Button({symbol}:{symbol:string}){
    const numRegex = new RegExp("[0-9]")

    return(
        <button
            className={clsx(
                "w-11/12 rounded-2xl border border-white font-bold shadow text-3xl",
            {
                "text-blue-400": !numRegex.test(symbol),
                'opacity-50': symbol === '*' || symbol === '-' || symbol === '+' || symbol === '/',
                "text-white": numRegex.test(symbol)
            })}>
            {symbol}
        </button>
    );
}