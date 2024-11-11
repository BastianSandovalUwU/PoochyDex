interface Method {
  name: string;
  url: string;
}

interface EncounterDetail {
  chance: number;
  condition_values: any[];
  max_level: number;
  method: Method;
  min_level: number;
}

interface LocationArea {
  name: string;
  url: string;
}

interface Version {
  name: string;
  url: string;
}

interface VersionDetail {
  encounter_details: EncounterDetail[];
  max_chance: number;
  version: Version;
}

export interface LocationData {
  location_area: LocationArea;
  version_details: VersionDetail[];
}

export interface GroupedData {
  versionName: string;
  methods: { [methodName: string]: string[] };
}
