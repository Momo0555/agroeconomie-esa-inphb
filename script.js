// Données initiales de la bibliothèque
const initialDocuments = [
    {
        id: 1,
        title: "Analyse économique des systèmes de production agricole",
        author: "Dr. Koffi N'Guessan",
        year: 2024,
        type: "cours",
        description: "Cours complet sur l'analyse économique des systèmes de production agricole en Côte d'Ivoire",
        image: "https://images.unsplash.com/photo-1586771107445-d3ca888129fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        fileName: "analyse-economique-systemes-production.pdf",
        fileSize: "2.4 MB",
        fileType: "application/pdf"
    },
    {
        id: 2,
        title: "Impact des politiques agricoles sur la productivité",
        author: "Amina Coulibaly",
        year: 2024,
        type: "memoire",
        description: "Mémoire de fin d'études analysant l'impact des politiques agricives sur la productivité",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        fileName: "impact-politiques-agricoles-productivite.pdf",
        fileSize: "3.1 MB",
        fileType: "application/pdf"
    }
];

// Données initiales des étudiants
const initialStudents = [
    {
        id: 1,
        firstName: "Kouadio",
        lastName: "Yao",
        promo: 2024,
        email: "kouadio.yao@inphb.ci",
        phone: "+225 07 07 07 07 07",
        whatsapp: "+225 07 07 07 07 07",
        position: "Ingénieur agroéconomiste",
        company: "Ministère de l'Agriculture",
        president: true,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        firstName: "Aïcha",
        lastName: "Traoré",
        promo: 2024,
        email: "aicha.traore@inphb.ci",
        phone: "+225 01 02 03 04 05",
        whatsapp: "+225 01 02 03 04 05",
        position: "Chargée d'études économiques",
        company: "Banque Mondiale",
        president: false,
        image: "https://images.unsplash.com/photo-1494790108755-2616c113a1c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    }
];

// Variables globales
let documents = JSON.parse(localStorage.getItem('agroeco-documents')) || initialDocuments;
let students = JSON.parse(localStorage.getItem('agroeco-students')) || initialStudents;
let currentDocumentFilter = 'all';
let currentPromoFilter = 'all';
let isAdmin = localStorage.getItem('agroeco-admin') === 'true';
const currentYear = new Date().getFullYear();

// Identifiants administrateur par défaut
let adminCredentials = JSON.parse(localStorage.getItem('agroeco-admin-credentials')) || {
    username: 'admin',
    password: 'admin123'
};

// Images par défaut pour les documents
const defaultDocumentImages = {
    'memoire': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'cours': 'https://images.unsplash.com/photo-1586771107445-d3ca888129fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'livre': 'https://images.unsplash.com/photo-1544716278-e513176f20b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'document': 'https://images.unsplash.com/photo-1580584126903-c17d41830450?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
};

// Image par défaut pour les étudiants
const defaultStudentImage = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80';

// Générer les 40 dernières promotions
function generatePromotions() {
    const promotions = [];
    for (let i = 0; i < 40; i++) {
        promotions.push(currentYear - i);
    }
    return promotions;
}

// Fonctions pour réinitialiser les formulaires
function resetAddDocumentForm() {
    document.getElementById('addDocumentForm').reset();
    document.getElementById('documentPreview').style.display = 'none';
    document.getElementById('fileInfo').innerHTML = '';
    document.getElementById('docYear').value = currentYear;
}

function resetAddStudentForm() {
    document.getElementById('addStudentForm').reset();
    document.getElementById('photoPreview').style.display = 'none';
    document.getElementById('previewImage').src = '';
    document.getElementById('studentPromo').value = currentYear;
}

function resetLoginForm() {
    document.getElementById('loginForm').reset();
}

function resetAdminSettingsForm() {
    document.getElementById('adminSettingsForm').reset();
    document.getElementById('newAdminUsername').value = adminCredentials.username;
}

// Mapping des fonctions de réinitialisation pour chaque modale
const modalResetFunctions = {
    'addDocumentModal': resetAddDocumentForm,
    'addStudentModal': resetAddStudentForm,
    'loginModal': resetLoginForm,
    'adminSettingsModal': resetAdminSettingsForm
};

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser les données si elles n'existent pas dans localStorage
    if (!localStorage.getItem('agroeco-documents')) {
        localStorage.setItem('agroeco-documents', JSON.stringify(documents));
    }
    
    if (!localStorage.getItem('agroeco-students')) {
        localStorage.setItem('agroeco-students', JSON.stringify(students));
    }
    
    // Initialiser les identifiants admin s'ils n'existent pas
    if (!localStorage.getItem('agroeco-admin-credentials')) {
        localStorage.setItem('agroeco-admin-credentials', JSON.stringify(adminCredentials));
    } else {
        adminCredentials = JSON.parse(localStorage.getItem('agroeco-admin-credentials'));
    }
    
    // Mettre à jour l'année du copyright
    document.getElementById('currentYear').textContent = currentYear;
    
    // Initialiser l'interface administrateur
    if (isAdmin) {
        showAdminUI();
    }
    
    // Charger les données
    loadDocuments();
    loadPromoSelect();
    loadStudents();
    
    // Gestionnaire d'événements pour le menu mobile
    document.getElementById('mobileMenuBtn').addEventListener('click', function() {
        document.getElementById('mainNav').classList.toggle('active');
    });
    
    // Gestionnaire pour les filtres de documents
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Appliquer le filtre
            currentDocumentFilter = this.getAttribute('data-filter');
            loadDocuments();
        });
    });
    
    // Gestionnaire pour la recherche de documents
    document.getElementById('searchInput').addEventListener('input', function() {
        loadDocuments();
    });
    
    // Gestionnaire pour le bouton d'administration
    document.getElementById('adminLoginBtn').addEventListener('click', function() {
        openModal('loginModal');
    });
    
    // Gestionnaire pour le formulaire de connexion
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;
        
        // Vérifier les identifiants
        if (username === adminCredentials.username && password === adminCredentials.password) {
            localStorage.setItem('agroeco-admin', 'true');
            isAdmin = true;
            closeModal('loginModal');
            showAdminUI();
            document.getElementById('loginForm').reset();
            alert('Connexion réussie! Vous avez maintenant accès aux options de suppression et d\'export.');
        } else {
            alert('Identifiants incorrects. Utilisez les identifiants par défaut ou ceux que vous avez modifiés.');
        }
    });
    
    // Gestionnaire pour la déconnexion
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.setItem('agroeco-admin', 'false');
        isAdmin = false;
        hideAdminUI();
        alert('Vous êtes déconnecté.');
    });
    
    // Gestionnaire pour les paramètres admin
    document.getElementById('adminSettingsBtn').addEventListener('click', function() {
        openModal('adminSettingsModal');
        document.getElementById('newAdminUsername').value = adminCredentials.username;
    });
    
    // Gestionnaire pour le formulaire de paramètres admin
    document.getElementById('adminSettingsForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const newUsername = document.getElementById('newAdminUsername').value;
        const newPassword = document.getElementById('newAdminPassword').value;
        const confirmPassword = document.getElementById('confirmAdminPassword').value;
        
        if (newPassword !== confirmPassword) {
            alert('Les mots de passe ne correspondent pas.');
            return;
        }
        
        adminCredentials.username = newUsername;
        adminCredentials.password = newPassword;
        
        localStorage.setItem('agroeco-admin-credentials', JSON.stringify(adminCredentials));
        closeModal('adminSettingsModal');
        alert('Identifiants administrateur mis à jour avec succès!');
    });
    
    // Gestionnaire pour l'export Excel
    document.getElementById('exportExcelBtn').addEventListener('click', function() {
        exportStudentsToExcel();
    });
    
    // Gestionnaire pour les modales
    document.getElementById('addDocBtn').addEventListener('click', function(e) {
        e.preventDefault();
        openModal('addDocumentModal');
    });
    
    document.getElementById('footerAddDocBtn').addEventListener('click', function(e) {
        e.preventDefault();
        openModal('addDocumentModal');
    });
    
    document.getElementById('addStudentBtn').addEventListener('click', function(e) {
        e.preventDefault();
        openModal('addStudentModal');
    });
    
    document.getElementById('footerAddStudentBtn').addEventListener('click', function(e) {
        e.preventDefault();
        openModal('addStudentModal');
    });
    
    document.getElementById('closeDocumentModal').addEventListener('click', function() {
        closeModal('addDocumentModal');
    });
    
    document.getElementById('closeStudentModal').addEventListener('click', function() {
        closeModal('addStudentModal');
    });
    
    // Gestionnaire pour la sélection de promotion
    document.getElementById('promoSelect').addEventListener('change', function() {
        currentPromoFilter = this.value;
        loadStudents();
    });
    
    // Gestionnaire pour la prévisualisation de fichier document
    document.getElementById('documentFile').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const fileInfo = document.getElementById('fileInfo');
            const fileSize = (file.size / (1024*1024)).toFixed(2);
            fileInfo.innerHTML = `
                <strong>Fichier sélectionné:</strong><br>
                ${file.name}<br>
                <small>Taille: ${fileSize} MB</small>
            `;
            document.getElementById('documentPreview').style.display = 'block';
        }
    });
    
    // Gestionnaire pour la prévisualisation de photo
    document.getElementById('studentPhoto').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const preview = document.getElementById('previewImage');
                preview.src = e.target.result;
                document.getElementById('photoPreview').style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Fermer le menu mobile lorsqu'on clique sur un lien
    document.querySelectorAll('#mainNav a').forEach(link => {
        link.addEventListener('click', function() {
            document.getElementById('mainNav').classList.remove('active');
        });
    });
    
    // Gestionnaire pour le bouton retour en haut
    document.getElementById('backToTop').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Afficher/masquer le bouton retour en haut selon le défilement
    window.addEventListener('scroll', function() {
        const backToTopBtn = document.getElementById('backToTop');
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
        
        // Navigation active
        const navLinks = document.querySelectorAll('.nav-links a');
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Fermer les modales en cliquant à l'extérieur
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target.id);
        }
    });
    
    // Gestionnaire pour le formulaire d'ajout de document
    document.getElementById('addDocumentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addNewDocument();
    });
    
    // Gestionnaire pour le formulaire d'ajout d'étudiant
    document.getElementById('addStudentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addNewStudent();
    });
});

// Fonction pour afficher l'interface administrateur
function showAdminUI() {
    document.getElementById('adminLoginBtn').style.display = 'none';
    document.getElementById('adminStatus').style.display = 'flex';
    document.getElementById('exportExcelBtn').style.display = 'flex';
    // Les boutons de suppression seront visibles lors du chargement des données
    loadDocuments();
    loadStudents();
}

// Fonction pour masquer l'interface administrateur
function hideAdminUI() {
    document.getElementById('adminStatus').style.display = 'none';
    document.getElementById('exportExcelBtn').style.display = 'none';
    document.getElementById('adminLoginBtn').style.display = 'flex';
    // Recharger les données pour masquer les boutons de suppression
    loadDocuments();
    loadStudents();
}

// Fonction pour charger les documents
function loadDocuments() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const documentsGrid = document.getElementById('documentsGrid');
    
    // Filtrer les documents
    let filteredDocuments = documents.filter(doc => {
        // Filtre par type
        if (currentDocumentFilter !== 'all' && doc.type !== currentDocumentFilter) {
            return false;
        }
        
        // Filtre par recherche
        if (searchTerm && !doc.title.toLowerCase().includes(searchTerm) && 
            !doc.author.toLowerCase().includes(searchTerm) && 
            !doc.description.toLowerCase().includes(searchTerm)) {
            return false;
        }
        
        return true;
    });
    
    // Générer le HTML pour les documents
    let documentsHTML = '';
    
    filteredDocuments.forEach(doc => {
        const typeLabels = {
            'memoire': 'Mémoire',
            'cours': 'Cours',
            'livre': 'Livre',
            'document': 'Document'
        };
        
        const docImage = doc.image || defaultDocumentImages[doc.type];
        
        documentsHTML += `
        <div class="document-card" data-id="${doc.id}">
            <div class="document-img">
                <img src="${docImage}" alt="${doc.title}">
            </div>
            <div class="document-info">
                <h3>${doc.title}</h3>
                <div class="document-meta">
                    <span><i class="fas fa-user"></i> ${doc.author}</span>
                    <span><i class="fas fa-calendar"></i> ${doc.year}</span>
                </div>
                <div class="document-type">${typeLabels[doc.type]}</div>
                <div class="document-description">${doc.description}</div>
                <div class="document-actions">
                    <button class="btn btn-view" onclick="viewDocument(${doc.id})">
                        <i class="fas fa-eye"></i> Consulter
                    </button>
                    <button class="btn btn-download" onclick="downloadDocument(${doc.id})">
                        <i class="fas fa-download"></i> Télécharger
                    </button>
                    ${isAdmin ? `
                    <button class="btn btn-delete" onclick="deleteDocument(${doc.id})">
                        <i class="fas fa-trash"></i> Supprimer
                    </button>
                    ` : ''}
                </div>
            </div>
        </div>
        `;
    });
    
    documentsGrid.innerHTML = documentsHTML;
}

// Fonction pour charger le sélecteur de promotions
function loadPromoSelect() {
    const promoSelect = document.getElementById('promoSelect');
    const studentPromoSelect = document.getElementById('studentPromo');
    
    // Générer les 40 dernières promotions
    const promotions = generatePromotions();
    
    // Vider les options existantes
    promoSelect.innerHTML = '<option value="all">Toutes les promotions</option>';
    studentPromoSelect.innerHTML = '';
    
    // Ajouter les options de promotion
    promotions.forEach(promo => {
        promoSelect.innerHTML += `<option value="${promo}">Promotion ${promo}</option>`;
        studentPromoSelect.innerHTML += `<option value="${promo}">${promo}</option>`;
    });
    
    // Sélectionner l'année en cours par défaut dans le formulaire d'ajout
    studentPromoSelect.value = currentYear;
}

// Fonction pour charger les étudiants
function loadStudents() {
    const studentsGrid = document.getElementById('studentsGrid');
    
    // Filtrer les étudiants
    let filteredStudents = students.filter(student => {
        // Filtre par promotion
        if (currentPromoFilter !== 'all' && student.promo != currentPromoFilter) {
            return false;
        }
        
        return true;
    });
    
    // Générer le HTML pour les étudiants
    let studentsHTML = '';
    
    filteredStudents.forEach(student => {
        const studentImage = student.image || defaultStudentImage;
        
        studentsHTML += `
        <div class="student-card" data-id="${student.id}">
            <div class="student-header">
                <div class="student-avatar">
                    <img src="${studentImage}" alt="${student.firstName} ${student.lastName}">
                </div>
                <div class="student-name">${student.firstName} ${student.lastName}</div>
                <div class="student-promo">Promotion ${student.promo}</div>
                ${student.president ? '<div class="president-badge">Président de promotion</div>' : ''}
            </div>
            <div class="student-details">
                <div class="student-detail">
                    <i class="fas fa-briefcase"></i>
                    <div>
                        <strong>Poste:</strong> ${student.position}<br>
                        <strong>Entreprise:</strong> ${student.company}
                    </div>
                </div>
                <div class="student-detail">
                    <i class="fas fa-address-book"></i>
                    <div>
                        <strong>Contacts:</strong>
                        <div class="student-contact-info">
                            <span class="contact-item"><i class="fas fa-envelope"></i> ${student.email}</span>
                            ${student.phone ? `<span class="contact-item"><i class="fas fa-phone"></i> ${student.phone}</span>` : ''}
                            ${student.whatsapp ? `<span class="contact-item"><i class="fab fa-whatsapp"></i> ${student.whatsapp}</span>` : ''}
                        </div>
                    </div>
                </div>
                ${isAdmin ? `
                <div class="student-actions" style="margin-top: 15px;">
                    <button class="btn btn-delete" onclick="deleteStudent(${student.id})" style="width: 100%;">
                        <i class="fas fa-trash"></i> Supprimer
                    </button>
                </div>
                ` : ''}
            </div>
        </div>
        `;
    });
    
    studentsGrid.innerHTML = studentsHTML;
}

// Fonction pour ajouter un nouveau document
function addNewDocument() {
    const title = document.getElementById('docTitle').value;
    const author = document.getElementById('docAuthor').value;
    const year = parseInt(document.getElementById('docYear').value);
    const type = document.getElementById('docType').value;
    const description = document.getElementById('docDescription').value;
    const fileInput = document.getElementById('documentFile');
    
    // Vérifier qu'un fichier a été sélectionné
    if (!fileInput.files || !fileInput.files[0]) {
        alert('Veuillez sélectionner un fichier à uploader.');
        return;
    }
    
    const file = fileInput.files[0];
    
    // Vérifier la taille du fichier (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        alert('Le fichier est trop volumineux. La taille maximale est de 10MB.');
        return;
    }
    
    const fileName = file.name;
    const fileSize = (file.size / (1024*1024)).toFixed(2) + ' MB';
    const fileType = file.type;
    
    // Convertir le fichier en base64
    const reader = new FileReader();
    reader.onload = function(e) {
        const base64Data = e.target.result.split(',')[1]; // Retirer le préfixe data:...
        
        // Créer un nouvel ID
        const newId = documents.length > 0 ? Math.max(...documents.map(d => d.id)) + 1 : 1;
        
        // Créer le nouvel objet document
        const newDocument = {
            id: newId,
            title: title,
            author: author || "Auteur inconnu",
            year: year,
            type: type,
            description: description || "Aucune description disponible",
            image: defaultDocumentImages[type],
            fileData: base64Data,
            fileName: fileName,
            fileSize: fileSize,
            fileType: fileType
        };
        
        // Ajouter le document au tableau
        documents.push(newDocument);
        
        // Mettre à jour le localStorage
        localStorage.setItem('agroeco-documents', JSON.stringify(documents));
        
        // Recharger la liste des documents
        loadDocuments();
        
        // Fermer la modale et réinitialiser le formulaire
        closeModal('addDocumentModal');
        
        // Afficher un message de confirmation
        alert('Document ajouté avec succès! Le fichier a été enregistré.');
    };
    
    reader.readAsDataURL(file);
}

// Fonction pour ajouter un nouvel étudiant
function addNewStudent() {
    const lastName = document.getElementById('studentLastName').value;
    const firstName = document.getElementById('studentFirstName').value;
    const promo = parseInt(document.getElementById('studentPromo').value);
    const email = document.getElementById('studentEmail').value;
    const phone = document.getElementById('studentPhone').value;
    const whatsapp = document.getElementById('studentWhatsApp').value;
    const position = document.getElementById('studentPosition').value;
    const company = document.getElementById('studentCompany').value;
    const president = document.getElementById('studentPresident').checked;
    
    // Récupérer l'image si elle a été sélectionnée
    const photoInput = document.getElementById('studentPhoto');
    let studentImage = defaultStudentImage;
    
    if (photoInput.files && photoInput.files[0]) {
        const file = photoInput.files[0];
        
        // Vérifier la taille du fichier (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('La photo est trop volumineuse. La taille maximale est de 5MB.');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            // Stocker l'image en base64
            studentImage = e.target.result;
            saveStudentWithImage(studentImage);
        };
        reader.readAsDataURL(file);
    } else {
        saveStudentWithImage(studentImage);
    }
    
    function saveStudentWithImage(image) {
        // Créer un nouvel ID
        const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
        
        // Créer le nouvel objet étudiant
        const newStudent = {
            id: newId,
            lastName: lastName,
            firstName: firstName,
            promo: promo,
            email: email,
            phone: phone || "",
            whatsapp: whatsapp || "",
            position: position || "Non spécifié",
            company: company || "Non spécifié",
            image: image,
            president: president
        };
        
        // Ajouter l'étudiant au tableau
        students.push(newStudent);
        
        // Mettre à jour le localStorage
        localStorage.setItem('agroeco-students', JSON.stringify(students));
        
        // Recharger les filtres et la liste des étudiants
        loadPromoSelect();
        loadStudents();
        
        // Fermer la modale et réinitialiser le formulaire
        closeModal('addStudentModal');
        
        // Afficher un message de confirmation
        alert('Étudiant ajouté avec succès à l\'annuaire!');
    }
}

// Fonction pour supprimer un document
function deleteDocument(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
        // Filtrer le document à supprimer
        documents = documents.filter(doc => doc.id !== id);
        
        // Mettre à jour le localStorage
        localStorage.setItem('agroeco-documents', JSON.stringify(documents));
        
        // Recharger la liste des documents
        loadDocuments();
        
        // Afficher un message de confirmation
        alert('Document supprimé avec succès!');
    }
}

// Fonction pour supprimer un étudiant
function deleteStudent(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet étudiant de l\'annuaire ?')) {
        // Filtrer l'étudiant à supprimer
        students = students.filter(student => student.id !== id);
        
        // Mettre à jour le localStorage
        localStorage.setItem('agroeco-students', JSON.stringify(students));
        
        // Recharger les filtres et la liste des étudiants
        loadPromoSelect();
        loadStudents();
        
        // Afficher un message de confirmation
        alert('Étudiant supprimé avec succès!');
    }
}

// Fonction pour visualiser un document
function viewDocument(id) {
    const document = documents.find(doc => doc.id === id);
    
    if (!document.fileData) {
        alert('Ce document n\'a pas de fichier associé.');
        return;
    }
    
    // Créer une fenêtre de visualisation
    const viewerWindow = window.open('', '_blank');
    viewerWindow.document.write(`
        <html>
        <head>
            <title>${document.title}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { color: #1a5f7a; }
                .meta { color: #666; margin-bottom: 20px; }
                .actions { margin-top: 20px; }
                button { padding: 10px 20px; background: #1a5f7a; color: white; border: none; border-radius: 5px; cursor: pointer; }
            </style>
        </head>
        <body>
            <h1>${document.title}</h1>
            <div class="meta">
                <p><strong>Auteur:</strong> ${document.author}</p>
                <p><strong>Année:</strong> ${document.year}</p>
                <p><strong>Type:</strong> ${document.type}</p>
                <p><strong>Taille:</strong> ${document.fileSize}</p>
            </div>
            <div class="description">
                <h3>Description:</h3>
                <p>${document.description}</p>
            </div>
            <div class="actions">
                <button onclick="downloadFromViewer()">Télécharger</button>
            </div>
            <script>
                function downloadFromViewer() {
                    const link = document.createElement('a');
                    link.href = 'data:${document.fileType};base64,${document.fileData}';
                    link.download = '${document.fileName}';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            <\/script>
        </body>
        </html>
    `);
    viewerWindow.document.close();
}

// Fonction pour télécharger un document
function downloadDocument(id) {
    const document = documents.find(doc => doc.id === id);
    
    if (!document.fileData) {
        alert('Ce document n\'a pas de fichier associé.');
        return;
    }
    
    try {
        // Créer un lien de téléchargement avec les données base64
        const link = document.createElement('a');
        link.href = `data:${document.fileType};base64,${document.fileData}`;
        link.download = document.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        alert(`Téléchargement du document "${document.title}" lancé!`);
    } catch (error) {
        console.error('Erreur lors du téléchargement:', error);
        alert('Erreur lors du téléchargement du document.');
    }
}

// Fonction pour exporter les étudiants en Excel
function exportStudentsToExcel() {
    // Préparer les données pour Excel
    const excelData = students.map(student => ({
        'ID': student.id,
        'Nom': student.lastName,
        'Prénom': student.firstName,
        'Promotion': student.promo,
        'Email': student.email,
        'Téléphone': student.phone || '',
        'WhatsApp': student.whatsapp || '',
        'Poste actuel': student.position || '',
        'Entreprise': student.company || '',
        'Président de promotion': student.president ? 'Oui' : 'Non'
    }));
    
    // Créer une feuille de calcul
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Annuaire Agroéconomie');
    
    // Générer le fichier Excel
    const fileName = `annuaire_agroeconomie_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
    
    alert(`Fichier Excel "${fileName}" téléchargé avec succès!`);
}

// Fonction pour ouvrir une modale
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

// Fonction pour fermer une modale
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        // Réinitialiser le formulaire si une fonction est définie
        if (modalResetFunctions[modalId]) {
            modalResetFunctions[modalId]();
        }
    }
}