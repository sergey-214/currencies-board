import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client'

export default function App(){
    const [currency, setCurrency] = useState([])

    useEffect(() => {
        fetch('/api/currencies').then(res => res.json()).then(response => {
            console.log(response.data);
            setCurrency(response.data);
        })
    }, [])

    useEffect(() => {
        
        var channel = window.pusher.subscribe('currency');
        channel.bind('get-currency', (data) => {
            console.log(data);
            if (data.message.currency_changed) {
                fetch('/api/currencies').then(res => res.json()).then(response => {
                    setCurrency(response.data);
                })
            }
        });

        return () => {
            // channel
        }
    }, [currency])

    return currency.length && (
        <div className='table-wrapper'>
            <table className='fl-table'>
                <thead>
                    <tr>
                    { Object.keys(currency[0]).map((key, index) => <th key={index}>{key}</th> ) }
                    </tr>
                    
                </thead>
                <tbody>
                    {
                        currency.map((currency, index) => {
                            return <tr key={index}>
                                { Object.values(currency).map((val, index) =>  <td key={index}>{val}</td>) }   
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

if(document.getElementById('root')){
    createRoot(document.getElementById('root')).render(<App />)
}
