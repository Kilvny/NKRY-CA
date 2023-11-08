export interface EmployeeDTO {
    id?: string,
    firstName: string,
    lastName: string,
    address: string,
    phoneNumber: string,
    photo?: string,
    employeeIdNumber: string,
    passportNumber: string,
    nationality: string,
    job: string,
    monthlyFinance: Object[],
    car?: {
        company: string, 
        model: string,
        manfactureYear: number,
        plateNumber: string
    } | null,
    personalDetails?: any,
    fixedFinance: any,
    fixedExpnenses: any,
    
}