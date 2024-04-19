const express = require("express")
const productRoutes = express.Router();
const fs = require('fs');

// const result = require("../models/appResult");
// const productModel = require("../models/productModel");

const FILE_PATH = './data/products.json' // path to our JSON file

// util functions
const saveDataToFile = (data) => {
    try{
        const stringifyData = JSON.stringify(data)
        fs.writeFileSync(FILE_PATH, stringifyData, 'utf8')
        return data;
    }
     catch (error) {
        return null;
    }
}

const readDataFromFile = () => {
    try {
        const data = fs.readFileSync(FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Add operation
productRoutes.post('/products/create', (req, res) => {
    try{
        const data = readDataFromFile();
        const newItem = req.body;
        data.push(newItem);
        const result = saveDataToFile(data);
        if(result == null) res.send({succeed:false, error:"request has failed", value:null});
        else res.send({succeed:true, error:null, value:newItem});
    }
    catch{
        res.send({succeed:false, error:"request has failed", value:null});
    }
});

productRoutes.get('/products/filter', (req, res) => {
    const data = readDataFromFile();
    let fdata = data;
    if(req.query.s != null)
    {
        fdata = data.filter((item) => item.productname.toLowerCase().indexOf(req.query.s.toLowerCase()) >=0)
    }

    const items = [];

    let p = 1;
    if(req.query.page != null){
        p = parseInt(req.query.page);
        if(p < 1) p = 1;
    }

    let pp = 10;
    if(req.query.perpage != null){
        pp = parseInt(req.query.perpage);
        if(pp < 1) pp = 10;
    }

    for(var i = 0; i < pp; i++)
    {
        const index = (p-1)*pp + i;
        if(index >= 0 && index < fdata.length)
        {
            items.push(fdata[index])
        }
    }

    res.send({succeed:true, error:null, value:items});
});

productRoutes.get('/products/count', (req, res) => {
    const data = readDataFromFile();
    let fdata = data;
    if(req.query.s != null)
    {
        fdata = data.filter((item) => item.productname.toLowerCase().indexOf(req.query.s.toLowerCase()) >=0)
    }

    res.send({succeed:true, error:null, value:fdata.length});
});

// Read operation
productRoutes.get('/products/read/:id', (req, res) => {
    const data = readDataFromFile();
    const item = data.find((item) => item.id === parseInt(req.params.id));
    if (item) {
        res.send({succeed:true, error:null, value:item});
    } else {
        res.send({succeed:false, error:"item not found", value:null});
    }
});

// Update operation
productRoutes.put('/products/update/:id', (req, res) => {
    const data = readDataFromFile();
    const index = data.findIndex((item) => item.id === parseInt(req.params.id));
    if (index != -1) {
        data[index] = req.body;
        data[index].id = parseInt(req.params.id);
        const result = saveDataToFile(data);
        if(result == null) res.send({succeed:false, error:"request has failed", value:null});
        else res.send({succeed:true, error:null, value:data[index]});
    } else {
        res.send({succeed:false, error:"item not found", value:null});
    }
});

// Delete operation
productRoutes.delete('/products/delete/:id', (req, res) => {
    const data = readDataFromFile();
    const index = data.findIndex((item) => item.id === parseInt(req.params.id));
    if (index !== -1) {
        data.splice(index, 1);
        const result = saveDataToFile(data);
        if(result == null) res.send({succeed:false, error:"request has failed", value:null});
        else res.send({succeed:true, error:null, value:null});
    } else {
        res.send({succeed:false, error:"item not found", value:null});
    }
});

module.exports = productRoutes