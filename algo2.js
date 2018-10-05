 
//Corriger la fonction minMax()
//La fonction récupère un tableau de nombres positifs, négatifs ou nuls
//Et retourne un tableau à 2 entrées contenant la valeur minimale
//et la valeur maximale du tableau récupéré en entrée
//
// Exemple 1 :
const test = [4, 6, 35, -65, -9, 0, 67]
// Résultat : [-65, 67]
// 
// Exemple 2 :
// Tableau d'entrée : [-30, 5, 43, 108, -5, -7, 89]
// Résultat : [-30, 108]
// 
// Exemple 3 :
// Tableau d'entrée : [56, 7, 63, 9, 7, 12, 85]
// Résultat : [7, 85]
function minMax(array){
  leMin=Number.POSITIVE_INFINITY;
  leMax=Number.NEGATIVE_INFINITY;
  for (i=0; i<test.length; i++)
    if (leMin>test[i]){
      leMin=test[i];
    }
    else if (leMax<test[i]){
      leMax=test[i];
    }
    console.log("Dans le tableau [" + test + "] le minimum est " + leMin + " et le maximum " + leMax)
}

minMax(test)