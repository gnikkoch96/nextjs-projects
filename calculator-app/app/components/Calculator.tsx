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
        if (symbol === "Ac") { // pressed clear
            setDisplay('0');
            setExpression('');

            // reset states
            setPreviousValue(null);
            setCurrentOperator(null);
            setIsNewInput(true);
            setHasDecimal(false);
        }else if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(symbol)) { // pressed number
            if (isNewInput) { // replace number in display
                setDisplay(symbol);
            } else { // append number to display
                // edge case: can not add more than display length (prevents inputting big numbers)
                if (display.length > MAX_DISPLAY_LENGTH) return;

                // edge case: multiple trailing 0s in the beginning (prevents trailing 0s)
                if (display === "0") {
                    if (symbol === "0") return;
                }

                setDisplay(display + symbol);
            }

            setExpression(expression + symbol);
            setIsNewInput(false);
        } else if (["+", "-", "*", "/"].includes(symbol)) { // pressed operator
            if(currentOperator && !isNewInput){ // evaluate expression
                try {
                    const result = calculateResult(previousValue, display, currentOperator);
                    if (result === 'Error') throw new Error("Calculation Error");

                    // Update display with the result
                    setDisplay(result);

                    // Update expression to show the complete calculation
                    setExpression(expression + " = " + result);

                    // Reset for new calculation
                    setPreviousValue(result);  // Keep the result as previous value for chaining
                    setCurrentOperator(null);
                    setIsNewInput(true);
                    setHasDecimal(false);
                } catch (error) {
                    setDisplay('Error');
                    setExpression('Error');
                    setIsNewInput(true);
                    setPreviousValue(null);
                    setCurrentOperator(null);
                    setHasDecimal(false);
                }
            }

            if (!currentOperator) { // store first operand
                setPreviousValue(display);
                setExpression(display + symbol);
            }

            if (currentOperator && isNewInput) { // replace operator
                setExpression(expression.slice(0, expression.length - 1) + symbol);
            }else { // append operator to expression
                setExpression(expression + symbol);
            }

            setCurrentOperator(symbol);
            setIsNewInput(true);
            setHasDecimal(false);
        }else if(symbol === '='){ // pressed equals
            if(!currentOperator && previousValue == null) return;

            try{
                const result = calculateResult(previousValue, display, currentOperator);
                if (result === 'Error') throw new Error("Calculation Error");

                setDisplay(result);

                // reset for new calculation
                setPreviousValue(null);
                setCurrentOperator(null);
                setIsNewInput(true);
                setHasDecimal(false);
            }catch(error){
                setDisplay('Error');
                setExpression('Error');
                setIsNewInput(true);

                // reset other states as needed
                setPreviousValue(null);
                setCurrentOperator(null);
                setHasDecimal(false);
            }
        }else if(symbol === '.'){
            if(hasDecimal) return;

            if(isNewInput){
                setDisplay("0.");
                setExpression(expression + "0.");
                setIsNewInput(false);
            }else{
                setDisplay(display + symbol);
                setExpression(expression + symbol);
            }

            setHasDecimal(true);
        }else if(symbol === '<x'){
            // edge case: error occurs
            if(display === 'Error'){
                // reset
                setDisplay("0");
                setExpression("");
                setIsNewInput(true);
                setHasDecimal(false);
            }else if(!isNewInput){ // only delete if we aren't starting a new input
                if(display.length > 1){ // remove only when it is possible
                    setDisplay(display.slice(0, -1));
                    setExpression(expression.slice(0, -1));

                    // edge case: removing a decimal
                    if(display.endsWith('.')){
                        setHasDecimal(false);
                    }
                }else{ // reset display to 0
                    setDisplay('0');
                    setExpression(expression.slice(0, -1));
                    setIsNewInput(true);
                    setHasDecimal(false);
                }
            }
        }
    }

    // calculates and returns the results
    function calculateResult(previousValue: string | null, display: string, currentOperator: string | null): string {
        try{
            let result = eval(`${previousValue} ${currentOperator} ${display}`);

            if(result.toString().length > MAX_DISPLAY_LENGTH){ // converts to exponentials if the length is greater than the desired length
                result = result.toExponential(MAX_DISPLAY_LENGTH - 5);
            }

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