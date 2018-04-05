
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

function calcLargeSum(Kgroups)
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
        return largeSum; 
}

function sum(items)
{
    var total=0;
    items.forEach(function(element) {
        total+=element; 
    }, this);
    return total;
}

function recursive(Kgroups,lastGroup,Aitems,currentMinimalSum, depth)
{
    if(Aitems.length === 0)
    {
        var partialLargeSum=calcLargeSum(Kgroups);
        //console.log(tabulatorHelper(depth) + 'larger sum: '+ partialLargeSum ); 

        if(currentMinimalSum.minimalLargeSum >partialLargeSum ){
            currentMinimalSum.minimalLargeSum = partialLargeSum;
            //console.log(tabulatorHelper(depth) + 'new larger sum!!!: '+ currentMinimalSum.minimalLargeSum );
        } 
        
    }else{
        var AitemsLesser = Aitems.slice(1);
        var elem = Aitems.slice(0,1);
        var partialLargeSum = calcLargeSum(Kgroups);
        var puntosPendientes = sum(AitemsLesser);
        for( var i=lastGroup; i< Kgroups.length; i++)
        {
            //console.log( tabulatorHelper(depth) + groupsHelper(Kgroups) + ' e: '+ elem[0] );
           // if(partialLargeSum +puntosPendientes  < currentMinimalSum.minimalLargeSum  )
                {
                Kgroups[i] = Kgroups[i].concat(elem);
                //var largeSum = calcLargeSum(Kgroups);
                //if( largeSum + elem[0] < currentMinimalSum.minimalLargeSum )
                //    {
                    //console.log( tabulatorHelper(depth) + groupsHelper(Kgroups) );    
                    currentMinimalSum= recursive(Kgroups, i , AitemsLesser ,currentMinimalSum, depth+1);           
                    //}
                Kgroups[i] = Kgroups[i].slice(0,Kgroups[i].length-1); 
                }
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
    console.log('starting');
    var sumFinal= { 
        minimalLargeSum: Number.MAX_VALUE 
    };
    var groups = setUpGroups(K);
    recursive(groups,0,A, sumFinal,0 );
    return sumFinal.minimalLargeSum;
}

//solution(4,3,[1,2,3,1]);
//solution(3,5,[2,1,5,1,2,2,2]);
//solution(25000,10000,[0]);

module.exports = {
    MinMax:solution
}