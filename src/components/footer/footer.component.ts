import { Component, HostBinding, input, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FooterMapComponent } from '@/components/footer-map/footer-map.component';

/**
 * Footer component.
 */
@Component({
    selector: 'footer',
    imports: [FontAwesomeModule, CommonModule, FooterMapComponent],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css'
})
export class FooterComponent {
    /**
     * FA location marker icon.
     */
    protected readonly marker = signal(faLocationDot);

    /**
     * FA email icon.
     */
    protected readonly email = signal(faEnvelope);

    /**
     * Use a smaller, compact footer.
     */
    public compact = input(false);

    /**
     * The local part of the email address.
     */
    @HostBinding('style.--local') protected readonly emailLocal = '"contact"';

    /**
     * The domain of the email address.
     */
    @HostBinding('style.--domain') protected readonly emailDomain = '"farkasgaborev.eu"';

    /**
     * Returns the raw email address.
     */
    private get rawEmail(): string {
        return `${this.emailLocal}@${this.emailDomain}`.replaceAll('"', '');
    }

    /**
     * Helper variable for tracking if we need to copy to the clipboard.
     */
    private dblClick = false;

    /**
     * Helper variable for user feedback on a single click.
     */
    protected singleClick = false;

    /**
     * Copies the email address to the clickboard.
     */
    protected copyToClipboard(): void {
        // Delay the main logic by a bit more than the typical maximum dblclick browser delay, which is not standardized.
        setTimeout(function (this: FooterComponent) {
            // If we still haven't registered a second click, copy to clipboard.
            if (!this.dblClick) {
                this.singleClick = true;
                const emailAddress = this.rawEmail;
                if (!navigator.clipboard) {
                    this.fallbackCopyToClipboard(emailAddress);
                    return;
                }
                navigator.clipboard.writeText(emailAddress).then(
                    () => { /** Do nothing */ },
                    function (this: FooterComponent) {
                        this.fallbackCopyToClipboard(emailAddress);
                    }.bind(this));
                setTimeout(() => this.singleClick = false, 1000);
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
        } catch (ex) {
            console.error(ex);
        }

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
