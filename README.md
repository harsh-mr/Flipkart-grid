# Flipkart-grid
eCommerce warranty system using NFTs

NOTE: The sendgrid mail won't work as the key will get exposed over here
##
Smart contract is in ./client/contracts/NFT_Digital_Warranty.sol
##

This project is being developed for Flipkart Grid 4.0 2022 program. In this project I have used Non Fungible Token for converting physical warranty into digital ,and various other frameworks to develop user-friendly User Interface for our project .


## Tech Stack

**Client:** React, Material UI , Metamask 

**Server:** Node, Express , Sendgrid , IPFS Storage (Pinata Gateway), MongoDB 


## Features

- Converted ownership authenticity and product
  warranty cards into decaying NFTs.
- Customers can then use the digital NFT to verify the
  authenticity of their product, prove their ownership of
  their product, and transfer ownership of them upon
  resale.
- NFTs burns once the warranty is over.
- The brand/retailer can tie the digital NFT to its
  warranty program, allowing owners to track repairs
  and replacements to the original item.
- Created ERC721 standard NFT.
- Metamask for authentication.
- IPFS to store NFTs


## API Credit
-Email service is provided by sendgrid API (Either we need to deploy our project for the api key to not get exposed and the service to work simultaneously as here on github our secret key will get exposed)
## Demo

Video Demo Here

https://youtu.be/swz7LOOPf6U

## Run Locally

Clone the project

```bash
  git clone https://github.com/harsh-mr/Flipkart-grid.git
```


move into client folder and install node dependencies for server side

```bash
cd client
npm i
```

move into server and install node dependencies for server side
```bash
cd server
npm i
```

install react dependencies in client folder

```bash
cd ..
cd client
npm i
```

run node backend in one shell
```bash
npm start
```
run react frontend in other shell
 ```bash
cd ..
cd client
npm start
```
## Authors
Kumar Harsh - https://github.com/harsh-mr
Shreya Narayan - https://github.com/Shreya23-tech
Aniket Kumar Singh - https://github.com/aniket1104



## Feedback

If you have any feedback, please reach out to us at harshme78@gmail.com

## Home Page 
<img width="1120" alt="image" src="https://user-images.githubusercontent.com/72063723/182821041-608c94f3-376a-43c0-bc2f-9da2c1785d2a.png">

## My Orders Page(NFT Warranties)
<img width="1120" alt="image" src="https://user-images.githubusercontent.com/72063723/182821421-da1615d8-7eab-422d-808c-0ad1620dc9a7.png">

## Warranty (NFT)
<img width="1120" alt="image" src="https://user-images.githubusercontent.com/72063723/182821910-99fedcc6-6712-4007-8b73-73738594cf7b.png">

## Expired Warranty Page
<img width="1120" alt="image" src="https://user-images.githubusercontent.com/72063723/182822228-829ca3e7-3fb8-4d04-9c4f-9164a5dfafe3.png">

## Add NFT Page
<img width="1120" alt="image" src="https://user-images.githubusercontent.com/72063723/182822439-fccdc8b9-629b-4674-a080-036c3c1dd0ed.png">

## Repair History Page
<img width="1120" alt="image" src="https://user-images.githubusercontent.com/72063723/182822612-30bc541a-a857-4227-b8fc-e7fc7682607e.png">

## Product Details Page
<img width="1120" alt="image" src="https://user-images.githubusercontent.com/72063723/182822842-a306bd2c-c360-42e4-8d97-296778c7030a.png">

## Spinning Wheel Page
<img width="1120" alt="image" src="https://user-images.githubusercontent.com/72063723/182823205-e591e082-a7bc-45e7-8526-0ef3cf92de25.png">


