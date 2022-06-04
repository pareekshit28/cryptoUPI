import { useLocation } from "react-router-dom"
import Nav from "./nav"
import check from "../images/green-checkmark.svg"

const SuccessScreen = () => {
    const location = useLocation()
    const vpa = location.state.vpa
    const id = location.state.id
    const amount = location.state.amount
    const hash = location.state.hash

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <Nav/>
            <div className="flex flex-col justify-center items-center bg-green-100 p-16 rounded-3xl">
            <text>Payment Successful to:</text>
            <text>{vpa}</text>
            <div className="flex justify-center items-center py-6">
            <text className=" text-3xl font-bold">&#8377;{amount}&nbsp;</text>
            <img src={check} alt="Check" className="h-6 w-6"/>
            </div>
            <text className=' w-60 truncate'>{`hash: ${hash}`}</text>
            <text>{`RefId: ${id}`}</text>
            </div>
        </div>
    )
}

export default SuccessScreen