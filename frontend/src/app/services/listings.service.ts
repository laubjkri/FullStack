import { Injectable } from '@angular/core';
import { fakeListings } from '../fake-data';
import { Listing } from '../types';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AngularFireAuth } from "@angular/fire/compat/auth";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

const httpOptionsWithAuthToken = (token: string) => ({
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "AuthToken": token
  })
});


@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  constructor(
    private http: HttpClient,
    private auth: AngularFireAuth
  ) { }

  // getListings(): Listing[] {
  //   return fakeListings;
  // }

  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>("/api/listings");
  }

  getListingById(id: string): Observable<Listing> {
    return this.http.get<Listing>(`/api/listings/${id}`);
  }

  addViewToListing(id: string): Observable<Listing> {
    return this.http.post<Listing>(`/api/listings/${id}/add-view`, {}, httpOptions);
  }

  getListingsForUser(): Observable<Listing[]> {
    return new Observable<Listing[]>(observer => {
      this.auth.user.subscribe(user => {
        if (user) {          
          user.getIdToken().then((token) => {
            if (token) {
              return this.http.get<Listing[]>(`/api/users/${user.uid}/listings`, httpOptionsWithAuthToken(token)).subscribe(listings => {
                observer.next(listings);
              });
            }
            else {
              // If no token pass empty array
              return observer.next([]);
            }
          });          
        }
        else {
          // If no user pass empty array
          return observer.next([]);
        }        
      });
    });
  }

  deleteListing(id: string): Observable<any> {
    return new Observable<any>(observer => {
      this.auth.user.subscribe(user => {
        user && user.getIdToken().then(token => {
          this.http.delete(`/api/listings/${id}`, httpOptionsWithAuthToken(token))
            .subscribe(() => observer.next());
        });
      });
    });

  }

  createListing(name: string, description: string, price: number): Observable<Listing> {
    return new Observable<Listing>(observer => {
      this.auth.user.subscribe(user => {
        user && user.getIdToken().then(token => {
          this.http.post<Listing>("/api/listings", { name, description, price }, httpOptionsWithAuthToken(token))
            .subscribe(() => observer.next());
        });
      });
    });    
  }

  editListing(id: string, name: string, description: string, price: number): Observable<Listing> {
    return new Observable<Listing>(observer => {
      this.auth.user.subscribe(user => {
        user && user.getIdToken().then(token => {
          this.http.post<Listing>(`/api/listings/${id}`, { name, description, price }, httpOptionsWithAuthToken(token))
            .subscribe(() => observer.next());
        });
      });
    });
  }

}
