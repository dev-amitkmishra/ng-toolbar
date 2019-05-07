import { Component, ComponentFactoryResolver, ViewContainerRef, AfterViewInit, ViewChild } from '@angular/core';
import { DynamicComponent } from './dynamic/dynamic.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
    @ViewChild('dynamicInsert', { read: ViewContainerRef }) dynamicInsert: ViewContainerRef;
    title = 'ng-toolbar';
    constructor(private viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) {}

    ngAfterViewInit() {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicComponent);
        this.dynamicInsert.clear();
        const dyynamicComponent: any = this.dynamicInsert.createComponent(componentFactory).instance;
        dyynamicComponent.someProp = 'Hello World';
    }
}
