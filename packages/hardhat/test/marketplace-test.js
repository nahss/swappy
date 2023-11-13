const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SneakerMarketplace", function () {
    let SneakerMarketplace;
    let sneakerMarketplace;
    let owner;
    let user1;
    let user2;

    beforeEach(async function () {
        [owner, user1, user2] = await ethers.getSigners();
        SneakerMarketplace = await ethers.getContractFactory("SneakerMarketplace");
        sneakerMarketplace = await SneakerMarketplace.deploy();
        await sneakerMarketplace.deployed();
    });

    it("Should create a sneaker and list it", async function () {
        await sneakerMarketplace.connect(user1).createSneaker("Nike Air", "nike.com/image", "Red", "10");
        const sneaker = await sneakerMarketplace.sneakers(1);
        expect(sneaker.owner).to.equal(user1.address);
        expect(sneaker.listed).to.equal(false);

        await sneakerMarketplace.connect(user1).listSneaker(1);
        const listedSneaker = await sneakerMarketplace.sneakers(1);
        expect(listedSneaker.listed).to.equal(true);
    });

    it("Should request a swap and approve it", async function () {
        await sneakerMarketplace.connect(user1).createSneaker("Adidas Superstar", "adidas.com/image", "Blue", "9");
        await sneakerMarketplace.connect(user2).createSneaker("Puma Suede", "puma.com/image", "Black", "11");
        await sneakerMarketplace.connect(user1).listSneaker(1);
        await sneakerMarketplace.connect(user2).listSneaker(2);

        await sneakerMarketplace.connect(user1).requestSwap(1, user2.address, 2);
        const swapRequest = await sneakerMarketplace.swapRequests(1);
        expect(swapRequest.requester).to.equal(user1.address);
        expect(swapRequest.owner).to.equal(user2.address);
        expect(swapRequest.approved).to.equal(false);

        await sneakerMarketplace.connect(user2).approveSwap(1);
        const approvedSwapRequest = await sneakerMarketplace.swapRequests(1);
        expect(approvedSwapRequest.approved).to.equal(true);

        const mySneaker = await sneakerMarketplace.sneakers(1);
        const theirSneaker = await sneakerMarketplace.sneakers(2);
        expect(mySneaker.owner).to.equal(user2.address);
        expect(theirSneaker.owner).to.equal(user1.address);
    });

    it("Should get the list of my sneakers", async function () {
        await sneakerMarketplace.connect(user1).createSneaker("Reebok Classic", "reebok.com/image", "White", "8");
        await sneakerMarketplace.connect(user1).createSneaker("Converse Chuck Taylor", "converse.com/image", "Green", "9");
        await sneakerMarketplace.connect(user2).createSneaker("Vans Old Skool", "vans.com/image", "Black", "10");

        const mySneakers = await sneakerMarketplace.connect(user1).getMySneakers();
        expect(mySneakers.length).to.equal(2);
    });

    it("Should get the list of listed sneakers", async function () {
        await sneakerMarketplace.connect(user1).createSneaker("New Balance 990", "newbalance.com/image", "Gray", "11");
        await sneakerMarketplace.connect(user1).createSneaker("Under Armour HOVR", "underarmour.com/image", "Black", "12");
        await sneakerMarketplace.connect(user2).createSneaker("Skechers D'Lites", "skechers.com/image", "White", "7");

        await sneakerMarketplace.connect(user1).listSneaker(1);
        await sneakerMarketplace.connect(user2).listSneaker(3);

        const listedSneakers = await sneakerMarketplace.getListedSneakers();
        expect(listedSneakers.length).to.equal(2);
    });
});
