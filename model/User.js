
class User {
    constructor(uid, email, phoneNum, address){
        const current = new Date();
        const date = current.toDateString()

        this.uid = uid
        this.email = email;
        this.phoneNum = phoneNum;
        this.address = address; 

    }
    
    toString() {
        return this.uid + ', ' + this.email + ', ' + this.phoneNum+ ', '+this.address;
    }
}

export default User;