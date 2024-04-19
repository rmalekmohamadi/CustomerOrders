const express = require("express")
const orderRoutes = express.Router();
const fs = require('fs');

const FILE_PATH = './data/orders.json' // path to our JSON file

const PDF_TEMPLATE_FILE_NAME = 'orderpdftemplate.pdf';

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
orderRoutes.post('/orders/add', (req, res) => {
    try{
        const data = readDataFromFile();
        let id = 1;
        for(let i = 0; i < data.length; i++)
        {
            if(data[i].id >= id)
            {
                id = data[i].id + 1;
            }
        }
        const newItem = req.body;
        newItem.id = id;
        data.push(newItem);
        const result = saveDataToFile(data);
        if(result == null) res.send({succeed:false, error:"request has failed", value:null});
        else res.send({succeed:true, error:null, value:newItem});
    }
    catch{
        res.send({succeed:false, error:"request has failed", value:null});
    }
});

// Read operation
orderRoutes.get('/orders/read/:id', (req, res) => {
    const data = readDataFromFile();
    const item = data.find((item) => item.id === parseInt(req.params.id));
    if (item) {
        console.log('/orders/read/'+req.params.id)
        console.log(item)
        res.send({succeed:true, error:null, value:item});
    } else {
        res.send({succeed:false, error:"item not found", value:null});
    }
});

// Read operation
orderRoutes.get('/orders/filter', (req, res) => {
    const data = readDataFromFile();
    let fdata = data;
    if(req.query.s != null)
    {
        fdata = data.filter((item) => item.customername.toLowerCase().indexOf(req.query.s.toLowerCase()) >=0)
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

    for(var i = 1; i <= pp; i++)
    {
        const index = fdata.length - ((p-1)*pp + i);
        if(index >= 0 && index < fdata.length)
        {
            items.push(fdata[index])
        }
    }
    res.send({succeed:true, error:null, value:items});
});

// Read operation
orderRoutes.get('/orders/count', (req, res) => {
    const data = readDataFromFile();
    let fdata = data;
    if(req.query.s != null)
    {
        fdata = data.filter((item) => item.customername.toLowerCase().indexOf(req.query.s.toLowerCase()) >=0)
    }

    res.send({succeed:true, error:null, value:fdata.length});
});

// Update operation
orderRoutes.put('/orders/update/:id', (req, res) => {
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
orderRoutes.delete('/orders/delete/:id', (req, res) => {
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

// Upload PDF Template operation
orderRoutes.post('/orders/uploadpdftemplate', function(req, res) {
    try{
        let sampleFile;
        let uploadPath;
      
        if (!req.files || Object.keys(req.files).length === 0) {
            res.send({succeed:false, error:"No files were uploaded.", value:null});
        }
      
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        sampleFile = req.files.file;
        if(sampleFile.mimetype != "application/pdf")
        {
            res.send({succeed:false, error:"file type not pdf.", value:null});
        }

        uploadPath = __dirname + '/../static/' + PDF_TEMPLATE_FILE_NAME;
      
        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv(uploadPath, function(err) {
          if (err)
            return res.send({succeed:false, error:err, value:null});
      
          res.send({succeed:true, error:null, value:null});
        });
    }
    catch(error)
    {
        res.send({succeed:false, error:error, value:null});
    }
  });

module.exports = orderRoutes