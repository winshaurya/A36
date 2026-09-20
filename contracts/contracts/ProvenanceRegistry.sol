// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title ProvenanceRegistry
 * @notice Canonical meme registration & provenance protocol on Avalanche C-Chain.
 * @dev Records the earliest registration event for content fingerprints with sub-second finality.
 *      Does NOT claim absolute real-world creation across the internet;
 *      anchors protocol-level chronological registration receipts immutably.
 */
contract ProvenanceRegistry {
    // --- Custom Errors ---
    error InvalidFingerprint();
    error RecordNotFound();

    // --- Relationship Enum ---
    enum Relationship {
        NONE,
        FIRST_REGISTRATION,
        REPOST,
        REMIX,
        DUPLICATE,
        DERIVATIVE
    }

    // --- Data Structures ---
    struct Record {
        bytes32 fingerprint;         // Normalized cryptographic/perceptual content fingerprint
        address registeredBy;        // Address that submitted the registration
        uint64 registeredAt;         // Block timestamp of registration
        uint64 blockNumber;          // Block number of registration
        bytes32 parentFingerprint;   // Parent/source fingerprint if derivative or remix
        Relationship relationship;   // Type of relationship to parent
        string metadataUri;          // Decentralized storage pointer for social/media metadata (IPFS/Arweave)
    }

    // --- State Variables ---
    // Mapping from content fingerprint to its earliest recorded registration
    mapping(bytes32 => Record) private _earliestRegistrations;
    
    // Ordered log of all registrations
    Record[] private _allRegistrations;

    // Protocol Version
    uint16 public constant PROTOCOL_VERSION = 1;

    // --- Events ---
    event MemeRegistered(
        bytes32 indexed fingerprint,
        address indexed registeredBy,
        bool indexed isFirstRegistration,
        uint64 registeredAt,
        uint64 blockNumber,
        bytes32 parentFingerprint,
        Relationship relationship,
        string metadataUri
    );

    /**
     * @notice Registers a content fingerprint on-chain.
     * @param fingerprint The unique bytes32 hash representing the media content.
     * @param parentFingerprint Parent fingerprint if this is a remix/repost (bytes32(0) if independent).
     * @param relationship Relationship type to the parent fingerprint.
     * @param metadataUri IPFS or decentralized URI containing the social metadata & post data.
     * @return registrationIndex The index position in the protocol's global history.
     */
    function registerFingerprint(
        bytes32 fingerprint,
        bytes32 parentFingerprint,
        Relationship relationship,
        string calldata metadataUri
    ) external returns (uint256 registrationIndex) {
        if (fingerprint == bytes32(0)) {
            revert InvalidFingerprint();
        }

        uint64 currentTimestamp = uint64(block.timestamp);
        uint64 currentBlock = uint64(block.number);

        bool isFirst = _earliestRegistrations[fingerprint].registeredBy == address(0);

        Record memory newRecord = Record({
            fingerprint: fingerprint,
            registeredBy: msg.sender,
            registeredAt: currentTimestamp,
            blockNumber: currentBlock,
            parentFingerprint: parentFingerprint,
            relationship: isFirst && relationship == Relationship.NONE ? Relationship.FIRST_REGISTRATION : relationship,
            metadataUri: metadataUri
        });

        // If this is the first time this protocol sees this fingerprint, anchor it permanently as the earliest registration
        if (isFirst) {
            _earliestRegistrations[fingerprint] = newRecord;
        }

        _allRegistrations.push(newRecord);
        registrationIndex = _allRegistrations.length - 1;

        emit MemeRegistered(
            fingerprint,
            msg.sender,
            isFirst,
            currentTimestamp,
            currentBlock,
            parentFingerprint,
            newRecord.relationship,
            metadataUri
        );
    }

    /**
     * @notice Check if a content fingerprint has an existing canonical registration.
     * @param fingerprint Content fingerprint to query.
     */
    function isRegistered(bytes32 fingerprint) external view returns (bool) {
        return _earliestRegistrations[fingerprint].registeredBy != address(0);
    }

    /**
     * @notice Get the earliest recorded registration for a content fingerprint.
     * @param fingerprint Content fingerprint to query.
     * @return record The earliest recorded registration details.
     * @return exists Boolean indicating whether an on-chain registration exists.
     */
    function getEarliestRegistration(bytes32 fingerprint)
        external
        view
        returns (Record memory record, bool exists)
    {
        record = _earliestRegistrations[fingerprint];
        exists = record.registeredBy != address(0);
    }

    /**
     * @notice Returns total number of registrations recorded across the protocol.
     */
    function totalRegistrations() external view returns (uint256) {
        return _allRegistrations.length;
    }

    /**
     * @notice Retrieve a registration record by its global index.
     * @param index The index in the protocol history.
     */
    function getRegistrationByIndex(uint256 index) external view returns (Record memory) {
        if (index >= _allRegistrations.length) {
            revert RecordNotFound();
        }
        return _allRegistrations[index];
    }
}
