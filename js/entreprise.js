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

// fonction d'ajout de ligne dans le tableau
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
    ////////////////////////
    // ent_arraySplitted = ent_arrayJStoSplit[ent_numLines].split("§");

    ent_clearHTMLBoard();
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


// fonction de sélection de ligne
function ent_selectLine(iSelectedLine) {
    // récupération de la checkbox de la ligne cliquée
    var ent_checkBoxLine = document.getElementById("ent_chkCompanie"+iSelectedLine);

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
    
    // cochage de la checkbox de la ligne
    if (ent_checkBoxLine.checked == false) {
        ent_checkBoxLine.checked = true;
    } else {
        ent_checkBoxLine.checked = false;
    }
    // cochage de la checkbox d'en tête si besoin
    ent_buttonDisplay();
}


// fonction qui permet de cocher ou décocher toutes les checkbox
function ent_selectAll() {
    // variables
    var i;

    // récupération de la checkbox d'en tête
    var ent_checkHead = document.getElementById("ent_chk_head");

    // tableau contenant toutes les checkbox
    var ent_selectedLines = new Array;
    ent_selectedLines = document.getElementsByName("ent_chkCompanie");

    // on parcours tous les éléments checkbox du tableau HTML
    for (i=0; i<ent_numLines; i++) {
        // si la checkbox d'en tête est sélectionné elle check toutes les autres
        if (ent_checkHead.checked) {
            ent_selectedLines[i].checked = true;
        // sinon si on la décoche elle décoche toutes les autres
        } else if (!ent_checkHead.checked) {
            ent_selectedLines[i].checked = false;
        }
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
            

// fonction qui reconstruit le tableau HTML à partir des tableaux JS
function ent_buildHTMLBoard() {
    // variables locales
    var i, j, ent_iBuild, ent_lineBuild, celChkBoxBuild, chkBoxBuild, ent_celBuild, ent_emptyLine, ent_emptyCel;

    // tableau
    var ent_arrayToBuild = new Array();

    // récupération de la checkbox d'en tête
    var ent_checkHead = document.getElementById("ent_chk_head");

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

            // création de la cellule de checkbox
            celChkBoxBuild = document.createElement("td");
            celChkBoxBuild.setAttribute("class", "ent_celCheckBox");
            chkBoxBuild = document.createElement("input");
            chkBoxBuild.setAttribute("type", "checkbox");
            chkBoxBuild.setAttribute("name", "ent_chkCompanie");
            chkBoxBuild.setAttribute("onclick", "ent_buttonDisplay()");
            // ajout d'ID sur chaque checkbox
            chkBoxBuild.setAttribute("id", "ent_chkCompanie"+ent_iBuild);
            // ajout de value sur chaque checkbox
            chkBoxBuild.setAttribute("value", ent_iBuild);
            ent_lineBuild.appendChild(celChkBoxBuild).appendChild(chkBoxBuild);

            // on parcours le nouveau tableau splité pour remplir notre tableau HTML
            for (i=0; i<ent_arrayToBuild.length; i++) {
                // création des cellules
                ent_celBuild = document.createElement("td");
                // ajout de la détection de click sur chaque cellule autre que checkbox
                ent_celBuild.setAttribute("onclick", "ent_selectLine(" + ent_iBuild + ")");
                ent_lineBuild.appendChild(ent_celBuild);

                // remplissage des cellules avec le JS
                ent_celBuild.textContent = ent_arrayToBuild[i];
            }
            // incrémentation du compteur des IDs et lignes
            ent_numLines++;
        }
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

            // création de la cellule de checkbox
            celChkBoxBuild = document.createElement("td");
            celChkBoxBuild.setAttribute("class", "ent_celCheckBox");
            chkBoxBuild = document.createElement("input");
            chkBoxBuild.setAttribute("type", "checkbox");
            chkBoxBuild.setAttribute("name", "ent_chkCompanie");
            chkBoxBuild.setAttribute("onclick", "ent_buttonDisplay()");
            // ajout d'ID sur chaque checkbox
            chkBoxBuild.setAttribute("id", "ent_chkCompanie"+ent_iBuild);
            // ajout de value sur chaque checkbox
            chkBoxBuild.setAttribute("value", ent_iBuild);
            ent_lineBuild.appendChild(celChkBoxBuild).appendChild(chkBoxBuild);

            // on parcours le nouveau tableau splité pour remplir notre tableau HTML
            for (i=0; i<ent_arrayToBuild.length; i++) {
                // création des cellules
                ent_celBuild = document.createElement("td");
                // ajout de la détection de click sur chaque cellule autre que checkbox
                ent_celBuild.setAttribute("onclick", "ent_selectLine(" + ent_iBuild + ")");
                ent_lineBuild.appendChild(ent_celBuild);

                // remplissage des cellules avec le JS
                ent_celBuild.textContent = ent_arrayToBuild[i];
            }
            // incrémentation du compteur des IDs et lignes
            ent_numLines++;
        }
    }
    // on décoche la checkbox d'en tête si elle est cochée
    if (ent_checkHead.checked) {
        ent_checkHead.checked = false;
    }
    // remise à zéro des champs
    ent_raz();
}


// fonction qui permet de supprimer une ou plusieurs entrées
function ent_delLine() {
    // variables
    var i, ent_selectedLines, ent_linesToDel, ent_delConfirm;
    var ent_numTbodyCheckboxChecked = 0;

    // on récupère toutes les checkbox
    var ent_allTbodyCheckbox = new Array();
    ent_allTbodyCheckbox = document.getElementsByName("ent_chkCompanie");

    // on consulte les checkbox cochées
    for (i=0; i<ent_allTbodyCheckbox.length; i++) {
        if (ent_allTbodyCheckbox[i].checked) {
            ent_numTbodyCheckboxChecked++;
        }
    }
    // si il y a plusieurs lignes de cochées
    if (ent_numTbodyCheckboxChecked > 1) {
        // on demande la confirmation de la suppression des lignes sélectionnées
        ent_delConfirm = confirm("Êtes-vous sûr de vouloir supprimer ces lignes ?");
    } else {
        // on demande la confirmation de la suppression de la ligne sélectionnée
        ent_delConfirm = confirm("Êtes-vous sûr de vouloir supprimer cette ligne ?");
    }

    // si l'utilisateur annule la suppression de ligne
    if (ent_delConfirm == false) {
        // on stoppe la suppression
        return;
    // si il la confirme
    } else {
        // on parcours le nombre de checkbox et on récupère la value de celles qui sont cochées
        for (i=0; i<ent_numLines; i++) {
            ent_selectedLines = ent_allTbodyCheckbox[i];
            if (ent_selectedLines.checked) {
                // récupération de la value de la ligne sélectionnée
                ent_linesToDel = ent_selectedLines.value;
                // on supprime la ligne équivalente à la ligne à supprimer dans les tableaux JS
                ent_arrayJS.splice(ent_linesToDel, 1);
                ent_arrayJStoSplit.splice(ent_linesToDel, 1);
            }        
        }
        // on vide le tableau HTML
        ent_clearHTMLBoard();
        // on regénère notre tableau HTML avec la ou les ligne(s) en moins
        ent_buildHTMLBoard();
    }
}
        

// fonction qui gère l'affiche des boutons du formulaire et le cochage de la checkbox d'en tête
function ent_buttonDisplay() {
    // variables locales
    var i, ent_selectedLines;

    // compteur de checkbox cochées
    var ent_nbCheckedLines = 0;

    // récupération de la checkbox d'en tête
    var ent_checkHead = document.getElementById("ent_chk_head");

    // récupération de toutes les checkbox du tbody
    var ent_allTbodyCheckbox = new Array();
    ent_allTbodyCheckbox = document.getElementsByName("ent_chkCompanie");

    // on parcours les checkbox du tbody et on récupère le nombre de checkbox cochées
    for (i=0; i<ent_numLines; i++) {
        ent_selectedLines = ent_allTbodyCheckbox[i];
        // si une ligne est cochée on incrémente le compteur de checkbox cochées
        if (ent_selectedLines.checked) {
            ent_nbCheckedLines++;
        }
    }

    // si toutes les lignes sont cochées (au moins une), on coche la checkbox d'en tête
    if ((ent_nbCheckedLines == ent_numLines) && (ent_nbCheckedLines > 0)) {
        ent_checkHead.checked = true;
    // sinon on la décoche
    } else {
        ent_checkHead.checked = false;
    }
}


// fonction qui permet de modifier une ligne sélectionnée
function ent_modifyLine() {
    // variables locales
    var i, ent_selectedLines, ent_lineToModify, ent_modifyConfirm;

    // récupération de toutes les checkbox du tbody
    var ent_allTbodyCheckbox = new Array();
    ent_allTbodyCheckbox = document.getElementsByName("ent_chkCompanie");

    // on demande la confirmation de modifier la ligne sélectionnée
    ent_modifyConfirm = confirm("Êtes-vous sûr de vouloir modifier cette ligne ?");

    // si l'utilisateur annule la modification
    if (ent_modifyConfirm == false) {
        // on stop la fonction
        return;
    // sinon si il confirme la modification
    } else {
        // on parcours le nombre de checkbox et on récupère la value de celle qui est cochée
        for (i=(ent_numLines-1); i>=0; i--) {
            ent_selectedLines = ent_allTbodyCheckbox[i];
            if (ent_selectedLines.checked) {
                // récupération de la value de la ligne sélectionnée
                ent_lineToModify = ent_selectedLines.value;
                // on change les valeurs de la ligne à modifier dans les tableaux JS par celles contenues dans les champs input
                ent_arrayJS[ent_lineToModify] = ent_t_social.value+"§"+ent_t_mail.value+"§"+ent_t_phone.value+"§"+ent_t_fax.value+"§"+ent_t_adress.value+"§"+ent_t_adressCompl2.value+"§"+ent_t_adressCompl1.value+"§"+ent_t_adressCP.value+"§"+ent_t_adressCity.value+"§"+ent_t_activity.value+"§"+ent_t_activityDetail.value+"§"+ent_t_represName.value+"§"+ent_t_represPrenom.value+"§"+ent_t_represMail.value+"§"+ent_t_represTel.value+"§"+ent_t_tutorName.value+"§"+ent_t_tutorPrenom.value+"§"+ent_t_tutorMail.value+"§"+ent_t_tutorTel.value;
                ent_arrayJStoSplit[ent_lineToModify] = ent_t_social.value+"§"+ent_t_adressCity.value+"§"+ent_t_mail.value+"§"+ent_t_phone.value+"§"+ent_t_fax.value+"§"+ent_t_represName.value+"§"+ent_t_activity.value+"§"+ent_t_activityDetail.value;
            }
        }
        // on vide le tableau HTML
        ent_clearHTMLBoard();
        // on regénère notre tableau HTML avec la ligne modifiée
        ent_buildHTMLBoard();
    }
}