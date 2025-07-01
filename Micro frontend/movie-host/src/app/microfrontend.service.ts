import { loadRemoteModule } from '@angular-architects/native-federation';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MicrofrontendService {

  constructor() { }

  async loadRemoteComponent(port: number, remoteName: string) {
    try {
      return await loadRemoteModule({
        exposedModule: './Component',
        remoteName,
        remoteEntry: `http://localhost:${port}/remoteEntry.json`,
        fallback: 'unauthorized'
      });

    } catch (error) {
      console.error(`Error loading ${remoteName} component: `, error);
      throw error;
    }
  }
}
