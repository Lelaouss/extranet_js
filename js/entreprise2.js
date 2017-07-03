                // VARIABLES GLOBALES //

// Tableaux JS
var ent_arrayJS = new Array();
var ent_arrayJStoSplit = new Array();

// Compteur de lignes du tableau HTML
var ent_numLines = 0;

// Récupération des champs de saisies
var ent_t_social = document.getElementById("ent_t_social");
var ent_t_mail = document.getElementById("ent_t_mail");
var ent_t_phone = document.getElementById("ent_t_phone");
var ent_t_fax = document.getElementById("ent_t_fax");
var ent_t_adress = document.getElementById("ent_t_adress");
var ent_t_adressCompl1 = document.getElementById("ent_t_adressCompl1");
var ent_t_adressCompl2 = document.getElementById("ent_t_adressCompl2");
var ent_t_adressCP = document.getElementById("ent_t_adressCP");
var ent_t_adressCity = document.getElementById("ent_t_adressCity");
var ent_t_activity = document.getElementById("ent_t_activity");
var ent_t_activityDetail = document.getElementById("ent_t_activityDetail");
var ent_t_represName = document.getElementById("ent_t_represName");
var ent_t_represPrenom = document.getElementById("ent_t_represPrenom");
var ent_t_represMail = document.getElementById("ent_t_represMail");
var ent_t_represTel = document.getElementById("ent_t_represTel");
var ent_t_tutorName = document.getElementById("ent_t_tutorName");
var ent_t_tutorPrenom = document.getElementById("ent_t_tutorPrenom");
var ent_t_tutorMail = document.getElementById("ent_t_tutorMail");
var ent_t_tutorTel = document.getElementById("ent_t_tutorTel");

// Récupération des champs de recherche
var ent_t_searchName = document.getElementById("ent_t_searchName");
var ent_t_searchActivity = document.getElementById("ent_t_searchActivity");
var ent_t_searchRepre = document.getElementById("ent_t_searchRepre");

// Récupération du tbody HTML
var ent_tbody = document.getElementById("ent_tbody");




                    // FONCTIONS //

// fonction d'ajout de ligne dans les tableaux JS
function ent_addLine() {
    // création du nouveau tableau JS splité pour création du board HTML
    var ent_arraySplitted = new Array();

    // remplissage du tableau JS globale si la raison sociale de l'entreprise est au minimum renseignée
    if (ent_t_social.value != "") {
        ent_arrayJS[ent_numLines] = ent_t_social.value+"§"+ent_t_mail.value+"§"+ent_t_phone.value+"§"+ent_t_fax.value+"§"+ent_t_adress.value+"§"+ent_t_adressCompl2.value+"§"+ent_t_adressCompl1.value+"§"+ent_t_adressCP.value+"§"+ent_t_adressCity.value+"§"+ent_t_activity.value+"§"+ent_t_activityDetail.value+"§"+ent_t_represName.value+"§"+ent_t_represPrenom.value+"§"+ent_t_represMail.value+"§"+ent_t_represTel.value+"§"+ent_t_tutorName.value+"§"+ent_t_tutorPrenom.value+"§"+ent_t_tutorMail.value+"§"+ent_t_tutorTel.value;
        // on parcours le tableau JS des infos à afficher en HTML: on split par les "§"
        ent_arrayJStoSplit[ent_numLines] = ent_t_social.value+"§"+ent_t_adressCity.value+"§"+ent_t_mail.value+"§"+ent_t_phone.value+"§"+ent_t_fax.value+"§"+ent_t_represName.value+"§"+ent_t_activity.value+"§"+ent_t_activityDetail.value;
    // sinon on affiche un message d'alerte et on stop la fonction
    } else {
        alert("Veuillez renseigner au moins le nom de l'entreprise...");
        return;
    }
    // on vide le tableau HTML
    ent_clearHTMLBoard();
    // on le reconstruit à partir du tableau JS
    ent_buildHTMLBoard();
}


// fonction qui vide tous les champs du formulaire
function ent_raz() {
    // on vide les champs du formulaire
    ent_t_social.value = ent_t_mail.value = ent_t_phone.value = ent_t_fax.value = ent_t_adress.value = ent_t_adressCompl2.value = ent_t_adressCompl1.value = ent_t_adressCP.value = ent_t_adressCity.value = ent_t_activity.value = ent_t_activityDetail.value = ent_t_represName.value = ent_t_represPrenom.value = ent_t_represMail.value = ent_t_represTel.value = ent_t_tutorName.value = ent_t_tutorPrenom.value = ent_t_tutorMail.value = ent_t_tutorTel.value = "";
}


// fonction qui vide les champs de recherche
function ent_searchRaz() {
    // on vide les champs de recherche
    ent_t_searchName.value = ent_t_searchActivity.value = ent_t_searchRepre.value = "";
}


// fonction de récupération des informations de la ligne cliquée
function ent_recupLine(iSelectedLine) {
    // création d'un tableau splité de la ligne cliquée
    var ent_arraySplittedSelected = ent_arrayJS[iSelectedLine].split("§");

    // remplissage des champs à partir des valeurs du tableau JS
    ent_t_social.value = ent_arraySplittedSelected[0];
    ent_t_mail.value = ent_arraySplittedSelected[1];
    ent_t_phone.value = ent_arraySplittedSelected[2];
    ent_t_fax.value = ent_arraySplittedSelected[3];
    ent_t_adress.value = ent_arraySplittedSelected[4];
    ent_t_adressCompl2.value = ent_arraySplittedSelected[5];
    ent_t_adressCompl1.value = ent_arraySplittedSelected[6];
    ent_t_adressCP.value = ent_arraySplittedSelected[7];
    ent_t_adressCity.value = ent_arraySplittedSelected[8];
    ent_t_activity.value = ent_arraySplittedSelected[9];
    ent_t_activityDetail.value = ent_arraySplittedSelected[10];
    ent_t_represName.value = ent_arraySplittedSelected[11];
    ent_t_represPrenom.value = ent_arraySplittedSelected[12];
    ent_t_represMail.value = ent_arraySplittedSelected[13];
    ent_t_represTel.value = ent_arraySplittedSelected[14];
    ent_t_tutorName.value = ent_arraySplittedSelected[15];
    ent_t_tutorPrenom.value = ent_arraySplittedSelected[16];
    ent_t_tutorMail.value = ent_arraySplittedSelected[17];
    ent_t_tutorTel.value = ent_arraySplittedSelected[18];
}


// fonction qui vide le tableau HTML
function ent_clearHTMLBoard() {
    // on supprime tous les éléments enfants du tbody
    while (ent_tbody.firstChild) {
        ent_tbody.removeChild(ent_tbody.firstChild);
    }
    // remise à zéro du compteur de lignes des tableaux
    ent_numLines = 0;
}


// fonction qui construit le tableau HTML à partir des tableaux JS
function ent_buildHTMLBoard() {
    // variables locales
    var i, j, ent_iBuild, ent_lineBuild, ent_celBuild, ent_emptyLine, ent_emptyCel, ent_celPicto;

    // tableau
    var ent_arrayToBuild = new Array();

    // si il existe moins de 6 entreprises
    if (ent_arrayJS.length < 6) {
        // on reconstruit les lignes vides pour completer à 6 lignes au total
        for (i=0; i<(6-ent_arrayJS.length); i++) {
            // création ligne HTML
            ent_emptyLine = document.createElement("tr");
            ent_tbody.appendChild(ent_emptyLine);

            // création et ajout des cellules vides
            for(j=0; j<9; j++) {
                ent_emptyCel = document.createElement("td");
                ent_emptyLine.appendChild(ent_emptyCel);
            }
        }
        // on reconstruit chaque ligne en HTML en parcourant le tableau JS
        for (ent_iBuild=0; ent_iBuild<ent_arrayJS.length; ent_iBuild++) {
            // on découpe le tableau JS
            ent_arrayToBuild = ent_arrayJStoSplit[ent_iBuild].split("§");

            // création de la ligne HTML
            ent_lineBuild = document.createElement("tr");
            ent_tbody.prepend(ent_lineBuild);
            // ajout d'ID sur chaque ligne
            ent_lineBuild.setAttribute("id", "ent_line"+ent_iBuild);
            // ajout d'une classe pour affichage des icones sur les lignes
            ent_lineBuild.setAttribute("class", "ent_line");

            // on parcours le nouveau tableau splité pour remplir notre tableau HTML
            for (i=0; i<ent_arrayToBuild.length; i++) {
                // création des cellules
                ent_celBuild = document.createElement("td");
                // ajout de la détection de click sur chaque cellule
                ent_celBuild.setAttribute("onclick", "ent_recupLine(" + ent_iBuild + ")");
                ent_lineBuild.appendChild(ent_celBuild);

                // remplissage des cellules avec le JS
                ent_celBuild.textContent = ent_arrayToBuild[i];
            }
            // création de la cellule pour les pictos
            ent_celPicto = document.createElement("td");
            // insertion des pictos pour supprimer et modifier une ligne
            ent_celPicto.innerHTML = "<img src='../local/img/ent_modify.png' alt='Modify' onclick='ent_modifyLine(" + ent_iBuild + ")' class='ent_pictoModify' />";
            ent_celPicto.innerHTML += "<img src='../local/img/ent_trash.png' alt='Delete' onclick='ent_delLine(" + ent_iBuild + ")' class='ent_pictoDelete' />";
            ent_lineBuild.appendChild(ent_celPicto);
            // incrémentation du compteur des IDs et lignes
            ent_numLines++;
        }
    // si il existe plus de 6 entreprises
    } else {
        // on reconstruit chaque ligne en HTML en parcourant le tableau JS
        for (ent_iBuild=0; ent_iBuild<ent_arrayJS.length; ent_iBuild++) {
            // on découpe le tableau JS
            ent_arrayToBuild = ent_arrayJStoSplit[ent_iBuild].split("§");

            // création de la ligne HTML
            ent_lineBuild = document.createElement("tr");
            ent_tbody.prepend(ent_lineBuild);
            // ajout d'ID sur chaque ligne
            ent_lineBuild.setAttribute("id", "ent_line"+ent_iBuild);

            // on parcours le nouveau tableau splité pour remplir notre tableau HTML
            for (i=0; i<ent_arrayToBuild.length; i++) {
                // création des cellules
                ent_celBuild = document.createElement("td");
                // ajout de la détection de click sur chaque cellule
                ent_celBuild.setAttribute("onclick", "ent_recupLine(" + ent_iBuild + ")");
                ent_lineBuild.appendChild(ent_celBuild);

                // remplissage des cellules avec le tableau JS
                ent_celBuild.textContent = ent_arrayToBuild[i];
            }
            // création de la cellule pour les pictos
            ent_celPicto = document.createElement("td");
            // insertion des pictos pour supprimer et modifier une ligne
            ent_celPicto.innerHTML = "<img src='../local/img/ent_modify.png' alt='Modify' onclick='ent_modifyLine(" + ent_iBuild + ")' class='ent_pictoModify' />";
            ent_celPicto.innerHTML += "<img src='../local/img/ent_trash.png' alt='Delete' onclick='ent_delLine(" + ent_iBuild + ")' class='ent_pictoDelete' />";
            ent_lineBuild.appendChild(ent_celPicto);
            // incrémentation du compteur des IDs et lignes
            ent_numLines++;
        }
    }
    // remise à zéro des champs
    ent_raz();
}


// fonction qui permet de supprimer une ligne
function ent_delLine(iSelectedLine) {
    // variables
    var ent_delConfirm;

    // on demande la confirmation pour la suppression de la ligne
    ent_delConfirm = confirm("Êtes-vous sûr de vouloir supprimer cette ligne ?");

    // si l'utilisateur confirme la suppression
    if (ent_delConfirm) {
        // suppression de la ligne concernée dans les tableaux JS
        ent_arrayJS.splice(iSelectedLine, 1);
        ent_arrayJStoSplit.splice(iSelectedLine, 1);

        // on vide le tableau HTML
        ent_clearHTMLBoard();
        // on reconstruit le tableau HTML sans la ligne supprimée
        ent_buildHTMLBoard();
    // sinon fin de la fonction
    } else {
        return;
    }
}


// fonction qui permet de modifier une ligne
function ent_modifyLine(iSelectedLine) {
    
}