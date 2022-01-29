import { AbstractControl } from '@angular/forms';
import { Observable, Observer, of } from 'rxjs';

export const imageMimeTypeValidator = (
	control: AbstractControl
):
	| Promise<{ [key: string]: any } | null>
	| Observable<{ [key: string]: any } | null> => {
	let files: File[] = [];
	if (control.value instanceof FileList) {
		for (let i = 0; i < control.value.length; i++) {
			files.push(control.value[i] as File);
		}
	} else {
		files.push(control.value as File);
	}

	const frObs = new Observable(
		(observer: Observer<{ [key: string]: any } | null>) => {
			for (let i = 0; i < files.length; i++) {
				const fileReader = new FileReader();
				fileReader.addEventListener('loadend', () => {
					const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(
						0,
						4
					);
					let header = '';
					let isValid = false;
					for (let i = 0; i < arr.length; i++) {
						header += arr[i].toString(16);
					}
					switch (header) {
						case '89504e47':
							// .png
							isValid = true;
							break;
						case 'ffd8ffe0':
						case 'ffd8ffe1':
						case 'ffd8ffe2':
						case 'ffd8ffe3':
						case 'ffd8ffe8':
							// .jpg, .jpeg
							isValid = true;
							break;
						default:
							isValid = false; // Or you can use the blob.type as fallback
							break;
					}
					if (isValid) {
						observer.next(null);
					} else {
						observer.next({ invalidMimeType: true });
					}
					observer.complete();
				});
				fileReader.readAsArrayBuffer(files[i]);
			}
		}
	);
	return frObs;
};
