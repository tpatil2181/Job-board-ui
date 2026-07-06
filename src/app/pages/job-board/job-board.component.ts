import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-board',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './job-board.component.html',
  styleUrl: './job-board.component.css'
})
export class JobBoardComponent {

  searchText: string = '';
  location: string = '';

  jobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Infosys",
      location: "Bengaluru",
      type: "Full-time",
      salary: "₹18–24 LPA",
      posted: "Today"
    },
    {
      id: 2,
      title: "Java Developer",
      company: "Wipro",
      location: "Pune",
      type: "Full-time",
      salary: "₹10–15 LPA",
      posted: "2 days ago"
    }
  ];

  filteredJobs = [...this.jobs];

  searchJobs() {
    this.filteredJobs = this.jobs.filter(job =>
      job.title.toLowerCase().includes(this.searchText.toLowerCase()) &&
      job.location.toLowerCase().includes(this.location.toLowerCase())
    );
  }

  viewJob(job: any) {
    alert(`Opening job: ${job.title}`);
    // later → this.router.navigate(['/job', job.id])
  }



//   const allJobs = [
//   { id:1, title:"Senior Software Engineer", company:"Infosys", location:"Bengaluru", type:"Full-time", mode:"hybrid", exp:"senior", cat:"tech", salary:"₹18–24 LPA", logo:"I", color:"#007CC3", isNew:true, posted:"Today",  applicants:87 },
//   { id:2, title:"Product Manager", company:"Flipkart", location:"Bengaluru", type:"Full-time", mode:"onsite", exp:"mid", cat:"tech", salary:"₹22–30 LPA", logo:"F", color:"#F74F00", isNew:true, posted:"Today", applicants:53 },
//   { id:3, title:"UI/UX Designer", company:"Zomato", location:"Gurugram", type:"Full-time", mode:"hybrid", exp:"junior", cat:"design", salary:"₹10–16 LPA", logo:"Z", color:"#E23744", isNew:false, posted:"2 days ago", applicants:119 },
//   { id:4, title:"Data Analyst", company:"TCS", location:"Mumbai", type:"Full-time", mode:"onsite", exp:"junior", cat:"tech", salary:"₹6–10 LPA", logo:"T", color:"#1C3B6E", isNew:false, posted:"3 days ago", applicants:204 },
//   { id:5, title:"React Developer", company:"Razorpay", location:"Remote", type:"Full-time", mode:"remote", exp:"mid", cat:"tech", salary:"₹14–20 LPA", logo:"R", color:"#2D81F7", isNew:true, posted:"1 day ago", applicants:66 },
//   { id:6, title:"Digital Marketing Manager", company:"Swiggy", location:"Bengaluru", type:"Full-time", mode:"hybrid", exp:"mid", cat:"marketing", salary:"₹12–18 LPA", logo:"S", color:"#FC8019", isNew:false, posted:"4 days ago", applicants:44 },
//   { id:7, title:"Java Backend Developer", company:"Wipro", location:"Pune", type:"Full-time", mode:"onsite", exp:"mid", cat:"tech", salary:"₹10–15 LPA", logo:"W", color:"#341c5c", isNew:false, posted:"5 days ago", applicants:98 },
//   { id:8, title:"HR Business Partner", company:"HCL Tech", location:"Noida", type:"Full-time", mode:"hybrid", exp:"senior", cat:"hr", salary:"₹12–16 LPA", logo:"H", color:"#0076CE", isNew:false, posted:"1 week ago", applicants:37 },
//   { id:9, title:"Financial Analyst", company:"HDFC Bank", location:"Mumbai", type:"Full-time", mode:"onsite", exp:"junior", cat:"finance", salary:"₹8–12 LPA", logo:"H", color:"#004C97", isNew:true, posted:"1 day ago", applicants:72 },
//   { id:10, title:"DevOps Engineer", company:"Freshworks", location:"Remote", type:"Full-time", mode:"remote", exp:"mid", cat:"tech", salary:"₹16–22 LPA", logo:"F", color:"#25c16f", isNew:false, posted:"3 days ago", applicants:55 },
//   { id:11, title:"Graphic Designer", company:"Byju's", location:"Bengaluru", type:"Full-time", mode:"hybrid", exp:"junior", cat:"design", salary:"₹6–9 LPA", logo:"B", color:"#8A2BE2", isNew:false, posted:"6 days ago", applicants:88 },
//   { id:12, title:"Software Intern", company:"Ola", location:"Bengaluru", type:"Internship", mode:"onsite", exp:"fresher", cat:"tech", salary:"₹15–25k/mo", logo:"O", color:"#1C1C1C", isNew:true, posted:"Today", applicants:312 },
// ];


// const companies = [
//   { name:"Infosys",   logo:"I", color:"#007CC3", jobs:142 },
//   { name:"TCS",       logo:"T", color:"#1C3B6E", jobs:210 },
//   { name:"Wipro",     logo:"W", color:"#341c5c", jobs:98  },
//   { name:"Flipkart",  logo:"F", color:"#F74F00", jobs:67  },
//   { name:"Zomato",    logo:"Z", color:"#E23744", jobs:34  },
//   { name:"Razorpay",  logo:"R", color:"#2D81F7", jobs:28  },
//   { name:"Swiggy",    logo:"S", color:"#FC8019", jobs:45  },
//   { name:"Freshworks",logo:"F", color:"#25c16f", jobs:52  },
//   { name:"HCL Tech",  logo:"H", color:"#0076CE", jobs:89  },
//   { name:"HDFC Bank", logo:"H", color:"#004C97", jobs:61  },
//   { name:"Ola",       logo:"O", color:"#1C1C1C", jobs:39  },
//   { name:"Byju's",    logo:"B", color:"#8A2BE2", jobs:23  },
// ];

// let filteredJobs = [...allJobs];
// let currentPage = 1;
// const PER_PAGE = 6;
// const saved = new Set();
}