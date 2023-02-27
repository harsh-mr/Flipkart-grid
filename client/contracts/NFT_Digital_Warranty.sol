//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT_Digital_Warranty is ERC721URIStorage {

    using Counters for Counters.Counter;
    //_tokenIds variable has the most recent minted tokenId
    Counters.Counter private _tokenIds;
    //Keeps track of the number of items sold on the marketplace
    Counters.Counter private _itemsSold;
    //owner is the contract address that created the smart contract
    //super user(flipkart) 
    address payable owner;
    //The fee charged by the marketplace to be allowed to list an NFT
    // uint256 listPrice = 0.01 ether;

    //The structure to store info about a listed token
    struct ListedToken {
        uint256 tokenId;
        address payable owner;
        address payable seller;
        // uint256 price;
        // bool currentlyListed;
        uint256 expiry;
        uint256 created;
        string serialNo;
        
    }

    //the event emitted when a token is successfully listed 
    event TokenListedSuccess (
        uint256 indexed tokenId,
        address owner,
        address seller,
        // uint256 price,
        // bool currentlyListed,
        uint256 expiry,
        uint256 created,
        string serialNo
        
    );

    //This mapping maps tokenId to token info and is helpful when retrieving details about a tokenId
    mapping(uint256 => ListedToken) private idToListedToken;

    constructor() ERC721("NFT_Digital_Warranty", "NFTDW") {
        owner = payable(msg.sender);
    }

    // function updateListPrice(uint256 _listPrice) public payable {
    //     require(owner == msg.sender, "Only owner can update listing price");
    //     listPrice = _listPrice;
    // }

    // function getListPrice() public view returns (uint256) {
    //     return listPrice;
    // }

    function getLatestIdToListedToken() public view returns (ListedToken memory) {
        uint256 currentTokenId = _tokenIds.current();
        return idToListedToken[currentTokenId];
    }


    function getListedTokenForId(uint256 tokenId) public view returns (ListedToken memory) {
        return idToListedToken[tokenId];
    }


    function getCurrentToken() public view returns (uint256) {
        return _tokenIds.current();
    }

    //The first time a token is created, it is listed here
    function createToken(string memory tokenURI,string memory serialNo) public payable returns (uint) {
        //Increment the tokenId counter, which is keeping track of the number of minted NFTs
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        //Mint the NFT with tokenId newTokenId to the address who called createToken
        _safeMint(msg.sender, newTokenId);

        //Map the tokenId to the tokenURI (which is an IPFS URL with the NFT metadata)
        _setTokenURI(newTokenId, tokenURI);

        //Helper function to update Global variables and emit an event
        createListedToken(newTokenId,serialNo);

        return newTokenId;
    }

    function createListedToken(uint256 tokenId,string memory serialNo) private {
        //Make sure the sender sent enough ETH to pay for listing
        // require(msg.value == listPrice, "Hopefully sending the correct price");
        //Just sanity check
        // require(price > 0, "Make sure the price isn't negative");

        //Update the mapping of tokenId's to Token details, useful for retrieval functions
        idToListedToken[tokenId] = ListedToken(
            tokenId,
            payable(address(this)),
            // contract is the owner and the comapany is the seller
            payable(msg.sender),
            // price,
            // true,

            //to check if nft is issued or not
            0,
            0,
            serialNo

        );

        _transfer(msg.sender, address(this), tokenId);
        //Emit the event for successful transfer. The frontend parses this message and updates the end user
        emit TokenListedSuccess(
            tokenId,
            address(this),
            msg.sender,
            // price,
            // true
            0,
            0,
            serialNo
            
        );
    }
    


    //Returns all the NFTs that the current user is owner or seller in
    function getMyNFTs() public view returns (ListedToken[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        
        //Important to get a count of all the NFTs that belong to the user before we can make an array for them
        for(uint i=0; i < totalItemCount; i++)
        {
            if(idToListedToken[i+1].owner == msg.sender || idToListedToken[i+1].seller == msg.sender){
                itemCount += 1;
            }
        }

        //Once you have the count of relevant NFTs, create an array then store all the NFTs in it
        ListedToken[] memory items = new ListedToken[](itemCount);
        for(uint i=0; i < totalItemCount; i++) {
            if(idToListedToken[i+1].owner == msg.sender || idToListedToken[i+1].seller == msg.sender) {
                uint currentId = i+1;
                ListedToken storage currentItem = idToListedToken[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }



    function executeSale(uint256 tokenId , uint expTime) public payable {
        require(expTime>0,"Please enter a valid expiry time");


        


        //to check if nft is getting sold first time ,so we can issue warranty 
        if(idToListedToken[tokenId].expiry == 0){
            idToListedToken[tokenId].expiry  =  block.timestamp + expTime;
            idToListedToken[tokenId].created  =  block.timestamp;
           
        }


        //updates the seller of the particular nft
        idToListedToken[tokenId].seller = payable(msg.sender);
        
        //increases the sold item count
        _itemsSold.increment();

        //Actually transfer the token to the new owner
        _transfer(address(this), msg.sender, tokenId);
        //approve the marketplace to sell NFTs on your behalf
        approve(address(this), tokenId);

        
        
    }
    
    function TransferNFT(uint256 tokenId ,address ad) public payable {
        require( idToListedToken[tokenId].seller == payable(msg.sender) || owner == payable(msg.sender)  ,"you need to own this warranty");
        require(block.timestamp<=idToListedToken[tokenId].expiry,"warranty is expired");
     
        idToListedToken[tokenId].seller = payable(ad);
    
        //Actually transfer the token to the new owner
        _transfer(address(this), payable(ad), tokenId);
        //approve the marketplace to sell NFTs on your behalf
        approve(address(this), tokenId);
        emit Approval(idToListedToken[tokenId].seller ,address(this) ,tokenId);

        
    }
    
    function TransferNFT(uint256 tokenId ,address ad) public payable {
        require( idToListedToken[tokenId].seller == payable(msg.sender) || owner == payable(msg.sender)  ,"you need to own this warranty");
        require(block.timestamp<=idToListedToken[tokenId].expiry,"warranty is expired");
     
        idToListedToken[tokenId].seller = payable(ad);
    
        //Actually transfer the token to the new owner
        _transfer(address(this), payable(ad), tokenId);
        //approve the marketplace to sell NFTs on your behalf
        approve(address(this), tokenId);
        emit Approval(idToListedToken[tokenId].seller ,address(this) ,tokenId);

        
    }
    
  

    


    function BurnNFT(uint256 tokenId) public payable {
        //first checks the warranty period of the nft
        require(idToListedToken[tokenId].expiry !=0,"warranty is yet to be issued" );
        //checks if the request is made by the owner or not
        require(owner==msg.sender || idToListedToken[tokenId].seller == payable(msg.sender)  ,"you need to own this warranty");
        //when the expiry date has not been achieved
        require(block.timestamp>idToListedToken[tokenId].expiry,"warranty is yet to expire");
        //calling the inbuilt burn function
        _burn(tokenId);
        idToListedToken[tokenId].seller = payable(0x0000000000000000000000000000000000000000);
        idToListedToken[tokenId].owner = payable(0x0000000000000000000000000000000000000000);
    }

    //We might add a resell token function in the future
    //In that case, tokens won't be listed by default but users can send a request to actually list a token
    //Currently NFTs are listed by default
}
