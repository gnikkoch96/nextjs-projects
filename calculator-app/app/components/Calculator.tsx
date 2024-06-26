'use client';

import { useState } from 'react';
import clsx from 'clsx';

export default function Calculator(){
    const symbols = ["Ac", "<x", "/", "*", "7", "8", "9", "-", "4", "5", "6", "+", "1", "2", "3", "=", "0", "."];

    const [history, setHistory] = useState('0');
    const [result, setResult] = useState('0');

    // flags
    const [storedFirstOperand, setStoredFirstOperand] = useState(false);
    const [storedSecondOperand, setStoredSecondOperand] = useState(false);
    const [pressedArithmetic, setPressedArithmetic] = useState(false);
    const [pressedNumeric, setPressedNumeric] = useState(false);
    const [pressedEqual, setPressedEqual] = useState(false);

    function handleButton(symbol: string) {
        if (symbol === 'Ac') {
            // clear history and result
            setHistory('0');
            setResult('0');

            // reset flags
            setStoredFirstOperand(false);
            setStoredSecondOperand(false);
            setPressedArithmetic(false);

        } else if (symbol === '<x') {
            // delete from the display or reset to 0 if there is no more numbers
            if (result.length == 1) setResult('0');
            else setResult(result.substring(0, result.length - 1));

        } else if (symbol === '=') {
            // update history
            setHistory(history + result);

            // evaluate expression
            const evaluate = eval(history + result).toString();

            // update result
            setResult(evaluate);

            // update flags
            setStoredFirstOperand(false);
            setStoredSecondOperand(false);
            setPressedArithmetic(false);
        } else if (symbol === '.') {
            if(result.match('[.]')) return;
            setResult(result + symbol);
        } else if (symbol === '+' || symbol === '-' || symbol === '*' || symbol === '/') {
            if (!storedFirstOperand) {
                setHistory(result + symbol);
                setStoredFirstOperand(true);
            } else{
                // update arithmetic
                setHistory(history.substring(0, history.length - 1) + symbol)
            }

            // update flags
            setPressedArithmetic(true);
        } else { // number
            if(result === '0' || pressedArithmetic){
                setResult(symbol);
            }else{
                // add number to display
                setResult(result + symbol);
            }

            // update flags
            setPressedArithmetic(false);
        }
    }

    return(
        <div className="w-[360px] h-[640px] p-5 bg-gradient-to-br from-blue-50 to-blue-300 rounded-2xl shadow-2xl">
            <Display result={result} history={history}/>

            {/* Buttons */}
            <div className="h-2/3 grid grid-cols-4 gap-3 justify-items-center">
                {symbols.map((symbol) => (
                    <Button key={symbol} symbol={symbol} handleClick={() => handleButton(symbol)}/>
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
        <p className="text-gray-700 font-bold text-4xl">{result}</p>
      </div>
  );
}

function Button({symbol, handleClick}:{symbol:string, handleClick: () => void}){
    // test to see if the symbol is a number
    const numRegex = new RegExp("[0-9]")

    return(
        <button
            className={clsx(
                "w-11/12 rounded-2xl border border-white font-bold shadow text-3xl hover:opacity-50 transition",
            {
                "text-blue-400": !numRegex.test(symbol),
                'opacity-70 shadow-2xl': symbol === '*' || symbol === '-' || symbol === '+' || symbol === '/',
                "text-white": numRegex.test(symbol) || symbol === '.' || symbol === '=',
                'col-span-2': symbol ===  '0',
                'bg-sky-400 row-span-2 shadow-inner shadow-sky-200': symbol === '=',
            })}
            onClick={handleClick}
        >
            {symbol}
        </button>
    );
}