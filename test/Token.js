const { expect } = require("chai");

describe("Token contract", function() {
	it("Deployment should assign the total supply of tokens to the owner", async function() {
		const [owner] = await ethers.getSigners();
		const Token = await ethers.getContractFactory("Token");
		const hhflake = await Token.deploy();
		const ownerBalance = await hhflake.balanceOf(owner.address);

		expect(await hhflake.totalSupply()).to.equal(ownerBalance);
	});
});
