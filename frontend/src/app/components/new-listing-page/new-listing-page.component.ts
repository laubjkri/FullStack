import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListingsService } from 'src/app/services/listings.service';
import { Listing } from 'src/app/types';

@Component({
  selector: 'app-new-listing-page',
  templateUrl: './new-listing-page.component.html',
  styleUrls: ['./new-listing-page.component.css']
})
export class NewListingPageComponent implements OnInit {
  constructor(
    private router: Router,
    private listingsService: ListingsService
  ) { }
  
  ngOnInit(): void {}

  onSubmit(listing: Listing): void {
    this.listingsService.createListing(listing.name, listing.description, listing.price).subscribe(() => {
      
      this.router.navigateByUrl("/my-listings");
    })
  }

}
