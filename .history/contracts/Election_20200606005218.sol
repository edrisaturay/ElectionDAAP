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
        addCandidate("Nisha N Turay");
        addCandidate("Edrisa A Turay");
    }

    function addCandidate (
        string memory _name
    ) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote(uint memory _candidateId) public {
        // Update candidate vote count
        candidates[_candidateId].voteCount ++;

    }
}