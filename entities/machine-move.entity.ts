import { VersionGroupDetail } from "./moves.entity";
import { Data } from "./pokemon-specie.entity";

export type MachineMove = {
  id:            number;
  item:          Data;
  move:          Data;
  version_group: Data;
}

export interface MachineDetail {
  machine: {
    url: string;
  };
  version_group: {
    name: string;
    url: string;
  };
}

export interface ExtendedMachineDetail extends VersionGroupDetail {
  moveDetails?: any; // TODO: narrow type when move detail shape is fixed
  machine: {
    url: string;
  };
}

export interface MoveWithDetails {
  moveName: string;
  move: {
    version_group_details: any[];
    detailMove: {
      machines: MachineDetail[];
    };
  };
  types: any[];
}

