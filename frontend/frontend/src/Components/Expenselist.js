import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Expenselist() {
    const [expenses, setExpenses] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [expenseSummary, setExpenseSummary] = useState({ TotalCount: 0 });
    const navigate = useNavigate();

    const getAllExpenses = () => {
        fetch("http://localhost:7000/exp/all/")
            .then((res) => res.json())
            .then((result) => {
                if (Array.isArray(result)) {
                    setExpenses(result);
                    setFilteredExpenses(result);
                } else {
                    console.error("Unexpected response format:", result);
                    setExpenses([]);
                    setFilteredExpenses([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching expenses:", error);
                setExpenses([]);
                setFilteredExpenses([]);
            });
    };

    const getExpenseSummary = () => {
        fetch("http://localhost:7000/exp/summary")
            .then((res) => res.json())
            .then((result) => {
                setExpenseSummary(result);
            })
            .catch((error) => console.error("Error fetching expense summary:", error));
    };

    useEffect(() => {
        getAllExpenses();
        getExpenseSummary();
    }, []);

    const deleteExpense = (e, id) => {
        fetch("http://localhost:7000/exp/" + id, { method: "DELETE" })
            .then((res) => res.text())
            .then(() => {
                getAllExpenses(); 
            })
            .catch((error) => console.error("Error deleting expense:", error));
    };

    const searchExpenses = (e) => {
        setSearchKey(e.target.value);
        if (e.target.value) {
            if (Array.isArray(expenses)) {
                const filteredExpensesData = expenses.filter((item) =>
                    item.expName.toLowerCase().includes(e.target.value.toLowerCase())
                );
                setFilteredExpenses(filteredExpensesData);
            } else {
                console.error("Expenses is not an array:", expenses);
            }
        } else {
            setFilteredExpenses(expenses);
        }
    };

    const editExpense = (e, id) => {
        e.preventDefault();
        navigate(`/edit-expense/${id}`);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString();
    };

    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col-md-3">
                    <div className="card text-center mb-3 card-shadow" style={{ borderBottom: '5px solid blue' }}>
                        <div className="card-body">
                            <h5 className="card-title">Total Expenses</h5>
                            <p className="card-text count-task">{expenseSummary.TotalCount}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-12">
                    <input
                        type="text"
                        className="search-bar"
                        style={{ width: '100%' }}
                        value={searchKey}
                        placeholder="Search Expenses"
                        onChange={searchExpenses}
                    />
                </div>
            </div>

            {Array.isArray(filteredExpenses) && filteredExpenses.length === 0 && (
                <h4>Currently No Expenses Available</h4>
            )}

            <div className="row mt-3">
                {Array.isArray(filteredExpenses) && filteredExpenses.map((expense) => (
                    <div className="col-md-12 mt-3" key={expense._id}>
                        <div className="list-group">
                            <div className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">ID: {expense._id}</h5>
                                    <div>
                                        <button className="btn btn-warning btn-sm me-2" onClick={(e) => editExpense(e, expense._id)}>Edit</button>
                                        <button className="btn btn-danger btn-sm" onClick={(e) => deleteExpense(e, expense._id)}>Delete</button>
                                    </div>
                                </div>
                                <p className="mb-1">Name: {expense.expName}</p>
                                <p className="mb-1">Amount: ${expense.expValue}</p>
                                <p className="mb-1">Description: {expense.expDesc}</p>
                                <p className="mb-1">Category: {expense.expCategory}</p>
                                <p className="mb-1">Date: {formatDate(expense.expDate)}</p> 
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Expenselist;