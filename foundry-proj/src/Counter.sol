// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Counter {
    uint256 public value;

    function setValue(uint256 _newValue) public returns (uint) {
        value = _newValue;

        return (value);

    }

    
}
