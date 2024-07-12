import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function SendMoney() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const name = searchParams.get('name');
  const [amount, setAmount] = useState(0);

  const handle = async () => {
      const userData = {
          to: id,
          amount: amount,
        };
    if(amount != 0){
      
          try {
            await axios.post(
              "http://localhost:8000/api/v1/account/transfer",
              userData,
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            );
            alert("Successful transfer");
            navigate("/dashboard");
          } catch (error) {
            alert("Transfer Unsuccessful");
            navigate("/dashboard");
          }
        }
    else{
            alert("Transfer Failed");
            
        }
    
   
  }
  return (
    <>
      <div
        className="flex justify-center items-center p-3 absolute border-[1px]  border-none  text-white rounded font-medium  hover:scale-110 hover:text-white  hover:border-none duration-200 border-zinc-300 shadow-zinc-500 shadow left-6 top-5"
        onClick={() => {
          navigate(-1);
        }}
      >
        🔙
      </div>
      <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
          <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col space-y-1.5 p-6">
              <h2 className="text-3xl font-bold text-center">Send Money</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-2xl text-white">{name[0].toLowerCase()}</span>
                </div>
                <h3 className="text-2xl font-semibold">{name}</h3>
              </div>
              <div className="space-y-6">
                <div className="space-y-4">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="amount"
                  >
                    Amount (in Rs)
                  </label>
                  <input
                    type="number"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    id="amount"
                    placeholder="Enter amount"
                    onChange={(e) => {
                      setAmount(e.target.value);
                      console.log(amount);
                    }}
                  />
                </div>
                <button
                  onClick={handle}
                  className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                >
                  Initiate Transfer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SendMoney;
