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
                navigate('/payout', {state: {vpa : result?.text}})
            }
            
            if (!!error) {
                console.info(error);
            }
        }}
        style={{ width: '100%' }}
        />
        </div>
    )
}

export default ScanQr