import Nav from "./nav"
import {useLocation, useNavigate} from 'react-router-dom';
import { useState } from "react";
import { ethers } from 'ethers';
const axios = require('axios').default

const Payout = () => {
    const location = useLocation();
    const vpa = location.state.vpa
    const [amount, setAmount] = useState(0)
    const [eth, setEth] = useState(0)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        eth === 0 ? fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr").then((res) => res.json())
        .then((json) => {
            setEth(amount/json.ethereum.inr)
        }) : payEth()
    }

    const handleChange = (e) => {
        setAmount(e.target.value)
        setEth(0)
    }

    const payEth = ()=>{
        const paymentAddress = '0x917a68cC6F5C0CcEC69C9C0b3Bd9A4A88573b38C'
        const tx = {
            to: paymentAddress,
            value: ethers.utils.parseEther(eth.toFixed(6)),
        }
        signer.sendTransaction(tx).then((transaction)=>{
            console.log("Payment Successful", transaction)
            axios.post("https://crypto-upi.herokuapp.com/pay", {
                    "amount": amount,
                    "vpa": vpa
                }).then(response=>{
                    navigate('/success', {state:{hash: transaction.hash, id: response.data.id, amount: amount, vpa: vpa}})
                }).catch((e)=>console.log("Error", e))
            }).catch((e)=>{
                console.log("Error", e)
            })
    }

    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <Nav/>
            <text className=" text-lg">You are paying to:</text>
            <text className=" text-lg">{vpa}</text>
            <form className="flex flex-col justify-center items-center mt-4" onSubmit={handleSubmit}>
            <label className=" text-xl">
                Amount (&#8377;)
            </label>
            <input value={amount} onChange={handleChange} className=" text-3xl m-8 rounded-md p-2 text-center focus:outline-none" />
            <input type="submit" value={eth === 0 ? 'Calculate Eth' : `Pay ${eth} Eth`} className=" bg-black p-3 rounded-xl font-bold flex justify-center items-center shadow-lg text-white cursor-pointer" />
            </form>
        </div>
    )
}

export default Payout