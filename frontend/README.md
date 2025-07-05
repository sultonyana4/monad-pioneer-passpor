# Monad Pioneer's Passport

**Monad Pioneer's Passport** is a unique, fully on-chain NFT collection built for the Monad Mission 5 hackathon. This project demonstrates novel NFT mechanics where each passport is a dynamic, state-changing SVG that visually evolves based on the owner's on-chain actions.

## Unique Features

- **Fully On-Chain SVG:** Both the metadata and the visual representation (image) of the NFT are generated and stored 100% on the blockchain, eliminating reliance on external services like IPFS.
- **State-Changing Mechanics:** The passport is not static. It can be updated to receive "stamps" that visually alter the on-chain SVG, serving as a permanent record of the holder's achievements within the Monad ecosystem.
- **Gas-Efficient:** Built with Solidity and Foundry, optimized for efficiency.
- **Modern Frontend:** A sleek, responsive dApp built with React, Vite, Wagmi, and RainbowKit for a seamless user experience.

## Tech Stack

- **Smart Contract:** Solidity, Foundry
- **Frontend:** React, Vite, Wagmi, Viem, RainbowKit, Tailwind CSS
- **Blockchain:** Monad Testnet

## Links

- **Live dApp:** https://pioneer-passport-bm929iz1z-sultonyana4-8806s-projects.vercel.app
- **Smart Contract on Monad Explorer:** `0xEf4611c2e19347903015EFf55f1dAfa599c49732`

## How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/sultonyana4/monad-pioneer-passpor.git](https://github.com/sultonyana4/monad-pioneer-passpor.git)
    cd monad-pioneer-passpor
    ```

2.  **Install contract dependencies:**
    ```bash
    cd contract
    forge install
    cd ..
    ```

3.  **Install frontend dependencies:**
    ```bash
    cd frontend
    npm install
    ```

4.  **Run the frontend:**
    ```bash
    npm run dev
    ```

---
*Submitted by sultonyana4 for Monad Mission 5.*
