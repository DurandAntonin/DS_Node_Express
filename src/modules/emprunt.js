function calculEmprunt(capital, taux, temps){
    temps *= 12

    let taux_mensuel = Math.pow((1 + taux/100),1/12) - 1;
    //console.log("Taux mensuel: ", taux_mensuel);

    let c1 = capital * taux_mensuel * Math.pow(1+taux_mensuel,temps);
    let c2 = c1 / (Math.pow(1+taux_mensuel, temps) - 1);
    //console.log("Montant mensualite: ",c2);

    let interet = c2*temps - capital;
    //console.log("intere: ", interet);

    let mensualite = [capital * (taux/12)]/[1 - (1 + (taux/12) - (12 * temps))]
    //console.log("mensual", mensualite);

    return mensualite
}

module.exports = calculEmprunt