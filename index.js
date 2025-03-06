import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';
import { readFileSync } from 'fs';

// Root Hash
const addresses = JSON.parse(readFileSync('./addresses.json', 'utf8'));
const hashedAddresses = addresses.map(addr => keccak256(addr));
const merkleTree = new MerkleTree(hashedAddresses, keccak256, { sortPairs: true });
const rootHash = merkleTree.getRoot().toString('hex');

console.log(`Root Hash: 0x${rootHash}`);

// Merkle Proof
const address = '0x08114F100ED17F14D53f9c595624bB5A122D507c';
const hashedAddress = keccak256(address);
const proof = merkleTree.getProof(hashedAddress);
const isValid = merkleTree.verify(proof, hashedAddress, rootHash);

console.log(`Address to verify: ${address}`);
console.log(`Is Valid: ${isValid}`);
