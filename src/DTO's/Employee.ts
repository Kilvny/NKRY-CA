export interface EmployeeDTO {
    id?: string,
    firstName: string,
    lastName: string,
    address: string,
    phoneNumber: string,
    employeeIdNumber: string,
    passportNumber: string,
    nationality: string,
    job: string,
    car?: {
        company: string, 
        model: string,
        manfactureYear: number,
        plateNumber: string
    }
}