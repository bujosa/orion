// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./StorageSlot.sol";

contract Proxy {
    function changeImplementation(address _implementation) external {
        StorageSlot.getAddressSlot(keccak256("impl")).value = _implementation;
    }

    fallback() external {
        (bool success, ) = StorageSlot
            .getAddressSlot(keccak256("impl"))
            .value
            .delegatecall(msg.data);
        require(success);
    }
}

contract Logic1 {
    uint256 x = 0;

    function changeX(uint256 _x) external {
        x = _x;
    }
}

contract Logic2 {
    uint256 x = 0;

    function changeX(uint256 _x) external {
        x = _x * 2;
    }

    function tripleX() external {
        x *= 3;
    }
}
