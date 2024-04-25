import mongoose from "mongoose"
import { CategorySchema } from "./category.schema"

export const TransactionSchema = new mongoose.Schema({
    title: String,
    amount: Number,
    date: Date,
    category: CategorySchema,
    type: String,
},
{ versionKey: false },)

export const TransactionModel = mongoose.model('Transaction', TransactionSchema)