exports.appResult=function(succeed,errors,value)
{
    succeed=succeed;
    errors=errors;
    value=value;
    this.setSucceed=function(succeedData)
    {
        succeed=succeedData;
    }
    this.getSucceed=function()
    {
        return succeed;
    }
    this.serErrors=function(errorsData)
    {
        errors=errorsData;
    }
    this.getErrors=function()
    {
        return errors;
    } 
    this.setValue=function(valueData)
    {
        value=valueData;
    }
    this.getValue=function()
    {
        return value;
    }
};