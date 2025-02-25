// Charger jsPDF
const { jsPDF } = window.jspdf;

// Intercepter la soumission du formulaire
document.getElementById('invoiceForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Empêcher la soumission du formulaire

    // Récupérer les valeurs du formulaire
    const rname = document.getElementById('rname').value; // Nom du client
    const adrpost = document.getElementById('adrpost').value; // Adresse postale
    const codpost = document.getElementById('codpost').value; // Code postal
    const quantity = parseFloat(document.getElementById('quantity').value); // Quantité
    const price = parseFloat(document.getElementById('price').value); // Prix unitaire
    const TVA = parseFloat(document.getElementById('TVA').value); // Taux de TVA

    const joursTravailles = parseInt(document.getElementById('joursTravailles').value);
    const heureDebut = document.getElementById('heureDebut').value;
    const heureFin = document.getElementById('heureFin').value;

    if (isNaN(joursTravailles) || joursTravailles < 1 || !heureDebut || !heureFin) {
        alert("Veuillez saisir toutes les informations correctement.");
        return;
    }

    // Calculer le montant total TTC
    const montantHT = quantity * price; // Montant hors taxes
    const montantTVA = (montantHT * TVA) / 100; // Montant de la TVA
    const montantTTC = montantHT + montantTVA; // Montant TTC

    // Créer un nouveau document PDF
    const doc = new jsPDF();

    // Ajouter le logo
    const logoUrl = './Preview.png'; // Chemin vers le logo
    doc.addImage(logoUrl, 'PNG', 10, 10, 30, 30); // (image, format, x, y, largeur, hauteur)

    // Ajouter le titre du document
    doc.setFontSize(18);
    doc.setTextColor(5, 5, 5); // Couleur du texte (noir)
    const title = "Contrat de Prestation de Services";
    const pageWidth = doc.internal.pageSize.width;
    const textWidth = doc.getTextWidth(title);
    const centerX = (pageWidth - textWidth) / 2; // Centrer le titre

    // Position du texte (ajustée pour éviter le logo)
    const textY = 40; // Position verticale du texte

    // Dessiner un cadre autour du titre
    const padding = 5; // Espace entre le texte et le cadre
    const rectX = centerX - padding;
    const rectY = textY - 9; // Ajuster la position verticale du cadre
    const rectWidth = textWidth + 2 * padding;
    const rectHeight = 15; // Hauteur du cadre

    doc.setDrawColor(5, 5, 5); // Couleur du cadre (noir)
    doc.setLineWidth(0.3); // Épaisseur du cadre
    doc.rect(rectX, rectY, rectWidth, rectHeight); // Dessiner le rectangle

    // Ajouter le texte centré dans le cadre
    doc.text(title, centerX, textY);

    // Ajouter les informations du client
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Couleur du texte (noir)
    let y = 50; // Position verticale initiale après le titre
    const contrat = `
ENTRE:
    
Ma Mbaye Diop,
demeurant a 10 Rue Henri Poincaré, 13013, Marseille
et exerçant la profession de Plongeurse)
en etant immatricule sous le numero de SIRET: 85216921800017

ci-apres designe < Le Prestataire >,
    
D'UNE PART,
    
ET:
    `;
    doc.text(contrat,10,y);
    y +=70;
    
    doc.text(`${rname}`, 10, y);
    y += 5;
    doc.text(`${adrpost}`, 10, y);
    y += 5;
    doc.text(`${codpost}`, 10, y);
  
   
    y += 20; // Espacement supplémentaire

    // Ajouter les articles du contrat
    const date = new Date();
    const date_fin = new Date ();
    const articles = [
        {
            title: "PRÉAMBULE",
            content: `Le Prestataire est un entrepreneur indépendant ou un professionnel à son compte, disposant de compétences et d’expérience dans son domaine.
Le Client est une entreprise ou un organisme qui souhaite recourir aux services du Prestataire pour la réalisation de missions ponctuelles, en raison d’une augmentation de son activité ou d’imprévus.
En considération des compétences et de l’expérience du Prestataire, le Client a souhaité lui confier le soin d'exécuter, en toute indépendance, une mission (la « Mission »).

Les Parties se sont directement mises en relation et se sont accordées sur les termes du présent accord contractuel (le « Contrat »).

CECI ÉTANT EXPOSÉ, IL A ÉTÉ CONVENU CE QUI SUIT.`
        },
        {
            title: "Article 2. Autonomie et Indépendance",
            content: `Les Parties exercent leur activité en totale autonomie et indépendance, chacune d'elles supportant les risques de son activité.

Le Prestataire n'est soumis à aucune obligation d'exclusivité vis-à-vis du Client. Le Prestataire est libre de conclure un/des contrat(s) similaire(s) ou équivalent(s) au Contrat avec toute personne physique ou morale, concurrente ou non du Client.`
        },
        {
            title: "Article 3. Durée du Contrat",
            content: `Le Contrat entre en vigueur à compter de sa date de signature pour une durée déterminée, laquelle est détaillée dans l’Annexe 1 du Contrat.

Chaque Partie est libre de mettre un terme au Contrat en adressant à l’autre Partie un courrier électronique ou un message via l'application dans les hypothèses suivantes :

        • La Partie ne souhaite plus collaborer avec l'autre et lui notifie sa volonté expresse de ne
          pas poursuivre la collaboration ;

        • L’autre Partie n'est plus en mesure d'exécuter les obligations lui incombant au titre du
          Contrat (par exemple, en cas de procédure collective ou de maladie) ;

        • Ou si l'autre Partie commet un manquement grave à une des stipulations du Contrat.

Les Parties conviennent d’exclure toute reconduction tacite du Contrat.`
        },
        {
            title: "Article 4. Obligations du Prestataire",
            content: `Le Prestataire s’engage à avoir les compétences, le savoir-faire, le matériel et les autorisations nécessaires pour être apte à la réalisation de la Mission.

Le Prestataire déclare qu'il respecte et s'engage à respecter toutes les lois et réglementations applicables à son statut et son activité, étant précisé qu'il sera seul responsable en cas de violation d'une d'entre elles. Plus particulièrement, le Prestataire déclare être à jour de l'ensemble de ses obligations sociales et fiscales et s'engage à les respecter pendant toute la durée du Contrat.

Le Prestataire assume à titre exclusif toutes les conséquences qui pourraient résulter de l'exécution de la Mission. Il est seul responsable des dommages subis ou causés par lui dans l'exécution de la Mission.`
        },
        {
            title: "Article 5. Obligations du Client",
            content: `Le Client s’engage à fournir, en temps utile, au Prestataire tous les documents, informations tenues à jour et toutes explications utiles à ce dernier pour exécuter dans les meilleures conditions possibles, la Mission lui incombant en vertu du Contrat.

En contrepartie de la réalisation de la Mission par le Prestataire, le Client s’engage à verser la somme prévue à l’Annexe 1 du Contrat.`
        },
        {
            title: "Article 6. Déroulement de la Mission",
            content: `Le Prestataire, en tant qu’entrepreneur indépendant à son compte, s’engage à tout mettre en œuvre pour réaliser la Mission dans les règles de l'art. Il s’engage également à conseiller et/ou informer le Client sur la nature, les conditions d’exécution et toutes précautions utiles pour la réalisation de la Mission.

En tant que partenaire indépendant, le Prestataire dispose d’un pouvoir d’initiative et est libre dans l'organisation ainsi que dans l'exécution de la Mission, à l’exception des contraintes inhérentes à la Mission (par exemple, l’existence d’un service, d’un événement ou encore des obligations en matière d’hygiène et de sécurité).

Le Prestataire s’engage à mobiliser l’ensemble des moyens appropriés pour exécuter la Mission. Il est précisé qu’il est seul maître de la définition desdits moyens et qu’il utilise ses propres moyens (notamment moyens de déplacement, équipement de cuisine, gants de manutention, combinaisons spéciales, chaussures spéciales, méthodes de travail, etc.), à l’exception de ceux fournis par le Client en raison d’obligations juridiques ou de contraintes de sécurité.`
        },
        {
            title: "Article 7. Assurances",
            content: `À titre de condition essentielle et déterminante sans laquelle le Client ne se serait pas engagé, le Prestataire s’engage à être assuré dans les formes et conditions requises pour couvrir l'ensemble des risques inhérents à l’exercice de son activité commerciale, ce qui comprend ceux liés à la réalisation de la Mission.`
        },
        {
            title: "Article 8. Confidentialité",
            content: `Chacune des Parties s’engage à ne pas divulguer à des tiers les informations confidentielles issues du Contrat et l’Annexe 1, et ce sur une durée de 2 ans à compter de la fin du Contrat.

Le Prestataire s’engage à considérer et traiter comme confidentielles toutes les informations qui lui sont communiquées dans le cadre de l’exécution du Contrat, notamment les secrets de fabrication ou d’affaires et les spécifications industrielles, commerciales ou financières du Client. En conséquence, le Prestataire s’engage à ne pas divulguer à un tiers, de quelque façon que ce soit, tout ou partie des informations confidentielles sans l’accord préalable et écrit du Client.

La violation des obligations visées ci-dessus peut être prouvée par tous moyens. De surcroît, le Client se réserve le droit de poursuivre le Prestataire en indemnisation des préjudices éventuellement subis à raison du non-respect, par le Prestataire, des obligations précitées.`
        },
        {
            title: "Article 9. Divers",
            content: `Le Contrat comporte une annexe qui fait partie intégrante de l’accord contractuel des Parties, lequel constitue l'accord intégral entre les Parties et remplace les négociations, déclarations et accords ayant pour objet ou relatifs à l'exécution de la Mission, antérieurs à la date de signature du Contrat.

Au cas où une stipulation du Contrat s'avérait en tout ou partie nulle ou invalide, la validité des autres clauses du Contrat ne serait pas affectée.`
        },
        {
            title: "Article 10. Loi Applicable et Juridiction Compétente",
            content: `Le Contrat est régi et interprété par le droit français.

Les Parties s'engagent à soumettre tout litige ou contestation relatif à la validité, à l'interprétation à l'exécution et/ou à la rupture du Contrat à la compétence exclusive du Tribunal de commerce de Paris.
  
Fait à Marseille le ${date.toLocaleDateString()}

En deux exemplaires,

       Le Prestataire,                                                              Le Client,
       Ma Mbaye Diop                                                             ${rname}
`
        },
       

    ];
    
    // Fonction pour ajouter un pied de page
    function addFooter(doc, pageNumber) {
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); // Couleur du texte (noir)
        doc.text(`Page ${pageNumber}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10);
    }

    // Fonction pour ajouter du texte avec gestion des sauts de page
    function addTextWithPageBreaks(doc, text, x, y, maxHeight) {
        const splitText = doc.splitTextToSize(text, 180); // Diviser le texte pour qu'il tienne dans la largeur de la page
        for (let i = 0; i < splitText.length; i++) {
            if (y > maxHeight) {
                doc.addPage(); // Ajouter une nouvelle page
                y = 20; // Réinitialiser la position verticale
                addFooter(doc, doc.internal.getNumberOfPages()); // Ajouter le pied de page
            }
            doc.text(splitText[i], x, y);
            y += 7; // Espacement entre les lignes (identique à votre code d'origine)
        }
        return y; // Retourner la nouvelle position verticale
    }

    // Ajouter les articles
    articles.forEach((article) => {
        // Ajouter le titre de l'article
        if (y > doc.internal.pageSize.height - 30) {
            doc.addPage(); // Ajouter une nouvelle page
            y = 20; // Réinitialiser la position verticale
            addFooter(doc, doc.internal.getNumberOfPages()); // Ajouter le pied de page
        }
        doc.setFontSize(14);
        doc.text(article.title, 10, y);
        y += 10;

        // Ajouter le contenu de l'article
        doc.setFontSize(12);
        y = addTextWithPageBreaks(doc, article.content, 10, y, doc.internal.pageSize.height - 30);
        y += 8; // Espacement supplémentaire après chaque article
    });

        y+=10;
         // Titre de l'annexe
doc.setFontSize(16);
doc.setTextColor(0, 0, 0); // Couleur du texte (noir)
doc.text("Annexe 1 - Détails de la Mission", 60, 20);

// Informations de la mission
doc.setFontSize(12);
doc.text("— Nature de la Mission : Service", 10, 30);
doc.text(`— Montant de la prestation (HT) : ${montantHT} €`, 10, 40);
doc.text(`— Adresse de la mission : ${adrpost}, ${codpost}`, 10, 50);


// Données du tableau
// Générer dynamiquement les dates et calculer la durée de travail
let currentDate = new Date();
const data = [
    ["Date de début", "Date de fin", "Durée (heures)"]
];
let totalDuree = 0;

for (let i = 0; i < joursTravailles; i++) {
    let dateDebut = new Date(currentDate);
    let dateFin = new Date(currentDate);

    // Ajouter l'heure de début et de fin
    const [debutHeure, debutMinute] = heureDebut.split(":").map(Number);
    const [finHeure, finMinute] = heureFin.split(":").map(Number);
    
    dateDebut.setHours(debutHeure, debutMinute);
    dateFin.setHours(finHeure, finMinute);

    // Calcul de la durée en heures
    const duree = ((dateFin - dateDebut) / (1000 * 60 * 60)).toFixed(2);
    totalDuree += parseFloat(duree);

    // Ajouter les données formatées dans le tableau
    data.push([
        dateDebut.toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" }),
        dateFin.toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" }),
        `${duree} h`
    ]);

    // Passer au jour suivant
    currentDate.setDate(currentDate.getDate() + 1);
}

// Ajouter la ligne du total
data.push(["", "Total des heures :", `${totalDuree.toFixed(2)} h`]);

// Générer le tableau dans le PDF
doc.autoTable({
    startY: 80,
    head: [data[0]],
    body: data.slice(1),
    theme: 'grid',
    styles: { fontSize: 10, cellPadding: 2 },
    headStyles: { fillColor: [0, 0, 200] },
    columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 60 },
        2: { cellWidth: 40 }
    }
});

// Ajouter le titre du tableau
doc.setFontSize(12);
doc.text("TABLE 1 – Tableau de durée de mission", 60, doc.autoTable.previous.finalY + 10);
    // Ajouter le pied de page à la dernière page
    addFooter(doc, doc.internal.getNumberOfPages());

    // Sauvegarder le PDF
    doc.save(`Contrat_${rname}.pdf`);
});