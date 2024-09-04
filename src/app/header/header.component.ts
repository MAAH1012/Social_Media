import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/authService";
import { Subscription } from "rxjs";

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy{

    isnotAuthenticated = true;
    private authSubscription: Subscription;
    constructor(private dataStorageService: DataStorageService, private authService: AuthService){}

    ngOnInit() {
        this.authSubscription = this.authService.authStatus.subscribe(isAuthenticated => {
            this.isnotAuthenticated = !isAuthenticated;
        });
    }

    ngOnDestroy() {
        if (this.authSubscription) {
            this.authSubscription.unsubscribe();
        }
    }
    onSaveData(){
        this.dataStorageService.storeRecipes();
    }

    onFetchData(){
        this.dataStorageService.fetchRecipes().subscribe();
    }
    
    logOut(){
        this.authService.logOut();
    }
}