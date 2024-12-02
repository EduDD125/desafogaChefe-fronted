import { useEffect, useState } from "react";
import "./table.css";
import DeleteButton from '../buttons/deleteButton.js'

export default function AddressTable({ data, setItem }) {
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
                        <th></th>
                        <th>Number</th>
                        <th>Street</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Postal Code</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => (
                        <tr key={index} onClick={() => setItem(item)}>
                            <td><DeleteButton entityType={"address"} id={item.id} /></td>
                            <td>{item?.number}</td>
                            <td>{item?.street}</td>
                            <td>{item?.city}</td>
                            <td>{item?.state}</td>
                            <td>{item?.postalCode}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    return <p>No addresses available.</p>;
}
