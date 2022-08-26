import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class HttpConfigInterceptor implements HttpInterceptor {
	private readonly AUTH_TYPE = 'Bearer';

	constructor() {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const host = 'covid-193.p.rapidapi.com';
		const key = '31d075f02bmsh0cde3a0720fd943p193372jsn19f64d1c4f4d'; // to be added to environment files

        request = request.clone({ headers: request.headers.set('x-rapidapi-host', host) });
        request = request.clone({ headers: request.headers.set('x-rapidapi-key', key) });
		return next.handle(request);
	}
}
