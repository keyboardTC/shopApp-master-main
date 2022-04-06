
class User {
    constructor(uid, name, email, phoneNum, address){
        const current = new Date();
        const date = current.toDateString()

        this.uid = uid
        this.name = name
        this.email = email;
        this.phoneNum = phoneNum;
        this.address = address; 

    }
    
    toString() {
        return this.uid + ', ' + this.name + this.email + ', ' + this.phoneNum+ ', '+this.address;
    }
}

export default User;