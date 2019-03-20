// This file will temporarily hold some of the ETH2.0 Data Structures
import BN from "bn.js";

const DEPOSIT_CONTRACT_TREE_DEPTH: Number = 32;

export interface BeaconBlockHeader {
    slot: BN;
    previous_block_root: Buffer;
    state_root: Buffer;
    block_body_root: Buffer;
    signature: Buffer;
}

export interface ProposerSlashing {
    // Proposer index
    proposer_index: BN;
    // First block header
    header_1: BeaconBlockHeader;
    // Second block header
    header_2: BeaconBlockHeader;
}

export interface SlashableAttestation {
    // Validator indices
    validator_indices: BN[];
    // Attestation data
    data: AttestationData;
    // Custody bitfield
    custody_bitfield: Buffer;
    // Aggregate signature
    aggregate_signature: Buffer;
}

export interface AttesterSlashing {
    // First slashable attestation
    slashable_attestation_1: SlashableAttestation;
    // Second slashable attestation
    slashable_attestation_2: SlashableAttestation;
}

export interface Crosslink {
    // Epoch number
    epoch: BN;
    // Shard data since the previous crosslink
    crosslink_data_root: Buffer;
}

export interface AttestationData {
    // LMD GHOST vote
    slot: BN;
    beacon_block_root: Buffer;

    // FFG vote
    source_epoch: BN;
    source_root: Buffer;
    target_root: Buffer;

    // Crosslink vote
    shard: BN;
    previous_crosslink: Crosslink;
    crosslink_data_root: Buffer;
}

export interface Attestation {
    // Attester aggregation bitfield
    aggregation_bitfield: Buffer;
    // Attestation data
    data: AttestationData;
    // Custody bitfield
    custody_bitfield: Buffer;
    // BLS aggregate signature
    aggregate_signature: Buffer;
}

export interface DepositInput {
    // BLS pubkey
    pubkey: Buffer;
    // Withdrawal credentials
    withdrawal_credentials: Buffer;
    // A BLS signatur of this depositInput
    proof_of_possession: Buffer;
}

export interface DepositData {
    // Amount in Gwei
    amount: BN;
    // Timestamp from deposit contract
    timestamp: BN;
    // Deposit input
    deposit_input: DepositInput;
}

export interface Deposit {
    // Branch in the deposit tree
    proof: Buffer[];
    // Index in the deposit tree
    index: BN;
    // Data
    deposit_data: DepositData;
}

export interface VoluntaryExit {
    // Minimum epoch for processing exit
    epoch: BN;
    // Index of the exiting validator
    validator_index: BN;
    // Validator signature
    signature: Buffer;
}

export interface Transfer {
    // Sender index 
    sender: BN;
    // Recipient index
    recipient: BN;
    // Amount in Gwei
    amount: BN;
    // Fee in Gwei for block proposer
    fee: BN;
    // Inclusion slot
    slot: BN;
    // Sender withdrawal pubkey
    pubkey: Buffer;
    // Sender signature
    signature: Buffer;
    
}

export interface Eth1Data {
   // Root of the deposit tree
   deposit_root: Buffer;
   // Block hash
   block_hash: Buffer;
}
