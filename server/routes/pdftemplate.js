const express = require("express")
const productRoutes = express.Router();
const fs = require('fs');

// const result = require("../models/appResult");
// const productModel = require("../models/productModel");

const FILE_PATH = './data/pdftemplates.json' // path to our JSON file

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
productRoutes.post('/pdftemplates/save', (req, res) => {
    try{
        console.log("body : ")
        console.log(req.body)
        const data = readDataFromFile();
        let fdata = data;
        if(req.body.isdefault)
        {
            fdata = fdata.filter((item) => item.isdefault != true)
        }
        console.log("fdata 1")
        console.log(fdata)
        if(req.body.id != null)
        {
            fdata = fdata.filter((item) => !item.id == req.body.id)
        }
        console.log("fdata 2")
        console.log(fdata)
        let id = 1;
        if(req.body.id == null)
        {
            for(let i = 0; i < fdata.length; i++)
            {
                if(fdata[i].id >= id)
                {
                    id = fdata[i].id + 1;
                }
            }
        }
        else{
            id = req.body.id;
        }
        console.log("id " + id)
        const newItem = req.body;
        newItem.id = id;
        fdata.push(newItem);
        const result = saveDataToFile(fdata);
        if(result == null) res.send({succeed:false, error:"request has failed", value:null});
        else res.send({succeed:true, error:null, value:fdata});
    }
    catch{
        res.send({succeed:false, error:"request has failed", value:null});
    }
});

productRoutes.get('/pdftemplates/filter', (req, res) => {
    const data = readDataFromFile();
    let fdata = data;

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

productRoutes.get('/pdftemplates/count', (req, res) => {
    const data = readDataFromFile();
    let fdata = data;
    if(req.query.s != null)
    {
        fdata = data.filter((item) => item.productname.toLowerCase().indexOf(req.query.s.toLowerCase()) >=0)
    }

    res.send({succeed:true, error:null, value:fdata.length});
});

// Read operation
productRoutes.get('/pdftemplates/getdefault', (req, res) => {
    const data = readDataFromFile();
    const item = data.find((item) => item.isdefault === true);
    if (item) {
        res.send({succeed:true, error:null, value:item});
    } else {
        res.send({succeed:false, error:"item not found", value:null});
    }
});

module.exports = productRoutes