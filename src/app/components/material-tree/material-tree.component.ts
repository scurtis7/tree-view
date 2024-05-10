import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree";
import { FlatTreeControl } from "@angular/cdk/tree";
import { ClientService } from "../../service/client.service";
import { Client } from "../../model/client";
import { Tenant } from "../../model/tenant";
import { ClientTenantFlatNode } from "../../model/client-tenant-flat-node";
import { NodeData } from "../../model/node-data";


@Component({
  selector: 'app-material-tree',
  templateUrl: './material-tree.component.html',
  styleUrl: './material-tree.component.scss'
})
export class MaterialTreeComponent implements OnInit {

  clientSelected = false;
  selectedClientId = 0;
  selectedClient: Client = null;

  tenantSelected = false;
  selectedTenantId = 0;
  selectedTenant: Tenant = null;

  clients: Client[];
  treeData: NodeData[];

  private _transformer = (node: NodeData, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      id: node.id,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ClientTenantFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private clientService: ClientService, private router: Router) {
  }

  ngOnInit(): void {
    this.getTreeData();
    console.log(this.treeData);
    this.dataSource.data = this.treeData;
  }

  hasChild = (_: number, node: ClientTenantFlatNode) => node.expandable;

  dashboard() {
    this.router.navigate(['dashboard']);
  }

  selectClient(id: number) {
    this.tenantSelected = false;
    this.clientSelected = true;
    this.selectedClientId = id;
    this.selectedTenantId = 0;
    this.findClient(id);
  }

  selectTenant(id: number) {
    this.clientSelected = false;
    this.tenantSelected = true;
    this.selectedClientId = 0;
    this.selectedTenantId = id;
    this.findTenant(id);
  }

  getClientButtonClass(id: number): string {
    if (id == this.selectedClientId) {
      return "tree-button-selected";
    }
    return "tree-button";
  }

  getTenantButtonClass(id: number): string {
    if (id == this.selectedTenantId) {
      return "tree-button-selected";
    }
    return "tree-button";
  }

  private findClient(id: number) {
    this.selectedClient = this.clients.find((client) => client.clientId == id);
  }

  private findTenant(id: number) {
    for (const client of this.clients) {
      this.selectedTenant = client.tenants.find((tenant) => tenant.tenantId == id);
      if (this.selectedTenant) {
        return;
      }
    }
  }

  private getTreeData() {
    this.clients = this.clientService.getClients();
    let clientNodes: NodeData[] = [];
    for (const client of this.clients) {
      let node = new NodeData();
      node.id = client.clientId;
      node.name = client.clientName;
      node.children = this.setChildren(client);
      clientNodes.push(node);
    }
    this.treeData = clientNodes;
  }

  private setChildren(client: Client): NodeData[] {
    let children: NodeData[] = [];
    for (const tenant of client.tenants) {
      let node = new NodeData();
      node.id = tenant.tenantId
      node.name = tenant.tenantName;
      children.push(node);
    }
    return children;
  }

}
