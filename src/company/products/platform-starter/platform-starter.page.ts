import { Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowUp, faFileCode, faMoneyBill1Wave, faPhone } from '@fortawesome/free-solid-svg-icons';

/**
 * Platform starter product page.
 */
@Component({
    imports: [FontAwesomeModule],
    selector: 'platform-starter-page',
    templateUrl: './platform-starter.page.html'
})
export class PlatformStarterPage {
    protected readonly faMoneyBillWave = signal(faMoneyBill1Wave).asReadonly();

    protected readonly faFileCode = signal(faFileCode).asReadonly();

    protected readonly faArrowUp = signal(faArrowUp).asReadonly();

    protected readonly faPhone = signal(faPhone).asReadonly();
}
