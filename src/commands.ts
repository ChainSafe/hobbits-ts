// Defines all the messages used in EWP
import {
  ProposerSlashing,
  AttesterSlashing,
  Attestation,
  Deposit,
  VoluntaryExit,
  Transfer,
  Eth1Data

} from "./temporary_data_structs";

export interface Hello {
   network_id: number;
   chain_id: number;
   latest_finalized_root: Buffer;
   latest_finalized_epoch: number;
   best_root: Buffer;
   best_slot: BN;

}

export interface RequestBlockRoot {
   start_root: Buffer;
   start_slot: BN;
   max: BN;
   skip: BN;
   direction: number;
}

export interface SendBlockRoot {
   block_root: Buffer;
   slot: BN;
}

export interface RequestBlockHeader {
   start_root: Buffer;
   start_slot: BN;
   max: BN;
   skip: BN;
   direction: number;
}

export interface SendBlockHeader {
   slot: BN;
   parent_root: Buffer;
   state_root: Buffer;
   randao_reveal: Buffer;
   eth1_data: Eth1Data;
   signature: Buffer;
 
}

export interface RequestBlockBody {
   start_root: Buffer;
   start_slot: BN;
   max: BN;
   skip: BN;
   direction: number;
}

export interface SendBlockBody {
   randao_reveal: Buffer;
   eth1_data: Eth1Data;
   proposer_slashings: ProposerSlashing[];
   attester_slashings: AttesterSlashing[];
   attestations: Attestations[];
   deposits: Deposits[];
   voluntary_exits: VoluntaryExit[];
   transfers: Transfer[];
   header_signature: Buffer;
}




