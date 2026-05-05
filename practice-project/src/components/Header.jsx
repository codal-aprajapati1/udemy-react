import logo_image from '../assets/investment-calculator-logo.png'
export default function Header(){
    return (
        <header id='header'>
            <img src={logo_image} className='logo' alt="calc logo" />
            <h1>Investment Calculator</h1>
        </header>
    );
}