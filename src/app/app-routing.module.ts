import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdatecandidateComponent } from './Entity/updatecandidate/updatecandidate.component';
import { CandidateComponent } from './Entity/candidate/candidate.component';

const routes: Routes = [
  { path: 'database', component: CandidateComponent },
  { path: 'update-candidate/:id/:table_name', component: UpdatecandidateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
