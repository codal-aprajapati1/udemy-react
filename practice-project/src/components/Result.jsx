import { calculateInvestmentResults, formatter } from '../util/investment';

export default function Results({ input }){
    const resultsData = calculateInvestmentResults(input);
    const initialInvestment = resultsData[0].valueEndOfYear - resultsData[0].interest - resultsData[0].annualInvestment;
    return <table id='result'>
        <thead>
            <tr>
                <th className='center'>Year</th>
                <th className='center'>Investment Value</th>
                <th className='center'>Interest (Year)</th>
                <th className='center'>Total Interest </th>
                <th className='center'>Investment Capital</th>
            </tr>
        </thead>
        <tbody>
            {resultsData.map(yeardata => {
                const totalInterest = 
                yeardata.valueEndOfYear - yeardata.annualInvestment * 
                yeardata.year - initialInvestment;

                const totalCapital = yeardata.valueEndOfYear - totalInterest;
                return <tr key={yeardata.year}>
                            <td className='center'>{yeardata.year}</td>
                            <td className='center'>{formatter.format(yeardata.valueEndOfYear)}</td> 
                            <td className='center'>{formatter.format(yeardata.interest)}</td>
                            <td className='center'>{formatter.format(totalInterest)}</td>
                            <td className='center'>{formatter.format(totalCapital)}</td>
                        </tr>
            })

            }
        </tbody>
    
    </table>;
}