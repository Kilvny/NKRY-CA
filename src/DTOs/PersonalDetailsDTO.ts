export interface PersonalDetailsDTO {
    employeeId: string; // Assuming EmployeeId is a string in TypeScript, change it accordingly
    visaExpiryDate?: Date;
    flightTicketsDueDate?: Date;
    dateOfBirth?: Date ;
    duesPayDate?: Date ;
    [key: string]: Date | string | undefined; // Add an index signature
}
