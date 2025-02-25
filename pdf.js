// Charger jsPDF
const { jsPDF } = window.jspdf;

// Intercepter la soumission du formulaire
document.getElementById('invoiceForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Empêcher la soumission du formulaire

    // Récupérer les valeurs du formulaire
    const Name = document.getElementById('rname').value;
    const Address = document.getElementById('adrpost').value;
    const telNumber = document.getElementById('tel').value;
    const codpostal = document.getElementById('codpost').value;
    let quantity = parseFloat(document.getElementById('quantity').value);
    let price = parseFloat(document.getElementById('price').value);
    let TVA = parseFloat(document.getElementById('TVA').value)

    // Créer un nouveau document PDF
    const doc = new jsPDF();

    // Ajouter le logo
    const logoUrl = './Preview.png'; // Chemin vers le logo
    doc.addImage(logoUrl, 'PNG', 10, 10, 30, 30); // (image, format, x, y, largeur, hauteur)

    // Ajouter du contenu au PDF
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 255); // Bleu (RVB : 0,0,255)
    const title = "Facture de prestation de service";
    const pageWidth = doc.internal.pageSize.width; 
    const textWidth = doc.getTextWidth(title);
    const centerX = (pageWidth - textWidth) / 2;
    doc.text(title, centerX, 20); // Ajuster la position pour éviter le logo

    doc.setFontSize(12);
    doc.setTextColor(5,5,5);
    doc.text(`${Name}`, 150, 50);
    doc.setFontSize(10);
    doc.text(`${Address}`, 150, 54);
    doc.text(`${codpostal}`, 150, 58);
    doc.text(`${telNumber}`, 150, 62);
    doc.text('Ma Mbaye Diop', 10, 50);
    doc.text('10 Henri Poincaré,', 10, 54);
    doc.text('13013 Marseille', 10, 58);
    doc.text('06 63 35 97 76', 10, 62);

    doc.text('moyens de payment:',10,130)
    doc.text('Banque: BNP PARIBAS',60,130)
    doc.text('SWIFT/BIC: BNPAFRPPXXX',60,135)
    doc.text('IBAN: FR76 3000 4006 5300 0051 2913 843',60,140)
    doc.text('Conditions de paiement:',10,144)
    doc.text('7 jours',60,144)
    


    const dateEmission = new Date(); // Date d'émission actuelle
    const dateExigibilite = new Date(); 
    dateExigibilite.setDate(dateEmission.getDate() + 10); // Ajouter 10 jours

    doc.text(`Date d'émission ${dateEmission.toLocaleDateString()}`,10,68);
    doc.text(`Date d'exigibilité du paiement ${dateExigibilite.toLocaleDateString()}`,10,72);
    doc.text('Numero Siret : 85216921800017',10,76)
    

    // Tableau des services (optionnel)
    const services = [
        { description: "Service 1",date: new Date().toLocaleDateString(), quantity, price, TVA},
        
    ];
    let totalHT = 0;
    const columns = ["Description","Date", "Quantité", "Prix unitaire","TVA", "Montant"];
    const rows = services.map(service => {
        const rowTotal = service.quantity * service.price;
        totalHT += rowTotal;
        return [service.description,service.date, service.quantity.toFixed(2), `${service.price.toFixed(2)} €`,`${service.TVA.toFixed(2)*100} %`,`${rowTotal.toFixed(2)} €`];
    });
        // Calcul TVA (20%)
    
    const totalTTC = totalHT*(1+TVA);

    // Ajouter la ligne du total HT et TVA
    rows.push(["", "", "","", "Total HT", `${totalHT.toFixed(2)} €`]);
    
    rows.push(["", "", "","", "Total TTC", `${totalTTC.toFixed(2)} €`]);
    


    doc.autoTable({
        startY: 80, // Commencer le tableau après les informations du client
        //styles: { fillColor: [255, 0, 0] },
        
        head: [columns],
        body: rows,
    });

    // Sauvegarder le PDF
    doc.save(`Facture_${Name}.pdf`);
});