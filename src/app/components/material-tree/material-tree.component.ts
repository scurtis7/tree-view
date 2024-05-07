import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from "@angular/material/tree";
import { FlatTreeControl, NestedTreeControl } from "@angular/cdk/tree";


/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
      },
      {
        name: 'Orange',
        children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
      },
    ],
  },
];

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
export class MaterialTreeComponent {

  clientSelected = false;
  tenantSelected = false;

  // treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  // dataSource = new MatTreeNestedDataSource<FoodNode>();

  // constructor(private router: Router) {
  //   this.dataSource.data = TREE_DATA;
  // }

  dashboard() {
    this.router.navigate(['dashboard']);
    this.dataSource.data = TREE_DATA;
  }

  private _transformer = (node: FoodNode, level: number) => {
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

  constructor(private router: Router) {
    this.dataSource.data = TREE_DATA;
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

}
