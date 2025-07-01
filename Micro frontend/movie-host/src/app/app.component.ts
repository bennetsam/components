import { Component, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MicrofrontendService } from './microfrontend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
 @ViewChild('movieList', {read: ViewContainerRef, static: true}) listContainer!: ViewContainerRef;
 @ViewChild('ticketAvailability', {read: ViewContainerRef, static: true}) ticketContainer!: ViewContainerRef;

 private listComponentRef: ComponentRef<any> | null = null;
 private ticketAvailabilityComponentRef: ComponentRef<any> | null = null;

 constructor(private microfrontendService: MicrofrontendService) {}

 async ngOnInit() {
  try {
    
    const listComp = await this.microfrontendService.loadRemoteComponent(4202, 'movie-list');
    this.listContainer.clear();
    this.listComponentRef = this.listContainer.createComponent(listComp.AppComponent);
    this.listComponentRef.changeDetectorRef.detectChanges();

    const ticketComp = await this.microfrontendService.loadRemoteComponent(4203, 'ticket-availability');
    this.ticketContainer.clear();
    this.ticketAvailabilityComponentRef = this.ticketContainer.createComponent(ticketComp.AppComponent);
    this.ticketAvailabilityComponentRef.changeDetectorRef.detectChanges();
  } catch (error) {
    console.error('Failed to load reomote compoent', error); 
  }
 }

 ngOnDestroy(): void {
   this.listComponentRef?.destroy();
   this.ticketAvailabilityComponentRef?.destroy();
 }

}
