import { Tenant } from "./tenant";

export class Client {
  clientId: number;
  clientName: string;
  clientDesc: string;
  active: boolean;
  tenants: Tenant[];
}
