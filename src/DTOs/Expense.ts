export interface ExpenseDTO {
    id?: string,
    name: string | null | undefined,
    amount: number,
    dueDate?: string,
    isFixed: boolean,
    employeeFinanceId?: string,
    employeeId?: string
}