export const checkOrigin = (req, res, next) => {
    const receivedHeader = req.headers["x-wildlifealert"];
    if (!receivedHeader || receivedHeader !== "acceptableRequest") {
        res.status(400).send("Invalid Request");
    }
    else {
        next();
    }
};
//# sourceMappingURL=checkOrigin.js.map