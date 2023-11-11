import { ExpenseDTO } from "./Expense";

export interface MonthlyFinanceDTO {
    id?: string;
    deliveriesMade: number;
    totalSalary: number;
    dueMonth: number;
    dueYear: number;
    monthlyExpenses?: ExpenseDTO[];
    employeeId?: string;
}