export
 interface signUpData {
    label1: {
      text: string;
      type: string;
      place1: string;
      place2: string
    };
    label2: {
      text: string;
      type: string;
      place: string;
    };
    label3: {
      text: string;
      type: string;
      place1: string;
      place2: string;
    };
    label4: {
      text: string;
      type: 'file';
    };
    btn: string;
    signP: string;
    link: string;
  }
  export interface FormDatatype {
    fname: string;
    lname: string;
    email: string;
    password: string;
    repassword: string;
    img: File | null;
  }