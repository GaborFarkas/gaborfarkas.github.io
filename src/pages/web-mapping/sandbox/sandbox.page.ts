import { CodeEditorComponent } from "@/components/code-editor/code-editor.component";
import { NavLogoComponent } from "@/components/navigation/nav-logo/nav-logo.component";
import { NoPhoneComponent } from "@/components/no-phone/no-phone.component";
import { Component } from "@angular/core";

/**
 * The sandbox web mapping page.
 */
@Component({
    selector: 'sandbox-page',
    standalone: true,
    imports: [NavLogoComponent, NoPhoneComponent, CodeEditorComponent],
    templateUrl: './sandbox.page.html',
    host: {
        class: 'flex flex-col h-full'
    }
})
export class SandboxPage {
}
