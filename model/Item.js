class Item {
    constructor(Id, Title, Description, Image, Ratings, Price, Available, Category){
        const current = new Date();
        const date = current.toDateString()

        this.Id = Id ,
        this.Title =  Title,
        this.Description =  Description,
        this.Image =  Image,
        this.Ratings = Ratings,
        this.Price =  Price,
        this.Available = Available,
        this.Category = Category


    }
    
    toString() {
        return this.uid + ', ' + this.itemId + ', ' + this.itemTitle + ', '+this.itemAvailable+ ', '+this.itemQuantity;
    }
}

export default Item;