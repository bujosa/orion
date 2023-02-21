// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Proxy {
    address implementation;

    function changeImplementation(address _implementation) external {
        implementation = _implementation;
    }

    function changeX(uint256 _x) external {
        Logic1(implementation).changeX(_x);
    }
}

contract Logic1 {
    uint256 public x = 0;

    function changeX(uint256 _x) external {
        x = _x;
    }
}

contract Logic2 {
    uint256 public x = 0;

    function changeX(uint256 _x) external {
        x = _x;
    }
}
