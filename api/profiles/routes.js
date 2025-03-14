const { Router } = require('express');
const controller = require('./controllers/controller');

const router = Router();

router.get("/", controller.getProfiles);
router.get("/:id", controller.getProfileById);
router.post("/", controller.createProfile);
router.put("/:id", controller.updateProfile);
router.delete("/:id", controller.deleteProfile);

router.post("/:id/experience", controller.addExperience);
router.delete("/:id/experience/:exp", controller.deleteExperience);
router.post("/:id/skills", controller.addSkill);
router.delete("/:id/skills/:skill", controller.deleteSkill);
router.put("/:id/information", controller.updateInformation);

module.exports = router;
