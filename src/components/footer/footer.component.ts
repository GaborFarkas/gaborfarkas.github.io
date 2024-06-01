import { Component, HostBinding } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faEnvelope, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FooterMapComponent } from '@/components/footer-map/footer-map.component';

/**
 * Footer component.
 */
@Component({
    selector: 'footer',
    standalone: true,
    imports: [FontAwesomeModule, CommonModule, FooterMapComponent],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css'
})
export class FooterComponent {
    /**
     * FA location marker icon.
     */
    protected marker: IconDefinition = faLocationDot;

    /**
     * FA email icon.
     */
    protected email: IconDefinition = faEnvelope;

    /**
     * The local part of the email address.
     */
    @HostBinding('style.--local') protected emailLocal: string = '\"contact\"';

    /**
     * The domain of the email address.
     */
    @HostBinding('style.--domain') protected emailDomain: string = '\"farkasgaborev.eu\"';

    /**
     * Returns the raw email address.
     */
    private get rawEmail(): string {
        return `${this.emailLocal}@${this.emailDomain}`.replaceAll('"', '');
    }

    /**
     * Helper variable for tracking if we need to copy to the clipboard.
     */
    private dblClick: boolean = false;

    /**
     * Copies the email address to the clickboard.
     */
    protected copyToClipboard(): void {
        // Delay the main logic by a bit more than the typical maximum dblclick browser delay, which is not standardized.
        setTimeout(function (this: FooterComponent) {
            // If we still haven't registered a second click, copy to clipboard.
            if (!this.dblClick) {
                const emailAddress = this.rawEmail;
                if (!navigator.clipboard) {
                    this.fallbackCopyToClipboard(emailAddress);
                    return;
                }
                navigator.clipboard.writeText(emailAddress).then(
                    () => { },
                    function (this: FooterComponent) {
                        this.fallbackCopyToClipboard(emailAddress);
                    }.bind(this));
            }

            this.dblClick = false;
        }.bind(this), 600);
    }

    /**
     * Old-school method for copying to the clipboard.
     */
    private fallbackCopyToClipboard(email: string) {
        const copyElem = document.createElement('textarea');
        copyElem.value = email;

        document.body.appendChild(copyElem);
        copyElem.focus();
        copyElem.select();

        try {
            document.execCommand('copy');
        } catch (ex) { }

        copyElem.remove();
    }

    /**
     * Opens a new email composer window.
     */
    protected openEmail() {
        this.dblClick = true;
        window.open(`mailto:${this.rawEmail}`, '_blank');
    }
}
