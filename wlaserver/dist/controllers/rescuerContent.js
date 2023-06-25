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
//# sourceMappingURL=rescuerContent.js.map