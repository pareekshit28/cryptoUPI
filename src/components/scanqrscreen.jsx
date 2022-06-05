import { QrReader } from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';
import Nav from './nav';

const ScanQr = () => {
    const navigate = useNavigate();
    return (
        <div>
        <Nav/>
        <QrReader
        onResult={(result, error) => {
            if (!!result) {
                const vpa = result?.text.split('=')[1].split('&')[0]
                console.log(vpa)
                navigate('/payout', {state: {vpa : vpa}})
            }
            
            if (!!error) {
                console.info(error);
            }
        }}
        style={{ width: '100%' }}
        constraints={ {facingMode: 'environment'} }
        />
        </div>
    )
}

export default ScanQr