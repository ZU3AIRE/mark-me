export class Student {

    public id!: number;
    public name!: string;
    public email!: string;
    public collegeRollNo!: string;
    public universityRollNo!: string;
    public session!: string;
    public phoneNumber!: string;
    public currentSemester!: string;
    public attendance!: string;

    constructor(email: string, collegeRollNo: string, universityRollNo: string, session: string, phoneNumber: string, currentSemester: string, attendance: string) {
        this.email = email;
        this.collegeRollNo = collegeRollNo; 
        this.universityRollNo = universityRollNo; 
        this.session = session; 
        this.phoneNumber = phoneNumber; 
        this.currentSemester = currentSemester; 
        this.attendance = attendance; 
    }
}