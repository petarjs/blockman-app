import { NEAR_ENV } from "../config/near";

export interface ContractMethodParameter {
  type: string;
  name: string;
  description: string;
}

export interface ContractMethod {
  type: "view" | "change";
  name: string;
  description: string;
  parameters: ContractMethodParameter[];
}

export interface Contract {
  network: NEAR_ENV;
  owner: string;
  name: string;
  description: string;
  json: string;
}

export interface ContractJson {
  methods: ContractMethod[];
}
