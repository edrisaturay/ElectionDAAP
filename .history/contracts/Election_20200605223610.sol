pragma solidity ^0.5.1;

contract Election{
    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Store the Candidates
    mapping (uint => Candidate) public candidates;

    // Fetch Candidate
    // Store Candidates Count

    uint public candidatesCount;

    constructor () public {
        addCandidate("Nisha Turay");
        addCandidate("Edrisa Turay");
    }

    function addCandidate (
        string memory _name
    ) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate( candidatesCount, _name, 0
        );
    }
}