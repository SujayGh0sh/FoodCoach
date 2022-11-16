const router = require("express").Router();
const User = require("../Models/User");

//Get the current token

router.get("/:uname", async (req, res) => {

    try {

        const user = await User.findOne({ _id: req.params.uname });
        !user && res.status(400).json("Wrong credentials!");

        console.log(user.tokenId)
        res.status(200).json({ tokenId: user.tokenId });
    }
    catch (err) {
        res.status(500).json(err);
    }


})
//LOGIN
router.put("/", async (req, res) => {

    try {

        const user = await User.findOne({ _id: req.body._id });
        !user && res.status(400).json("Wrong credentials!");

        user.tokenId = req.body.tokenId;
        console.log(user.tokenId)
        user.save()
        const { password, ...others } = user._doc;

        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
})



module.exports = router;