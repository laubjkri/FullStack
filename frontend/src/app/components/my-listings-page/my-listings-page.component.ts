import { Component, OnInit } from '@angular/core';
import { fakeMyListings } from 'src/app/fake-data';
import { Listing } from 'src/app/types';
import { ListingsService } from 'src/app/services/listings.service';

@Component({
  selector: 'app-my-listings-page',
  templateUrl: './my-listings-page.component.html',
  styleUrls: ['./my-listings-page.component.css']
})
export class MyListingsPageComponent implements OnInit {
  listings: Listing[] = [];

  constructor(
    private listingsService: ListingsService
  ) { }
  
  ngOnInit(): void {
    // this.listings = fakeMyListings;
    this.listingsService.getListingsForUser().subscribe(listings => this.listings = listings);

  }

  onDeleteClicked(listingId: string): void {
    // alert(`Deleting your listing with id ${listingId}`);
    this.listingsService.deleteListing(listingId).subscribe(() => {
      // We update the UI directly without waiting for the backend
      this.listings = this.listings.filter(listing => listing.id !== listingId);
    });
  }

}
