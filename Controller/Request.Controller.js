const { Request } = require("../Model/Request.Model");

exports.createRequest = async (req, res) => {
    try {
        const { user, plan, time } = req.body;
        if (!user || !plan || !time) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newRequest = new Request({
            user,
            plan,
            time,
            approved: false,
        });
        await newRequest.save();
        res.status(201).json({ message: 'Request created successfully' });
    } catch (error) {
        return res.status(500).json({ message: err.message });
    }
};

exports.getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find({})
        res.status(200).json(requests);
    } catch (error) {
        return res.status(500).json({ message: "server error" });
    }
};


// Controller to approve a registration request
exports.approveRequest = async (req, res) => {
    try {
        const requestId = req.params.id;
        const request = await Request.findByIdAndUpdate(
            requestId,
            { approved: true },
            { new: true });
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json({ message: 'Request approved successfully', request });

    } catch (error) {
        return res.status(500).json({ message: "server error" });
    }
};
