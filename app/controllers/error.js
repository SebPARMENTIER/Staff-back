module.exports = {

    resourceNotFound(_, res){
        res.status(404).json({
            data: [],
            error: "Cette ressource est introuvable"
        });
    }
};