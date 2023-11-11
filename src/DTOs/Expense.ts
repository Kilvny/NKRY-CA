export interface ExpenseDTO {
    id?: string,
    name: string | null,
    amount: number,
    dueDate?: string,
    isFixed: boolean,
    employeeFinanceId?: string,
    employeeId: string
}