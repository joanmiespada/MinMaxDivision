
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

function renderjson(obj)
{
    return '{ totalSum:'+ obj.totalSum  +' numElems:'+obj.numElems+'}';
}

function recursive(Kgroups,lastGroup,Aitems,currentMinimalSum, depth)
{
    if(Aitems.length === 0)
    {
        var largeSum=0;
        for(var i=0; i< Kgroups.length; i++)
        {
            var total = 0;
            for(var j=0; j< Kgroups[i].length; j++)
            {
                total += Kgroups[i][j];
            }
            if(total >largeSum )
                  largeSum = total;
        }
        //console.log(tabulatorHelper(depth) + 'larger sum: '+ largeSum ); 

        if(currentMinimalSum.minimalLargeSum >largeSum ){
            currentMinimalSum.minimalLargeSum = largeSum;
            //console.log(tabulatorHelper(depth) + 'new larger sum!!!: '+ currentMinimalSum.minimalLargeSum );
        } 
        
    }else{
        var AitemsLesser = Aitems.slice(1);
        var elem = Aitems.slice(0,1);
        for( var i=lastGroup; i< Kgroups.length; i++)
        {
            Kgroups[i] = Kgroups[i].concat(elem);
            //console.log( tabulatorHelper(depth) + groupsHelper(Kgroups) );
            currentMinimalSum= recursive(Kgroups, i , AitemsLesser ,currentMinimalSum, depth+1);           
            Kgroups[i] = Kgroups[i].slice(0,Kgroups[i].length-1); 
        }
    }

    return currentMinimalSum;
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
    //console.log('starting');
    var sumFinal= { 
        minimalLargeSum: Number.MAX_VALUE 
    };
    var groups = setUpGroups(K);
    recursive(groups,0,A, sumFinal,0 );
    return sumFinal.minimalLargeSum;
}

module.exports = {
    MinMax:solution
}