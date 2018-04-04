
function groupsHelper(groups)
{
    var result='[';

    groups.forEach(function(element) {
        if (Array.isArray(element))
            result += groupsHelper(element) + ','
        else
            result += element + ','
    }, this);

    if((aux=result.lastIndexOf(','))>0)
        {
            result = result.substring(0, aux );
        }
    result+=']';
    return result;
}

function tabulatorHelper(cont)
{
    var result='';
    for(var i=0;i<cont;i++)
        {
            result += '\t';
        }
    return result;
}

function MinimalSum(newItem, current)
{
    if(newItem.numElems>=current.numElems)
        if(newItem.totalSum< current.totalSum)
            return newItem;
    return current;
}

function recursive(Kgroups,Aitems,currentMinimalSum, counter)
{
    if(Aitems.length === 0)
    {
        for(var i=0; i< Kgroups.length; i++)
        {
            var total = 0;
            for(var j=0; j< Kgroups[i].length; j++)
            {
                total += Kgroups[i][j];
            }
            currentMinimalSum = MinimalSum({ 
                    totalSum: total, 
                    numElems: Kgroups[i].length
                }, currentMinimalSum);
        }
        return currentMinimalSum; 
        
    }else{
        var AitemsLesser = Aitems.slice(1);
        var elem = Aitems.slice(0,1);
        for( var i=0; i< Kgroups.length; i++)
        {
            Kgroups[i] = Kgroups[i].concat(elem);
            var tabs = tabulatorHelper(counter); 
            var renderGroups = groupsHelper(Kgroups);
            console.log(tabs + renderGroups );
            currentMinimalSum= recursive(Kgroups, AitemsLesser ,currentMinimalSum, counter++);
            Kgroups[i] = Kgroups[i].slice(0,Kgroups[i].length-1); 
        }
        
            
        
    }

}

function setUpGroups(numGroups)
{
    var groups = [];
    for(var i=0;i<numGroups;i++)
        groups.push([]);

    return groups;
}

function solution(K,M,A)
{
    console.log('starting');
    var sumFinal= { 
        totalSum: Number.MAX_VALUE, 
        numElems: -Number.MAX_VALUE
    };

    var groups = setUpGroups(K);

    recursive(groups,A, sumFinal,0 );

    return sumFinal.totalSum;
}

solution(3,5,[2,1,5,1,2,2,2]);

module.exports = {
    MinMax:solution
}