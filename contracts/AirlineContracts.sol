// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract AirlineContracts {
    address public admin;

    struct Booking {
        bool booked;
        uint256 flightID;
        bool checkedIn;
        bool insured;
        uint256 insuranceTier;  // 1 = Basic, 2 = Pro, 3 = Full
        uint256 bagStatus;
        string flightStatus;
        uint256 departureTime;
    }

    mapping(address => Booking) public bookings;

    constructor() {
        admin = msg.sender;
    }

    function bookFlight(uint256 id) external {
        Booking storage b = bookings[msg.sender];
        b.booked = true;
        b.flightID = id;
        b.flightStatus = "Scheduled";
        b.departureTime = block.timestamp + 3 hours;
    }

    function checkIn() external {
        require(bookings[msg.sender].booked, "Book flight first");
        bookings[msg.sender].checkedIn = true;
    }

    function buyInsurance(uint256 tier) external payable {
        require(bookings[msg.sender].booked, "Book flight first");
        require(tier >= 1 && tier <= 3, "Invalid tier");

        uint256 cost = 0;
        if (tier == 1) cost = 0.005 ether;
        if (tier == 2) cost = 0.01 ether;
        if (tier == 3) cost = 0.02 ether;

        require(msg.value == cost, "Incorrect ETH amount");

        bookings[msg.sender].insured = true;
        bookings[msg.sender].insuranceTier = tier;
    }

    function updateBaggage(address p, uint256 s) external {
        require(msg.sender == admin, "Admin only");
        bookings[p].bagStatus = s;
    }

    function updateFlightStatus(address p, string memory s) external {
        require(msg.sender == admin, "Admin only");
        bookings[p].flightStatus = s;
    }

    function updateDepartureTime(address p, uint256 t) external {
        require(msg.sender == admin, "Admin only");
        bookings[p].departureTime = t;
    }
}
