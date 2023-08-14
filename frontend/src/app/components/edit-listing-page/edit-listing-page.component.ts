import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Listing } from 'src/app/types';
import { fakeMyListings } from 'src/app/fake-data';
import { ListingsService } from 'src/app/services/listings.service';

@Component({
  selector: 'app-edit-listing-page',
  templateUrl: './edit-listing-page.component.html',
  styleUrls: ['./edit-listing-page.component.css']
})
export class EditListingPageComponent {  
  listing!: Listing;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingsService: ListingsService
  ) { }
  

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id")!;
    // this.listing = fakeMyListings.find((listing) => listing.id === id)!;

    // Get details of the listing we are editing
    this.listingsService.getListingById(id).subscribe(listing => this.listing = listing);

  }

  onSubmit({name, description, price}: Listing) { 
    // alert("Saving changes to the listing...");
    this.listingsService.editListing(this.listing.id, name, description, price).subscribe(() => {
      this.router.navigateByUrl("/my-listings");      
    });
  }
}
