// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

error OutOfStock();

contract DeComm {
    enum OrderStatus {
        Placed,
        InChain,
        DeliveryPricePayed,
        DeliveryConfirmByDP,
        Delivered,
        DeliveryDetailsAdded
    }

    uint productId = 1;
    uint orderId = 1;

    struct BuyerDetails {
        string name;
        uint locationPinCode;
        string locationName;
        string contactNumber;
    }

    struct SellerDetails {
        string name;
        uint locationPinCode;
        string locationName;
        string contactNumber;
    }

    struct DeliveryPerson {
        string name;
        string contactNumber;
        string companyName;
        address dpAddress;
        uint employeeID;
    }

    struct Bidding {
        bool started;
        uint endAt;
    }

    struct Product {
        uint productId;
        uint256 price;
        uint256 availableQuantity;
        address payable seller;
    }

    struct Order {
        uint orderId;
        uint quantity;
        address buyer;
        bool bid; //true when available for bidding false when delivery is assigned to delivery person
        address deliveryPerson;
        uint deliveryPrice;
        string deliveryTime;
        uint orderPrice;
        address payable seller;
        Bidding bidding;
        OrderStatus status;
    }

    mapping(uint => Product) public products; // Products mapping

    mapping(address => mapping(uint256 => Order)) public orders; // orders mapping
    mapping(address => uint256) public orderCount;
    mapping(uint => Order) public orderList;

    mapping(address => DeliveryPerson) public deliveryPersons;
    mapping(address => BuyerDetails) public buyers;
    mapping(address => SellerDetails) public sellers;

    address[] public deliverPersonAddressArray;

    modifier onlySellers() {
        require(sellers[msg.sender].locationPinCode != 0, "Access denied");
        _;
    }

    modifier onlyBuyers() {
        require(buyers[msg.sender].locationPinCode != 0, "Access denied");
        _;
    }

    modifier onlyDeliveryPerson() {
        require(deliveryPersons[msg.sender].employeeID != 0, "Access denied");
        _;
    }

    function signUpForBuyer(
        string memory _name,
        uint _locationPinCode,
        string memory _locationName,
        string memory _contactNumber
    ) public {
        require(_locationPinCode != 0, "Enter valid location");
        require(bytes(_contactNumber).length != 0, "Enter valid number");
        require(
            sellers[msg.sender].locationPinCode == 0,
            "Account already exists"
        );
        require(
            bytes(deliveryPersons[msg.sender].contactNumber).length == 0,
            "Accoundt already exists"
        );

        BuyerDetails memory BD;
        BD.name = _name;
        BD.locationPinCode = _locationPinCode;
        BD.locationName = _locationName;
        BD.contactNumber = _contactNumber;
        buyers[msg.sender] = BD;
    }

    function signUpForSeller(
        string memory _name,
        uint _locationPinCode,
        string memory _locationName,
        string memory _contactNumber
    ) public {
        require(_locationPinCode != 0, "Enter valid location");
        require(bytes(_contactNumber).length != 0, "Enter valid number");
        require(
            bytes(deliveryPersons[msg.sender].contactNumber).length == 0,
            "Accoundt already exists"
        );
        require(
            buyers[msg.sender].locationPinCode == 0,
            "Account alreday exists"
        );

        SellerDetails memory SD;
        SD.name = _name;
        SD.locationPinCode = _locationPinCode;
        SD.locationName = _locationName;
        SD.contactNumber = _contactNumber;
        sellers[msg.sender] = SD;
    }

    function signUpForDeliveryPerson(
        string memory _companyName,
        string memory _contactNumber,
        string memory _name,
        uint _empId
    ) public {
        require(bytes(_contactNumber).length != 0, "Enter valid location");
        require(bytes(_companyName).length != 0, "Enter valid location");
        require(bytes(_name).length != 0, "Enter valid location");
        require(
            buyers[msg.sender].locationPinCode == 0,
            "Account alreday exists"
        );
        require(
            sellers[msg.sender].locationPinCode == 0,
            "Account already exists"
        );

        DeliveryPerson memory DP;
        DP.companyName = _companyName;
        DP.contactNumber = _contactNumber;
        DP.name = _name;
        DP.dpAddress = msg.sender;
        DP.employeeID = _empId;
        deliveryPersons[msg.sender] = DP;
        deliverPersonAddressArray.push(msg.sender);
    }

    function regProduct(uint _price, uint _avalQuantity) public onlySellers {
        require(_price != 0, "Price cannot be zero");
        require(_avalQuantity != 0, "Quantity cannot be zero");

        Product memory tempProduct;

        tempProduct.price = _price;
        tempProduct.availableQuantity = _avalQuantity;
        tempProduct.seller = payable(msg.sender);
        tempProduct.productId = productId;

        products[productId] = tempProduct;
        productId++;
    }

    function buyProduct(
        uint _productId,
        uint _quantity
    ) public payable onlyBuyers {
        if (products[_productId].availableQuantity == 0) {
            revert OutOfStock();
        }

        require(
            _quantity <= products[_productId].availableQuantity,
            "Reduce the quantity"
        );
        require(
            msg.value == products[_productId].price * _quantity,
            "Send exact amount"
        );

        Order memory order;

        order.buyer = msg.sender;
        order.quantity = _quantity;
        order.bid = true;
        order.orderId = orderId;
        order.bidding.started = true;
        order.bidding.endAt = block.timestamp + 60 seconds;
        order.orderPrice = products[_productId].price * _quantity;
        order.seller = products[_productId].seller;

        orders[msg.sender][orderId] = order;
        orderList[orderId] = order;
        order.status = OrderStatus.Placed;

        orderCount[msg.sender]++;
        orderId++;

        products[_productId].availableQuantity -= _quantity;
    }

    function addDeliveryDetails(
        uint _orderId,
        address _deliveryPerson,
        string memory _deliveryTime,
        uint _deliveryPrice
    ) private {
        require(
            orderList[_orderId].status == OrderStatus.Placed,
            "Access denied"
        );
        orderList[_orderId].deliveryPerson = _deliveryPerson;
        orderList[_orderId].deliveryTime = _deliveryTime;
        orderList[_orderId].deliveryPrice = _deliveryPrice;
        orderList[_orderId].status = OrderStatus.DeliveryDetailsAdded;
    }

    function payDeliveryPrice(uint _orderId, uint _dprice) public payable {
        require(orderList[_orderId].status == OrderStatus.DeliveryDetailsAdded);
        require(orderList[_orderId].buyer == msg.sender, "Access denied");
        require(
            _dprice == orderList[_orderId].deliveryPrice,
            "Send exact amount"
        );

        orderList[_orderId].status = OrderStatus.DeliveryPricePayed;
    }

    function pickupOrder(uint _orderId) public {
        require(
            orderList[_orderId].deliveryPerson == msg.sender,
            "Access denied"
        );
        require(
            orderList[_orderId].status == OrderStatus.DeliveryDetailsAdded,
            "Order not availbale"
        );

        orderList[_orderId].status = OrderStatus.InChain;
    }

    function confirmDeliveryDP(uint _orderId) public {
        require(
            orderList[_orderId].deliveryPerson == msg.sender,
            "Access denied"
        );
        require(
            orderList[_orderId].status == OrderStatus.InChain,
            "Order is not in chain"
        );

        orderList[_orderId].status = OrderStatus.DeliveryConfirmByDP;
    }

    function confirmDeliveryCustomer(uint _orderId) public payable {
        require(
            msg.value == orderList[_orderId].deliveryPrice,
            "Pay the delivery price"
        );
        require(orderList[_orderId].buyer == msg.sender, "Access denied");
        require(
            orderList[_orderId].status == OrderStatus.DeliveryConfirmByDP,
            "Delivery not confirm by DP"
        );

        orderList[_orderId].status = OrderStatus.Delivered;
    }

    function recieveMoney(uint _orderId) public {
        require(
            orderList[_orderId].deliveryPerson == msg.sender,
            "Access denied"
        );
        require(
            orderList[_orderId].status == OrderStatus.Delivered,
            "Delivery not confirmed by buyer"
        );

        payable(orderList[_orderId].seller).transfer(
            orderList[_orderId].orderPrice
        );
        payable(msg.sender).transfer(orderList[_orderId].deliveryPrice);
    }
}
