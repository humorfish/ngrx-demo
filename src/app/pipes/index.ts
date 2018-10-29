import { NgModule } from '@angular/core';

import { EllipisisPipe } from './ellipsis';
import {AddCommasPipe} from './add-commas';

export const PIPES = [
    EllipisisPipe,
    AddCommasPipe
];

@NgModule({
    declarations: PIPES,
    exports: PIPES
})
export class PipesModule {}
