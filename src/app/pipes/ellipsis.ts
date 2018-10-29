import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
    name: 'bcEllipsis'
})
export class EllipisisPipe implements PipeTransform {

    transform(str: string, strLength: number = 250) {
        const withoutHtml = str.replace(/(<([^>]+)>)/ig, '');

        if (str.length >= strLength) {
            return `${withoutHtml.slice(0, strLength)}...`;
        }

        return withoutHtml;
    }
}
