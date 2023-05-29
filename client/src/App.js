import { useEffect, useState } from 'react';
import './App.css';



function App() {

    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");

    const loadData = async () => {
        // console.log(process.env.REACT_APP_API_HOST);
        // const data = await fetch(`${process.env.REACT_APP_API_HOST}/api/users`, {
        console.log("Fetch data");
        const data = await fetch(`/api/users`, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json());
        console.log(data);
        if (data.result == "success") {
            setUsers(data.users);
        }
    }

    // console.log(process.env.REACT_APP_API_HOST);

    const addUser = async () => {
        if (!name) {
            return
        }
        console.log("Add user");
        // const result = await fetch(`${process.env.REACT_APP_API_HOST}/api/user/create?name=${name}`, {
        const result = await fetch(`/api/user/create?name=${name}`, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json());
        console.log(result);
        if (result.result == "success") {
            loadData();
        }
        setName("");
    }

    useEffect(() => {
        loadData()
    }, []);
    return (
        <div className="App">
            List User:
            <div style={{ display: "flex" }}>
                <input
                    value={name}
                    placeholder='name'
                    onChange={e => setName(e.target.value)} />
                <div
                    className='border'
                    style={{ width: 80, height: 40, cursor: "pointer" }}
                    onClick={addUser}>
                    Submit
                </div>
            </div>
            <div
                style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 8 }}
            >
                {users.map((item, index) => (
                    <div
                        key={item.userId ?? index}
                        style={{
                            width: 300,
                            height: 50,
                            display: 'flex',
                            alignItems: "center",
                            paddingLeft: 8,
                            marginBottom: 8
                        }}
                        className='border'>
                        {`${item.userId ?? ""}. ${item.name}`}
                    </div>
                ))}
            </div>
            <img
                src='/public/uploads/images/docker.png'
                alt='hehe' />
        </div>
    );
}

export default App;
