import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Createexpense() {
    const [expName, setExpName] = useState("");
    const [expDesc, setExpDesc] = useState("");
    const [expValue, setExpValue] = useState("");
    const [expCategory, setExpCategory] = useState(""); 
    const [expDate, setExpDate] = useState(""); 
    const [showAlert, setShowAlert] = useState(false);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const onExpDescChange = (e) => {
        setExpDesc(e.target.value);
    };

    const onExpNameChange = (e) => {
        setExpName(e.target.value);
    };

    const onExpValueChange = (e) => {
        setExpValue(e.target.value);
    };

    const onExpCategoryChange = (e) => {
        setExpCategory(e.target.value);
    };

    const onExpDateChange = (e) => {
        setExpDate(e.target.value);
    };

    const validateExpField = () => {
        let errors = {};
        if (!expName) {
            errors.expName = "Please enter expense name";
        }
        if (!expDesc) {
            errors.expDesc = "Please enter expense description";
        }
        if (!expValue) {
            errors.expValue = "Please enter expense value";
        }
        if (!expCategory) {
            errors.expCategory = "Please enter expense category";
        }
        if (!expDate) {
            errors.expDate = "Please enter expense date";
        }
        return errors;
    };

    const createExp = (expData) => {
        let errors = validateExpField();
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            fetch("http://localhost:7000/exp/create", {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(expData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(result => {
                if (result._id) {
                    setShowAlert(true);
                    console.log("data saved successfully");
                    navigate("/expenses");
                }
            })
            .catch(error => {
                console.error("Error creating expense:", error);
            });
        } else {
            return;
        }
    };

    const saveExp = (e) => {
        e.preventDefault();
        let expData = {
            expName,
            expDesc,
            expValue: parseFloat(expValue),
            expCategory, 
            expDate, 
            status: "not_started",
            assigned: true
        };
        createExp(expData);
    };

    return (
        <div className="container">
            <h4>Create Expense Page</h4>
            <div className="card" style={{ width: '25rem' }}>
                <div className="card-body">
                    <form onSubmit={saveExp}>
                        <div className="form-group" style={{ padding: '15px' }}>
                            <label>Expense Name</label>
                            <input type="text" className="form-control" value={expName} onChange={onExpNameChange} />
                            <p className="error-text">{errors?.expName}</p>
                        </div>
                        <div className="form-group" style={{ padding: '15px' }}>
                            <label>Expense Description</label>
                            <input type="text" className="form-control" value={expDesc} onChange={onExpDescChange} />
                            <p className="error-text">{errors?.expDesc}</p>
                        </div>
                        <div className="form-group" style={{ padding: '15px' }}>
                            <label>Expense Value</label>
                            <input type="text" className="form-control" value={expValue} onChange={onExpValueChange} />
                            <p className="error-text">{errors?.expValue}</p>
                        </div>
                        <div className="form-group" style={{ padding: '15px' }}>
                            <label>Expense Category</label>
                            <input type="text" className="form-control" value={expCategory} onChange={onExpCategoryChange} />
                            <p className="error-text">{errors?.expCategory}</p>
                        </div>
                        <div className="form-group" style={{ padding: '15px' }}>
                            <label>Expense Date</label>
                            <input type="date" className="form-control" value={expDate} onChange={onExpDateChange} />
                            <p className="error-text">{errors?.expDate}</p>
                        </div>
                        <div style={{ padding: '15px' }}>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            {showAlert && (
                <div className="row">
                    <div className="col-md-3 mt-4">
                        <div className="alert alert-success" role="alert">
                            Expense Created Successfully!!
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Createexpense;