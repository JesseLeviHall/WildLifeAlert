//GET /Rescuer Preferences
export const rescuerPrefsContent = async (req, res) => {
    try {
        /*  const rescuerprefscontent = await redisClient.get('rescuerprefscontent');
            res.send(rescuerprefscontent); */
        res.json({ Title: "Rescuer Preferences Functional" });
    }
    catch (error) {
        console.error(error);
    }
};
//PUT /Update Rescuer Preferences
export const updateRescuerPrefs = async (req, res) => {
    try {
        /*  const updaterescuerprefs = await redisClient.get('updaterescuerprefs');
            res.send(updaterescuerprefs); */
        res.json({ Title: "Update Rescuer Preferences Functional" });
    }
    catch (error) {
        console.error(error);
    }
};
//POST /Register new Rescuer
export const registerRescuer = async (req, res) => {
    try {
        /*  const registerrescuer = await redisClient.get('registerrescuer');
            if(
              registerrescuer === null
            )const createDefaultRescuerPrefs = await redisClient.get('createDefaultRescuerPrefs');
            res.send(registerrescuer);
            */
        res.json({ Title: "Register Rescuer Functional" });
    }
    catch (error) {
        console.error(error);
    }
};
//GET /Welcome Rescuer Content
export const welcomeRescuerContent = async (req, res) => {
    try {
        /*  const welcomerescuercontent = await redisClient.get('welcomerescuercontent');
            res.send(welcomerescuercontent); */
        res.json({ Title: "Welcome Rescuer Content Functional" });
    }
    catch (error) {
        console.error(error);
    }
};
//# sourceMappingURL=rescuerContent.js.map