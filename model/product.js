const products = [
    {
        id:'lap1',
        title:'HP Laptop core i5 5th gen',
        imgUrl:'/images/p1.png',
        minRentDays:10,
        available:false,
    },
    {
        id:'lap2',
        title:'Dell Laptop core i7 5th gen',
        imgUrl:'/images/p2.png',
        minRentDays:5,
        available:true,
    },
    {
        id:'ear1',
        title:'Blutooth device next gen',
        imgUrl:'/images/p3.png',
        minRentDays:5,
        available:true,
    },
    {
        id:'head1',
        title:'Headphone next gen devices',
        imgUrl:'/images/p4.png',
        minRentDays:7,
        available:true,
    },
    {
        id:'mob1',
        title:'Mobile Iphone gen devices',
        imgUrl:'/images/m1.png',
        minRentDays:7,
        available:true,
    },
    {
        id:'mob2',
        title:'Mobile Android gen devices',
        imgUrl:'/images/m2.png',
        minRentDays:7,
        available:true,
    },
    {
        id:'bag1',
        title:'Hand bag',
        imgUrl:'/images/b1.png',
        minRentDays:7,
        available:true,
    },
    {
        id:'bag2',
        title:'Hand bag awesom color',
        imgUrl:'/images/b3.png',
        minRentDays:7,
        available:true,
    },
]
let filter = ''
let searchKey = ''
let errormessage = 'Not Found'
module.exports = class Product{
    constructor(){}

    static fetchAll(cb){
        cb(products);
    }
    static setFilter(val){
        filter = val;
    }
    static setSearchKey(val){
        searchKey = val;
    }
    static getFilteredList(cb){
        if(filter==='rented'){
            cb(products.filter(p=> p.available===false))
        }else if(filter==='availables'){
            cb(products.filter(p=> p.available===true))
        }else if(filter==='search'){
            cb(products.filter(p=>{
                let title = p.title.toLowerCase();
                return title.includes(searchKey.toLowerCase())
            }))
        }
        else{
            cb(products)
        }
    }
    static returnAll(){
        products.forEach(p=>{
            p.available = true;
        })
    }  
    static setErrorMessage(message)  {
        errormessage = message;
    }
    static getErrorMessage(){
        return errormessage;
    }
}