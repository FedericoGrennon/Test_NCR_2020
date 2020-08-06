const CheckLongPlank = (idxPlank, startPlank, endPlank) => idxPlank < startPlank.length 
                                                            && idxPlank < endPlank.length;

const CheckNails = (startPlank, endPlank, nails, idxNail, idxPlank) => startPlank[idxPlank] <= nails[idxNail] 
                                                                && nails[idxNail] <= endPlank[idxPlank];

const VerifyNails = (startPlank, endPlank, longPlank, nails, longNails) => {
    let minimumNails = 0;
    let nailedArray = [];

    for(let idxNail = 0; idxNail < longNails; idxNail++) {
        let nailed = false;

        for(let idxPlank = 0; idxPlank < longPlank; idxPlank++) {
            if(CheckLongPlank(idxPlank, startPlank, endPlank)) {
                if(CheckNails(startPlank, endPlank, nails, idxNail, idxPlank)) {
                    //Se verifica si la combinacion ya ha sido clavada
                    if(!nailedArray.some(x => x[0] === startPlank[idxPlank] && x[1] === endPlank[idxPlank]))
                        nailedArray.push([startPlank[idxPlank], endPlank[idxPlank]]);
                    
                    nailed = true;
                }
            }
        }
        
        minimumNails++;
    
        //Se que se clavo al menos un tablon
        if(!nailed){
            nailedArray = [];
            minimumNails = 0;
        }
    
        //Se valida que ya se han clavado todos los tablones
        if(nailedArray.length === longPlank)
            return minimumNails;
        else if (idxNail === longNails - 1)
            return -1;
    }
}

const btnStart = document.getElementById('btnStart');
btnStart.addEventListener('click', () => {
    const txtStart = document.getElementById('txtStart');
    const txtEnd = document.getElementById('txtEnd');
    const txtNails = document.getElementById('txtNails');
    const txtLongNails = document.getElementById('txtLongNails');
    const txtLongPlanks = document.getElementById('txtLongPlanks');

    const START = txtStart.value.split(',').map(x => parseInt(x));
    const END = txtEnd.value.split(',').map(x => parseInt(x));
    const NAILS = txtNails.value.split(',').map(x => parseInt(x));
    const LONG_NAILS = parseInt(txtLongNails.value);
    const LONG_PLANK = parseInt(txtLongPlanks.value);

    const minimumNails = VerifyNails(START, END, LONG_PLANK, NAILS, LONG_NAILS);
    alert(minimumNails === -1 ? 'No se puede clavar todos los tablones.' : `Se necesitan ${minimumNails} clavos mínimamente para clavar todos los tablones.`);
});

/*
    El ejercicio fue resuelto entendiendo que los calvos que se utilizan son secuenciales.
    Es decir si el segundo clavo no clava ninguno rompe la secuencia y empieza a contar del tercero.
*/