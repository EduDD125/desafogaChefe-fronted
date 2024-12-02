import { useEffect, useState } from "react";
import DeleteButton from '../buttons/deleteButton.js'
import "./table.css";

export default function JobTable({ data, setItem }) {
    const [tableItensList, setTableItensList] = useState([]);
    console.log(data);
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
                        <th>Title</th>
                        <th>Brute Cost Per Hour</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => (
                        <tr key={index} onClick={() => setItem(item)}>
                            <td><DeleteButton entityType={"jobs"} id={item.id} /></td>
                            <td>{item.title}</td>
                            <td>{item.bruteCostPerHour}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    return <p>No jobs available.</p>;
}
