import { useEffect, useState } from "react";
import "./table.css";
import DeleteButton from '../buttons/deleteButton.js'
import DocumentButton from "../buttons/documentButton.js";


export default function FinancialReportTable({ data, setItem }) {
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
                        <th></th>
                        <th>Loan</th>
                        <th>Hours Worked</th>
                        <th>Total Cost</th>
                        <th>Base Pay</th>
                        <th>Extra Pay</th>
                        <th>Transportation Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => (
                        <tr key={index} onClick={() => setItem(item)}>
                            <td><DeleteButton entityType={"financial-reports"} id={item.id} /></td>
                            <td><DocumentButton entityType={"financial-reports"} id={item.id} /></td>
                            <td>{item?.loan?.name}</td>
                            <td>{item?.hoursWorked}</td>
                            <td>{item?.totalCost}</td>
                            <td>{item?.basePay}</td>
                            <td>{item?.extraPay}</td>
                            <td>{item?.transportationCost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    return <p>No financial reports available.</p>;
}
