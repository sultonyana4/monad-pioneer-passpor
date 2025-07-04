// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Import necessary libraries from OpenZeppelin
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol"; // Menggunakan Base64 dari OpenZeppelin

/**
 * @title Monad Pioneer's Passport
 * @author sultonyana4
 * @notice A unique, on-chain passport certifying its holder as a pioneer of the Monad network.
 * The NFT metadata, including the SVG image, is generated entirely on-chain.
 */
contract PioneerPassport is ERC721, Ownable {

    // === STATE VARIABLES ===

    uint256 private _nextTokenId;

    // Struct untuk menyimpan properti dari setiap paspor
    struct Passport {
        uint256 mintedAtTimestamp;
        bool hasFirstStamp;
        // Stempel di masa depan bisa ditambahkan di sini
    }

    // Mapping dari token ID ke data paspornya
    mapping(uint256 => Passport) private _passports;

    // === CONSTRUCTOR ===

    // Mengatur Nama dan Simbol untuk koleksi NFT
    constructor() ERC721("Monad Pioneer's Passport", "MPP") Ownable(msg.sender) {}

    // === FUNGSI INTI ===

    /**
     * @notice Mencetak Pioneer Passport baru ke alamat pemanggil.
     */
    function mintPassport() public {
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);

        // Inisialisasi data paspor untuk token baru
        _passports[tokenId] = Passport({
            mintedAtTimestamp: block.timestamp,
            hasFirstStamp: false
        });
    }

    /**
     * @notice Memungkinkan pemilik paspor untuk mengklaim stempel pertama mereka.
     * @param tokenId ID dari paspor yang akan diupdate.
     */
    function claimFirstStamp(uint256 tokenId) public {
        // Memastikan bahwa yang memanggil fungsi ini adalah pemilik NFT
        require(ownerOf(tokenId) == msg.sender, "PioneerPassport: Caller is not the owner");
        
        Passport storage passport = _passports[tokenId];
        passport.hasFirstStamp = true;
    }


    // === PEMBUATAN METADATA DAN GAMBAR ===

    /**
     * @notice Mengembalikan metadata untuk token ID tertentu.
     * @dev Menghasilkan data URI yang berisi objek JSON, yang di dalamnya terdapat SVG on-chain.
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(ownerOf(tokenId) != address(0), "ERC721: URI query for nonexistent token");

        string memory svgImage = generateSVG(tokenId); 

        string memory json = Base64.encode(
            bytes(
                string.concat(
                    '{"name": "Monad Pioneer\'s Passport #', Strings.toString(tokenId), '",',
                    '"description": "A unique, on-chain passport certifying its holder as a pioneer of the Monad network. Each stamp marks a milestone in their journey.",',
                    '"image": "data:image/svg+xml;base64,', Base64.encode(bytes(svgImage)), '",',
                    '"attributes": [',
                        '{"trait_type": "First Stamp Claimed", "value": "', _passports[tokenId].hasFirstStamp ? "true" : "false", '"}',
                    ']}'
                )
            )
        );

        return string.concat("data:application/json;base64,", json);
    }


    /**
     * @notice Menghasilkan SVG on-chain untuk paspor tertentu.
     * @dev Fungsi ini "menggambar" dengan menggabungkan string teks yang membentuk kode SVG.
     */
    function generateSVG(uint256 tokenId) internal view returns (string memory) {
        Passport memory passport = _passports[tokenId];
        
        string memory svg = string.concat(
            '<svg width="350" height="200" xmlns="http://www.w3.org/2000/svg">',
            // Latar belakang dengan gradien halus
            '<defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#2a2a2a;stop-opacity:1" /><stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" /></linearGradient></defs>',
            '<rect width="100%" height="100%" fill="url(#grad)" />',
            // Judul Utama
            '<text x="15" y="40" font-family="monospace" font-size="22" font-weight="bold" fill="#ffffff">PIONEER PASSPORT</text>',
            // Subjudul Jaringan Monad
            '<text x="15" y="65" font-family="monospace" font-size="14" fill="#00f5d4">MONAD NETWORK</text>',
            // ID Token
            '<text x="15" y="180" font-family="monospace" font-size="12" fill="#888">ID #', Strings.toString(tokenId), '</text>'
        );

        // Logika Kondisional: Jika paspor memiliki stempel pertama, tambahkan elemen visualnya.
        if (passport.hasFirstStamp) {
            // Menambahkan stempel yang keren
            svg = string.concat(svg, '<g transform="translate(250, 100) rotate(-15)">');
            svg = string.concat(svg, '<rect x="-35" y="-25" width="70" height="50" fill="none" stroke="#00f5d4" stroke-width="2"/>');
            svg = string.concat(svg, '<text x="0" y="0" font-family="monospace" font-weight="bold" font-size="14" fill="#00f5d4" text-anchor="middle" dominant-baseline="middle">M-01</text>');
            svg = string.concat(svg, '</g>');
        }

        svg = string.concat(svg, '</svg>');

        return svg;
    }
}