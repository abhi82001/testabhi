export class Student {
  id!:string;
  studentName!: string;  
  studentClass!: string;
  date!:number;
}

export class User {
    value!:string 
    viewValue!: string;
  }
export class studentuser {
  StudentName!: string;
  StudentClass!: string;
}
  
  export class Class {
    value!: string;
    viewValue!: string;
  }
  
  export class studentlist {

    studentid?: number;
    studentName!: string;
    studentClass!: string;
  
    constructor(studentid:number, studentName:string= '', studentClass:string ) {
      this.studentid = studentid;
      this.studentClass = studentClass;
      this.studentName = studentName;
    }
  }