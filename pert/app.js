// La il faut désormais embarquer dans le csv la date prévisionnel de début. Si pas de contrainte ou contrainte "plus tôt" alors mettre la date embarquée.


const initialDate = "2025-03-30";
const csvData = `
name;dependencies;duration;type;designation;page;id;grise
A;;8;SPat Romain Dubray;Réalisation d'une campagne de contrôle des coffrets et armoires électriques des zones biogaz R20, S20 et du bâtiment E20 à fort pouvoir calorifique;1;1;o
B;;8;DP Olivier Bouly;Identification et contrôle des coffrets et armoires Basse Tension des locaux sensibles (au sens de la continuité de service) et non redondant de SAV;2;2;o
C;;9;DMR Sylvain Feuillolay;Renforcement des moyens en eau d'extinction incendie au sein de l'UPEI en allant au-delà du cadre réglementaire;3;3;o
D;;9;DP Olivier Bouly;Déploiement de la détection incendie au sein de locaux pré-identifiés;4;4;o
E;;9;Noëlle Gameiro;Déploiement de la détection incendie au sein de locaux pré-identifiés;5;5;o
F;;6;Guillaume Civel;Identification des secteurs de feu de l'usine et réalisation, sur une unité pilote, le marquage au sol et/ou au mur;6;6;o
G;;6;DMR Sylvain Feuillolay;Identification des secteurs de feu de l'usine et réalisation, sur une unité pilote, le marquage au sol et/ou au mur;7;7;o
H;;3;Yorich Nwagaya;Asservissement du coffret de dépotage à la séquence de rinçage de la fosse de fuite;8;8;o
I;;9;DP Olivier Bouly;Mise en conformité de la zone de dépotage Javel / chlorure ferrique au Traitement des jus, et mise à jour de la documentation associée (plans, consignes, etc);9;9;o
J;;4;Direction Technique Claire Collignon;Formalisation dans une procédure de gestion des modifications la réalisation systématique d'une analyse de risque visant à évaluer l'impact environnemental, le risque accidentel et la procédure administrative associée à chaque modification et les responsabilité de  l'ensemble des acteurs impliqués dans les différentes phases de mise en oeuvre des modifications.;10;10;o
K;;6;DP Olivier Bouly;Renforcement du stock de pièces de rechanges pour les MMR (Mesures de maîtrise des risques);11;11;o
L;;6;SPat Romain Dubray;Renforcement du stock de pièces de rechanges pour les MMR (Mesures de maîtrise des risques);12;12;o
M;;3;DMR Sylvain Feuillolay;Identification des mesures compensatoires en cas d'arrêt ou d’indisponibilité d’une MMR;13;13;o
N;;6;Yorich Nwagaya;Identification des mesures compensatoires en cas d'arrêt ou d’indisponibilité d’une MMR;14;15;o
O;;9;DP Olivier Bouly;Remplacement des conduites de Biogaz (acier) du service 4 dans deux regards prioritaires à traiter;15;17;o
P;;3;DP Olivier Bouly;Recensement des équipements sous pression impliquant du biogaz et des conduites de biogaz Moyenne Pression relevant de la législation des équipements sous pression et élaboration d'un plan de contrôle et de surveillance ;16;19;o
Q;;9;DP Olivier Bouly;Mise en place des détecteurs flamme et gaz sur les conduites apparentes Moyenne Pression d'alimentation des consommateurs Service 4, des zones pré-identifiées comme prioritaires au vu du risque de fuite;17;21;o
R;;6;Sabine Heude;Elaboration et mise en oeuvre du plan de contrôle visant à prévenir, en toute circonstances, les émissions de billes dans l'environnement (surveillance des biofiltres, de la hauteur des matériaux);18;23;o
S;;2;DEPE Sam Azimi;Elaboration et mise en oeuvre du plan de contrôle visant à prévenir, en toute circonstances, les émissions de billes dans l'environnement (surveillance des biofiltres, de la hauteur des matériaux);19;25;o
T;;3;SPat Romain Dubray;Amélioration des moyens de détection de fuite de billes (déterminer le type de surveillance: instrumentée et/ou vidéo d'accumulation de bille avec report d'alarme);20;27;o
U;;4;DMR Sylvain Feuillolay;Mise en place de barrages au rejet des usines;21;29;o
V;;6;Sabine Heude;Mise en place de barrages au rejet des usines;22;31;o
W;;9;DEPE Sam Azimi;Etablissement d'un plan de pérennisation de la gestion des alarmes et dysfonctionnements par l'outil "ORAGES";23;33;o
X;;9;Gilles Jaron;Intégration dans la gestion des incidents, d'une étape d'analyse de risques permettant de questionner les choix de gestion et de les réajuster le cas échéant.;24;35;o
Y;;9;Gilles Jaron;Intégration dans la gestion des incidents, d'une étape d'analyse de risques permettant de questionner les choix de gestion et de les réajuster le cas échéant.;25;37;o
Z;;9;DMR Sylvain Feuillolay;Consolidation du plan de continuité d'activité et réalisation des actions identifiées pour le scénario perte d'utilité électrique;26;39;o
AA;;6;Nicolas Leroy;Elaboration du plan de continuité d'activité et de service, formalisation et développement du scénario perte d'utilité électrique;27;41;o

















`.trim()
// ======================= NE PAS TOUCHER DESSOUS - CODE ===============================























let all_activity = {};
let all_critical_path = [];
let ctx;



let currentDate = new Date(initialDate); // Convertir la chaîne en objet Date



function forceInputUppercase(e) {
    var start = e.target.selectionStart;
    var end = e.target.selectionEnd;
    e.target.value = e.target.value.toUpperCase();
    e.target.setSelectionRange(start, end);
}


document.querySelectorAll("#InputArea table input").forEach((x) => { x.addEventListener("keyup", forceInputUppercase, false); })


function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}



// Fonction pour tronquer la description
function truncateDescription(description) {
    if (description.length > 150) {
        return description.substring(0, 150) + "...";
    }
    return description;
}






function display() {
    document.querySelector("#OutputTables").innerHTML = "";

    // for (let key in all_activity) drawOutputTable(all_activity[key]);
    
    
    for (let activity of Object.values(all_activity)) {
       if (activity.grise === "o") {
           drawOutputTable(activity);
       }
    }

    

    displayGanttChart();
    
    displayConnectionInfo();
    
    findCriticalPath([], all_activity["start"]);

    displayCriticalPathInfo();
}












function addMonthsToDate(initialDate, monthsToAdd) {
    // Créez une nouvelle instance de Date à partir de la date initiale
    let date = new Date(initialDate);

    // Ajoutez le nombre de mois
    date.setMonth(date.getMonth() + monthsToAdd);

    // Tableau des noms des mois
    const monthNames = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];

    // Obtenez le nom du mois et l'année
    const monthName = monthNames[date.getMonth()];
    const year = date.getFullYear();

    // Formatez la date d'arrivée
    return `${monthName} - ${year}`;
}















function displayGanttChart() {
    let keys = Object.keys(all_activity);
    let max_time = all_activity["end"].num3;

    let canvas_width = 70 + (max_time + 1) * 30;
    
    let filteredActivities = Object.values(all_activity).filter(a => a.grise === "o");
    let canvas_height = 30 + (filteredActivities.length) * 40; // ignore start and end    
    //let canvas_height = 30 + (Object.keys(all_activity).length - 2) * 40; // ignore start and end


    let canvas = document.querySelector("#OutputGanttChart");
    canvas.width = canvas_width + 650;
    canvas.height = canvas_height;
    
    
    ctx = canvas.getContext("2d");
    ctx.font = "15px Arial";
    ctx.strokeStyle = '#EEE';
    
    
	// Abscisse
	ctx.lineWidth = 1;
	ctx.fillText("ID", 0, 20);
	for (let i = 0; i <= max_time; i++) {
	    
	    // Dessiner la ligne verticale
	    drawLine(50 + (i * 30), 25, 50 + (i * 30), canvas_height-25);

	    // Déterminer l'affichage (mois seul ou année)
	    let month = currentDate.getMonth() + 1; // getMonth() renvoie de 0 (janvier) à 11 (décembre)
	    let year = currentDate.getFullYear();
	    
	    let label;
	    if (i === 0 || month === 1) {
		label = `${year}`; // Afficher l'année
		ctx.fillStyle = "#e48d08"; // Mettre l'année en couleur
		ctx.font = "bold 13px Arial"; // Mettre le texte en gras
	    } else {
		label = `${month.toString().padStart(2, "0")}`; // Afficher uniquement le mois
		ctx.fillStyle = "grey"; // Remettre en noir pour les mois
	    }

	    // Positionner et dessiner le texte
	    const value_x = 50 + (i * 30) + (30 - ctx.measureText(label).width) / 2;
	    ctx.fillText(label, value_x, 20);

	    // Passer au mois suivant
	    currentDate.setMonth(currentDate.getMonth() + 1);
	}

	// Remettre la couleur par défaut après la boucle
	ctx.fillStyle = "black";
	ctx.font = "normal 13px Arial"; // Mettre le texte en gras




    drawLine(0, 30, canvas_width, 30);

    let i = 0;
    for (let key in all_activity) {
        let a = all_activity[key];

        if (a.name == "start" || a.name == "end" || a.grise =="n") continue;

        // if (a.grise == "n") continue;
        
        const h = 50 + (i * 40);
       
        ctx.strokeStyle = '#EEE';
        ctx.lineWidth = 1; 
        
        drawLine(50, h-5, canvas_width-50, h-5);
        
 
        ctx.strokeStyle = a.color;
        ctx.lineWidth = 15;
        
        drawLine(50 + (a.num1 * 30), h - 5, 50 + (a.num3 * 30), h - 5);       
        

        ctx.fillText("id:" + a.id, 5, h);
        
        
        ctx.fillText("p:" + a.page + " - " + a.description, canvas_width-40, h);

        i++;
    }
}









function drawOutputTable(t) {
    // Vérifiez si t.type est undefined et quittez la fonction si c'est le cas
    if (t.type === undefined) {
        return;
    }

    var date_debut = addMonthsToDate(initialDate, t.num1);
    var date_fin = addMonthsToDate(initialDate, (t.num1 + t.num2));

    var tableContainer = document.createElement("div");
    tableContainer.classList.add("table-container");

    var table = document.createElement("table");

    table.style.borderCollapse = "collapse"; // Assurez-vous que les bordures se fondent ensemble
    table.innerHTML =
        `<tr style="background-color: #fafafa; border: 2px solid black;">
            <td class="col1" style="background-color: ${t.color}; color: white; font-weight: bold; font-family: 'Carlito', 'Calibri', sans-serif;"></td>
            <td class="col2" style="font-weight: bold; font-family: 'Carlito', 'Calibri', sans-serif; text-align: center;">${t.type}</td>
            <td class="col3" style="font-family: 'Carlito', 'Calibri', sans-serif; text-align: right;"></td>
        </tr>` +
        `<tr style="background-color: white; border: 1px solid #aaa;">
            <td colspan="3" style="font-family: 'Carlito', 'Calibri', sans-serif;  text-align: center;">${t.description}</td>
        </tr>` +
        `<tr style="background-color: #fdfdfd; border: 1px solid #aaa;"">
            <td class="col1" style="font-family: 'Carlito', 'Calibri', sans-serif;"></td>
            <td class="col2" style="font-family: 'Carlito', 'Calibri', sans-serif; font-weight: bold; text-align: center;">${date_debut} ➜ ${t.num2} mois</td>
            <td class="col3" style="font-family: 'Carlito', 'Calibri', sans-serif;"></td>
        </tr>`;

    tableContainer.appendChild(table);
    document.querySelector("#OutputTables").appendChild(tableContainer);
}









function findCriticalPath(paths, now) {
    if (now.num5 != 0) return;

    if (now.name == "end")
        all_critical_path.push(paths);
    else { //start ignored
        if (now.name != "start")
            paths.push(now.name);
        now.connectTo.forEach((x) => {
            findCriticalPath(paths.slice(), all_activity[x]);
        });
    }
}

function displayCriticalPathInfo() {
    let msg = "";
    all_critical_path.forEach((x) => { msg += x.join(" > ") + "\n"; })

    document.querySelector("#CriticalPath").innerText = msg;
}










const colors = [
    "#007C5E", 
    "#E25C12", 
    "#159A9C", 
    "#D12D6B",
    "#E6A717",
    "#14C4B6",
    "#7D3CCB",
    "#2EAA3F",
    "#C34723",
    "#8b95a7"  
];

const typeToColor = {};

function addTypeAndAssignColor(type, grise) {
    if (!typeToColor[type]) {
        const colorIndex = Object.keys(typeToColor).length % colors.length;
        if(grise != "o"){
        	typeToColor[type] = "#DDD";
        } else {
        	typeToColor[type] = colors[colorIndex];
        }
        
    }
    return typeToColor[type];
}



function eventConfirmChange() {
    
    
    all_activity = {
        start: new Activity("start", [], 0)
    };
    all_critical_path = [];

    Papa.parse(csvData, {
        header: false,
        dynamicTyping: true,
        delimiter: ";",
        complete: function(results) {
            results.data.forEach(row => {
                if (row.length >= 5) {
                    let name = row[0];
                    let dependencies = row[1] || "";
                    let duration = row[2];
                    let type = row[3];
                    let description = row[4];
                    let num_page = row[5];
                    let id = row[6];
                    let grise = row[7];

                    description = truncateDescription(description);
                    let d = dependencies.replace(/\s/g, "").toUpperCase().split(",");
                    if (d.length == 1 && d[0] == "")
                        d = ["start"];

                    let color = addTypeAndAssignColor(type, grise);

                    if (!isNaN(duration)) {
                        all_activity[name] = new Activity(name, d, duration, type, description, color, num_page, id, grise);
                    }
                } else {
                    console.error("Row is missing required properties:", row);
                }
            });

            all_activity["end"] = new Activity("end", [], 0);

            for (let key in all_activity) {
                all_activity[key].familiarize();
            }

            all_activity["start"].calculateTop(0); // Exécuter une seule fois !



            // Trier les activités par num2
            let sortedActivities = Object.values(all_activity)
                .filter(a => typeof a.num1 === 'number') // Vérifier que num1 est bien défini
                .sort((a, b) => a.num1 - b.num1);

            // Utiliser un Map pour conserver l'ordre des clés triées
            let sortedActivityMap = new Map();
            sortedActivities.forEach(activity => {
                sortedActivityMap.set(activity.name, activity);
            });



            // Mise à jour de all_activity
            all_activity = Object.fromEntries(sortedActivityMap);

            console.log(all_activity);

            display();
        }
    });
}









function displayConnectionInfo() {
    let msg = "";

    for (let key in all_activity) {
        let a = all_activity[key];
        msg += `${a.description} > ${a.connectTo}\n`;
    }

    document.querySelector("#Connect").innerText = msg;
}

