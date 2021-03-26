import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { LiveMatchService } from '../services/livematch.service';

interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    pid: number;
    level: number;
}

interface Player {
    name: string;
    pid: number;
    players?: Player[];
}

@Component({
    selector: 'match-dialog',
    templateUrl: 'match-dialog.html',
    styleUrls: ['live-match.component.css']
})

export class MatchDialog {

    private _transformer = (node: Player, level: number) => {
        return {
            expandable: !!node.players && node.players.length > 0,
            name: node.name,
            pid: node.pid,
            level: level,
        };
    }

    treeControl = new FlatTreeControl<ExampleFlatNode>(
        node => node.level, node => node.expandable);

    treeFlattener = new MatTreeFlattener(
        this._transformer, node => node.level, node => node.expandable, node => node.players);

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    match: any;

    constructor(public dialogRef: MatDialogRef<MatchDialog>, private liveScore: LiveMatchService, @Inject(MAT_DIALOG_DATA) public source: BehaviorSubject<any>) {
        this.source.subscribe(result => {
            this.match = result;
            
            if (this.match) {
                this.dataSource.data = this.match.data.team;

                this.liveScore.getLiveScore(this.match['id']).subscribe(data => {
                    this.match.description = data['description'];
                    this.match.score = data['score'];
                    this.match.stat = data['stat'];
                });
            }
        });
        
        this.dialogRef.afterClosed().subscribe(() => {
            this.source.next(null);
        })
    }

    closeDialog() {
        this.dialogRef.close();
    }

}