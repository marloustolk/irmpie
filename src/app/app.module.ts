import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToolbarModule } from 'primeng/toolbar';

import { AppComponent } from './app.component';
import { DialogComponent } from './dialog/dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({ declarations: [
        AppComponent,
        DialogComponent
    ],
    bootstrap: [AppComponent], imports: [ButtonModule,
        BrowserAnimationsModule,
        BrowserModule,
        CardModule,
        CommonModule,
        DialogModule,
        FormsModule,
        InputTextModule,
        InputTextareaModule,
        ToolbarModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
