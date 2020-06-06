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

    // Store the Voters
    mapping (address => bool) public voters;

    // Fetch Candidate
    // Store Candidates Count

    uint public candidatesCount;

    event votedEvent (uint indexed _candidateId);
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

    function vote(uint _candidateId) public {

        // require that they haven't voted before
        require(!voters[msg.sender]);

        // check if we are voting for a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // Update candidate vote count
        candidates[_candidateId].voteCount ++;

        // record that voter has voted
        voters[msg.sender] = true;
    }
}