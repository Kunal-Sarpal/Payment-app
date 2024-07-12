import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [balance, setBalance] = useState("");
    const [name, setName] = useState("");
    const [userId, setUserId] = useState(""); // Add userId state
    const [bool, setBool] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/v1/user/bulk?filter=` + filter).then((res) => {
            setUsers(res.data.user);
        });
    }, [filter]);

    useEffect(() => {
        axios.get(
            "http://localhost:8000/api/v1/account/balance",
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        ).then(response => {
            setBalance(response.data.balance);
            setName(response.data.user);
            setUserId(response.data.userId); // Set the userId
        });
    }, []);

    return (
        <>
            <div className="p-5 z-0">
                <div className="font-bold mt-6 text-lg">
                    <div className="flex justify-between items-center">
                        <div className="text-5xl font-normal">
                            Welcome, <span className="text-red-300 font-light">{name} </span>
                        </div>
                        <div className="font-normal h-full w-1/4 relative flex justify-end">
                            <button className="bg-lime-600 p-2 hover:scale-110 duration-200 focus:ring-2 rounded-md text-sm font-semibold text-zinc-100 px-4" onClick={() => {
                                setBool(prev => !prev);
                            }}>Check Balance</button>
                            <div className="text-lime-600 absolute bottom-14 z-0">
                                {bool ? (<>INR ₹{balance}</>) : ("")}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-2">
                    <input onChange={(e) =>
                        setFilter(e.target.value)
                    } type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
                </div>
                <div>
                    {users.length === 0 ? ("No user found...") : (
                        <>
                            {users.filter(user => user._id !== userId).map(user => ( // Filter out the current user
                                <User key={user._id} user={user} name={name} />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

function User({ user,name }) {
    const navigate = useNavigate();

    return (
        <>
            {user.firstName != name ? (
                <div className="flex justify-between py-2">
                    <div className="flex">
                        <div className={`bg-red-200 rounded-full h-12 w-12 flex justify-center mt-1 mr-2 border-2`}>
                            <div className="flex flex-col justify-center h-full text-xl ">
                                {user.firstName[0].toLowerCase()}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center h-ful">
                            <div>
                                {user.firstName} {user.lastName}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center h-ful">
                        {name !== user.firstName ? (<button onClick={(e) => {
                            navigate("/send/?id=" + user._id + "&name=" + user.firstName);
                        }} className="bg-zinc-800 rounded-md p-2 px-4 focus:scale-105 text-zinc-200 hover:bg-zinc-900 font-semibold">Send Money</button>):(null)}
                       
                    </div>
                </div>
            ) : ("")}
        </>
    );
}
