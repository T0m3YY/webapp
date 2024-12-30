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

        if (sectionId === "info") {
            const aboutContainer = document.getElementById("about-container");
            aboutContainer.innerHTML = "<p>Bezig met laden...</p>"; // Laadindicator
            fetchRepoInfo();
            
        } else {
            console.error('Het "info" tab-element kon niet worden gevonden.');
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

        // Verwijder de laadindicator
        commitContainer.innerHTML = "";

        // Laatste drie commits ophalen
        commits.slice(0, 3).forEach(async (commit) => {
            const commitMessage = commit.commit.message;
            const commitDate = new Date(commit.commit.author.date).toLocaleString();
            const authorName = commit.commit.author.name;

            // Haal de veranderingen op voor de specifieke commit door de sha te gebruiken
            const commitDetailsUrl = `https://api.github.com/repos/${username}/${repo}/commits/${commit.sha}`;
            const commitDetailsResponse = await fetch(commitDetailsUrl);
            const commitDetails = await commitDetailsResponse.json();

            // Haal de veranderingen uit de commitDetails
            const changes = commitDetails.files ? commitDetails.files.map(file => {
                return `${file.status} ${file.filename}`;
            }).join("<br>") : "Geen bestandwijzigingen";

            // Maak een glazen kaartje voor elke commit
            const commitCard = document.createElement("div");
            commitCard.classList.add("glass-card");
            commitCard.innerHTML = `
                <h4>${commitMessage}</h3>
                <p><strong>Datum:</strong> ${commitDate}</p>
                <p><strong>Auteur:</strong> ${authorName}</p>
                <p><strong>Wijzigingen:</strong><br>${changes}</p>
            `;

            commitContainer.appendChild(commitCard);
        });
    } catch (error) {
        console.error("Error fetching commits:", error);
        document.getElementById("commit-container").innerHTML = "<p>Fout bij het ophalen van updates.</p>";
    }
}

document.querySelector('a[href="#updates"]').onclick = () => {
    const commitContainer = document.getElementById("commit-container");
    commitContainer.innerHTML = "<p>Bezig met laden...</p>"; // Laadindicator

    // Haal de laatste commits op en werk de container bij
    fetchLatestCommits();
};






async function fetchRepoInfo() {
    const username = "t0m3yy"; // Vervang met je GitHub-gebruikersnaam
    const repo = "webapp"; // Vervang met je repositorynaam
    const repoUrl = `https://api.github.com/repos/${username}/${repo}`;
    const userUrl = `https://api.github.com/users/${username}`;

    try {
        const repoResponse = await fetch(repoUrl);
        const userResponse = await fetch(userUrl);

        if (!repoResponse.ok || !userResponse.ok) {
            throw new Error("Error fetching GitHub data");
        }

        const repoData = await repoResponse.json();
        const userData = await userResponse.json();

        const repoInfo = `
            <br>
            <br>
            <h4>Projectinformatie</h3>
            <p><strong>Beschrijving:</strong> ${repoData.description || "Geen beschrijving beschikbaar."}</p>
            <p><strong>Sterren:</strong> ${repoData.stargazers_count}</p>
            <p><strong>Forks:</strong> ${repoData.forks_count}</p>
            <p><strong>Laatste update:</strong> ${new Date(repoData.updated_at).toLocaleString()}</p>
            <p><strong>Hoofdtak:</strong> ${repoData.default_branch}</p>
            <br>
            <h3>Ontwikkelaarinformatie</h3>
            <p><strong>Naam:</strong> ${userData.name || "Geen naam beschikbaar."}</p>
            <p><strong>Bio:</strong> ${userData.bio || "Geen bio beschikbaar."}</p>
        `;

        document.getElementById("about-container").innerHTML = repoInfo;

    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("about-container").innerHTML = "<p>Fout bij het ophalen van informatie.</p>";
    }
}

// Laad informatie wanneer de gebruiker naar het "Over deze site"-tabblad gaat
document.querySelector('a[href="#info"]').onclick = () => {
    const aboutContainer = document.getElementById("about-container");
    aboutContainer.innerHTML = "<p>Bezig met laden...</p>"; // Laadindicator
    fetchRepoInfo();
};
