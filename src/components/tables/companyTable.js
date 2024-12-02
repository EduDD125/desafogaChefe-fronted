import { useEffect, useState } from "react";
import "./table.css";

export default function CompanyTable({ data, setItem }) {
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
                        <th>Name</th>
                        <th>CNPJ</th>
                        <th>Email</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} onClick={() => setItem(item)}>
                            <td>{item.name}</td>
                            <td>{item.CNPJ}</td>
                            <td>{item.email}</td>
                            <td>
                                {item?.address?.street}, {item?.address?.city}, {item?.address?.state}, {item?.address?.postalCode}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    return <p>No companies available.</p>;
}
