'use client';

import { useState } from 'react';
import clsx from 'clsx';

export default function Calculator(){
    const MAX_DISPLAY_LENGTH: number = 12;

    // math expression
    const [expression, setExpression] = useState('');

    // display result
    const [display, setDisplay] = useState('0');

    // stores previous number entered before operator press (first operand)
    const [previousValue, setPreviousValue] = useState<string | null>('' || null);

    // stores the most recent operator
    const [currentOperator, setCurrentOperator] = useState<string | null>('' || null);

    // flag used to indicate if next digit should start a new number or append to current number
    const [isNewInput, setIsNewInput] = useState(true);

    // flag used to prevent multiple decimals
    const [hasDecimal, setHasDecimal] = useState(false);

    const symbols = ["Ac", "<x", "/", "*", "7", "8", "9", "-", "4", "5", "6", "+", "1", "2", "3", "=", "0", "."];

    function handleButton(symbol: string) {
        if (symbol === "Ac") { // reset
            setDisplay('0');
            setExpression('');

            // reset state vars
            setPreviousValue(null);
            setCurrentOperator(null);
            setIsNewInput(true);
            setHasDecimal(false);
        } else if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(symbol)) { // pressed number
            if (isNewInput) { // replace display
                setDisplay(symbol);
            } else { // append to display
                // edge case: display length > max length
                if (display.length > MAX_DISPLAY_LENGTH) return;

                // edge case: multiple leading 0s
                if (display === "0") { // prevent trailing 0s
                    if (symbol === "0") return;
                }

                setDisplay(display + symbol);
            }

            setExpression(expression + symbol);
            setIsNewInput(false);
        } else if (["+", "-", "*", "/"].includes(symbol)) { // perform calculation

            if (currentOperator && !isNewInput) {
                try {
                    const result = calculateResult(previousValue, display, currentOperator);
                    if (result === 'Error') throw new Error("Calculation Error");

                    // update display
                    setDisplay(result);

                    // store current result as previous value
                    setPreviousValue(result);
                } catch (error) {
                    setDisplay('Error');
                    setExpression('Error');
                    setIsNewInput(true);
                    return;
                }
            } else if (!currentOperator) {
                // store first operand
                setPreviousValue(display);
            }

            setPreviousValue(display);

            // update expression display
            if (currentOperator && isNewInput) { // update symbol if user hasn't pressed new input yet
                // replace operator
                setExpression(expression.slice(0, expression.length - 1) + symbol);
            } else {
                setExpression(expression + symbol);
            }

            setCurrentOperator(symbol);
            setIsNewInput(true);
            setHasDecimal(false);
        }
    }

    // calculats and returns the results
    function calculateResult(previousValue: string | null, display: string, currentOperator: string | null): string {
        try{
            const result = eval(`${previousValue} ${currentOperator} ${display}`);
            console.log(result);

            return result.toString();
        }catch(error){
            return 'Error';
        }
    }

    return(
        <div className="w-[360px] h-[640px] p-5 bg-gradient-to-br from-blue-50 to-blue-300 rounded-2xl shadow-2xl">
            <Display display={display} expression={expression}/>

            {/* Buttons */}
            <div className="h-2/3 grid grid-cols-4 gap-3 justify-items-center">
                {symbols.map((symbol) => (
                    <Button key={symbol} symbol={symbol} handleClick={() => handleButton(symbol)}/>
                ))}
            </div>
        </div>
    );
}

function Display({display, expression}:{display:string, expression:string}){
  return (
      <div className="w-full h-1/3 pb-5 rounded-3xl flex flex-col items-end justify-end">
        {/* histories */}
        <p className="text-gray-400 text">{expression}</p>

        {/* output */}
        <p className="text-gray-700 font-bold text-4xl">{display}</p>
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