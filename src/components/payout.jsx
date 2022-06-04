import Nav from "./nav"
import {useLocation, useNavigate} from 'react-router-dom';
import { useState } from "react";
import { ethers } from 'ethers';
const base64 = require('base-64')
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
            const username = 'rzp_test_4QoYiedPNEZFo4'
            const pass = 'IWkGMBiMFPaxRiVsg4Zhisti'
            const base = base64.encode(username + ":" + pass)

            axios.post("/v1/payouts", {
                "account_number": "2323230076368081",
                "amount": amount*100,
                "currency": "INR",
                "mode": "UPI",
                "purpose": "payout",
                "fund_account": {
                    "account_type": "vpa",
                    "vpa": {
                        "address": vpa
                    },
                    "contact": {
                        "name": vpa.substring(0,10),
                    }
                },
            },{
                    headers: {
                    'Authorization': `Basic ${base}`,
                    }
                },)
                .then(response => {
                    console.log(response.data)
                    navigate('/success', {state: {vpa : vpa, id: response.data.id, amount: amount, hash:transaction.hash}})
                })
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