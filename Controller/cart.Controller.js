const Cart = require("../Model/Cart.Model");

exports.addToCart = async (req, res) => {
    const { item, user } = req.body;

    await Cart.findOne({ user })
        .then(async cart => {
            if (cart) {
                // If cart exists, update the cart with the new item
                await Cart.findByIdAndUpdate(
                    cart._id,
                    { $push: { items: item } },
                    { new: true }
                )
                    .then(updatedCart => {
                        res.status(200).json({
                            message: 'Item added to cart successfully',
                            cart: updatedCart
                        });
                    })
                    .catch(err => {
                        res.status(500).json({ message: err.message });
                    });
            } else {
                // If no cart exists, create a new cart for the user
                const newCart = new Cart({
                    user,
                    items: [item]
                });
                await newCart.save()
                    .then(savedCart => {
                        res.status(201).json({
                            message: 'Cart created and item added successfully',
                            cart: savedCart
                        });
                    })
                    .catch(err => {
                        res.status(500).json({ message: err.message });
                    });
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
};

exports.removeFromCart = async (req, res) => {
    const { user, item } = req.body;

    // Find the cart for the user
    await Cart.findOne({ user })
        .then(async cart => {
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            // Remove the item from the cart's items array
            const updatedItems = cart.items.filter(itemId => itemId.toString() !== item._id);

            // Update the cart with the new items array
            await Cart.findByIdAndUpdate(
                cart._id,
                { items: updatedItems },
                { new: true }
            )
                .then(updatedCart => {
                    res.status(200).json({
                        message: 'Item removed from cart successfully',
                        cart: updatedCart
                    });
                })
                .catch(err => {
                    res.status(500).json({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
};



exports.viewCart = async (req, res) => {
    const { user } = req.body;
    try {
        const cart = await Cart.findOne({ user }).populate('items').exec();
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json({ cart });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
