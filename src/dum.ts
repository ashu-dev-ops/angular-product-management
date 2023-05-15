<ng-container matColumnDef="image">
<th mat-header-cell *matHeaderCellDef mat-sort-header>image</th>
<td mat-cell *matCellDef="let row">
  <img src="{{ row.image }}" alt="image" height="20px" width="20px" />
</td>
<!-- <img src="{{" row.image }} alt="image" /> -->
</ng-container>