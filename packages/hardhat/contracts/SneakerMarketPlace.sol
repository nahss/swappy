// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";

contract SneakerMarketplace {
    using Counters for Counters.Counter;
    Counters.Counter private _sneakerIds;
    Counters.Counter private _swapIds;

    address payable owner;

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

//    temporarily disabling this feature

    // function requestSwap(uint256 mySneakerId, address otherUser, uint256 theirSneakerId) public {
    //     require(msg.sender != otherUser, "Cannot swap with yourself");
    //     require(sneakers[mySneakerId].owner == msg.sender, "You do not own the selected sneaker");
    //     require(sneakers[theirSneakerId].owner == otherUser, "The other user does not own the selected sneaker");
    //     require(sneakers[mySneakerId].listed, "Sneaker must be listed to be requested for a swap");

    //     _swapIds.increment();
    //     uint256 newSwapId = _swapIds.current();
    //     swapRequests[newSwapId] = SwapRequest(newSwapId, msg.sender, otherUser, mySneakerId, theirSneakerId, false);
    //     allSwapRequestIds.push(newSwapId);
    //     emit SwapRequested(newSwapId, msg.sender, otherUser, mySneakerId, theirSneakerId);
    // }

    // function approveSwap(uint256 requestId) public {
    //     uint256 mySneakerId = swapRequests[requestId].mySneakerId;
    //     uint256 theirSneakerId = swapRequests[requestId].theirSneakerId;

    //     require(sneakers[theirSneakerId].owner == msg.sender, "Only the owner can approve the swap");
    //     require(!swapRequests[requestId].approved, "Swap request has already been approved");

    //     // Swap the ownership of the sneakers directly
    //     sneakers[mySneakerId].owner = swapRequests[requestId].owner;
    //     sneakers[theirSneakerId].owner = swapRequests[requestId].requester;

    //     swapRequests[requestId].approved = true;
    //     sneakers[mySneakerId].listed = false;
    //     sneakers[theirSneakerId].listed = false;

    //     emit SwapApproved(requestId);
    //     emit SneakerTransferred(mySneakerId, msg.sender, sneakers[mySneakerId].owner);
    //     emit SneakerTransferred(theirSneakerId, sneakers[theirSneakerId].owner, msg.sender);
    // }


    function swapSneaker (uint256 mySneakerId, address otherUser, uint256 theirSneakerId) public {
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
        uint totalSneakers = _sneakerIds.current();
        uint sneakerCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalSneakers; i++) {
            if (sneakers[i + 1].owner == msg.sender) {
                sneakerCount += 1;
            }
        }

        Sneaker[] memory mySneakers = new Sneaker[](sneakerCount);
        for (uint i = 0; i < totalSneakers; i++) {
            if (sneakers[i + 1].owner == msg.sender) {
                uint currentId = i + 1;
                Sneaker storage currentSneaker = sneakers[currentId];
                mySneakers[currentIndex] = currentSneaker;
                currentIndex += 1;
            }
        }

        return mySneakers;
    }

    function getSwapRequestLength() public view returns (uint) {
        return allSwapRequestIds.length;
    }

    function getAllSwapRequests() public view returns (SwapRequest[] memory) {
        uint totalRequests = allSwapRequestIds.length;
        SwapRequest[] memory allRequests = new SwapRequest[](totalRequests);

        for (uint i = 0; i < totalRequests; i++) {
            uint requestId = allSwapRequestIds[i];
            allRequests[i] = swapRequests[requestId];
        }

        return allRequests;
    }

    function getMySwapRequests() public view returns (SwapRequest[] memory) {
        uint totalRequests = allSwapRequestIds.length;
        uint requestCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalRequests; i++) {
            uint requestId = allSwapRequestIds[i];
            if (swapRequests[requestId].requester == msg.sender || swapRequests[requestId].owner == msg.sender) {
                requestCount += 1;
            }
        }

        SwapRequest[] memory myRequests = new SwapRequest[](requestCount);
        for (uint i = 0; i < totalRequests; i++) {
            uint requestId = allSwapRequestIds[i];
            if (swapRequests[requestId].requester == msg.sender || swapRequests[requestId].owner == msg.sender) {
                myRequests[currentIndex] = swapRequests[requestId];
                currentIndex += 1;
            }
        }

        return myRequests;
    }

    /**
    * @dev Get a list of all sneakers currently listed in the marketplace.
     * @return An array of Sneaker structs representing the listed sneakers.
     */
    function getListedSneakers() public view returns (Sneaker[] memory) {
        uint totalSneakers = _sneakerIds.current();
        uint listedSneakerCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalSneakers; i++) {
            if (sneakers[i + 1].listed) {
                listedSneakerCount += 1;
            }
        }

        Sneaker[] memory listedSneakers = new Sneaker[](listedSneakerCount);
        for (uint i = 0; i < totalSneakers; i++) {
            if (sneakers[i + 1].listed) {
                uint currentId = i + 1;
                Sneaker storage currentSneaker = sneakers[currentId];
                listedSneakers[currentIndex] = currentSneaker;
                currentIndex += 1;
            }
        }

        return listedSneakers;
    }
}
