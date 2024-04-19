exports.product=function(id,name,pricePerUnit)
{
    id=id;
    name=name;
    pricePerUnit=pricePerUnit;
    this.setId=function(idData)
    {
        id=idData;
    }
    this.getId=function()
    {
        return id;
    }
    this.setName=function(nameData)
    {
        name=nameData;
    }
    this.getName=function()
    {
        return name;
    }
    this.setPricePerUnit=function(pricePerUnitData)
    {
        pricePerUnit=pricePerUnitData;
    }
    this.getPricePerUnit=function()
    {
        return pricePerUnit;
    }
};