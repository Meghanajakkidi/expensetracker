
const express = require("express");
const ExpModel = require("../models/Exp");
const router = express.Router();
const mongoose = require("mongoose");


router.get("/summary", async (req, res) => {
    try {
        const totalCount = await ExpModel.countDocuments({});
        res.send({ TotalCount: totalCount });
    } catch (error) {
        console.error("Error fetching summary:", error);
        res.status(500).send("Error fetching summary");
    }
});


router.get("/available", async (req, res) => {
    try {
        const expenses = await ExpModel.find({ assigned: { "$ne": true } });
        res.send(expenses);
    } catch (error) {
        console.error("Error fetching available expenses:", error);
        res.status(500).send("Error fetching available expenses");
    }
});


router.get("/all", async (req, res) => {
    try {
        const expenses = await ExpModel.find({ assigned: { "$ne": true } });
        res.send(expenses);
    } catch (error) {
        console.error("Error fetching all expenses:", error);
        res.status(500).send("Error fetching all expenses");
    }
});


router.post("/create", async (req, res) => {
    try {
        console.log("Request body:", req.body); 
        const newExpData = new ExpModel({ ...req.body, assigned: false });
        const createdExp = await newExpData.save();
        res.send(createdExp);
    } catch (error) {
        console.error("Error creating expense:", error);
        res.status(500).send("Error creating expense");
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await ExpModel.findByIdAndDelete(id);
        res.send("Data deleted successfully");
    } catch (error) {
        console.error("Error deleting expense:", error);
        res.status(500).send("Error deleting expense");
    }
});


router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await ExpModel.findById(id);
        if (expense) {
            res.send(expense);
        } else {
            res.status(404).send("Expense not found");
        }
    } catch (error) {
        console.error("Error fetching expense:", error);
        res.status(500).send("Error fetching expense");
    }
});


router.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedExp = await ExpModel.updateOne({ _id: new mongoose.Types.ObjectId(id) }, { ...req.body });
        res.send(updatedExp);
    } catch (error) {
        console.error("Error updating expense:", error);
        res.status(500).send("Error updating expense");
    }
});


router.get("/byStatus/:status", async (req, res) => {
    try {
        const { status } = req.params;
        let expenses;
        if (status === "All") {
            expenses = await ExpModel.find({});
        } else {
            expenses = await ExpModel.find({ status: status });
        }
        res.send(expenses);
    } catch (error) {
        console.error("Error fetching expenses by status:", error);
        res.status(500).send("Error fetching expenses by status");
    }
});

module.exports = router;