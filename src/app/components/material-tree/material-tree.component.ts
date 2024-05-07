import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree";
import { FlatTreeControl } from "@angular/cdk/tree";
import { ClientService } from "../../service/client.service";
import { Client } from "../../model/client";


class NodeData {
  id: number;
  name: string;
  children?: NodeData[];
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-material-tree',
  templateUrl: './material-tree.component.html',
  styleUrl: './material-tree.component.scss'
})
export class MaterialTreeComponent implements OnInit {

  clientSelected = false;
  tenantSelected = false;

  clients: Client[];
  treeData: NodeData[];

  private _transformer = (node: NodeData, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
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

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  selectClient() {
    this.tenantSelected = false;
    this.clientSelected = true;
    console.log("Client Selected");
  }

  selectTenant() {
    this.clientSelected = false;
    this.tenantSelected = true;
    console.log("Tenant Selected");
  }

  dashboard() {
    this.router.navigate(['dashboard']);
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
