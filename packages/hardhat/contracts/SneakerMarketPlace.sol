// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";

contract SneakerMarketplace {
    using Counters for Counters.Counter;
    Counters.Counter private _sneakerIds;
    Counters.Counter private _swapIds;

    address payable public owner;

    struct Sneaker {
        uint256 id;
        address owner;
        string name;
        string imageUrl;
        string color;
        string size;
        bool listed;
    }

    struct SwapRequest {
        uint256 id;
        address requester;
        address owner;
        uint256 mySneakerId;
        uint256 theirSneakerId;
        bool approved;
    }

    mapping(uint256 => Sneaker) public sneakers;
    mapping(uint256 => SwapRequest) public swapRequests;
    uint256[] public allSwapRequestIds;

    event SneakerListed(uint256 indexed sneakerId, address indexed owner, string name, string imageUrl, string color, string size);
    event SwapRequested(uint256 indexed requestId, address indexed requester, address indexed owner, uint256 mySneakerId, uint256 theirSneakerId);
    event SwapApproved(uint256 indexed requestId);
    event SneakerTransferred(uint256 indexed sneakerId, address indexed from, address indexed to);

    constructor() {
        owner = payable(msg.sender);
    }

    function createSneaker(string memory name, string memory imageUrl, string memory color, string memory size) public {
        _sneakerIds.increment();
        uint256 newSneakerId = _sneakerIds.current();
        sneakers[newSneakerId] = Sneaker(newSneakerId, msg.sender, name, imageUrl, color, size, false);
        emit SneakerListed(newSneakerId, msg.sender, name, imageUrl, color, size);
    }

    function listSneaker(uint256 sneakerId) public {
        require(sneakers[sneakerId].owner == msg.sender, "Only the owner can list the sneaker");
        require(!sneakers[sneakerId].listed, "Sneaker is already listed");
        sneakers[sneakerId].listed = true;
    }

    function swapSneaker(uint256 mySneakerId, address otherUser, uint256 theirSneakerId) public {
        require(msg.sender != otherUser, "Cannot swap with yourself");
        require(sneakers[mySneakerId].owner == msg.sender, "You do not own the selected sneaker");
        require(sneakers[theirSneakerId].owner == otherUser, "The other user does not own the selected sneaker");
        require(sneakers[mySneakerId].listed, "Sneaker must be listed to be requested for a swap");

        // Swap the ownership of the sneakers directly
        sneakers[mySneakerId].owner = otherUser;
        sneakers[theirSneakerId].owner = msg.sender;

        sneakers[mySneakerId].listed = false;
        sneakers[theirSneakerId].listed = false;

        emit SneakerTransferred(mySneakerId, msg.sender, sneakers[mySneakerId].owner);
        emit SneakerTransferred(theirSneakerId, sneakers[theirSneakerId].owner, msg.sender);
    }

    /**
     * @dev Get a list of sneakers owned by the caller.
     * @return An array of Sneaker structs representing the user's sneakers.
     */
    function getMySneakers() public view returns (Sneaker[] memory) {
        uint256 totalSneakers = _sneakerIds.current();
        uint256 mySneakerCount = 0;

        for (uint256 i = 1; i <= totalSneakers; i++) {
            if (sneakers[i].owner == msg.sender) {
                mySneakerCount++;
            }
        }

        Sneaker[] memory mySneakers = new Sneaker[](mySneakerCount);
        uint256 currentIndex = 0;

        for (uint256 i = 1; i <= totalSneakers; i++) {
            if (sneakers[i].owner == msg.sender) {
                mySneakers[currentIndex] = sneakers[i];
                currentIndex++;
            }
        }

        return mySneakers;
    }

    function getSwapRequestLength() public view returns (uint256) {
        return allSwapRequestIds.length;
    }

    function getAllSwapRequests() public view returns (SwapRequest[] memory) {
        uint256 totalRequests = allSwapRequestIds.length;
        SwapRequest[] memory allRequests = new SwapRequest[](totalRequests);

        for (uint256 i = 0; i < totalRequests; i++) {
            uint256 requestId = allSwapRequestIds[i];
            allRequests[i] = swapRequests[requestId];
        }

        return allRequests;
    }

    function getMySwapRequests() public view returns (SwapRequest[] memory) {
        uint256 totalRequests = allSwapRequestIds.length;
        uint256 myRequestsCount = 0;

        for (uint256 i = 0; i < totalRequests; i++) {
            uint256 requestId = allSwapRequestIds[i];
            if (swapRequests[requestId].requester == msg.sender || swapRequests[requestId].owner == msg.sender) {
                myRequestsCount++;
            }
        }

        SwapRequest[] memory myRequests = new SwapRequest[](myRequestsCount);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalRequests; i++) {
            uint256 requestId = allSwapRequestIds[i];
            if (swapRequests[requestId].requester == msg.sender || swapRequests[requestId].owner == msg.sender) {
                myRequests[currentIndex] = swapRequests[requestId];
                currentIndex++;
            }
        }

        return myRequests;
    }

    /**
     * @dev Get a list of all sneakers currently listed in the marketplace.
     * @return An array of Sneaker structs representing the listed sneakers.
     */
    function getListedSneakers() public view returns (Sneaker[] memory) {
        uint256 totalSneakers = _sneakerIds.current();
        uint256 listedSneakerCount = 0;

        for (uint256 i = 1; i <= totalSneakers; i++) {
            if (sneakers[i].listed) {
                listedSneakerCount++;
            }
        }

        Sneaker[] memory listedSneakers = new Sneaker[](listedSneakerCount);
        uint256 currentIndex = 0;


