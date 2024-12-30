document.querySelectorAll('.settings-nav').forEach(navButton => {
    navButton.addEventListener('click', () => {
        // Verwijder de actieve status van alle navigatieknoppen
        document.querySelectorAll('.settings-nav').forEach(button => button.classList.remove('active'));
    
        // Verwijder de actieve status van alle tabbladen
        document.querySelectorAll('.settings-tab').forEach(tab => tab.classList.remove('active'));
    
        // Voeg de actieve status toe aan de geklikte knop
        navButton.classList.add('active');
    
        // Toon het corresponderende tabblad
        const sectionId = navButton.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');
        
        // Als de 'Updates' sectie wordt geselecteerd, laad de laatste commits
        if (sectionId === "updates") {
            const commitContainer = document.getElementById("commit-container");
            commitContainer.innerHTML = "<p>Bezig met laden...</p>"; // Laadindicator
            fetchLatestCommits();
        }
    });
});






// Selecteer de toggle-switch
const themeSwitch = document.getElementById('themeSwitch');

// Controleer of een thema is opgeslagen in localStorage
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light') {
    document.documentElement.classList.add('light');
    themeSwitch.checked = true; // Toggle aanzetten
}

// Voeg een eventlistener toe om te schakelen tussen thema's
themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        document.documentElement.classList.add('light');
        localStorage.setItem('theme', 'light'); // Sla light mode op
    } else {
        document.documentElement.classList.remove('light');
        localStorage.setItem('theme', 'dark'); // Sla dark mode op
    }
});





// Haal de laatste commits op van GitHub
async function fetchLatestCommits() {
    const username = "t0m3yy"; // Vervang door je GitHub-gebruikersnaam
    const repo = "webapp"; // Vervang door je repositorynaam
    const url = `https://api.github.com/repos/${username}/${repo}/commits`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch commits");
        }

        const commits = await response.json();
        const commitContainer = document.getElementById("commit-container");

        // Verwijder oude commits om duplicaten te voorkomen
        commitContainer.innerHTML = ""; // Dit maakt de container leeg

        // Laatste drie commits ophalen
        commits.slice(0, 3).forEach(commit => {
            const commitMessage = commit.commit.message;
            const commitDate = new Date(commit.commit.author.date).toLocaleString();
            const authorName = commit.commit.author.name;

            // Maak een glazen kaartje voor elke commit
            const commitCard = document.createElement("div");
            commitCard.classList.add("glass-card");
            commitCard.innerHTML = `
                <h4>${commitMessage}</h3>
                <p><strong>Datum:</strong> ${commitDate}</p>
                <p><strong>Auteur:</strong> ${authorName}</p>
            `;

            commitContainer.appendChild(commitCard);
        });
    } catch (error) {
        console.error("Error fetching commits:", error);
        document.getElementById("commit-container").innerHTML = "<p>Fout bij het ophalen van updates.</p>";
    }
}
