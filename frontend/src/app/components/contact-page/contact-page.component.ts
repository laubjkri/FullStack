import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router'; // This enables us to pull the id from the url and to navigate (Router)
import { fakeListings } from '../../fake-data';
import { Listing } from '../../types';
import { ListingsService } from 'src/app/services/listings.service';


@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {
  email: string = "";
  message: string = "";
  listing?: Listing;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingsService: ListingsService
  ) { }
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id")!;
    // this.listing = fakeListings.find(listing => listing.id === id);

    this.listingsService.getListingById(id).subscribe(listing => {
      this.listing = listing;
      this.message = `Hi im interested in your ${this.listing?.name.toLowerCase()!}`;
    })    
  }

  sendMessage(): void {
    alert("Your message has been sent!");
    this.router.navigateByUrl("/listings");
  }

}
