import { useEffect, useState } from "react";
import "./table.css";

export default function UserTable({ data, setItem }) {
    const [tableItensList, setTableItensList] = useState([]);

    useEffect(() => {
        if (data && data.length > 0) {
            setTableItensList(data);
        }
    }, [data]);

    if (Array.isArray(data) && data.length > 0) {
        return (
            <table className="table_style">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Login</th>
                        <th>Password</th>
                        <th>Is Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => (
                        <tr key={index} onClick={() => setItem(item)}>
                            <td>{item?.login}</td>
                            <td>{item?.password}</td>
                            <td>{item?.isAdmin ? "Yes" : "No"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    return <p>No users available.</p>;
}
