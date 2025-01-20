import {useState} from "react";

export interface Users{
    id: number
    firstName: string,
    lastName: string,
    email: string,
    
}

function Users(){
    const [users, setUsers] = useState([]);

    return(
        <h1>Users Work</h1>
    )
}

export default Users;