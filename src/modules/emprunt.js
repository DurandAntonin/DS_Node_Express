function calculEmprunt(capital, taux, temps){
    temps *= 12;
    taux /= 100;
    let c1 = capital * (taux/12);
    let mensualite = c1/ (1 - (1 / Math.pow(1 + (taux/12),temps)) )
    //console.log("mensual", mensualite);

    return mensualite
}

module.exports = calculEmprunt