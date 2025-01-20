import { Component, OnInit } from '@angular/core';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  teamMembers: TeamMember[] = [];

  constructor() {}

  ngOnInit(): void {
    // In a real application, this data might come from a service or API
    this.teamMembers = [
      {
        name: 'John Doe',
        role: 'Founder & CEO',
        image: 'assets/team-john.jpg',
        bio: 'John has over 20 years of experience in the music industry, leading Guitar Shop to become a trusted name for guitar enthusiasts worldwide.'
      },
      {
        name: 'Jane Smith',
        role: 'Head of Sales',
        image: 'assets/team-jane.jpg',
        bio: 'Jane is passionate about connecting musicians with the perfect instruments. She ensures our customers receive top-notch service and support.'
      },
      {
        name: 'Mike Johnson',
        role: 'Lead Guitar Technician',
        image: 'assets/team-mike.jpg',
        bio: 'Mike is an expert in guitar maintenance and repair, ensuring every instrument meets our high-quality standards before reaching our customers.'
      }
    ];
  }
}
