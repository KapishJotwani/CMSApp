import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

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
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrl: './candidate.component.css'
})
export class CandidateComponent implements OnInit{
  
  entity = 'candidates';
  candidate: any[]=[];
  tableHeaders: string[] = [];
  newCandidate: any={};
  updatedCandidate: any;
  column_names: any[]=[];
  table_name= "candidates";
  expression: boolean = false;
  id_num!: number;
  


  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.fetchCandidates(this.table_name);
    // this.getColumnnames();
  }

  change_table_name(table_name: string){
    console.log("table_name:", table_name);
    this.table_name=table_name;
    console.log("table_name:", table_name);
    this.getColumnnames(this.table_name);
    this.fetchCandidates(this.table_name);
  }

  fetchCandidates(table_name: String): void {
    console.log("fetch:",this.table_name)
    const apiUrl = `http://localhost:8181/api/${this.table_name}`;
  
    // Initialize tableHeaders as an empty array
    this.tableHeaders = [];
  
    this.http.get<any[]>(apiUrl)
      .subscribe(
        data => {
          this.candidate = data;
          console.log('Received data:', data);
  
          // Set tableHeaders only if there are elements in the candidate array
          if (this.candidate.length > 0) {
            this.tableHeaders = data.length > 0 ? Object.keys(data[0]) : [];
          }
          else if (this.candidate.length == 0) {
            this.tableHeaders = this.column_names;
          }
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
  }
  
  
  addCandidate() {
    const apiUrl = `http://localhost:8181/api/${this.table_name}`;

    this.http.post(apiUrl, this.newCandidate)
      .subscribe(
        (response: any) => {
          console.log(this.table_name ,' added successfully:', response);
          // After adding the candidate, fetch the updated list
          this.fetchCandidates(this.table_name);
        },
        error => {
          console.error('Error adding candidate:', error);
        }
      );

    // Reset the newCandidate object for the next entry
    this.newCandidate = {};
  }

  
    navigateToUpdateCandidate(candidate: number) {
      this.id_num=Object.values(candidate)[0]
      console.log("update_candidate:", this.id_num )
      console.log('Update clicked for candidate with ID:', this.id_num);
      // Use the Angular Router to navigate to the update-candidate route
      this.router.navigate(['/update-candidate',this.id_num,this.table_name]);
    }

    
  
  

  deleteCandidate(candidate: number){
    // Implement your delete logic here
    this.id_num=Object.values(candidate)[0]
    const apiUrl = `http://localhost:8181/api/${this.table_name}/deleteById/${this.id_num}`;
    console.log("delete",this.id_num)

    this.http.delete(apiUrl)
      .subscribe(
        (response: any) => {
          console.log('Candidate deleted successfully:', response);
          // After deleting the candidate, fetch the updated list
          this.fetchCandidates(this.table_name);
        },
        error => {
          console.error('Error deleting candidate:', error);
        }
      );

    // Reset the newCandidate object for the next entry
    this.newCandidate = {};
  }

  getColumnnames(table_name: String): void{
    console.log("entity:",this.table_name)
    const apiUrl = `http://localhost:8181/api/${this.table_name}/columns`;
    
    
    this.http.get<any[]>(apiUrl)
      .subscribe(
        data => {
          this.column_names = data;
          
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );

  }

  // getFirstPropertyValue(candidate: any): any {
  //   console.log("getfirst:" ,candidate)
  //   console.log(Object.values(candidate)[0])

  //   return candidate=Object.values(candidate)[0]; // or handle the case when the candidate is undefined or empty
  // }
  



  
}