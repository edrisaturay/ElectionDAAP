pragma solidity ^0.5.1;

contract Election{
    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    // Store the Candidates
    // Fetch Candidate

    constructor () public {
        candidate = "Candidate 1";
    }
}