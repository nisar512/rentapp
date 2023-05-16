const express = require('express');
const router = express.Router();

const Product = require('../model/product')

// Home page

router.get('/',(req, res, next)=>{
    Product.fetchAll(products=>{
        let tempProds=[...products]
        if(tempProds.length>3){
            let len = tempProds.length-3
            len = Math.floor(Math.random()*10)%len
            tempProds=[]
            i=1;
            while(i<=3){
                tempProds.push(products[len++])
                i++;
            }
        }

        res.render('index',{
            pageTitle:'Home Page',
            prods:tempProds,
            hasProducts: products.length>0,
        })

    })
});

// Handling the available/rented filter

router.post('/rental-catalog', (req,res,next)=>{
    const filterby = req.body.filterby;
    Product.setFilter(filterby)
    Product.getFilteredList(products=>{
        if(products.length<=0){
            if(filterby === 'rented'){Product.setErrorMessage('You do not have any rented item')}
            else if(filterby === 'availables'){Product.setErrorMessage('No Product available')}
            Product.setFilter('')
            res.redirect('/error')
        }else{
            res.redirect('/rental-catalog')
        }
    })
})

// Hanling Return all items post request

router.post('/returnRentals', (req,res,next)=>{
    Product.returnAll();
    Product.setFilter('')
    res.redirect('/rental-catalog')
})


// Handling post request related to add to rented item

router.post('/rent/:prodId',(req,res,next)=>{
    Product.fetchAll(products=>{
        const rentdays = req.body.rentdays;
        const prodId = req.params.prodId;
        const product = products.find(p=>p.id===prodId)
        if(rentdays<product.minRentDays){
            Product.setErrorMessage('Keep the rent days greater than or equal to min value!')
            res.status(404).redirect('/error')
        }else{
            product.available = false;
            res.redirect('/rental-catalog')
        }
    })
})

// Searchbox handler

router.post('/rental-catalog/search',(req,res,next)=>{
    Product.setFilter('search')
    Product.setSearchKey(req.body.searchkey);
    Product.getFilteredList(products=>{
        if(products.length<=0){
            Product.setErrorMessage('No product found!')
            Product.setFilter('')
            Product.setSearchKey('');
            res.redirect('/error')
        }else{
            res.redirect('/rental-catalog')
        }
    })
})

router.get('/rental-catalog',(req, res, next)=>{
    // Set Default Message
    Product.setErrorMessage('No Page found!')

    Product.getFilteredList(products=>{
        res.render('rent-catalog',{
            pageTitle:'Rental Catalog',
            prods:products
        })
    })
})



router.use('/',(req, res, next)=>{
    res.render('error',{
        pageTitle:'Error',
        message:Product.getErrorMessage(),
    })
})

module.exports = router;