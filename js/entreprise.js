/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// VARIABLES GLOBALES //////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

// Tableaux JS
var ent_arrayJS = new Array();
var ent_arrayJSToSplit = new Array();

// Les activités et tuteurs de l'entreprise
var ent_company = new Array();

// Compteur de lignes du tableau HTML
var ent_numLines = 0;
// Compteur de lignes cliquées sur le tableau HTML
var ent_nbClickedLines = 0;
// Stockage de l'indice de la ligne sélectionnée
var ent_selectedLine, ent_indice;

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
var ent_t_adressCountry = document.getElementById("ent_t_country");
var ent_t_represName = document.getElementById("ent_t_repres");
var ent_t_activityDetail = document.getElementById("ent_t_activityDetail");
var ent_t_tutorName = document.getElementById("ent_t_tutor");

// Récupération des champs de recherche
var ent_t_searchName = document.getElementById("ent_t_searchName");
var ent_t_searchRepre = document.getElementById("ent_t_searchRepre");
var ent_t_searchActivity = document.getElementById("ent_t_searchActivity");

// Récupération du tbody HTML
var ent_tbody = document.getElementById("ent_tbody");
// Récupération de la div d'affichage d'indications pour l'utilisateur
var ent_indications = document.getElementById("ent_indications");

// Stockage de l'activité en cours de sélection
var ent_oldSelectedBlockActivity;
// Stockage de l'indice de l'activité en cours de sélection
var ent_activitySelected;

// Stockage des tuteurs de l'activité en cours de sélection
var ent_tutorsSelected;

// Stockage de l'activité principale
var ent_oldMainActivity;



/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////// FONCTIONS ////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


// fonction d'ajout de ligne dans les tableaux JS
function ent_addLine() {
    // variables
    var i;
    var ent_activities = "";
    // création du nouveau tableau JS splité pour création du board HTML
    var ent_arraySplitted = new Array();

    // récupération de l'index de l'activité principale
    if (ent_oldMainActivity != undefined) {
        var ent_mainActivityIndex = ent_oldMainActivity.id.substr(16)-1;
    }

    // remplissage du tableau JS globale si la raison sociale de l'entreprise est au minimum renseignée avec une activité au moins
    // cas quand aucune recherche n'est en cours (filtres désactivés)
    if ((ent_t_social.value != "") && (ent_company != "") && (ent_t_searchName.value == "") && (ent_t_searchRepre.value == "") && (ent_t_searchActivity.value == "")) {
        for (i=0; i<ent_company.length; i++) {
            ent_activities += ent_company[i]+"|";
        }
        ent_activities = ent_activities.substr(0, ent_activities.length-1);

        ent_arrayJS[ent_numLines] = ent_t_social.value+"§"+ent_t_mail.value+"§"+ent_t_phone.value+"§"+ent_t_fax.value+"§"+ent_t_adress.value+"§"+ent_t_adressCompl2.value+"§"+ent_t_adressCompl1.value+"§"+ent_t_adressCP.value+"§"+ent_t_adressCity.value+"§"+ent_t_adressCountry.value+"§"+ent_t_represName.value+"§"+ent_activities;
        // on parcours le tableau JS des infos à afficher en HTML: on split par les "§"
        ent_arrayJSToSplit[ent_numLines] = ent_t_social.value+"§"+ent_t_adressCity.value+"§"+ent_t_mail.value+"§"+ent_t_phone.value+"§"+ent_t_fax.value+"§"+ent_t_represName.value+"§"+ent_company[ent_mainActivityIndex][0][0]+"§"+ent_company[ent_mainActivityIndex][0][1];
    // cas quand les filtres sont activés
    } else if ((ent_t_social.value != "") && (ent_company != "")) {
        for (i=0; i<ent_company.length; i++) {
            ent_activities += ent_company[i]+"|";
        }
        ent_activities = ent_activities.substr(0, ent_activities.length-1);

        ent_arrayJS[ent_arrayJS.length] = ent_t_social.value+"§"+ent_t_mail.value+"§"+ent_t_phone.value+"§"+ent_t_fax.value+"§"+ent_t_adress.value+"§"+ent_t_adressCompl2.value+"§"+ent_t_adressCompl1.value+"§"+ent_t_adressCP.value+"§"+ent_t_adressCity.value+"§"+ent_t_adressCountry.value+"§"+ent_t_represName.value+"§"+ent_activities;
        // on parcours le tableau JS des infos à afficher en HTML: on split par les "§"
        ent_arrayJSToSplit[ent_numLines] = ent_t_social.value+"§"+ent_t_adressCity.value+"§"+ent_t_mail.value+"§"+ent_t_phone.value+"§"+ent_t_fax.value+"§"+ent_t_represName.value+"§"+ent_company[ent_mainActivityIndex][0][0]+"§"+ent_company[ent_mainActivityIndex][0][1];
    // sinon on affiche un message d'alerte et on stop la fonction
    } else {
        alert("Veuillez renseigner un nom d'entreprise et lui attribuer au moins un secteur d'activité");
        return;
    }
    // on vide le tableau HTML
    ent_clearHTMLBoard();
    // on le reconstruit à partir du tableau JS
    ent_buildHTMLBoard(ent_arrayJSToSplit);
    // on vide les champs de recherche
    ent_searchRaz();
    // on vide la vue HTML des activités et son tableau JS
    ent_clearActivities();
    ent_company = [];
}


// fonction qui vide tous les champs du formulaire
function ent_raz() {
    // on vide les champs du formulaire
    ent_t_social.value = ent_t_mail.value = ent_t_phone.value = ent_t_fax.value = ent_t_adress.value = ent_t_adressCompl2.value = ent_t_adressCompl1.value = ent_t_adressCP.value = ent_t_adressCity.value = ent_t_adressCountry.value = ent_t_activity.value = ent_t_activityDetail.value = ent_t_represName.value = ent_t_tutorName.value = "";
}


// fonction qui vide les champs de recherche
function ent_searchRaz() {
    // on vide les champs de recherche
    ent_t_searchName.value = ent_t_searchRepre.value = ent_t_searchActivity.value = "";
    // indication à l'utilisateur sur l'entreprise en cours d'édition
    ent_indications.textContent = "Aucune entreprise en cours d'édition.";
}


// fonction de récupération des informations de la ligne cliquée
function ent_recupLine(iSelectedLine) {
    // variables
    var i, ent_clickedLine, ent_arrayTemp;

    // récupération des éléments la ligne cliquée
    var ent_childClicked = document.getElementById("ent_line"+iSelectedLine).children;

    // on cherche dans le tableau JS les correspondance avec la raison sociale de ligne cliquée
    for (i=0; i<ent_arrayJS.length; i++) {
        // on stocke à chaque tour chaque élément de chaque ligne dans un tableau temporaire
        ent_arrayTemp = ent_arrayJSToSplit[i].split("§");
        // quand le nom dans le la ligne HTML cliquée correspond à un nom présent dans le tableau JS
        if ((ent_childClicked[0].textContent == ent_arrayTemp[0]) && (ent_childClicked[2].textContent == ent_arrayTemp[2])) {
            // on conserve l'indice de la ligne
            ent_indice = i;
        }   
    }

    // création d'un tableau splité de la ligne cliquée
    var ent_arraySplittedSelected = ent_arrayJS[ent_indice].split("§");

    // remplissage des champs à partir des valeurs du tableau JS de la ligne cliquée
    ent_t_social.value = ent_arraySplittedSelected[0];
    ent_t_mail.value = ent_arraySplittedSelected[1];
    ent_t_phone.value = ent_arraySplittedSelected[2];
    ent_t_fax.value = ent_arraySplittedSelected[3];
    ent_t_adress.value = ent_arraySplittedSelected[4];
    ent_t_adressCompl2.value = ent_arraySplittedSelected[5];
    ent_t_adressCompl1.value = ent_arraySplittedSelected[6];
    ent_t_adressCP.value = ent_arraySplittedSelected[7];
    ent_t_adressCity.value = ent_arraySplittedSelected[8];
    ent_t_adressCountry.value = ent_arraySplittedSelected[9];
    ent_t_represName.value = ent_arraySplittedSelected[10];

    // reformation du tableau des activités et tuteurs de l'entreprise
    ent_company = ent_arraySplittedSelected[11].split("|");
    for (i=0; i<ent_company.length; i++) {
        ent_company[i] = [ent_company[i].split(",")];
    }
    // for (i=0; i<ent_company[i]; i++) {
    //
    // }
    // console.log("ent_company => "+ ent_company);

    // on génère la vue HTML des activités et tuteurs de l'entreprise
    ent_clearActivities();
    ent_buildActivities();

    // mise en évidence la ligne sélectionnée
    // récupération de la ligne cliquée sur le tableau HTML
    ent_clickedLine = document.getElementById("ent_line"+iSelectedLine);

    // si aucune autre ligne n'est déjà sélectionnée
    if (ent_nbClickedLines == 0) {
        // ajout de la classe à la ligne
        ent_clickedLine.classList.toggle("ent_selected");
        // on stock l'indice de la ligne cliquée
        ent_selectedLine = iSelectedLine;
        // incrémentation du compteur de lignes sélectionnées
        ent_nbClickedLines++;
        // affichage du bouton modifier
        document.getElementById("ent_modifier").classList.toggle("ent_hide");
        // masquage du bouton ajouter
        document.getElementById("ent_ajouter").classList.toggle("ent_hide");
        // indication à l'utilisateur sur l'entreprise en cours d'édition
        ent_indications.innerHTML = "Vous éditez l'entreprise: <span id=\"ent_socialName\">"+ent_t_social.value+"</span>";
    // si une ligne a déjà été sélectionnée et qu'elle est différente de celle qui est déjà séléctionnée
    } else if ((ent_nbClickedLines == 1) && (ent_selectedLine != iSelectedLine)) {
        // on enleve la classe selected à la ligne déjà sélectionnée
        document.getElementById("ent_line"+ent_selectedLine).classList.remove("ent_selected");
        // ajout de la classe à la nouvelle ligne sélectionnée
        ent_clickedLine.classList.toggle("ent_selected");
        // on stock l'indice de la nouvelle ligne sélectionnée
        ent_selectedLine = iSelectedLine;
        // indication à l'utilisateur sur l'entreprise en cours d'édition
        ent_indications.innerHTML = "Vous éditez l'entreprise: <span id=\"ent_socialName\">"+ent_t_social.value+"</span>";
    // sinon si la ligne sélectionnée est la même que la selection en cours
    } else if ((ent_nbClickedLines == 1) && (ent_selectedLine == iSelectedLine)) {
        // on enlève la classe
        ent_clickedLine.classList.toggle("ent_selected");
        // masquage du bouton modifier
        document.getElementById("ent_modifier").classList.toggle("ent_hide");
        // affichage du bouton ajouter
        document.getElementById("ent_ajouter").classList.toggle("ent_hide");
        // indication à l'utilisateur sur l'entreprise en cours d'édition
        ent_indications.textContent = "Aucune entreprise en cours d'édition.";
        // réinitialisation du nombres de lignes sélectionnées
        ent_nbClickedLines = 0;
        // on vide la vue HTML des activités
        ent_clearActivities();
        ent_company = [];
    }
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
function ent_buildHTMLBoard(tableau) {
    // variables locales
    var i, j, ent_iBuild, ent_lineBuild, ent_celBuild, ent_emptyLine, ent_emptyCel, ent_celPicto;

    // tableau
    var ent_arrayToBuild = new Array();

    // si il existe moins de 6 entreprises
    if (tableau.length < 6) {
        // on reconstruit les lignes vides pour completer à 6 lignes au total
        for (i=0; i<(6-tableau.length); i++) {
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
        for (ent_iBuild=0; ent_iBuild<tableau.length; ent_iBuild++) {
            // on découpe le tableau JS
            ent_arrayToBuild = tableau[ent_iBuild].split("§");

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
                ent_celBuild.setAttribute("class", "ent_cels");
                ent_lineBuild.appendChild(ent_celBuild);

                // remplissage des cellules avec le JS
                ent_celBuild.textContent = ent_arrayToBuild[i];
            }
            // création de la cellule pour les pictos
            ent_celPicto = document.createElement("td");
            // insertion du picto pour supprimer une ligne
            ent_celPicto.innerHTML += "<img src='img/ent_trash.png' alt='Delete' onclick='ent_delLine()' class='ent_pictoDelete' />";
            ent_lineBuild.appendChild(ent_celPicto);
            // incrémentation du compteur des IDs et lignes
            ent_numLines++;
        }
    // si il existe plus de 6 entreprises
    } else {
        // on reconstruit chaque ligne en HTML en parcourant le tableau JS
        for (ent_iBuild=0; ent_iBuild<tableau.length; ent_iBuild++) {
            // on découpe le tableau JS
            ent_arrayToBuild = tableau[ent_iBuild].split("§");

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
                ent_celBuild.setAttribute("class", "ent_cels");
                ent_lineBuild.appendChild(ent_celBuild);

                // remplissage des cellules avec le tableau JS
                ent_celBuild.textContent = ent_arrayToBuild[i];
            }
            // création de la cellule pour les pictos
            ent_celPicto = document.createElement("td");
            // insertion du picto pour supprimer une ligne
            ent_celPicto.innerHTML += "<img src='img/ent_trash.png' alt='Delete' onclick='ent_delLine()' class='ent_pictoDelete' />";
            ent_lineBuild.appendChild(ent_celPicto);
            // incrémentation du compteur des IDs et lignes
            ent_numLines++;
        }
    }
    // on réinitialise le nombre de lignes sélectionnées
    ent_nbClickedLines = 0;
    // masquage du bouton modifier
    document.getElementById("ent_modifier").classList.add("ent_hide");
    // affichage du bouton ajouter
    document.getElementById("ent_ajouter").classList.remove("ent_hide");
    // remise à zéro des champs
    ent_raz();
}


// fonction qui permet de supprimer une ligne
function ent_delLine() {
    // variables
    var ent_delConfirm;

    // on demande la confirmation pour la suppression de la ligne
    ent_delConfirm = confirm("Êtes-vous sûr de vouloir supprimer cette ligne ?");

    // si l'utilisateur confirme la suppression
    if (ent_delConfirm) {
        // suppression de la ligne concernée dans les tableaux JS
        ent_arrayJS.splice(ent_indice, 1);
        ent_arrayJSToSplit.splice(ent_indice, 1);

        // on vide le tableau HTML
        ent_clearHTMLBoard();
        // on reconstruit le tableau HTML sans la ligne supprimée
        ent_buildHTMLBoard(ent_arrayJSToSplit);
        // si on a une recherche en cours on la relance
        ent_search();
        // nettoyage de la zone d'indication d'édition
        ent_indications.textContent = "Aucune entreprise en cours d'édition.";
        // on vide la vue HTML des activités et tuteurs
        ent_clearActivities();
        ent_company = [];
        // sinon fin de la fonction
    } else {
        return;
    }
}


// fonction qui permet de modifier une ligne
function ent_modifyLine() {
    // variables
    var ent_modifyConfirm;
    var ent_activities = "";

    // on demande la confirmation de la modification de la ligne en la remplaçant par ce qu'il y a dans les champs de remplissage
    ent_modifyConfirm = confirm("Êtes-vous sûr de vouloir modifier cette ligne en la remplaçant par les valeurs actuelles ?");

    // si la modification est confirmée
    if (ent_modifyConfirm) {
        // si le nom de l'entreprise et son secteur d'activité sont au moins renseignés
        if ((ent_t_social.value != "") && (ent_company != "")) {
            for (i=0; i<ent_company.length; i++) {
                ent_activities += ent_company[i]+"|";
            }
            ent_activities = ent_activities.substr(0, ent_activities.length-1);

            // on change les valeurs de la ligne à modifier dans les tableaux JS par celles présentes dans les champs de remplissage
            ent_arrayJS[ent_indice] = ent_t_social.value+"§"+ent_t_mail.value+"§"+ent_t_phone.value+"§"+ent_t_fax.value+"§"+ent_t_adress.value+"§"+ent_t_adressCompl2.value+"§"+ent_t_adressCompl1.value+"§"+ent_t_adressCP.value+"§"+ent_t_adressCity.value+"§"+ent_t_adressCountry.value+"§"+ent_t_represName.value+"§"+ent_activities;
            ent_arrayJSToSplit[ent_indice] = ent_t_social.value+"§"+ent_t_adressCity.value+"§"+ent_t_mail.value+"§"+ent_t_phone.value+"§"+ent_t_fax.value+"§"+ent_t_represName.value+"§"+ent_company[ent_mainActivityIndex][0][0]+"§"+ent_company[ent_mainActivityIndex][0][1];

        // sinon on averti l'utilisateur de renseigner au moins le nom de l'entreprise
        } else {
            alert("Veuillez renseigner un nom d'entreprise");
            return;
        }
        // on vide le tableau HTML
        ent_clearHTMLBoard();
        // on reconstruit le tableau HTML sans la ligne supprimée
        ent_buildHTMLBoard(ent_arrayJSToSplit);
        // si on a une recherche en cours on la relance
        ent_search();
        // nettoyage de la zone d'indication d'édition
        ent_indications.textContent = "Aucune entreprise en cours d'édition.";
        // on vide la vue HTML des activités
        ent_clearActivities();
        ent_company = [];
        // si la modification est annulée on arrête la fonction
    } else {
        return;
    }
}


// fonction qui permet le retour en mode ajout d'entreprise
function ent_reinitialize() {
    // nettoyage de la zone d'indication d'édition
    ent_indications.textContent = "Aucune entreprise en cours d'édition.";
    // nettoyage du tableau HTML
    ent_clearHTMLBoard();
    // vidage des champs de recherche
    ent_searchRaz();
    // reconstruction du tableau HTML
    ent_buildHTMLBoard(ent_arrayJSToSplit);
}


// fonction de recherche dans le tableau HTML
function ent_search() {
    // variables
    var i, ent_listRepresFound, ent_listActivityFound;
    // tableaux de filtrage
    var ent_arrayTemp = new Array();
    var ent_arrayFinal = new Array();
    var ent_arrayNameFound = new Array();
    var ent_arrayRepresFound = new Array();
    var ent_arrayActivityFound = new Array();

    // on boucle sur le tableau d'affichage JS
    for (i=0; i<ent_arrayJSToSplit.length; i++) {
        // on stocke à chaque tour chaque élément de chaque ligne dans un tableau temporaire
        ent_arrayTemp = ent_arrayJSToSplit[i].toLowerCase().split("§");
        // si la recherche de nom d'entreprise est remplie et qu'elle a une correspondance avec un des éléments "Raison Sociale" du tableau temporaire OU si la recherche raison sociale est vide
        if (((ent_t_searchName.value != "") && (ent_arrayTemp[0].indexOf(ent_t_searchName.value.toLowerCase()) != -1)) || (ent_t_searchName.value == "")) {
            // on stocke l'indice des éléments correspondants dans le tableau des correspondances de noms
            ent_arrayNameFound.push(i);
        }
        // si la recherche de représentants d'entreprise est remplie et qu'elle a une correspondance avec un des éléments "Nom du représentant" du tableau temporaire OU si la recherche de représentant est vide
        if (((ent_t_searchRepre.value != "") && (ent_arrayTemp[5].indexOf(ent_t_searchRepre.value.toLowerCase()) != -1)) || (ent_t_searchRepre.value == "")) {
            // on stocke l'indice des éléments correspondants dans le tableau des correspondances de noms de représentants
            ent_arrayRepresFound.push(i);
        }
        // si la recherche d'activité est remplie et qu'elle a une correspondance avec un des éléments "Activités" du tableau temporaire OU si la recherche d'activités est vide
        if (((ent_t_searchActivity.value != "") && (ent_arrayTemp[6].indexOf(ent_t_searchActivity.value.toLowerCase()) != -1)) || (ent_t_searchActivity.value == "")) {
            // on stocke l'indice des éléments correspondants dans le tableau des correspondances des activités
            ent_arrayActivityFound.push(i);
        }
    }

    // on ajoute des "|" avant et après les indices pour ne pas avoir de soucis de correspondance entre chiffres et nombres
    ent_listRepresFound = "|" + ent_arrayRepresFound.join("|") + "|";
    ent_listActivityFound = "|" + ent_arrayActivityFound.join("|") + "|";

    // on boucle sur le tableau contenant les indices de correspondance de noms
    for (i=0; i<ent_arrayNameFound.length; i++) {
        // si il y a correspondance des indices des noms de représentants et correspondance des indices des activités avec les indices des raisons sociales
        if ((ent_listRepresFound.indexOf("|"+ent_arrayNameFound[i]+"|") != -1) && (ent_listActivityFound.indexOf("|"+ent_arrayNameFound[i]+"|") != -1)) {
            // on ajoute les entrées au tableau final de filtrage
            ent_arrayFinal.push(ent_arrayJSToSplit[ent_arrayNameFound[i]]);
        }
    }

    // nettoyage du tableau HTML
    ent_clearHTMLBoard();
    // reconstruction du tableau en appliquant le filtre
    ent_buildHTMLBoard(ent_arrayFinal);
}


// fonction qui permet l'affichage du bouton créer en fonction de la recherche tapée dans le datalist
function ent_displayButton(inputId, buttonAddId, dataId, buttonPlusId) {
    // variables
    var i;
    var iMyID = 0;
    var iNBContientTrue = 0;
    var inputId = "#"+inputId.id;
    var buttonAddId = "#"+buttonAddId.id;
    var dataId = "#"+dataId.id;
    var buttonPlusId = "#"+buttonPlusId.id;

    // récupération de la valeur du champ datalist
    var ent_inputValue = document.querySelector(inputId).value;
    // récupération du bouton permettant l'ajout que l'on souhaite faire apparaitre
    var ent_buttonAdd = document.querySelector(buttonAddId);
    // récupération des data-id des balises option
    var ent_dataList = document.querySelector(dataId);
    var ent_allOption = ent_dataList.querySelectorAll("option");
    // récupération du bouton plus
    var ent_buttonPlus = document.querySelector(buttonPlusId);

    // si mon champ de recherche n'est pas vide
    if (ent_inputValue != "") {
        // on boucle sur toutes les options existantes du datalist et on affiche le bouton en fonction du résultat
        for (i=0; i<ent_allOption.length; i++) {
            // si le nom entré dans le champ input est présent dans le datalist
            if (ent_allOption[i].value.toLowerCase().indexOf(ent_inputValue.toLowerCase()) != -1) {
                // on incrémente un compteur de résultat
                iNBContientTrue++;
            }
            // si le nom entré dans le champ input est égal à un résultat du datalist
            if (ent_allOption[i].value == ent_inputValue) {
                // on récupère le data-id de l'option
                iMyID = ent_allOption[i].attributes[1].value;
            }
        }

        // si le nom entré dans le champ input n'est au final pas présent dans le datalist
        if ((iNBContientTrue == 0) || (iMyID == 0)) {
            // on affiche le bouton permettant la création d'un nouvel élément
            ent_buttonAdd.classList.remove("ent_invisible");
            ent_buttonAdd.classList.add("ent_visible");
            // on cache le bouton "+" permettant l'ajout de l'élément à la liste
            ent_buttonPlus.classList.remove("ent_visible");
            ent_buttonPlus.classList.add("ent_invisible");
        } else {
            // sinon on le laisse caché
            ent_buttonAdd.classList.add("ent_invisible");
            // si le nom entré dans le champ input correspond bien à une des options du datalist
            if (iMyID != 0) {
                // on affiche le bouton "+" permettant l'ajout de l'élément à la liste
                ent_buttonPlus.classList.remove("ent_invisible");
                ent_buttonPlus.classList.add("ent_visible");
            }
        }
    } else {
        // sinon si il est vide on cache les boutons
        ent_buttonAdd.classList.remove("ent_visible");
        ent_buttonAdd.classList.add("ent_invisible");
        ent_buttonPlus.classList.remove("ent_visible");
        ent_buttonPlus.classList.add("ent_invisible");
    }
}


// fonction qui permet de créer une activité si elle n'est pas référencée dans la datalist
function ent_createActivity() {
    // variables
    var ent_activityFind = false;
    var i;
    // récupération de la datalist
    var ent_activityDatalist = document.querySelector("#ent_activity");
    // récupération de la valeur entrée dans le champ activité
    var ent_newActivityName = document.querySelector("#ent_t_activity").value;
    // recupération de toutes les options de la datalist
    var ent_dataOptions = ent_activityDatalist.querySelectorAll("option");
    // récupération du bouton permettant l'ajout dans la datalist
    var ent_buttonCreateActivity = document.querySelector("#ent_newActivity");
    // récupération du bouton permettant l'ajout dans la liste des activités ajoutées "+"
    var ent_buttonAddActivity = document.querySelector("#ent_addActivity");

    // on recherche si l'activité entrée dans le champ n'existe pas déjà dans la datalist
    for (i=0; i<ent_dataOptions.length; i++) {
        if (ent_dataOptions[i].value.toLowerCase() == ent_newActivityName.toLowerCase()) {
            ent_activityFind = true;
        }
    }

    // si le champ est renseigné et qu'il est différent d'une option possible
    if ((ent_newActivityName != "") && (!ent_activityFind)) {
        // ajout d'une activité supplémentaire
        var ent_newDataId = ent_dataOptions.length + 1;
        ent_activityDatalist.innerHTML += "<option value=" + ent_newActivityName + " data-id=" + ent_newDataId + ">";

        // on cache le bouton une fois l'ajout fait
        ent_buttonCreateActivity.classList.add("ent_invisible");
        // on affiche le bouton "+" une fois l'ajout fait
        ent_buttonAddActivity.classList.remove("ent_invisible");
        ent_buttonAddActivity.classList.add("ent_visible");
    }
}


// fonction qui permet de sélectionner l'activité dans laquelle on veut ajouter des tuteurs
function ent_selectActivity(blockActivity) {
    // variables
    var ent_blockActivityId = "#"+blockActivity.id

    // stockage de l'index de l'activité en cours de sélection
    ent_activitySelected = blockActivity.id;
    ent_activitySelected = ent_activitySelected.substr(9);
    ent_activitySelected = ent_activitySelected - 1;

    // récupération du block à sélectionner
    var ent_blockActivity = document.querySelector(ent_blockActivityId);

    // si le le block sur lequel on a cliqué ne détient pas la classe ent_selectedDynamicAdd
    if (!ent_blockActivity.classList.contains("ent_selectedDynamicAdd")) {
        // alors on lui ajoute
        ent_blockActivity.classList.add("ent_selectedDynamicAdd");
        // et on l'enlève à l'ancien block sélectionné
        ent_oldSelectedBlockActivity.classList.remove("ent_selectedDynamicAdd");
        ent_oldSelectedBlockActivity = ent_blockActivity;
        // on stock les tuteurs de l'activité en cours de sélection
        ent_tutorsSelected = ent_blockActivity.lastElementChild.children;
        // on affiche les détails de l'activité sélectionnée dans le champ "détails activités"
        // document.querySelector("#ent_t_activityDetail").value = ent_company[ent_activitySelected][0][1];
    }
}


// fonction qui permet de cocher l'activité principale de l'entreprise
function ent_selectMainActivity(blockMain) {
    // variables
    var ent_blockMainId = "#"+blockMain.id;
    var ent_oldBlockMainId;

    // récupération du block à passer en principal
    var ent_blockMain = document.querySelector(ent_blockMainId);

    // si le le block sur lequel on a cliqué ne détient pas la classe ent_marker
    if (!ent_blockMain.classList.contains("ent_marker")) {
        // alors on lui ajoute
        ent_blockMain.classList.add("ent_marker");
        // et on l'enlève à l'ancien block sélectionné
        ent_oldBlockMainId = "#"+ent_oldMainActivity.id;
        ent_oldMainActivity = document.querySelector(ent_oldBlockMainId);
        ent_oldMainActivity.classList.remove("ent_marker");
        ent_oldMainActivity = ent_blockMain;
    }
}


// fonction qui vide le tableau de la vue HTML
function ent_clearActivities() {
    // récupération du tableau à vider puis reconstruire
    var ent_activityBoard = document.querySelector("#ent_lists");

    // vidage du tableau
    ent_activityBoard.innerHTML = "<div id='ent_headerOfSubTitles' class='ent_alignDiv'><p id='ent_subTitleActivity' class='ent_subTitle'>Activités ajoutées à l'entreprise</p><p id='ent_subTitlePrincipale' class='ent_subTitle'>Principale</p><p id='ent_subTitleTutor' class='ent_subTitle'>Tuteurs ajoutés à l'activité</p></div>";
}


// fonction qui génère la vue HTML des activités de l'entreprise
function ent_buildActivities() {
    // variables
    var i, ent_id, ent_blockToAdd, ent_tutorId, ent_tutorToAdd, ent_listOfAddedTutorsId, ent_activityBlock;

    // récupération du tableau à vider puis reconstruire
    var ent_activityBoard = document.querySelector("#ent_lists");

    // on boucle sur le tableau pour créer les éléments HTML
    if (ent_company.length > 0) {
        for (i=0; i<ent_company.length; i++) {
            ent_id = i + 1;

            ent_blockToAdd = "<div id='ent_block"+ent_id+"' onclick='ent_selectActivity(ent_block"+ent_id+")'" + " class='ent_alignDiv ent_listing'><div id='ent_listOfAddedActivities"+ent_id+ "' class='ent_columnDiv ent_listOfAddedActivities'><p class='ent_thing'><span onclick='ent_selectActivity(ent_block"+ent_id+")," + " ent_removeAddedActivity("+i+")' class='ent_toRemoveThings'>x</span><span id='ent_activity"+ent_id + "' class='ent_addedThing'>"+ent_company[i][0][0]+"</span></p><p class='ent_activityDetail'><span>"+ent_company[i][0][1]+"</span></p></div><div id='ent_mainActivity"+ent_id + "' onclick='ent_selectMainActivity(ent_mainActivity"+ent_id+")'" + " class='ent_alignDiv ent_mainActivity'></div><div id='ent_listOfAddedTutors"+ent_id+ "' class='ent_columnDiv ent_listOfAddedTutors'></div></div>";

            // on l'ajoute à la vue HTML
            ent_activityBoard.innerHTML += ent_blockToAdd;

            if (ent_company[i][1] != undefined) {
                for (j=0; j<ent_company[i][1].length; j++) {
                    ent_tutorId = j + 1;

                    ent_tutorToAdd = "<p class='ent_thing'><span onclick='ent_selectActivity(ent_block"+ent_id+")," + " ent_removeAddedTutor("+j+")' class='ent_toRemoveThings'>x</span><span id='tuteur"+ ent_tutorId + "ofActivity"+ ent_id +"' class='ent_addedThing'>"+ ent_company[i][1][j] +"</span></p>";

                    ent_listOfAddedTutorsId = "#ent_listOfAddedTutors" + ent_id;

                    ent_activityBlock = ent_activityBoard.querySelector(ent_listOfAddedTutorsId);

                    ent_activityBlock.innerHTML += ent_tutorToAdd;
                }
            }
        }

        // si c'est la première activité que l'on ajoute on la passe directement en sélectionnée et en activité principale
        if (ent_company.length == 1) {
            document.querySelector("#ent_block1").classList.add("ent_selectedDynamicAdd");
            document.querySelector("#ent_mainActivity1").classList.add("ent_marker");

            // stockage du block en cours de sélection
            ent_oldSelectedBlockActivity = document.querySelector("#ent_block1");
            // stockage de l'activité principale
            ent_oldMainActivity = document.querySelector("#ent_mainActivity1");
            // stockage des tuteurs de l'activité en cours de sélection
            ent_tutorsSelected = ent_oldSelectedBlockActivity.lastElementChild.children;
            ent_activitySelected = 0;

        // sinon on attribut la sélection à celle qui été déjà en cours de sélection et la principale à celle qui l'été
        } else {
            ent_oldSelectedBlockActivityId = ent_oldSelectedBlockActivity.id;
            ent_oldSelectedBlockActivityId = "#"+ent_oldSelectedBlockActivityId;

            ent_oldMainActivityId = ent_oldMainActivity.id;
            ent_oldMainActivityId = "#"+ent_oldMainActivityId;

            document.querySelector(ent_oldSelectedBlockActivityId).classList.add("ent_selectedDynamicAdd");
            // stockage du block en cours de sélection
            ent_oldSelectedBlockActivity = document.querySelector(ent_oldSelectedBlockActivityId);
            document.querySelector(ent_oldMainActivityId).classList.add("ent_marker");
            // stockage de l'activité principale
            ent_oldMainActivity = document.querySelector(ent_oldMainActivityId);
            // stockage des tuteurs de l'activité en cours de sélection
            ent_tutorsSelected = ent_oldSelectedBlockActivity.lastElementChild.children;
        }
    }
}


// fonction permettant l'ajout d'une activité
function ent_addActivityToList() {
    // variables
    var i;
    var ent_activityFind = false;

    // récupération du nom de l'activité présente dans le champ "Sélectionner une activité"
    var ent_nameOfActivity = document.querySelector("#ent_t_activity").value;

    // si l'entreprise a déjà une activité, on teste si celle que l'on veut ajouter n'est pas déjà présente
    if (ent_company.length > 0) {
        for (i=0; i<ent_company.length; i++) {
            if (ent_nameOfActivity == ent_company[i][0][0]) {
                ent_activityFind = true;
            }
        }
    }

    // si il n'y pas d'autre activité déjà ajoutée ou que l'activité n'a pas été trouvée parmis celles déjà présentes
    if (!ent_activityFind) {
        // on l'ajoute au tableau des activités de l'entreprise
        ent_company.push([[ent_nameOfActivity, ent_t_activityDetail.value]]);

        // on vide le champ d'ajout et le champ des détails
        document.querySelector("#ent_t_activity").value = "";
        document.querySelector("#ent_t_activityDetail").value = "";
        // on cache le bouton "+"
        document.querySelector("#ent_addActivity").classList.remove("ent_visible");
        document.querySelector("#ent_addActivity").classList.add("ent_invisible");
        // on construit la vue HTML
        ent_clearActivities();
        ent_buildActivities();

    // sinon on informe l'utilisateur que cette activité est déjà présente
    } else {
        alert("Cette activité a déjà été ajoutée");
        // on vide le champ d'ajout
        document.querySelector("#ent_t_activity").value = "";
        // on cache le bouton "+"
        document.querySelector("#ent_addActivity").classList.remove("ent_visible");
        document.querySelector("#ent_addActivity").classList.add("ent_invisible");
    }
}


// fonction qui permet l'ajout d'un tuteur sur une activité
function ent_addTutorToList() {
    // variables
    var i, ent_tutorsName;
    var ent_tutorFind = false;

    // récupération du nom du tuteur que l'on souhaite ajouter
    var ent_nameOfTutor = document.querySelector("#ent_t_tutor").value;

    // si l'activité sélectionné a déjà au moins un tuteur
    if (ent_oldSelectedBlockActivity.lastElementChild.children.length > 0) {
        // si l'activité sélectionnée a déjà un tuteur, on teste si celui que l'on veut ajouter n'est pas déjà présent
        for (i=0; i<ent_tutorsSelected.length; i++) {
            ent_tutorsName = ent_tutorsSelected[i].innerText.replace("x", "");

            if (ent_tutorsName == ent_nameOfTutor) {
                ent_tutorFind = true;
            }
        }
    }

    // si il n'y pas d'autre tuteur déjà ajouté ou que le tuteur n'a pas été trouvé parmis ceux déjà présents
    if (!ent_tutorFind) {
        // on l'ajoute au tableau des tuteurs de l'activité
        if (ent_company[ent_activitySelected][1] != undefined) {
            ent_company[ent_activitySelected][1].push(ent_nameOfTutor);
        } else {
            ent_company[ent_activitySelected].push([ent_nameOfTutor]);

        }
        // on vide le champ d'ajout
        document.querySelector("#ent_t_tutor").value = "";
        // on cache le bouton "+"
        document.querySelector("#ent_toAddTutor").classList.remove("ent_visible");
        document.querySelector("#ent_toAddTutor").classList.add("ent_invisible");
        // on construit la vue HTML
        ent_clearActivities();
        ent_buildActivities();

        // sinon on informe l'utilisateur que ce tuteur est déjà présent
    } else {
        alert("Ce tuteur a déjà été ajouté à l'activité sélectionnée");
        // on vide le champ d'ajout
        document.querySelector("#ent_t_tutor").value = "";
        // on cache le bouton "+"
        document.querySelector("#ent_toAddTutor").classList.remove("ent_visible");
        document.querySelector("#ent_toAddTutor").classList.add("ent_invisible");
    }
}


// fonction qui permet de retirer un tuteur de la liste des tuteurs ajoutés
function ent_removeAddedTutor(tutorIndex) {
    // suppression de l'élément dans le tableau JS
    if (ent_company[ent_activitySelected][1].length > 1) {
        ent_company[ent_activitySelected][1].splice(tutorIndex, 1);
    } else {
        ent_company[ent_activitySelected][1].splice(tutorIndex, 1);
        ent_company[ent_activitySelected].splice(1, 1);
    }

    // on reconstruit la vue HTML
    ent_clearActivities();
    ent_buildActivities();
}


// fonction qui permet de retirer une activité
function ent_removeAddedActivity(activityIndex) {
    // on test si il y a toujours un tuteur d'ajouté dans l'activité
    if (ent_company[ent_activitySelected].length > 1) {
        alert("Veuillez d'abord retirer tous les tuteurs rattachés à cette activité");
    } else {
        ent_company.splice(activityIndex, 1);

        // on reconstruit la vue HTML
        ent_clearActivities();
        ent_buildActivities();
    }
}






/*
// fonction qui permet de gaver le tableau pour les tests
function tester(social, represName, activity) {
    // création du nouveau tableau JS splité pour création du board HTML
    var ent_arraySplitted = new Array();

    ent_arrayJS[ent_numLines] = social+"§"+"mail"+"§"+"phone"+"§"+"fax"+"§"+ent_t_adress.value+"§"+ent_t_adressCompl2.value+"§"+ent_t_adressCompl1.value+"§"+ent_t_adressCP.value+"§"+"adressCity"+"§"+activity+"§"+"activityDetail"+"§"+represName+"§"+ent_t_represPrenom.value+"§"+ent_t_represMail.value+"§"+ent_t_represTel.value+"§"+ent_t_tutorName.value+"§"+ent_t_tutorPrenom.value+"§"+ent_t_tutorMail.value+"§"+ent_t_tutorTel.value;
    // on parcours le tableau JS des infos à afficher en HTML: on split par les "§"
    ent_arrayJSToSplit[ent_numLines] = social+"§"+"adressCity"+"§"+"mail"+"§"+"phone"+"§"+"fax"+"§"+represName+"§"+activity+"§"+"activityDetail";

    // on vide le tableau HTML
    ent_clearHTMLBoard();
    // on le reconstruit à partir du tableau JS
    ent_buildHTMLBoard(ent_arrayJSToSplit);
    // on vide les champs de recherche
    ent_searchRaz();
}


// valeurs pour tester à supprimer plus tard
tester("javascript", "jean", "informatique");
tester("css", "jean", "web");
tester("html", "fabien", "web");
tester("jquery", "seb", "informatique");
tester("ajax", "seb", "web");
tester("VueJS", "jack", "web");





<p class='ent_thing'></p>


*/

