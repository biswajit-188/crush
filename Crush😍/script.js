let clickHistory = {
    loadingScreen: [],
    question1: [],
    question2: [],
    question3: [],
    giftSelection: []
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize floating hearts
    createFloatingHearts();
    
    // Start with loading screen
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.remove('active');
        document.getElementById('questionsScreen').classList.add('active');
    }, 4000);

    // Handle no button clicks
    const noResponses = [
        "Are you sure? 🤔",
        "Think again! 🥺",
        "My heart is breaking 😭",
        "Don't leave me alone! 💔",
        "I even got permission from my mom! 😂",
        "Free chocolates for you! 🍫",
        "Just say YES already! 😍"
    ];

    let noClickCount = 0;
    document.querySelectorAll('.no-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (noClickCount < noResponses.length) {
                e.target.textContent = noResponses[noClickCount];
                noClickCount++;
            } else {
                e.target.style.display = 'none';
            }
        });
    });

    // Fix for question progression
    let currentQuestion = 1;
    
    // Handle yes buttons specifically
    document.querySelectorAll('.yes-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentQuestion <= 3) {
                document.getElementById(`q${currentQuestion}`).style.display = 'none';
                currentQuestion++;
                if (currentQuestion <= 3) {
                    document.getElementById(`q${currentQuestion}`).style.display = 'block';
                } else {
                    showFinalScreen();
                }
            }
        });
    });

    // Handle option buttons for question 2
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('q2').style.display = 'none';
            document.getElementById('q3').style.display = 'block';
            currentQuestion = 3;
        });
    });

    // Add gift button functionality
    document.querySelectorAll('.gift-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.gift-btn').forEach(b => b.classList.remove('selected'));
            e.target.classList.add('selected');
            celebrateWithConfetti();
        });
    });

    // Prevent page closing
    window.addEventListener('beforeunload', (e) => {
        e.preventDefault();
        e.returnValue = '';
    });

    // Secret love note (press 'L')
    document.addEventListener('keypress', (e) => {
        if (e.key.toLowerCase() === 'l') {
            showLoveNote();
        }
    });

    // Add click effect to all buttons
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const rect = e.target.getBoundingClientRect();
            const x = rect.left + (rect.width / 2);
            const y = rect.top + (rect.height / 2);
            
            // Create multiple emojis at once
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    createFloatingEmoji(null, x, y);
                }, i * 200);
            }
        });
    });

    // Track button clicks for each question
    document.querySelectorAll('#q1 button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            clickHistory.question1.push(`Clicked: ${e.target.textContent} at ${new Date().toLocaleTimeString()}`);
        });
    });

    document.querySelectorAll('#q2 button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            clickHistory.question2.push(`Clicked: ${e.target.textContent} at ${new Date().toLocaleTimeString()}`);
        });
    });

    document.querySelectorAll('#q3 button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            clickHistory.question3.push(`Clicked: ${e.target.textContent} at ${new Date().toLocaleTimeString()}`);
        });
    });

    document.querySelectorAll('.gift-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            clickHistory.giftSelection.push(`Selected gift: ${e.target.textContent} at ${new Date().toLocaleTimeString()}`);
        });
    });

    // Add download button functionality
    document.getElementById('download-history').addEventListener('click', generatePDF);
});

function createFloatingHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        document.querySelector('.floating-hearts').appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 6000);
    }, 300);
}

function showFinalScreen() {
    document.getElementById('questionsScreen').classList.remove('active');
    document.getElementById('finalScreen').classList.add('active');
    celebrateWithConfetti();
}

function celebrateWithConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function showLoveNote() {
    const note = document.createElement('div');
    note.className = 'love-note';
    note.innerHTML = `
        <h3>My Secret Love Note 💌</h3>
        <p>Every moment with you is magical! 💫</p>
    `;
    document.body.appendChild(note);
    setTimeout(() => note.remove(), 3000);
}

// Add this new function to create floating emojis
function createFloatingEmoji(emoji, x, y) {
    const emojis = ['💖', '💝', '💕', '💗', '💓', '💘', '💞'];
    const element = document.createElement('div');
    element.className = 'floating-emoji';
    element.innerHTML = emoji || emojis[Math.floor(Math.random() * emojis.length)];
    element.style.left = (x || Math.random() * 100) + 'vw';
    element.style.top = (y || Math.random() * 100) + 'vh';
    document.querySelector('.floating-hearts').appendChild(element);

    setTimeout(() => {
        element.remove();
    }, 6000);
}

// Add this new function for PDF generation
function generatePDF() {
    // Import jsPDF library dynamically
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    document.body.appendChild(script);

    script.onload = () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Set font size and style
        doc.setFontSize(20);
        doc.setTextColor(255, 20, 147); // Pink color
        doc.text("Our Valentine's Day Journey 💕", 20, 20);

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        
        let yPosition = 40;

        // Add each section to the PDF
        const addSection = (title, data) => {
            doc.setFontSize(14);
            doc.setTextColor(255, 105, 180); // Pink color
            doc.text(title, 20, yPosition);
            yPosition += 10;

            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            data.forEach(item => {
                if (yPosition > 280) {
                    doc.addPage();
                    yPosition = 20;
                }
                doc.text(item, 20, yPosition);
                yPosition += 10;
            });
            yPosition += 10;
        };

        // Add each section of click history
        if (clickHistory.question1.length) addSection("Question 1: Chocolates 🍫", clickHistory.question1);
        if (clickHistory.question2.length) addSection("Question 2: What You Like Most 😊", clickHistory.question2);
        if (clickHistory.question3.length) addSection("Question 3: Valentine Proposal 💝", clickHistory.question3);
        if (clickHistory.giftSelection.length) addSection("Gift Selection 🎁", clickHistory.giftSelection);

        // Add a cute footer
        doc.setFontSize(10);
        doc.setTextColor(255, 20, 147);
        doc.text("Made with love 💕", 20, 290);

        // Save the PDF
        const date = new Date().toLocaleDateString().replace(/\//g, '-');
        doc.save(`Valentine-Story-${date}.pdf`);
    };
} 