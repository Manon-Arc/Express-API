const mongoose = require('mongoose');
const Profile = require('../models/User');

// Vérification de l'ID avant chaque requête
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Récupérer tous les profils (hors profils supprimés) et gère plusieurs filtres
exports.getProfiles = async (req, res) => {
    try {
        const { search, skills, entreprise, localisation, titre } = req.query;
        let filters = { isDeleted: false };

        if (search) {
            filters.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { "information.bio": { $regex: search, $options: "i" } },
                { "information.localisation": { $regex: search, $options: "i" } },
                { "information.siteWeb": { $regex: search, $options: "i" } }
            ];
        }

        if (skills) {
            filters.skills = { $in: skills.split(",") };
        }

        if (entreprise) {
            filters["experience"] = { 
                $elemMatch: { entreprise: { $regex: entreprise, $options: "i" } } 
            };
        }

        if (titre) {
            filters["experience"] = { 
                $elemMatch: { titre: { $regex: titre, $options: "i" } } 
            };
        }

        if (localisation) {
            filters["information.localisation"] = { $regex: localisation, $options: "i" };
        }

        const profiles = await Profile.find(filters)
            .select("name email skills experience information")
            .lean();

        res.json(profiles);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};


// Récupérer un profil par ID
exports.getProfileById = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    try {
        const profile = await Profile.findById(id);
        if (!profile || profile.isDeleted) {
            return res.status(404).json({ error: "Profil non trouvé" });
        }
        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.createProfile = async (req, res) => {
    try {
        // Création d'un nouvel objet avec toutes les données reçues
        const profile = new Profile({
            name: req.body.name,
            email: req.body.email,
            skills: req.body.skills || [], // Si non fourni, met un tableau vide
            experience: req.body.experience || [], // Si non fourni, met un tableau vide
            information: req.body.information || {} // Si non fourni, met un objet vide
        });

        // Sauvegarde en base de données
        await profile.save();
        res.status(201).json(profile);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// Mettre à jour un profil (nom et email)
exports.updateProfile = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    try {
        const profile = await Profile.findByIdAndUpdate(id, req.body, { new: true });
        if (!profile) {
            return res.status(404).json({ error: "Profil non trouvé" });
        }
        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Supprimer un profil (Hard Delete)
exports.deleteProfile = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    try {
        const profile = await Profile.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        if (!profile) {
            return res.status(404).json({ error: "Profil non trouvé" });
        }
        res.json({ message: "Profil supprimé" });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Ajouter une expérience
exports.addExperience = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    try {
        const profile = await Profile.findById(id);
        if (!profile) {
            return res.status(404).json({ error: "Profil non trouvé" });
        }

        profile.experience.push(req.body);
        await profile.save();
        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Supprimer une expérience
exports.deleteExperience = async (req, res) => {
    const { id, exp } = req.params;

    if (!isValidObjectId(id) || !isValidObjectId(exp)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    try {
        const profile = await Profile.findById(id);
        if (!profile) {
            return res.status(404).json({ error: "Profil non trouvé" });
        }

        profile.experience = profile.experience.filter(e => e._id.toString() !== exp);
        await profile.save();
        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Ajouter une compétence
exports.addSkill = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    try {
        const profile = await Profile.findById(id);
        if (!profile) {
            return res.status(404).json({ error: "Profil non trouvé" });
        }

        profile.skills.push(req.body.skill);
        await profile.save();
        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Supprimer une compétence
exports.deleteSkill = async (req, res) => {
    const { id, skill } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    try {
        const profile = await Profile.findById(id);
        if (!profile) {
            return res.status(404).json({ error: "Profil non trouvé" });
        }

        profile.skills = profile.skills.filter(s => s !== skill);
        await profile.save();
        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Mettre à jour les informations
exports.updateInformation = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    try {
        const profile = await Profile.findById(id);
        if (!profile) {
            return res.status(404).json({ error: "Profil non trouvé" });
        }

        profile.information = req.body;
        await profile.save();
        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
