const orders = [
    {
        date: "2005-05-05",
        subtotal: 90.22,
        items: [
            {
                product: {
                    id: 'redshoe',
                    description: 'Old Red Shoe',
                    price: 45.11
                },
                quantity: 2
            }
        ]
    }
]

function getOrdersAll() {
    return orders;
}

module.exports = {
    getOrdersAll
}