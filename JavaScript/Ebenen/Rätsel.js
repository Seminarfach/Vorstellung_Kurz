export const riddleConfig = {
    sudokuLeicht: {
        backgroundImage: (() => {
            const img = new Image();
            img.src = './img/Rätsel/Leicht/Hintergrund.png';
            return img;
        })(),
        solutionImage: (() => {
            const img = new Image();
            img.src = './img/Rätsel/Leicht/Lösung.png';
            return img;
        })(),
        
        guideImage: (() => {
            const img = new Image();
            img.src = './img/Anleitung/AnleitungSodokuLeicht.png';
            return img;
        })(),
        explanationImage: (() => {
            const img = new Image();
            img.src = './img/Anleitung/ErklärungSudoku.png';
            return img;
        })(),
        riddleImage: (() => {
            const img = new Image();
            img.src = './img/Rätsel/Hintergrund.png'; // Beispielpfad
            return img;
        })(),
        answers: [
            'x:1 | y:2',
            'x:3 | y:2',
            'x:1 | y:3',
            'x:2 | y:1',
        ],
        correctAnswer: 'x:1 | y:2', // Richtige Antwort als Text
        hints: [
            (() => {
                const img = new Image();
                img.src = './img/Rätsel/Leicht/Hinweis1.png';
                return img;
            })(),
            (() => {
                const img = new Image();
                img.src = './img/Rätsel/Leicht/Hinweis2.png';
                return img;
            })(),
            (() => {
                const img = new Image();
                img.src = './img/Rätsel//Leicht/LösungHinweis.png';
                return img;
            })(),
        ],
        hintTimes: [20, 40, 80], // Aktivierungszeitpunkte für Hinweise
        targetLevel: 'raum1',
    

    },

    sudokuMittel: {
                backgroundImage: (() => {
                    const img = new Image();
                    img.src = './img/Rätsel/Mittel/Hintergrund.png';
                    return img;
                })(),
                solutionImage: (() => {
                    const img = new Image();
                    img.src = './img/Rätsel/Mittel/Lösung.png';
                    return img;
                })(),
                guideImage: (() => {
                    const img = new Image();
                    img.src = './img/Anleitung/AnleitungSudokuMittel.png';
                    return img;
                })(),
                explanationImage: (() => {
                    const img = new Image();
                    img.src = './img/Anleitung/ErklärungSudoku.png';
                    return img;
                })(),
                riddleImage: (() => {
                    const img = new Image();
                    img.src = './img/Rätsel/Mittel/Hintergrund.png'; // Beispielpfad
                    return img;
                })(),
                answers: [
                    'x:1 | y:2 | z:2',
                    'x:2 | y:2 | z:1',
                    'x:3 | y:1 | z:1',
                    'x:1 | y:3 | z:2',
                ],
                correctAnswer: 'x:1 | y:2 | z:2', // Richtige Antwort als Text
                hints: [
                    (() => {
                        const img = new Image();
                        img.src = './img/Rätsel/Mittel/Hinweis1.png';
                        return img;
                    })(),
                    (() => {
                        const img = new Image();
                        img.src = './img/Rätsel/Mittel/Hinweis2.png';
                        return img;
                    })(),
                    (() => {
                        const img = new Image();
                        img.src = './img/Rätsel//Mittel/LösungHinweis.png';
                        return img;
                    })(),
                ],
                hintTimes: [20, 40, 80], // Aktivierungszeitpunkte für Hinweise
                targetLevel: 'raum1',
    },
    
    sudokuSchwer: {
                backgroundImage: (() => {
                    const img = new Image();
                    img.src = './img/Rätsel/Schwer/RätselHintergrund.jpg';
                    return img;
                })(),
                solutionImage: (() => {
                    const img = new Image();
                    img.src = './img/Rätsel/Schwer/Lösung.png';
                    return img;
                })(),
                guideImage: (() => {
                    const img = new Image();
                    img.src = './img/Anleitung/AnleitungSodokuSchwer.png';
                    return img;
                })(),
                explanationImage: (() => {
                    const img = new Image();
                    img.src = './img/Anleitung/ErklärungSudoku.png';
                    return img;
                })(),
                riddleImage: (() => {
                    const img = new Image();
                    img.src = './img/Rätsel/RätselHintergrund.jpg'; // Beispielpfad
                    return img;
                })(),
                answers: [
                    'x:1 | y:3 | z:4',
                    'x:2 | y:4 | z:3',
                    'x:1 | y:4 | z:3',
                    'x:2 | y:4 | z:1',
                ],
                correctAnswer: 'x:1 | y:3 | z:4', // Richtige Antwort als Text
                hints: [
                    (() => {
                        const img = new Image();
                        img.src = './img/Rätsel/Schwer/Hinweis1.png';
                        return img;
                    })(),
                    (() => {
                        const img = new Image();
                        img.src = './img/Rätsel/Schwer/Hinweis2.png';
                        return img;
                    })(),
                    (() => {
                        const img = new Image();
                        img.src = './img/Rätsel//Schwer/LösungHinweis.png';
                        return img;
                    })(),
                ],
                hintTimes: [20, 40, 80], // Aktivierungszeitpunkte für Hinweise
                targetLevel: 'raum1',
        },


}

