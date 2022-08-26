import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './http.interceptor';

export const InterceptorsProvider = [
	{
		provide: HTTP_INTERCEPTORS,
		useClass: HttpConfigInterceptor,
		multi: true
	}
];