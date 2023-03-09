//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


contract payroll {
    using SafeMath for uint256;

    // Declaring events for emitting information when a salary or reward is transferred
    event salaryTransfer(address indexed claimedPerson, uint256 claimedAmt);
    event rewardTransfer(address indexed claimedPerson, uint256 claimedAmt);

    address public superAdmin;
    uint256 public employeeId;

    // Mapping to store employee details with ID as key
    mapping(uint256 => employee) public employeeList;

    // Mapping to store whether an address is whitelisted or not
    mapping(address => bool) public isWhiteListed;

    // Mapping to store the employee ID for an address
    mapping(address => uint256) public isIdExist;
    
    //struct for storing employee details
    struct employee {
        uint256 id;
        uint256 salary;
        address salaryAddress;
        uint256 joiningDate;
        uint256 lastRewardClaimUpdate;
        uint256 lastSalaryClaimUpdate;
    }


    // Constructor to set the super admin as the contract deployer
    constructor() {
        superAdmin = msg.sender;
    }

    // Modifier to restrict access to only the super admin
    modifier onlySuperAdmin() {
        require(msg.sender == superAdmin, "Unauthorized identity1");
        _;
    }

    // function to add new employee details
    function addEmployee(
        uint256 _salary,
        address _address,
        uint256 _joiningDate
    ) public onlySuperAdmin {

        // Check if the address is not whitelisted before adding the employee
        require(!isWhiteListed[_address], "Employee Already Exist");
        employeeId++;
        employee memory newEmployee = employee(
            employeeId,
            _salary,
            _address,
            _joiningDate,
            0,
            0
        );
        employeeList[employeeId] = newEmployee;
        isWhiteListed[_address] = true;
        isIdExist[_address] = employeeId;
    }

    // function to update existing employee status and salary
    function upgradeStatus(
        uint256 _id,
        uint256 _salary,
        bool whiteListed
    ) public onlySuperAdmin {
        employeeList[_id].salary = _salary;
        isWhiteListed[employeeList[_id].salaryAddress] = whiteListed;
    }

    //function for claiming salary in TUSDT tokens

    function ClaimSalary(uint256 id, address _token) public payable {
        uint256 lastSalaryClaim = employeeList[id].lastSalaryClaimUpdate;
        uint256 salary = employeeList[id].salary;
        require(block.timestamp >= lastSalaryClaim + 30 seconds || lastSalaryClaim == 0, "time error");
        IERC20(_token).transfer(
            employeeList[id].salaryAddress,
            salary * 10 ** 18
        );
        employeeList[id].lastSalaryClaimUpdate = block.timestamp;
        emit salaryTransfer(employeeList[id].salaryAddress, salary);
    }

    //function for claiming reward in TRWD tokens
    function ClaimReward(uint256 id, address _reward) public payable {
        uint256 lastRewardClaim = employeeList[id].lastRewardClaimUpdate;
        require((block.timestamp >= lastRewardClaim + 90 seconds || lastRewardClaim == 0), "time error");
        uint256 salary = employeeList[id].salary;
        uint256 reward = salary.mul(10).div(100);
        IERC20(_reward).transfer(
            employeeList[id].salaryAddress,
            reward *10 ** 18
        );
        employeeList[id].lastRewardClaimUpdate = block.timestamp;
        emit rewardTransfer(employeeList[id].salaryAddress, reward);
    }

    //function to get the totalsupply of tokens in tokencontracts
    function balanceAndSupply(
        address _token
    ) public view returns (uint256) {
        uint256 totalSupply = IERC20(_token).totalSupply();
        return (totalSupply);
    }

}









