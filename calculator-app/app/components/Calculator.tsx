'use client';

import { useState } from 'react';

export default function Calculator(){
    const [history, setHistory] = useState('0');
    const [result, setResult] = useState('0');

    return(
        <div className="w-80 h-1/2 p-5 bg-gradient-to-b from-gray-100 to-gray-400 rounded-2xl shadow-2xl opacity-50">
            <Display result={result} history={history}/>

            {/* Buttons */}
            <div className="h-2/3 grid grid-cols-4 gap-0.5 justify-items-center">
                <Button symbol="Ac"></Button>
                <Button symbol="<x"></Button>
                <Button symbol="/"></Button>
                <Button symbol="*"></Button>
                <Button symbol="7"></Button>
                <Button symbol="8"></Button>
                <Button symbol="9"></Button>
                <Button symbol="-"></Button>
                <Button symbol="4"></Button>
                <Button symbol="5"></Button>
                <Button symbol="6"></Button>
                <Button symbol="+"></Button>
                <Button symbol="1"></Button>
                <Button symbol="2"></Button>
                <Button symbol="3"></Button>
                <Button symbol="0"></Button>
                <Button symbol="."></Button>
                <Button symbol="="></Button>
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