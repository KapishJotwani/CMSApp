import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { CandidateserviceService } from '../../candidateservice.service';
import { Form } from '@angular/forms';
import { CommonModule, KeyValue } from '@angular/common';

interface Candidate {
  id: number;
  name: string;
  age: number;
  qualification: string;
  skills: string;
  phone_number: number;
  address: string;
  // Add other properties as needed
}

@Component({
  selector: 'app-updatecandidate',
  templateUrl: './updatecandidate.component.html',
  styleUrl: './updatecandidate.component.css'
})
export class UpdatecandidateComponent implements OnInit {
  candidateId: number=0;
  candidate: any={} as Candidate;
  table_name!: String;
  table_num!: any;

  constructor(private route: ActivatedRoute, 
    private service:CandidateserviceService,
    private router: Router) {}

  ngOnInit() {
    // Retrieve the id from the route parameters
    this.route.params.subscribe((params) => {
      this.candidateId = +params['id'];
      this.table_name = params['table_name']
      // Now, you can use this.candidateId in your component logic
      console.log('Candidate ID:', this.candidateId,this.table_name);
      this.table_name=this.table_name;
      this.getCandidateById(this.table_num);
      console.log(this.table_name)
    });    
  }


  getCandidateById(table_num: String){
    this.service.getCandidate(this.candidateId,this.table_name).subscribe((res)=>{
      console.log(res);
      this.candidate = res;
      console.log(this.candidate)
    });
  }
  
  updateCandidate() {
    console.log(this.table_name)
    this.service.updateCandidate(this.candidateId, this.candidate,this.table_name).subscribe(
      (res) => {
        console.log('Candidate updated successfully:', res);
        // Optionally, you can navigate to a different route or show a success message
        this.router.navigate(['/database']);
      },
      (error) => {
        console.error('Error updating candidate:', error);
        // Handle the error, show an error message, etc.
      }
    );
    }


    getProperties(obj: any): string[] {
      return Object.keys(obj);
    }


}