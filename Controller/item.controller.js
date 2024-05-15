const { Item } = require("../Model/items.model");

// Controller to create a new item
exports.createItem = async (req, res) => {
    try {
        const { productName, price, imgUrl, description, category } = req.body;
        if (
            productName === "" ||
            price === "" ||
            imgUrl === "" ||
            description === "" ||
            category === ""
        ){
            return res.status(400).json({ message: "All fields are required" });
        }
        const newItem = new Item({
            productName,
            price,
            imgUrl,
            description,
            category,
        });
        await newItem.save();
        res.status(201).json({ message: "Item created successfully"});
    } catch (error) {
        return res.status(500).json({ message: "server error" });
    }
};

// Controller to get all items
exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find({});
        res.status(200).json(items);
    } catch (error) {
        return res.status(500).json({ message: "server error" });
    }
};

// Controller to delete an item
exports.deleteItem = async (req, res) => {
    try {
        const itemId = req.body.id;
        const item = await Item.findByIdAndDelete(itemId);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "server error" });
    }
};

// Controller to update an item
exports.updateItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const { productName, price, imgUrl, description, category } = req.body;
        const item = await Item.findByIdAndUpdate(
            itemId,
            { productName, price, imgUrl, description, category },
            { new: true }
        );

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json({ message: "Item updated successfully", item });
    } catch (error) {
        return res.status(500).json({ message: "server error" });
    }
};
