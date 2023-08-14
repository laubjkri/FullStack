import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // This enables us to pull the id from the url
import { fakeListings } from 'src/app/fake-data';
import { Listing } from 'src/app/types';
import { ListingsService } from 'src/app/services/listings.service';

@Component({
  selector: 'app-listing-detail-page',
  templateUrl: './listing-detail-page.component.html',
  styleUrls: ['./listing-detail-page.component.css']
})
export class ListingDetailPageComponent implements OnInit {
  listing!: Listing;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private listingsService: ListingsService
  ) {}
  
  ngOnInit(): void {
    // Get the url parameter called id
    const id = this.route.snapshot.paramMap.get("id")!;
    // this.listing = fakeListings.find(listing => listing.id === id);

    this.listingsService.getListingById(id).subscribe(listing => {
      this.listing = listing;
      this.isLoading = false;
    });

    this.listingsService.addViewToListing(id).subscribe(() => {
      console.log("Views updated!");
    })

  }
}
