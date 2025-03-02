// Gesamter Code für die Urkunde am Ende des Spiels
// Muss nur noch nach dem Klicken der richtigen Antwort eingefügt werden





console.log(insgesamteZeit)
            
            const pdfContainer = document.getElementById('DialogBox')
            pdfContainer.innerHTML = ''
            pdfContainer.style.display = "grid"
            pdfContainer.style.gridRow = "3"
            pdfContainer.style.justifyContent = "center"

            const text = document.createElement("div")
            text.innerHTML = "Urkunde Generator"
            text.style.display = "flex"
            text.style.justifyContent = "center"
            text.style.alignItems = "center"
            text.style.fontSize = "1.5vw"

            pdfContainer.appendChild(text)

            
            const form = document.createElement('form')
            form.id = 'certificateForm'

            const nameLabel = document.createElement('label')
            nameLabel.htmlFor = 'playerName'
            nameLabel.textContent = 'Dein Name'
            form.appendChild(nameLabel)

            const nameInput = document.createElement('input')
            nameInput.type = 'text'
            nameInput.id = 'playerName'
            nameInput.required = true 
            form.appendChild(nameInput)

            const submitButton = document.createElement('button')
            submitButton.type = 'submit'
            submitButton.style.height = '60%'
            submitButton.textContent = 'Urkunde erstellen'
            

            

            pdfContainer.appendChild(form)

            pdfContainer.appendChild(submitButton)

            // Formular-Referenz holen

            // Gemeinsame Funktion für die PDF-Erstellung
            async function generateCertificate(event) {
                event.preventDefault(); // Verhindert das Neuladen der Seite

                const nameInput = document.getElementById('playerName');
                const playerName = nameInput.value.trim();

                if (!playerName) {
                    alert("Bitte gib deinen Namen ein.");
                    return;
                }

                const url = './PDF/Urkunde.pdf';
                const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

                const pdfDoc = await PDFDocument.load(existingPdfBytes);
                const pages = pdfDoc.getPages();
                const firstPage = pages[0];

                const { width, height } = firstPage.getSize();

                firstPage.drawText(playerName, {
                    x: 350, 
                    y: height - 200, 
                    size: 36,
                    color: rgb(0.8627, 0.5373, 0.1216),
                });

                firstPage.drawText(`${insgesamteZeit} Sekunden`, {
                    x: 350,
                    y: height - 245,
                    size: 36, 
                    color: rgb(0.8627, 0.5373, 0.1216),
                });

                const currentDate = new Date();
                const formattedDate = currentDate.toLocaleDateString('de-DE', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                });

                firstPage.drawText(` ${formattedDate}`, {
                    x: 230,
                    y: height - 520,
                    size: 20,
                    color: rgb(0.8627, 0.5373, 0.1216),
                });

                firstPage.drawText(`${insgesamteZeit}`,{
                            x: 500,
                            y: height - 300,
                            size: 36, 
                            color: rgb (0.8627, 0.5373, 0.1216),
                        })

                const pdfBytes = await pdfDoc.save();

                const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `Urkunde-${playerName}.pdf`;
                link.click();
            }

            // `submit`-Event für Enter und reguläre Formulareinsendung
            form.addEventListener('submit', generateCertificate);

            // `click`-Event für den Button
            submitButton.addEventListener('click', (event) => {
                generateCertificate(event);
            });