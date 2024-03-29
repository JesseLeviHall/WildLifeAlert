import { Router } from "express";
import * as homeScreenContent from "../controllers/homeScreenContent.js";
import uploadMultiple from "../middlewares/photoUpload.js";
export const homeRouter = Router();
homeRouter.get("/homescreen", homeScreenContent.homeScreenContent);
homeRouter.put("/updatehomecont", homeScreenContent.updateHomeScreenContent);
homeRouter.get("/publicmapscreen", homeScreenContent.publicMapContent);
homeRouter.put("/updatepublicmapcont", homeScreenContent.updatePublicMapContent);
homeRouter.get("/publicmapgeopos", homeScreenContent.publicMapGeoPos);
homeRouter.post("/postalert", uploadMultiple, homeScreenContent.newAlert);
homeRouter.post("/postresource", homeScreenContent.updateResourcesContent);
homeRouter.get("/getresources", homeScreenContent.resourcesContent);
homeRouter.post("/updateabout", homeScreenContent.updateAboutContent);
homeRouter.get("/getabout", homeScreenContent.aboutContent);
homeRouter.get("/getpolicies", homeScreenContent.privacyPolicyContent);
homeRouter.put("/updatepolicies", homeScreenContent.updatePrivacyPolicyContent);
homeRouter.post("/addblockemail", homeScreenContent.addBlockEmail);
//# sourceMappingURL=homeRoute.js.map