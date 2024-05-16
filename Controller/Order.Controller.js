const Cart = require("../Model/Cart.Model");
const Order = require("../Model/Order.Model");

exports.placeOrder = async (req, res) => {
    try {
        const { cart, user } = req.body;

        let totalAmount = 0;
        cart.items.forEach((item) => {
            totalAmount += parseFloat(item.price);
        });

        const order = new Order({
            user: user._id,
            cart: cart._id,
            totalAmount,
        });

        await order.save();
        await Cart.findByIdAndDelete(cart._id);

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({});
        if (!orders) {
            return res.status(404).json({ message: "Orders Not Found" });
        }
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
